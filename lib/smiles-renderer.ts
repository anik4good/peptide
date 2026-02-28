// SMILES to SVG Renderer - TypeScript version
// Zero-dependency molecular structure renderer

export interface Atom {
  sym: string;
  ar?: boolean;
  x: number;
  y: number;
}

export interface Bond {
  a: number;
  b: number;
  o: number;
  ring?: boolean;
}

export interface Token {
  t: 'A' | 'B' | 'R' | '(' | ')';
  sym?: string;
  ar?: boolean;
  o?: number;
  id?: number;
}

const COLORS: Record<string, string> = {
  C: '#c8d8e8',
  N: '#00d4ff',
  O: '#ff5566',
  S: '#ffdd00',
  P: '#ffaa00',
  F: '#88ff88',
  Cl: '#22dd44',
  Br: '#ff8800',
  I: '#bb88ff'
};

const BL = 42; // bond length in pixels
const PI = Math.PI;

// Tokenize SMILES string
function tokenize(smiles: string): Token[] {
  const out: Token[] = [];
  let i = 0;

  while (i < smiles.length) {
    const c = smiles[i];

    if (c === '[') {
      const j = smiles.indexOf(']', i);
      if (j < 0) { i++; continue; }
      const inner = smiles.slice(i + 1, j);
      const m = inner.match(/^(?:\d+)?([A-Z][a-z]?|[cnops])/);
      out.push({ t: 'A', sym: m ? m[1].toUpperCase() : 'C' });
      i = j + 1;
    } else if (c === '(') {
      out.push({ t: '(' });
      i++;
    } else if (c === ')') {
      out.push({ t: ')' });
      i++;
    } else if (c === '=') {
      out.push({ t: 'B', o: 2 });
      i++;
    } else if (c === '#') {
      out.push({ t: 'B', o: 3 });
      i++;
    } else if (c === '-') {
      out.push({ t: 'B', o: 1 });
      i++;
    } else if (c === ':') {
      out.push({ t: 'B', o: 1.5 });
      i++;
    } else if (c === '%') {
      const n = +smiles.slice(i + 1, i + 3);
      out.push({ t: 'R', id: n });
      i += 3;
    } else if (/\d/.test(c)) {
      out.push({ t: 'R', id: +c });
      i++;
    } else if (/[BCNOPSFI]/.test(c)) {
      let sym = c;
      if (i + 1 < smiles.length && /[a-z]/.test(smiles[i + 1])) {
        sym = c + smiles[i + 1];
        i++;
      }
      out.push({ t: 'A', sym });
      i++;
    } else if (/[bcnops]/.test(c)) {
      out.push({ t: 'A', sym: c.toUpperCase(), ar: true });
      i++;
    } else {
      // Skip unrecognized characters
      i++;
    }
  }

  return out;
}

// Build molecular graph
function buildGraph(tokens: Token[]): { atoms: Atom[]; bonds: Bond[] } {
  const atoms: Atom[] = [];
  const bonds: Bond[] = [];
  const rings: Record<number, number> = {};
  let prev: number | null = null;
  let bo = 1;

  for (const t of tokens) {
    if (t.t === 'B') {
      bo = t.o ?? 1;
      continue;
    }
    if (t.t === '(') {
      (stack as any).push({ prev, bo });
      bo = 1;
      continue;
    }
    if (t.t === ')') {
      const s = (stack as any).pop();
      prev = s.prev;
      bo = 1;
      continue;
    }
    if (t.t === 'R' && t.id !== undefined) {
      if (rings[t.id] !== null) {
        bonds.push({ a: rings[t.id], b: prev!, o: bo, ring: true });
        delete rings[t.id];
      } else {
        rings[t.id] = prev!;
      }
      bo = 1;
      continue;
    }
    if (t.t === 'A') {
      const idx = atoms.length;
      atoms.push({ sym: t.sym!, ar: !!t.ar, x: 0, y: 0 });
      if (prev !== null) {
        bonds.push({ a: prev, b: idx, o: bo, ring: false });
      }
      bo = 1;
      prev = idx;
    }
  }

  // Validate bonds
  const validBonds = bonds.filter(b => {
    return b.a >= 0 && b.b >= 0 && b.a < atoms.length && b.b < atoms.length;
  });

  return { atoms, bonds: validBonds };
}

const stack: any[] = [];

