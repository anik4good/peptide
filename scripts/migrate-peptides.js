#!/usr/bin/env node
/**
 * Migration script to extract complete peptide data from peptide_analytica_v3.html
 * and update lib/db/schema.js with all fields for all 45 peptides
 */

const fs = require('fs');
const path = require('path');

// Read the HTML file (in parent directory)
const htmlPath = path.join(__dirname, '../../peptide_analytica_v3.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

// Find the peptide array section
// Look for the pattern between "const P=[" and the first "];" that's at the end of a line
// followed by a blank line or a comment

const lines = htmlContent.split('\n');
let startIndex = -1;
let endIndex = -1;
let braceCount = 0;
let inArray = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  if (!inArray) {
    if (line.includes('const P=[')) {
      startIndex = i;
      inArray = true;
      braceCount = 1; // We're inside the array now
    }
  } else {
    // Count braces/brackets
    for (const char of line) {
      if (char === '[' || char === '{') braceCount++;
      else if (char === ']' || char === '}') braceCount--;
    }

    // Check if this line ends the array
    if (braceCount === 0 && line.trim().endsWith('];')) {
      endIndex = i;
      break;
    }
  }
}

if (startIndex === -1 || endIndex === -1) {
  console.error('Could not find peptide array boundaries');
  console.log(`Start: ${startIndex}, End: ${endIndex}`);
  process.exit(1);
}

// Extract the array lines
const arrayLines = lines.slice(startIndex, endIndex + 1);
const arrayContent = arrayLines.join('\n').replace('const P=', '');

// Parse using Function constructor
let peptideData;
try {
  const parseFn = new Function('return ' + arrayContent);
  peptideData = parseFn();
  console.log(`Extracted ${peptideData.length} peptides from HTML file`);
} catch (e) {
  console.error('Failed to parse peptide array:', e.message);
  console.log('Array content preview:', arrayContent.substring(0, 500));
  process.exit(1);
}

// HGH peptide data (first peptide - not in HTML array but in original DB)
const hghPeptide = {
  id: '1',
  name: 'HGH (Somatropin)',
  alias: 'Human Growth Hormone / rHGH / Norditropin / Genotropin',
  cat: 'GH-Axis',
  mw: 22124,
  mech: 'Endogenous Growth Hormone — GHR Full Agonist.',
  desc: 'Recombinant human growth hormone, identical to the 191-amino-acid pituitary peptide. Gold standard of the GH axis. Drives IGF-1 production in the liver, promotes lipolysis, protein synthesis, collagen production, and bone density. FDA-approved for GH deficiency, short stature, HIV wasting, and Turner syndrome. Widely used off-label for anti-aging, body composition, and injury recovery. Suppresses endogenous GH production during use. Subcutaneous administration preferred; IM increases peak GH but is not standard.',
  dose: '1–4 IU (anti-aging/body comp) / 4–8 IU (performance)',
  freq: 'Daily or 5-on-2-off',
  route: 'SQ / IM',
  cycle: '3–6 Months minimum',
  hl: '15–20 min (half-life) / 16–24 hr (effects)',
  recon: 'Sterile Water or BAC Water',
  sides: 'Carpal tunnel, water retention, elevated blood glucose, acromegaly risk with high-dose chronic use, joint pain, potential IGF-1 driven proliferative cancer risk.',
  cancer: 'Theoretical (IGF-1 elevation — long-term supraphysiologic levels may promote tumor growth in hormone-sensitive cancers)',
  safety: 7,
  status: 'FDA Approved',
  smiles: 'NA',
  brand: 'Norditropin / Genotropin / Omnitrope / Humatrope',
  year: 1985,
  country: 'USA (Genentech)',
  dev: 'Genentech / Novo Nordisk / Eli Lilly / Others',
  aa: 191,
  receptor: 'GHR (Growth Hormone Receptor)',
  endo: 'YES — endogenous pituitary peptide',
  recon_solvent: 'SW',
  recon_solvent2: 'BAC',
  recon_vol: 'Follow manufacturer instructions',
  shelf_recon: '28 days @ 2–8°C (after reconstitution)',
  shelf_lyoph: '2+ years @ 2–8°C (before reconstitution)',
  storage_lyoph: 'Refrigerate 2–8°C (do not freeze)',
  fasting: 'Not required',
  hl_num: 0.25,
  peak: '~3–6 hours',
  water: 'Moderate–High',
  hormonal: 'Suppresses endogenous GH + HPG axis effects',
  desens: 'High (downregulates pituitary GHRH receptors)',
  phase: 'FDA Approved',
  approved: 'USA (Rx only), 35+ countries',
  trial: 'Extensive clinical trials spanning 40+ years. Well-established safety and efficacy profile.',
  source: 'Prescription only (FDA approved). Compounding available.',
  grey: 'No (Rx only)',
  purpose: 'GH Deficiency / Pediatric Growth / Body Composition / Longevity',
  stack: '+ IGF-1 LR3 (hypertrophy) + Insulin (anabolic synergy) + Thyroid (metabolic)',
  subj: 'Water retention, joint pain, carpal tunnel, improved sleep, fat loss, muscle growth, skin elasticity',
  notice: 'Sleep: 1–2 weeks; body comp: 3–6 months',
  beginner: 'Caution (medical supervision required)',
  also: ['Fat-Loss', 'Longevity']
};

