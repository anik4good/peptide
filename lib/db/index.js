// Database utilities using better-sqlite3
import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import { nanoid } from 'nanoid';

const dbDir = path.join(process.cwd(), 'data');
const dbPath = path.join(dbDir, 'peptide.db');

// Ensure data directory exists
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Create database connection
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Create table with all 40 columns
db.exec(`
  CREATE TABLE IF NOT EXISTS peptides (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    alias TEXT,
    cat TEXT NOT NULL,
    mw REAL NOT NULL DEFAULT 0,
    mech TEXT,
    desc TEXT,
    dose TEXT,
    freq TEXT,
    route TEXT,
    cycle TEXT,
    hl TEXT,
    recon TEXT,
    sides TEXT,
    cancer TEXT,
    safety INTEGER NOT NULL DEFAULT 5,
    status TEXT,
    smiles TEXT DEFAULT '',
    brand TEXT DEFAULT '',
    year TEXT DEFAULT '',
    country TEXT DEFAULT '',
    dev TEXT DEFAULT '',
    aa REAL DEFAULT '',
    receptor TEXT DEFAULT '',
    endo TEXT DEFAULT '',
    recon_solvent TEXT DEFAULT '',
    recon_solvent2 TEXT DEFAULT '',
    recon_vol TEXT DEFAULT '',
    shelf_recon TEXT DEFAULT '',
    shelf_lyoph TEXT DEFAULT '',
    storage_lyoph TEXT DEFAULT '',
    fasting TEXT DEFAULT '',
    hl_num REAL DEFAULT '',
    peak TEXT DEFAULT '',
    water TEXT DEFAULT '',
    hormonal TEXT DEFAULT '',
    desens TEXT DEFAULT '',
    phase TEXT DEFAULT '',
    approved TEXT DEFAULT '',
    trial TEXT DEFAULT '',
    source TEXT DEFAULT '',
    grey TEXT DEFAULT '',
    purpose TEXT DEFAULT '',
    stack TEXT DEFAULT '',
    subj TEXT DEFAULT '',
    notice TEXT DEFAULT '',
    beginner TEXT DEFAULT '',
    also TEXT DEFAULT '',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE INDEX IF NOT EXISTS idx_cat ON peptides(cat);
  CREATE INDEX IF NOT EXISTS idx_name ON peptides(name);
  CREATE INDEX IF NOT EXISTS idx_safety ON peptides(safety);
`);

// Add new columns if they don't exist (for existing databases)
try {
  db.exec(`ALTER TABLE peptides ADD COLUMN brand TEXT DEFAULT ''`);
} catch (e) {}
try {
  db.exec(`ALTER TABLE peptides ADD COLUMN year TEXT DEFAULT ''`);
} catch (e) {}
try {
  db.exec(`ALTER TABLE peptides ADD COLUMN country TEXT DEFAULT ''`);
} catch (e) {}
try {
  db.exec(`ALTER TABLE peptides ADD COLUMN dev TEXT DEFAULT ''`);
} catch (e) {}
try {
  db.exec(`ALTER TABLE peptides ADD COLUMN aa REAL DEFAULT ''`);
} catch (e) {}
try {
  db.exec(`ALTER TABLE peptides ADD COLUMN receptor TEXT DEFAULT ''`);
} catch (e) {}
try {
  db.exec(`ALTER TABLE peptides ADD COLUMN endo TEXT DEFAULT ''`);
} catch (e) {}
try {
  db.exec(`ALTER TABLE peptides ADD COLUMN recon_solvent TEXT DEFAULT ''`);
} catch (e) {}
try {
  db.exec(`ALTER TABLE peptides ADD COLUMN recon_solvent2 TEXT DEFAULT ''`);
} catch (e) {}
try {
  db.exec(`ALTER TABLE peptides ADD COLUMN recon_vol TEXT DEFAULT ''`);
} catch (e) {}
try {
  db.exec(`ALTER TABLE peptides ADD COLUMN shelf_recon TEXT DEFAULT ''`);
} catch (e) {}
try {
  db.exec(`ALTER TABLE peptides ADD COLUMN shelf_lyoph TEXT DEFAULT ''`);
} catch (e) {}
try {
  db.exec(`ALTER TABLE peptides ADD COLUMN storage_lyoph TEXT DEFAULT ''`);
} catch (e) {}
try {
  db.exec(`ALTER TABLE peptides ADD COLUMN fasting TEXT DEFAULT ''`);
} catch (e) {}
try {
  db.exec(`ALTER TABLE peptides ADD COLUMN hl_num REAL DEFAULT ''`);
} catch (e) {}
try {
  db.exec(`ALTER TABLE peptides ADD COLUMN peak TEXT DEFAULT ''`);
} catch (e) {}
try {
  db.exec(`ALTER TABLE peptides ADD COLUMN water TEXT DEFAULT ''`);
} catch (e) {}
try {
  db.exec(`ALTER TABLE peptides ADD COLUMN hormonal TEXT DEFAULT ''`);
} catch (e) {}
try {
  db.exec(`ALTER TABLE peptides ADD COLUMN desens TEXT DEFAULT ''`);
} catch (e) {}
try {
  db.exec(`ALTER TABLE peptides ADD COLUMN phase TEXT DEFAULT ''`);
} catch (e) {}
try {
  db.exec(`ALTER TABLE peptides ADD COLUMN approved TEXT DEFAULT ''`);
} catch (e) {}
try {
  db.exec(`ALTER TABLE peptides ADD COLUMN trial TEXT DEFAULT ''`);
} catch (e) {}
try {
  db.exec(`ALTER TABLE peptides ADD COLUMN source TEXT DEFAULT ''`);
} catch (e) {}
try {
  db.exec(`ALTER TABLE peptides ADD COLUMN grey TEXT DEFAULT ''`);
} catch (e) {}
try {
  db.exec(`ALTER TABLE peptides ADD COLUMN purpose TEXT DEFAULT ''`);
} catch (e) {}
try {
  db.exec(`ALTER TABLE peptides ADD COLUMN stack TEXT DEFAULT ''`);
} catch (e) {}
try {
  db.exec(`ALTER TABLE peptides ADD COLUMN subj TEXT DEFAULT ''`);
} catch (e) {}
try {
  db.exec(`ALTER TABLE peptides ADD COLUMN notice TEXT DEFAULT ''`);
} catch (e) {}
try {
  db.exec(`ALTER TABLE peptides ADD COLUMN beginner TEXT DEFAULT ''`);
} catch (e) {}
try {
  db.exec(`ALTER TABLE peptides ADD COLUMN also TEXT DEFAULT ''`);
} catch (e) {}