// Find rings using DFS
function findRings(natoms: number, bonds: Bond[]): number[][] {
  const adj: number[][] = Array.from({ length: natoms }, () => []);
  for (const b of bonds) {
    adj[b.a].push(b.b);
    adj[b.b].push(b.a);
  }

  const rings: number[][] = [];
  const color = new Array(natoms).fill(0);
  const path: number[] = [];

  function dfs(u: number, par: number): void {
    color[u] = 1;
    path.push(u);

    for (const v of adj[u]) {
      if (v === par) continue;
      if (color[v] === 1) {
        const idx = path.indexOf(v);
        if (idx >= 0) rings.push(path.slice(idx).concat());
      } else if (color[v] === 0) {
        dfs(v, u);
      }
    }

    path.pop();
    color[u] = 2;
  }

  for (let i = 0; i < natoms; i++) {
    if (!color[i]) dfs(i, -1);
  }

  return rings;
}

// Layout atoms in 2D
function layout(atoms: Atom[], bonds: Bond[]): void {
  if (!atoms.length) return;

  const n = atoms.length;
  const adj: Array<{ nb: number; b: Bond }[]> = Array.from({ length: n }, () => []);
  for (const b of bonds) {
    adj[b.a].push({ nb: b.b, b });
    adj[b.b].push({ nb: b.a, b });
  }

  const rings = findRings(n, bonds);
  const atomRings: number[][] = Array.from({ length: n }, () => []);
  rings.forEach((r, ri) => r.forEach(a => atomRings[a].push(ri)));

  const placed = new Array(n).fill(false);
  const inAngle = new Array(n).fill(null);

  function nextAngle(u: number, fromAngle: number | null): number {
    if (fromAngle === null) return 0;

    const usedA = adj[u]
      .filter(({ nb }) => placed[nb])
      .map(({ nb }) => Math.atan2(atoms[nb].y - atoms[u].y, atoms[nb].x - atoms[u].x));

    const cands = [
      fromAngle - (PI * 2) / 3,
      fromAngle + (PI * 2) / 3,
      fromAngle - PI / 3,
      fromAngle + PI / 3,
      fromAngle + PI,
      fromAngle
    ];

    let best = cands[0];
    let bestMin = -1;

    for (const ca of cands) {
      const na = ((ca % (2 * PI)) + 2 * PI) % (2 * PI);
      const minDist = usedA.length
        ? Math.min(
          ...usedA.map((ua) => {
            const d = Math.abs(((ua - ca) % (2 * PI) + 2 * PI) % (2 * PI));
            return Math.min(d, 2 * PI - d);
          })
        )
        : 2 * PI;

      if (minDist > bestMin) {
        bestMin = minDist;
        best = ca;
      }
    }

    return best;
  }

  atoms[0].x = 0;
  atoms[0].y = 0;
  placed[0] = true;
  inAngle[0] = 0;

  const queue = [0];
  const visited = new Set([0]);

  while (queue.length) {
    const u = queue.shift()!;
    const fromAngle = inAngle[u];
    const unplaced = adj[u].filter(({ nb }) => !placed[nb]);

    // Place rings first
    for (const ri of atomRings[u]) {
      const ring = rings[ri];
      const allPlaced = ring.every((a) => placed[a]);
      if (!allPlaced) {
        const ns = ring.length;
        const step = PI - (PI * (ns - 2)) / ns;

        for (let k = 0; k < ns - 1; k++) {
          const from = ring[(k + ring.indexOf(u)) % ns];
          const to = ring[(k + ring.indexOf(u) + 1) % ns];

          if (!placed[to]) {
            const angle = fromAngle !== null ? fromAngle : 0;
            atoms[to].x = atoms[from].x + BL * Math.cos(angle);
            atoms[to].y = atoms[from].y + BL * Math.sin(angle);
            placed[to] = true;
            inAngle[to] = angle;

            if (!visited.has(to)) {
              visited.add(to);
              queue.push(to);
            }
          }
        }
      }
    }

    // Place non-ring atoms
    for (const { nb: v } of unplaced) {
      if (placed[v]) continue;

      const angle = nextAngle(u, fromAngle !== null ? fromAngle : 0);
      atoms[v].x = atoms[u].x + BL * Math.cos(angle);
      atoms[v].y = atoms[u].y + BL * Math.sin(angle);
      placed[v] = true;
      inAngle[v] = angle;

      if (!visited.has(v)) {
        visited.add(v);
        queue.push(v);
      }
    }
  }

  // Shift to positive quadrant
  const xs = atoms.map((a) => a.x);
  const ys = atoms.map((a) => a.y);
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);

  atoms.forEach((a) => {
    a.x += 24 - minX;
    a.y += 24 - minY;
  });
}

