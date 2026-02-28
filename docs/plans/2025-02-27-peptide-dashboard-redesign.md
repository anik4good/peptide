# Peptide Dashboard Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the dashboard from "hacker terminal" aesthetic to a modern, minimal, premium "Clinical Journal" design with refined typography and subtle color palette.

**Architecture:** Replace existing styling layer (fonts, colors, components) while preserving all functionality. No database or API changes. CSS variables drive the new design system.

**Tech Stack:** Next.js 14.2 (App Router), Tailwind CSS, Google Fonts, React hooks

---

## Task 1: Update Font Imports in Layout

**Files:**
- Modify: `app/layout.tsx`

**Step 1: Replace font imports**

Replace the existing Google Fonts link with Crimson Pro, Inter, and JetBrains Mono:

```tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PEPTIDE ANALYTICA | Bio-Data Vault v3.0',
  description: 'Research-Grade Peptide Reference Vault',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

**Step 2: Verify Docker is running**

Run: `docker ps | grep peptide`
Expected: Container running

**Step 3: Restart container to apply font changes**

Run: `docker-compose restart`

**Step 4: Visual verification**

Open browser to `http://localhost:8012`, open DevTools Console, run:
```js
document.fonts.ready.then(() => {
  console.log('Fonts loaded:', Array.from(document.fonts).map(f => f.family));
});
```
Expected: Console shows Crimson Pro, Inter, JetBrains Mono loaded

---

## Task 2: Replace CSS Variables and Base Styles

**Files:**
- Modify: `app/globals.css`

**Step 1: Replace :root variables**

Replace the entire :root block (lines 5-21) with new color palette:

```css
:root {
  /* Primary Colors */
  --bg-primary: #050505;
  --bg-elevated: #0a0a0a;
  --border-subtle: #1a1a1a;
  --accent-blue: #2563eb;
  --text-primary: #fafafa;
  --text-secondary: #737373;

  /* Category Tints */
  --cat-gh: rgba(251, 191, 36, 0.08);
  --cat-heal: rgba(34, 197, 94, 0.08);
  --cat-fat: rgba(249, 115, 22, 0.08);
  --cat-neuro: rgba(168, 85, 247, 0.08);
  --cat-long: rgba(20, 184, 166, 0.08);
  --cat-misc: rgba(37, 99, 235, 0.08);

  /* Category Text Colors */
  --cat-gh-text: #fbbf24;
  --cat-heal-text: #22c55e;
  --cat-fat-text: #f97316;
  --cat-neuro-text: #a855f7;
  --cat-long-text: #14b8a6;
  --cat-misc-text: #2563eb;

  /* Fonts */
  --font-serif: 'Crimson Pro', Georgia, serif;
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'SF Mono', monospace;
}
```

**Step 2: Remove scanline overlay**

DELETE lines 36-49 (the `body::before` block with scanline CSS)

**Step 3: Update body styles**

Replace lines 29-34:

```css
body {
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--font-sans);
  overflow-x: hidden;
}
```

**Step 4: Update header - remove gradient border**

Replace lines 52-75, delete the `header::after` gradient block:

```css
header {
  padding: 28px 28px 20px;
  border-bottom: 1px solid var(--border-subtle);
  position: relative;
}

/* Delete header::after entirely */
```

---

## Task 3: Update Typography Styles

**Files:**
- Modify: `app/globals.css`

**Step 1: Update h1 (title)**

Replace lines 85-96:

```css
h1 {
  font-family: var(--font-serif);
  font-size: 2rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.1;
  color: var(--text-primary);
}

h1 span {
  color: var(--cat-long-text);
}
```

**Step 2: Update subtitle**

Replace lines 132-139:

```css
.subtitle {
  color: var(--text-secondary);
  font-family: var(--font-sans);
  font-size: 0.65rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-top: 8px;
}
```

---

## Task 4: Remove Legend Bar Styles

**Files:**
- Modify: `app/globals.css`

**Step 1: Delete legend bar styles**

DELETE lines 141-186 (entire `.legend-bar` through `.ldot` block)

---

## Task 5: Update Button Styles

**Files:**
- Modify: `app/globals.css`

**Step 1: Simplify button base**

Replace lines 204-216:

```css
.btn {
  background: transparent;
  border: 1px solid var(--border-subtle);
  color: var(--text-secondary);
  padding: 6px 12px;
  cursor: pointer;
  font-family: var(--font-sans);
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  transition: all 0.15s;
  border-radius: 4px;
}

.btn:hover {
  color: var(--text-primary);
  border-color: var(--text-secondary);
}
```