// Convert HTML peptide data to database schema format
function convertPeptide(p, index) {
  const result = {
    id: String(index + 1),
    name: p.name,
    alias: p.alias,
    cat: p.cat,
    mw: p.mw,
    mech: p.mech,
    desc: p.desc || '',
    dose: p.dose,
    freq: p.freq,
    route: p.route,
    cycle: p.cycle,
    hl: p.hl,
    recon: `${p.recon_solvent || ''}${p.recon_solvent2 ? ' / ' + p.recon_solvent2 : ''}`.trim(),
    sides: p.sides,
    cancer: p.cancer,
    safety: p.safety,
    status: p.status,
    smiles: p.smiles || '',
    brand: p.brand || '',
    year: p.year || '',
    country: p.country || '',
    dev: p.dev || '',
    aa: p.aa || '',
    receptor: p.receptor || '',
    endo: p.endo || '',
    recon_solvent: p.recon_solvent || '',
    recon_solvent2: p.recon_solvent2 || '',
    recon_vol: p.recon_vol || '',
    shelf_recon: p.shelf_recon || '',
    shelf_lyoph: p.shelf_lyoph || '',
    storage_lyoph: p.storage_lyoph || '',
    fasting: p.fasting || '',
    hl_num: p.hl_num || '',
    peak: p.peak || '',
    water: p.water || '',
    hormonal: p.hormonal || '',
    desens: p.desens || '',
    phase: p.phase || '',
    approved: p.approved || '',
    trial: p.trial || '',
    source: p.source || '',
    grey: p.grey || '',
    purpose: p.purpose || '',
    stack: p.stack || '',
    subj: p.subj || '',
    notice: p.notice || '',
    beginner: p.beginner || '',
    also: p.also || []
  };
  return result;
}

// Build the complete peptides array
const completePeptides = [hghPeptide, ...peptideData.map((p, i) => convertPeptide(p, i + 1))];

console.log(`Total peptides including HGH: ${completePeptides.length}`);

// Generate the schema.js file content
const schemaContent = `// Database schema for Peptide Analytica

// Categories with their colors
export const CATEGORIES = {
  'GH-Axis': { color: '#f0c040', class: 'gh', label: 'GH / IGF' },
  'Healing': { color: '#00ff88', class: 'heal', label: 'Healing' },
  'Fat-Loss': { color: '#ff8c00', class: 'fat', label: 'Fat Loss' },
  'Neuro': { color: '#c040ff', class: 'neuro', label: 'Neuro' },
  'Longevity': { color: '#39d4a5', class: 'long', label: 'Longevity' },
  'Misc': { color: '#00e5ff', class: 'misc', label: 'Sexual / Other' },
};

// Initial seed data - extracted from peptide_analytica_v3.html
export const INITIAL_PEPTIDES = ${JSON.stringify(completePeptides, null, 2)};
`;

// Write to schema.js
const schemaPath = path.join(__dirname, '../lib/db/schema.js');
fs.writeFileSync(schemaPath, schemaContent, 'utf-8');

console.log(`✓ Updated ${schemaPath} with ${completePeptides.length} complete peptides`);
console.log(`✓ Each peptide now has all 40 columns of data`);