// Render SMILES to SVG string
export function renderSMILES(smiles: string, width = 310, height = 220): string {
  if (!smiles || smiles.trim().length === 0) {
    return `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;color:#4a5a6a;font-family:monospace;font-size:0.55rem;text-align:center;line-height:2">
      <div style="font-size:1.4rem;margin-bottom:8px;opacity:0.3">⬡</div>
      MACROMOLECULE<br><span style="font-size:0.42rem;opacity:0.5">TOO LARGE TO RENDER</span>
    </div>`;
  }

  try {
    const tokens = tokenize(smiles);
    const { atoms, bonds } = buildGraph(tokens);

    if (!atoms.length) {
      return `<div style="color:#4a5a6a;font-family:monospace;font-size:0.55rem;text-align:center;padding:20px">
        <strong>NO STRUCTURE</strong><br>
        <span style="font-size:0.42rem;opacity:0.6">Could not parse molecule</span>
      </div>`;
    }

    layout(atoms, bonds);

    const xs = atoms.map((a) => a.x);
    const ys = atoms.map((a) => a.y);
    const rawW = Math.max(...xs) + 24;
    const rawH = Math.max(...ys) + 24;
    const scale = Math.min((width - 8) / rawW, (height - 8) / rawH, 2.2);
    const offX = (width - rawW * scale) / 2;
    const offY = (height - rawH * scale) / 2;

    const px = (a: Atom) => +(a.x * scale + offX).toFixed(1);
    const py = (a: Atom) => +(a.y * scale + offY).toFixed(1);

    let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" style="background:#000;display:block">`;
    svg += `<defs><filter id="glow"><feGaussianBlur stdDeviation="1.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>`;

    // Render bonds
    for (const b of bonds) {
      const a1 = atoms[b.a];
      const a2 = atoms[b.b];
      const x1 = px(a1);
      const y1 = py(a1);
      const x2 = px(a2);
      const y2 = py(a2);

      const ddx = x2 - x1;
      const ddy = y2 - y1;
      const len = Math.sqrt(ddx * ddx + ddy * ddy) || 1;
      const nx = ddy / len;
      const ny = -ddx / len;
      const baseW = 1.8;
      const colBond = '#2e4a62';

      const sh = 5 * scale;
      const shx = (ddx / len) * sh;
      const shy = (ddy / len) * sh;
      const bx1 = x1 + shx;
      const by1 = y1 + shy;
      const bx2 = x2 - shx;
      const by2 = y2 - shy;

      if (b.o === 1 || b.o === undefined) {
        svg += `<line x1="${bx1}" y1="${by1}" x2="${bx2}" y2="${by2}" stroke="${colBond}" stroke-width="${baseW}" stroke-linecap="round"/>`;
      } else if (b.o === 2) {
        const off = 2.5;
        svg += `<line x1="${(bx1 + nx * off).toFixed(1)}" y1="${(by1 + ny * off).toFixed(1)}" x2="${(bx2 + nx * off).toFixed(1)}" y2="${(by2 + ny * off).toFixed(1)}" stroke="${colBond}" stroke-width="${baseW}" stroke-linecap="round"/>`;
        svg += `<line x1="${(bx1 - nx * off).toFixed(1)}" y1="${(by1 - ny * off).toFixed(1)}" x2="${(bx2 - nx * off).toFixed(1)}" y2="${(by2 - ny * off).toFixed(1)}" stroke="${colBond}" stroke-width="${baseW}" stroke-linecap="round"/>`;
      }
    }

    // Render atoms
    for (const a of atoms) {
      const isC = a.sym === 'C';
      const col = COLORS[a.sym] || '#a0a0a0';
      const x = px(a);
      const y = py(a);

      if (isC) {
        svg += `<circle cx="${x}" cy="${y}" r="2" fill="#4a6a84"/>`;
      } else {
        const fs = Math.max(8, Math.min(13, 11 * Math.min(scale, 1)));
        const cr = fs * 0.78;
        svg += `<circle cx="${x}" cy="${y}" r="${cr.toFixed(1)}" fill="#000" stroke="${col}" stroke-width="1" filter="url(#glow)"/>`;
        svg += `<text x="${x}" y="${(y + fs * 0.36).toFixed(1)}" text-anchor="middle" font-family="monospace" font-size="${fs.toFixed(1)}" font-weight="700" fill="${col}">${a.sym}</text>`;
      }
    }

    svg += '</svg>';
    return svg;
  } catch (e) {
    return `<div style="color:#ff3c5a;font-family:monospace;font-size:0.5rem;text-align:center;padding:20px;line-height:1.6">
      <strong style="font-size:0.6rem">⚠ RENDER ERROR</strong><br>
      <span style="opacity:0.8;font-size:0.42rem">${(e as Error).message}</span>
    </div>`;
  }
}