**Step 2: Update active states**

Replace lines 223-257:

```css
.btn.a-all {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-primary);
  border-color: var(--border-subtle);
}

.btn.a-gh {
  background: var(--cat-gh);
  color: var(--cat-gh-text);
  border-color: transparent;
}

.btn.a-heal {
  background: var(--cat-heal);
  color: var(--cat-heal-text);
  border-color: transparent;
}

.btn.a-fat {
  background: var(--cat-fat);
  color: var(--cat-fat-text);
  border-color: transparent;
}

.btn.a-neuro {
  background: var(--cat-neuro);
  color: var(--cat-neuro-text);
  border-color: transparent;
}

.btn.a-long {
  background: var(--cat-long);
  color: var(--cat-long-text);
  border-color: transparent;
}

.btn.a-misc {
  background: var(--cat-misc);
  color: var(--cat-misc-text);
  border-color: transparent;
}
```

---

## Task 6: Update Search Input

**Files:**
- Modify: `app/globals.css`

**Step 1: Remove search icon**

DELETE lines 259-272 (`.sw` and `.sw::before`)

**Step 2: Update input styles**

Replace lines 274-288:

```css
#search-input {
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  color: var(--text-primary);
  padding: 6px 12px;
  font-family: var(--font-sans);
  font-size: 0.65rem;
  width: 200px;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.15s;
}

#search-input:focus {
  border-color: var(--accent-blue);
}
```

---

## Task 7: Update Table Styles

**Files:**
- Modify: `app/globals.css`

**Step 1: Update table container**

Line 293: `max-height: calc(100vh - 260px);`

**Step 2: Update table base**

Replace lines 297-301:

```css
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.75rem;
  font-family: var(--font-sans);
}
```

**Step 3: Update header background**

Line 310: `background: var(--bg-elevated);`

**Step 4: Update sticky header**

Replace lines 320-338:

```css
th.sh {
  position: sticky;
  background: var(--bg-elevated);
  padding: 8px 12px;
  border-bottom: 1px solid var(--border-subtle);
  font-family: var(--font-sans);
  font-size: 0.625rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--text-secondary);
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  transition: color 0.15s;
}

th.sh:hover {
  color: var(--text-primary);
}
```

**Step 5: Update cells**

Replace lines 340-357:

```css
td {
  padding: 8px 12px;
  border-bottom: 1px solid var(--border-subtle);
  white-space: nowrap;
  vertical-align: middle;
  font-size: 0.75rem;
  color: var(--text-primary);
}

tr {
  transition: background 0.1s;
  cursor: pointer;
}

tr:hover td {
  background: rgba(255, 255, 255, 0.02);
}
```

**Step 6: Update category row tints**

Replace lines 359-382:

```css
tr.c-gh td { background: var(--cat-gh); }
tr.c-heal td { background: var(--cat-heal); }
tr.c-fat td { background: var(--cat-fat); }
tr.c-neuro td { background: var(--cat-neuro); }
tr.c-long td { background: var(--cat-long); }
tr.c-misc td { background: var(--cat-misc); }

tr.c-gh:hover td,
tr.c-heal:hover td,
tr.c-fat:hover td,
tr.c-neuro:hover td,
tr.c-long:hover td,
tr.c-misc:hover td {
  background: rgba(255, 255, 255, 0.03);
}
```

---

## Task 8: Update Pills, Chips, Badges

**Files:**
- Modify: `app/globals.css`

**Step 1: Update pills**

Replace lines 426-453:

```css
.pill {
  display: inline-block;
  padding: 3px 8px;
  border-radius: 12px;
  font-family: var(--font-sans);
  font-size: 0.55rem;
  letter-spacing: 0.02em;
  font-weight: 500;
  margin: 2px;
}

.pill-bac {
  background: rgba(37, 99, 235, 0.12);
  color: var(--cat-misc-text);
}

.pill-sw {
  background: var(--cat-heal);
  color: var(--cat-heal-text);
}

.pill-aa {
  background: var(--cat-fat);
  color: var(--cat-fat-text);
}
```

**Step 2: Update chips**

Replace lines 456-495:

```css
.chip {
  display: inline-block;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: var(--font-sans);
  font-size: 0.55rem;
  letter-spacing: 0.02em;
  margin: 1px;
  font-weight: 500;
}

.chip-gh { background: var(--cat-gh); color: var(--cat-gh-text); }
.chip-heal { background: var(--cat-heal); color: var(--cat-heal-text); }
.chip-fat { background: var(--cat-fat); color: var(--cat-fat-text); }
.chip-neuro { background: var(--cat-neuro); color: var(--cat-neuro-text); }
.chip-long { background: var(--cat-long); color: var(--cat-long-text); }
.chip-misc { background: var(--cat-misc); color: var(--cat-misc-text); }
```

**Step 3: Update badges**

Replace lines 498-530:

```css
.badge {
  display: inline-block;
  padding: 3px 8px;
  border-radius: 4px;
  font-family: var(--font-sans);
  font-size: 0.6rem;
  letter-spacing: 0.02em;
  font-weight: 500;
}

.b-gr {
  background: var(--cat-heal);
  color: var(--cat-heal-text);
  border: 1px solid transparent;
}

.b-ye {
  background: var(--cat-gh);
  color: var(--cat-gh-text);
  border: 1px solid transparent;
}

.b-re {
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
  border: 1px solid transparent;
}

.b-gy {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-secondary);
  border: 1px solid var(--border-subtle);
}
```

---

## Task 9: Update Modal Styles

**Files:**
- Modify: `app/globals.css`

**Step 1: Update overlay**

Replace lines 555-571 (remove backdrop-filter):

```css
.modal-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  z-index: 1000;
  opacity: 0;
  transition: opacity 0.25s;
}

.modal-overlay.active {
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
}
```

**Step 2: Update content**

Replace lines 573-587:

```css
.modal-content {
  width: 95%;
  max-width: 1200px;
  max-height: 90vh;
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  transform: scale(0.98);
  transition: transform 0.3s ease;
  overflow: hidden;
}

.modal-overlay.active .modal-content {
  transform: scale(1);
}
```

**Step 3: Update header**

Replace lines 589-608:

```css
.modal-header {
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-subtle);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.01);
}

.modal-title h2 {
  font-family: var(--font-serif);
  font-size: 1.75rem;
  color: var(--text-primary);
  line-height: 1.1;
  font-weight: 600;
  letter-spacing: -0.01em;
}
```

**Step 4: Update close button**

Replace lines 619-630:

```css
.close-btn {
  font-size: 1.75rem;
  line-height: 1;
  color: var(--text-secondary);
  cursor: pointer;
  transition: color 0.15s;
  padding: 8px;
}

.close-btn:hover {
  color: var(--text-primary);
}
```

**Step 5: Update grid**

Replace lines 632-651:

```css
.modal-grid {
  display: grid;
  grid-template-columns: 300px 1fr;
  max-height: calc(90vh - 100px);
}

.modal-sidebar {
  background: rgba(0, 0, 0, 0.2);
  border-right: 1px solid var(--border-subtle);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
}

.modal-main {
  padding: 28px;
  overflow-y: auto;
}
```

**Step 6: Update sections**

Replace lines 653-668:

```css
.section-title {
  font-family: var(--font-sans);
  font-size: 0.625rem;
  color: var(--text-secondary);
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-weight: 500;
}

.section-title::after {
  content: '';
  height: 1px;
  background: var(--border-subtle);
  flex-grow: 1;
}
```

**Step 7: Update molecule, stats, dosing, description**

Replace lines 671-771 with:

```css
.mol-viz {
  width: 100%;
  height: 220px;
  background: #000;
  border: 1px solid var(--border-subtle);
  border-radius: 6px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mol-viz::after {
  content: '2D_STRUCTURAL_RENDER';
  position: absolute;
  bottom: 8px;
  right: 10px;
  font-family: var(--font-mono);
  font-size: 0.4rem;
  color: var(--text-secondary);
  opacity: 0.5;
}

.stat-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border-subtle);
  padding: 12px;
  border-radius: 4px;
}

.stat-label {
  font-family: var(--font-sans);
  font-size: 0.55rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 6px;
}

.stat-value {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-primary);
  font-weight: 500;
}

.dosing-card {
  background: rgba(34, 197, 94, 0.03);
  border: 1px solid rgba(34, 197, 94, 0.15);
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 20px;
  margin-bottom: 28px;
  border-radius: 6px;
}

.dosing-item > div:first-child {
  font-family: var(--font-sans);
  font-size: 0.55rem;
  color: var(--cat-heal-text);
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.dosing-item > div:last-child {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--text-primary);
  font-weight: 500;
}

.description {
  line-height: 1.8;
  font-size: 0.8rem;
  font-family: var(--font-sans);
  color: #bdcdd9;
  margin-bottom: 24px;
  max-width: 700px;
}

.description strong {
  color: var(--text-primary);
  font-weight: 600;
}
```

