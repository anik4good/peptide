// Database seed script
import db from './index.js';
import { INITIAL_PEPTIDES } from './schema.js';

console.log('🌱 Seeding database...');

try {
  // Clear existing data
  db.prepare('DELETE FROM peptides').run();
  console.log('✓ Cleared existing data');

  // Insert initial peptides with all columns
  const insert = db.prepare(`
    INSERT INTO peptides (
      id, name, alias, cat, mw, mech, desc, dose, freq, route, cycle,
      hl, recon, sides, cancer, safety, status, smiles,
      brand, year, country, dev, aa, receptor, endo,
      recon_solvent, recon_solvent2, recon_vol, shelf_recon, shelf_lyoph, storage_lyoph,
      fasting, hl_num, peak, water, hormonal, desens,
      phase, approved, trial, source, grey, purpose, stack, subj, notice, beginner, also
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    )
  `);

  const insertMany = db.transaction((peptides) => {
    for (const peptide of peptides) {
      insert.run(
        peptide.id, peptide.name, peptide.alias, peptide.cat, peptide.mw, peptide.mech, peptide.desc,
        peptide.dose, peptide.freq, peptide.route, peptide.cycle, peptide.hl, peptide.recon,
        peptide.sides, peptide.cancer, peptide.safety, peptide.status, peptide.smiles,
        peptide.brand || '', peptide.year || '', peptide.country || '', peptide.dev || '',
        peptide.aa || '', peptide.receptor || '', peptide.endo || '',
        peptide.recon_solvent || '', peptide.recon_solvent2 || '', peptide.recon_vol || '',
        peptide.shelf_recon || '', peptide.shelf_lyoph || '', peptide.storage_lyoph || '',
        peptide.fasting || '', peptide.hl_num || '', peptide.peak || '',
        peptide.water || '', peptide.hormonal || '', peptide.desens || '',
        peptide.phase || '', peptide.approved || '', peptide.trial || '',
        peptide.source || '', peptide.grey || '', peptide.purpose || '',
        peptide.stack || '', peptide.subj || '', peptide.notice || '',
        peptide.beginner || '', typeof peptide.also === 'string' ? peptide.also : (peptide.also || []).join(',')
      );
    }
  });

  insertMany(INITIAL_PEPTIDES);
  console.log(`✓ Inserted ${INITIAL_PEPTIDES.length} peptides`);

  // Verify
  const countStmt = db.prepare('SELECT COUNT(*) as count FROM peptides');
  const result = countStmt.get();
  console.log(`✓ Total peptides: ${result.count}`);
  console.log('✓ Database seeded successfully!');

  process.exit(0);
} catch (error) {
  console.error('✗ Error seeding database:', error);
  process.exit(1);
}