// No JSDoc type needed - handled by schema.js

// Database operations
export const dbOps = {
  // Get all peptides
  getAll: () => {
    const stmt = db.prepare('SELECT * FROM peptides ORDER BY name ASC');
    return stmt.all();
  },

  // Get peptide by ID
  getById: (id) => {
    const stmt = db.prepare('SELECT * FROM peptides WHERE id = ?');
    return stmt.get(id);
  },

  // Get peptides by category
  getByCategory: (cat) => {
    const stmt = db.prepare('SELECT * FROM peptides WHERE cat = ? ORDER BY name ASC');
    return stmt.all(cat);
  },

  // Search peptides
  search: (query) => {
    const stmt = db.prepare(`
      SELECT * FROM peptides
      WHERE
        name LIKE ? OR
        alias LIKE ? OR
        cat LIKE ? OR
        mech LIKE ? OR
        desc LIKE ? OR
        status LIKE ?
      ORDER BY name ASC
    `);
    const pattern = `%${query}%`;
    return stmt.all(pattern, pattern, pattern, pattern, pattern, pattern);
  },

  // Create peptide
  create: (peptide) => {
    const id = peptide.id || nanoid();
    const stmt = db.prepare(`
      INSERT INTO peptides (
        id, name, alias, cat, mw, mech, desc, dose, freq, route, cycle,
        hl, recon, sides, cancer, safety, status, smiles
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      id,
      peptide.name,
      peptide.alias || '',
      peptide.cat,
      peptide.mw || 0,
      peptide.mech || '',
      peptide.desc || '',
      peptide.dose || '',
      peptide.freq || '',
      peptide.route || '',
      peptide.cycle || '',
      peptide.hl || '',
      peptide.recon || '',
      peptide.sides || '',
      peptide.cancer || '',
      peptide.safety || 5,
      peptide.status || 'Research',
      peptide.smiles || ''
    );

    return getById(id);
  },

  // Update peptide
  update: (id, peptide) => {
    const fields = [];
    const values = [];

    Object.entries(peptide).forEach(([key, value]) => {
      if (key !== 'id') {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    });

    if (fields.length === 0) return getById(id);

    values.push(id);

    const stmt = db.prepare(`
      UPDATE peptides
      SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    stmt.run(...values);
    return getById(id);
  },

  // Delete peptide
  delete: (id) => {
    const stmt = db.prepare('DELETE FROM peptides WHERE id = ?');
    stmt.run(id);
  },

  // Get statistics
  getStats: () => {
    const totalStmt = db.prepare('SELECT COUNT(*) as count FROM peptides');
    const catStmt = db.prepare('SELECT cat, COUNT(*) as count FROM peptides GROUP BY cat ORDER BY count DESC');

    return {
      total: totalStmt.get().count,
      byCategory: catStmt.all()
    };
  }
};

function getById(id) {
  const stmt = db.prepare('SELECT * FROM peptides WHERE id = ?');
  return stmt.get(id);
}

export default db;