---

## Task 10: Update Page Component - Remove Legend Bar

**Files:**
- Modify: `app/page.tsx`

**Step 1: Delete legend bar JSX**

DELETE lines 202-253 (entire `{/* Legend Bar */}` section)

**Step 2: Update header**

Replace lines 177-195 with simplified header:

```tsx
{/* Header */}
<header>
  <div className="header-inner">
    <div>
      <h1>
        PEPTIDE <span>ANALYTICA</span>
        <span className="vbadge">v3.0</span>
      </h1>
      <div className="subtitle">
        Research-Grade Peptide Reference Vault
      </div>
    </div>
    <div className="header-meta">
      <div className="cc" id="compoundCount">
        {stats.total}
      </div>
      <div className="cl">Peptides Indexed</div>
    </div>
  </div>
</header>
```

---

## Task 11: Update Page Component - Search

**Files:**
- Modify: `app/page.tsx`

**Step 1: Remove search wrapper**

Replace lines 304-312, remove the `.sw` div wrapper:

```tsx
<div className="fg">
  {/* buttons remain same */}
</div>
<input
  id="search-input"
  type="text"
  placeholder="Search..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>
```

---

## Task 12: Preserve 40-Column Table Structure

**Files:**
- Modify: `app/page.tsx`

**NOTE:** The table now has 40 columns across 7 sections (IDENTITY, BIOCHEMISTRY, PREP, PK/DOSING, SAFETY, CLINICAL, APPLICATION). We preserve this structure for the comprehensive scientific reference.

**Step 1: Update table header group styling**

Keep the existing 40-column header structure but apply new CSS variables:

```tsx
<thead>
  <tr>
    <th colSpan={7} className="gg0">○ IDENTITY & ORIGIN</th>
    <th colSpan={5} className="gg1" style={{borderLeft: '2px solid var(--border2)'}}>○ BIOCHEMISTRY</th>
    <th colSpan={6} className="gg2" style={{borderLeft: '2px solid var(--border2)'}}>○ PREP & RECONSTITUTION</th>
    <th colSpan={6} className="gg5" style={{borderLeft: '2px solid var(--border2)'}}>○ PHARMACOKINETICS & DOSING</th>
    <th colSpan={6} className="gg3" style={{borderLeft: '2px solid var(--border2)'}}>○ SAFETY PROFILE</th>
    <th colSpan={5} className="gg4" style={{borderLeft: '2px solid var(--border2)'}}>○ CLINICAL & REGULATORY</th>
    <th colSpan={5} className="gg6" style={{borderLeft: '2px solid var(--border2)'}}>○ APPLICATION & EFFECT</th>
  </tr>
  {/* ... existing 40 column headers remain unchanged ... */}
</thead>
```

**Step 2: Preserve table body structure**

Keep the existing 40-column table body rendering. The new CSS styling from Tasks 1-9 will automatically apply the Clinical Journal aesthetic.

---

## Task 13: Update Modal with Extended Fields

**Files:**
- Modify: `app/page.tsx`

**NOTE:** The modal displays all extended fields (brand, year, country, dev, aa, receptor, endo, recon_solvent, recon_solvent2, recon_vol, shelf_recon, shelf_lyoph, storage_lyoph, fasting, hl_num, peak, water, hormonal, desens, phase, approved, trial, source, grey, purpose, stack, subj, notice, beginner, also).

**Step 1: Update modal header with extended metadata**

Replace lines 454-469:

```tsx
<div className="modal-header">
  <div className="modal-title">
    <h2>{selectedPeptide.name}</h2>
    <div className="modal-meta">
      <span>{selectedPeptide.cat.toUpperCase()}</span>
      <span>•</span>
      <span>{selectedPeptide.brand || 'No brand'}</span>
      <span>•</span>
      <span>{selectedPeptide.year || 'Year unknown'}</span>
      <span>•</span>
      <span>
        {selectedPeptide.mw > 0
          ? `MW: ${selectedPeptide.mw.toLocaleString()} Da`
          : 'MW: —'}
      </span>
      <span>•</span>
      <span>AA: {selectedPeptide.aa || '—'}</span>
    </div>
  </div>
  <div className="close-btn" onClick={closeModal}>
    ×
  </div>
</div>
```

**Step 2: Update sidebar with extended stats**

Replace lines 472-509 with extended stat grid:

```tsx
<div className="modal-sidebar">
  <div className="mol-viz">
    <div
      dangerouslySetInnerHTML={{ __html: molSVG }}
      style={{ width: '100%', height: '100%' }}
    />
  </div>

  <div className="section-title">Quick Stats</div>
  <div className="stat-grid">
    <div className="stat-card">
      <div className="stat-label">Safety</div>
      <div className="stat-value" style={{ color: getSafetyColor(selectedPeptide.safety) }}>
        {selectedPeptide.safety}/10
      </div>
    </div>
    <div className="stat-card">
      <div className="stat-label">Half-Life</div>
      <div className="stat-value">{selectedPeptide.hl}</div>
    </div>
    <div className="stat-card">
      <div className="stat-label">Peak</div>
      <div className="stat-value">{selectedPeptide.peak || '—'}</div>
    </div>
    <div className="stat-card">
      <div className="stat-label">Water</div>
      <div className="stat-value">{selectedPeptide.water || '—'}</div>
    </div>
    <div className="stat-card">
      <div className="stat-label">Hormonal</div>
      <div className="stat-value" style={{fontSize: '0.6rem'}}>
        {selectedPeptide.hormonal?.split(' ')[0] || '—'}
      </div>
    </div>
    <div className="stat-card">
      <div className="stat-label">Desens</div>
      <div className="stat-value">{selectedPeptide.desens?.split(' ')[0] || '—'}</div>
    </div>
  </div>

  <div className="section-title">Origin</div>
  <div className="description" style={{fontSize: '0.75rem', lineHeight: 1.6}}>
    <strong>Developer:</strong> {selectedPeptide.dev || '—'}<br/>
    <strong>Country:</strong> {selectedPeptide.country || '—'}<br/>
    <strong>Receptor:</strong> {selectedPeptide.receptor || '—'}
  </div>
</div>
```

**Step 3: Update main content with extended sections**

Replace lines 512-551:

```tsx
<div className="modal-main">
  <div className="section-title">Description</div>
  <div className="description">
    <strong>{selectedPeptide.mech}</strong>
    <br /><br />
    {selectedPeptide.desc}
  </div>

  <div className="section-title">Dosing & Administration</div>
  <div className="dosing-card">
    <div className="dosing-item">
      <div>Route</div>
      <div>{selectedPeptide.route}</div>
    </div>
    <div className="dosing-item">
      <div>Dosage</div>
      <div>{selectedPeptide.dose}</div>
    </div>
    <div className="dosing-item">
      <div>Frequency</div>
      <div>{selectedPeptide.freq}</div>
    </div>
    <div className="dosing-item">
      <div>Cycle</div>
      <div>{selectedPeptide.cycle}</div>
    </div>
  </div>

  <div className="section-title">Reconstitution</div>
  <div className="description" style={{fontSize: '0.75rem'}}>
    <strong>Solvent:</strong> {selectedPeptide.recon_solvent || '—'}
    {selectedPeptide.recon_solvent2 && ` / ${selectedPeptide.recon_solvent2}`}<br/>
    <strong>Volume:</strong> {selectedPeptide.recon_vol || '—'}<br/>
    <strong>Shelf (recon):</strong> {selectedPeptide.shelf_recon || '—'}<br/>
    <strong>Shelf (lyophilized):</strong> {selectedPeptide.shelf_lyoph || '—'}<br/>
    <strong>Storage:</strong> {selectedPeptide.storage_lyoph || '—'}
  </div>

  <div className="section-title">Clinical & Safety</div>
  <div className="description" style={{fontSize: '0.75rem', lineHeight: 1.6}}>
    <strong>Phase:</strong> {getPhaseBadge(selectedPeptide.phase)}<br/>
    <strong>Approved:</strong> {selectedPeptide.approved || '—'}<br/>
    <strong>Sourcing:</strong> {selectedPeptide.source || '—'}<br/>
    <strong>Grey Market:</strong> {getGreyBadge(selectedPeptide.grey)}
  </div>

  <div className="section-title">Application & Effects</div>
  <div className="description" style={{fontSize: '0.75rem', lineHeight: 1.6}}>
    <strong>Purpose:</strong> {selectedPeptide.purpose || '—'}<br/>
    <strong>Stack:</strong> {selectedPeptide.stack || '—'}<br/>
    <strong>Subjective:</strong> {selectedPeptide.subj || '—'}<br/>
    <strong>Time to Notice:</strong> {selectedPeptide.notice || '—'}<br/>
    <strong>Beginner:</strong> {getBeginnerBadge(selectedPeptide.beginner)}
  </div>

  <div className="section-title">Risk Profile</div>
  <div className="description" style={{fontSize: '0.8rem'}}>
    {selectedPeptide.sides}
  </div>
</div>
```

---

## Task 14: Final CSS Polish

**Files:**
- Modify: `app/globals.css`

**Step 1: Update header-inner**

Replace lines 77-83:

```css
.header-inner {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
}
```

**Step 2: Update header-meta**

Replace lines 112-130:

```css
.header-meta {
  text-align: right;
}

.cc {
  font-family: var(--font-serif);
  font-size: 2rem;
  font-weight: 600;
  color: var(--cat-misc-text);
  line-height: 1;
}

.cl {
  font-size: 0.65rem;
  color: var(--text-secondary);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  margin-top: 4px;
}
```

**Step 3: Update vbadge**

Replace lines 98-110:

```css
.vbadge {
  display: inline-block;
  background: rgba(20, 184, 166, 0.1);
  border: 1px solid rgba(20, 184, 166, 0.25);
  color: var(--cat-long-text);
  font-family: var(--font-mono);
  font-size: 0.55rem;
  padding: 3px 8px;
  border-radius: 3px;
  margin-left: 8px;
  letter-spacing: 0.02em;
}
```

**Step 4: Update controls**

Replace lines 188-196:

```css
.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 28px;
  border-bottom: 1px solid var(--border-subtle);
  gap: 12px;
  flex-wrap: wrap;
}
```

**Step 5: Update warning**

Replace lines 809-815:

```css
.warning-banner {
  padding: 10px 28px;
  border-bottom: 1px solid var(--border-subtle);
  font-family: var(--font-sans);
  font-size: 0.6rem;
  color: var(--text-secondary);
  line-height: 1.5;
}
```

**Step 6: Update animation**

Replace lines 793-806:

```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

tbody tr {
  animation: fadeIn 0.2s ease both;
}
```

---

## Task 15: Final Verification

**Step 1: Rebuild and restart**

```bash
docker-compose down
docker-compose up -d --build
```

**Step 2: Check logs**

```bash
docker-compose logs -f --tail=20
```

Expected: "Ready on http://localhost:3000" (internal) or access via http://localhost:8012

**Step 3: Visual checklist**

Open `http://localhost:8012` and verify:

- [ ] No scanline overlay
- [ ] No gradient borders
- [ ] Crimson Pro headings visible
- [ ] Inter body text
- [ ] Subtle category row tints
- [ ] Modal opens cleanly
- [ ] Search focuses with blue border
- [ ] All filters work

**Step 4: Console verification**

```js
// In DevTools console:
console.log('Scanlines:', !getComputedStyle(document.body).backgroundImage.includes('repeating-linear-gradient'));
console.log('Fonts:', document.fonts.check('10px "Crimson Pro"'));
console.log('Background:', getComputedStyle(document.body).backgroundColor);
```

---

## Current State (Pre-Redesign)

**Database:** ✓ Complete
- 37 peptides with full 40-column data
- All extended fields populated (brand, year, country, dev, aa, receptor, etc.)
- SQLite database with proper schema

**Table Structure:** ✓ Complete
- 40 columns across 7 sections
- IDENTITY & ORIGIN (7): name, alias, brand, status, year, country, also
- BIOCHEMISTRY (5): aa, mw, receptor, mech, endo
- PREP & RECONSTITUTION (6): recon_solvent, recon_vol, shelf_recon, shelf_lyoph, storage_lyoph, fasting
- PHARMACOKINETICS & DOSING (6): route, hl, peak, dose, freq, cycle
- SAFETY PROFILE (6): sides, water, hormonal, desens, cancer, safety
- CLINICAL & REGULATORY (5): phase, approved, trial, source, grey
- APPLICATION & EFFECT (5): purpose, stack, subj, notice, beginner

**API Routes:** ✓ Complete
- `/api/peptides` - All peptides with extended fields
- `/api/stats` - Category statistics

---

## Summary

**Files to modify:**
- `app/layout.tsx` - Font imports (Crimson Pro, Inter, JetBrains Mono)
- `app/globals.css` - Complete redesign (colors, typography, components)
- `app/page.tsx` - Remove legend bar, apply new modal structure

**Files unchanged:**
- Database (`lib/db/*`) - Already has 40-column schema
- API routes (`app/api/*`) - Already return extended fields
- Table structure - Keep 40 columns

**Estimated time:** 2-3 hours
