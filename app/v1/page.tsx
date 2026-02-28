'use client';

import { useEffect, useState } from 'react';
import { CATEGORIES } from '@/lib/db/schema';
import { renderSMILES } from '@/lib/smiles-renderer';

interface Peptide {
  id: string;
  name: string;
  alias: string;
  cat: string;
  mw: number;
  mech: string;
  desc: string;
  dose: string;
  freq: string;
  route: string;
  cycle: string;
  hl: string;
  recon: string;
  sides: string;
  cancer: string;
  safety: number;
  status: string;
  smiles: string;
  // Additional fields from peptide_analytica_v3.html
  brand?: string;
  year?: number | string;
  country?: string;
  dev?: string;
  aa?: number | string;
  receptor?: string;
  endo?: string;
  recon_solvent?: string;
  recon_solvent2?: string;
  recon_vol?: string;
  shelf_recon?: string;
  shelf_lyoph?: string;
  storage_lyoph?: string;
  fasting?: string;
  hl_num?: number | string;
  peak?: string;
  water?: string;
  hormonal?: string;
  desens?: string;
  phase?: string;
  approved?: string;
  trial?: string;
  source?: string;
  grey?: string;
  purpose?: string;
  stack?: string;
  subj?: string;
  notice?: string;
  beginner?: string;
  also?: string[] | string;
}

export default function HomePage() {
  const [peptides, setPeptides] = useState<Peptide[]>([]);
  const [filteredPeptides, setFilteredPeptides] = useState<Peptide[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState<{ total: number; byCategory: any[] }>({ total: 0, byCategory: [] });
  const [selectedPeptide, setSelectedPeptide] = useState<Peptide | null>(null);
  const [molSVG, setMolSVG] = useState<string>('');

  // Fetch peptides on mount
  useEffect(() => {
    fetchPeptides();
    fetchStats();
  }, []);

  // Filter peptides when category or search changes
  useEffect(() => {
    let filtered = peptides;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.cat === selectedCategory);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.alias.toLowerCase().includes(q) ||
        p.cat.toLowerCase().includes(q) ||
        p.mech.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.status.toLowerCase().includes(q)
      );
    }

    setFilteredPeptides(filtered);
  }, [peptides, selectedCategory, searchQuery]);

  const fetchPeptides = async () => {
    try {
      const res = await fetch('/api/peptides');
      const data = await res.json();
      setPeptides(data);
    } catch (error) {
      console.error('Error fetching peptides:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats');
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const openModal = (peptide: Peptide) => {
    setSelectedPeptide(peptide);
    const svg = renderSMILES(peptide.smiles || '', 340, 240);
    setMolSVG(svg);
    document.body.classList.add('modal-open');
  };

  const closeModal = () => {
    setSelectedPeptide(null);
    setMolSVG('');
    document.body.classList.remove('modal-open');
  };

  // Get category class for row styling
  const getCategoryClass = (cat: string) => {
    const catKey = cat.toLowerCase().replace('-', '') as keyof typeof CATEGORIES;
    return `c-${catKey}`;
  };

  // Get status badge class
  const getStatusBadge = (status: string) => {
    if (status.toLowerCase().includes('approved')) {
      if (status.toLowerCase().includes('research')) {
        return <span className="badge b-gy">{status}</span>;
      }
      return <span className="badge b-gr">{status}</span>;
    }
    return <span className="badge b-gy">{status}</span>;
  };

  // Get safety color
  const getSafetyColor = (safety: number) => {
    if (safety >= 8) return 'var(--g2)';
    if (safety >= 5) return 'var(--g0)';
    return 'var(--g3)';
  };

  // Render toxicity pips
  const renderToxPips = (safety: number) => {
    const pips = [];
    for (let i = 0; i < 10; i++) {
      const filled = i < safety;
      pips.push(
        <div
          key={i}
          className="tox-pip"
          style={{
            background: filled ? getSafetyColor(safety) : '#333'
          }}
        />
      );
    }
    return pips;
  };

  // Get reconstitution pills
  const getReconPills = (recon: string) => {
    const pills: JSX.Element[] = [];
    if (recon.includes('BAC')) {
      pills.push(<span key="bac" className="pill pill-bac">BAC</span>);
    }
    if (recon.includes('Sterile Water')) {
      pills.push(<span key="sw" className="pill pill-sw">Sterile Water</span>);
    }
    if (recon.includes('AA') || recon.includes('Ascorbic')) {
      pills.push(<span key="aa" className="pill pill-aa">AA</span>);
    }
    if (recon.includes('PBS')) {
      pills.push(<span key="pbs" className="pill pill-pbs">PBS</span>);
    }
    if (pills.length === 0) {
      return <span className="d">{recon}</span>;
    }
    return pills;
  };

  // Check if requires fasting
  const getFastingIndicator = (route: string) => {
    if (route.toLowerCase().includes('oral') || route.toLowerCase().includes('sublingual')) {
      const hasFasted = route.toLowerCase().includes('fasted') || route.toLowerCase().includes('fasting');
      if (hasFasted) {
        return <span className="fast-yes">YES • Fasted</span>;
      }
      return <span className="fast-rec">REC • w/ Food</span>;
    }
    return null;
  };

  // Get phase badge
  const getPhaseBadge = (phase?: string) => {
    if (!phase) return <span className="badge b-gy">N/A</span>;
    if (phase.includes('FDA Approved') || phase.includes('Approved')) return <span className="badge b-gr">{phase}</span>;
    if (phase.includes('Phase III') || phase.includes('NDA')) return <span className="badge b-te">{phase}</span>;
    if (phase.includes('Phase II')) return <span className="badge b-cy">{phase}</span>;
    if (phase.includes('Phase I')) return <span className="badge b-pu">{phase}</span>;
    return <span className="badge b-gy">{phase}</span>;
  };

  // Get grey market badge
  const getGreyBadge = (grey?: string) => {
    if (!grey) return '—';
    if (grey.startsWith('Yes') || grey.includes('widely')) return <span className="badge b-ye">YES</span>;
    if (grey.startsWith('No')) return <span className="badge b-gr">NO</span>;
    if (grey.includes('Partly') || grey.includes('Some') || grey.includes('limited')) return <span className="badge b-pu">PARTIAL</span>;
    return <span className="badge b-gy">{grey}</span>;
  };

  // Get beginner badge
  const getBeginnerBadge = (beginner?: string) => {
    if (!beginner) return <span className="badge b-re">—</span>;
    if (beginner === 'Yes' || beginner.startsWith('Yes')) return <span className="badge b-gr">YES</span>;
    if (beginner === 'Caution') return <span className="badge b-ye">CAUTION</span>;
    if (beginner === 'No') return <span className="badge b-re">NO</span>;
    return <span className="badge b-re">NEVER</span>;
  };

  // Get water retention class
  const getWaterClass = (water?: string) => {
    if (!water) return '';
    if (water.includes('Very High') || water.includes('High')) return 'cy';
    if (water.includes('Moderate')) return 'mi';
    return 'd';
  };

  // Get hormonal class
  const getHormonalStyle = (hormonal?: string) => {
    if (!hormonal) return { color: 'var(--dim)' };
    if (hormonal.includes('None')) return { color: 'var(--dim)' };
    if (hormonal.includes('significant') || hormonal.includes('HIGH') || hormonal.includes('elevated')) return { color: 'var(--g3)' };
    return { color: '#ffcc00' };
  };

  // Get desensitization class
  const getDesensClass = (desens?: string) => {
    if (!desens) return '';
    if (desens.includes('HIGH') || desens.includes('Very High')) return 're';
    if (desens.includes('Moderate') || desens.includes('Low-Moderate')) return 'mi';
    return 'd';
  };

  // Get cancer class
  const getCancerClass = (cancer?: string) => {
    if (!cancer) return '';
    if (cancer.includes('HIGH') || cancer.includes('ELEVATED') || cancer.includes('Significant')) return 're';
    if (cancer.includes('Moderate') || cancer.includes('Theoretical')) return 'mi';
    return 'd';
  };

  // Get endo color class
  const getEndoClass = (endo?: string) => {
    if (!endo) return 'd';
    if (endo.startsWith('YES')) return 'gr';
    if (endo.startsWith('Analog') || endo.includes('Derived') || endo.includes('Fragment')) return 'go';
    return 'd';
  };

  // Get "also" chips - handle both string (comma-separated) and array formats
  const getAlsoChips = (also?: string[] | string) => {
    if (!also) return <span className="d" style={{ fontSize: '0.55rem' }}>Primary only</span>;

    // Parse string to array if needed
    const alsoArray = typeof also === 'string'
      ? also.split(',').filter(s => s.trim())
      : also;

    if (!alsoArray || !alsoArray.length) return <span className="d" style={{ fontSize: '0.55rem' }}>Primary only</span>;

    return alsoArray.map((a, i) => {
      const catKey = a.toLowerCase().replace('-', '') as keyof typeof CATEGORIES;
      const cat = CATEGORIES[catKey];
      if (!cat) return null;
      return <span key={i} className={`chip chip-${cat.class}`}>{cat.label}</span>;
    });
  };

  return (
    <>
      {/* Header */}
      <header>
        <div className="header-inner">
          <div>
            <h1>
              PEPTIDE <span>ANALYTICA</span>
              <span className="vbadge">v3.0</span>
            </h1>
            <div className="subtitle">
              // Research-Grade Peptide Reference Vault · {stats.total}+ Compounds · Multi-Category · Reconstitution Guide
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

      {/* Warning */}
      <div className="warning-banner">
        ⚠ EDUCATIONAL REFERENCE ONLY — Compiled from published research, clinical trial registries, and peer-reviewed literature. Many listed peptides are unapproved research chemicals. This database is not medical advice. Regulatory status varies by jurisdiction. Consult a licensed physician before any use.
      </div>

      {/* Controls */}
      <div className="controls">
        <div className="fg">
          <button
            className={`btn ${selectedCategory === 'All' ? 'a-all' : ''}`}
            onClick={() => setSelectedCategory('All')}
          >
            All
          </button>
          <button
            className={`btn ${selectedCategory === 'GH-Axis' ? 'a-gh' : ''}`}
            onClick={() => setSelectedCategory('GH-Axis')}
          >
            GH/IGF
          </button>
          <button
            className={`btn ${selectedCategory === 'Healing' ? 'a-heal' : ''}`}
            onClick={() => setSelectedCategory('Healing')}
          >
            Healing
          </button>
          <button
            className={`btn ${selectedCategory === 'Fat-Loss' ? 'a-fat' : ''}`}
            onClick={() => setSelectedCategory('Fat-Loss')}
          >
            Fat Loss
          </button>
          <button
            className={`btn ${selectedCategory === 'Neuro' ? 'a-neuro' : ''}`}
            onClick={() => setSelectedCategory('Neuro')}
          >
            Neuro
          </button>
          <button
            className={`btn ${selectedCategory === 'Longevity' ? 'a-long' : ''}`}
            onClick={() => setSelectedCategory('Longevity')}
          >
            Longevity
          </button>
          <button
            className={`btn ${selectedCategory === 'Misc' ? 'a-misc' : ''}`}
            onClick={() => setSelectedCategory('Misc')}
          >
            Misc
          </button>
          <a href="/admin" className="btn" style={{ textDecoration: 'none' }}>
            + Add New
          </a>
        </div>
        <input
          id="search-input"
          type="text"
          placeholder="Search any field..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th colSpan={7} className="gg0">○ IDENTITY &amp; ORIGIN</th>
              <th colSpan={5} className="gg1" style={{ borderLeft: '2px solid var(--border2)' }}>○ BIOCHEMISTRY</th>
              <th colSpan={6} className="gg2" style={{ borderLeft: '2px solid var(--border2)' }}>○ PREP &amp; RECONSTITUTION</th>
              <th colSpan={6} className="gg5" style={{ borderLeft: '2px solid var(--border2)' }}>○ PHARMACOKINETICS &amp; DOSING</th>
              <th colSpan={6} className="gg3" style={{ borderLeft: '2px solid var(--border2)' }}>○ SAFETY PROFILE</th>
              <th colSpan={5} className="gg4" style={{ borderLeft: '2px solid var(--border2)' }}>○ CLINICAL &amp; REGULATORY</th>
              <th colSpan={5} className="gg6" style={{ borderLeft: '2px solid var(--border2)' }}>○ APPLICATION &amp; EFFECT</th>
            </tr>
            <tr>
              {/* IDENTITY 7 */}
              <th className="sh w">Peptide Name</th>
              <th className="sh">Alias / Trade</th>
              <th className="sh">Brand Name</th>
              <th className="sh">Reg. Status</th>
              <th className="sh">Year</th>
              <th className="sh">Country</th>
              <th className="sh">Also Used For</th>
              {/* BIOCHEMISTRY 5 */}
              <th className="sh gd">AA #</th>
              <th className="sh">MW (Da)</th>
              <th className="sh">Receptor / Target</th>
              <th className="sh">Mechanism</th>
              <th className="sh">Endogenous?</th>
              {/* PREP 6 */}
              <th className="sh gd">Reconstitution Solvent</th>
              <th className="sh">Recon Volume (5mg)</th>
              <th className="sh">Reconstituted Shelf Life</th>
              <th className="sh">Lyophilized Shelf Life</th>
              <th className="sh">Storage (Lyoph.)</th>
              <th className="sh">Fasting Required?</th>
              {/* PK / DOSING 6 */}
              <th className="sh gd">Route(s)</th>
              <th className="sh">Half-Life</th>
              <th className="sh">Peak Onset</th>
              <th className="sh">Dose Range</th>
              <th className="sh">Freq. / Protocol</th>
              <th className="sh">Cycle Length</th>
              {/* SAFETY 6 */}
              <th className="sh gd">Key Side Effects</th>
              <th className="sh">Water Retention</th>
              <th className="sh">Hormonal Impact</th>
              <th className="sh">Desensitization</th>
              <th className="sh">Cancer / Tumor Risk</th>
              <th className="sh">Safety</th>
              {/* CLINICAL 5 */}
              <th className="sh gd">Phase / Status</th>
              <th className="sh">Approved In</th>
              <th className="sh">Human Trial Data</th>
              <th className="sh">Sourcing</th>
              <th className="sh">Grey Market?</th>
              {/* APPLICATION 5 */}
              <th className="sh gd">Primary Purpose</th>
              <th className="sh">Best Stack</th>
              <th className="sh">Subjective Effect</th>
              <th className="sh">Time to Notice</th>
              <th className="sh">Beginner?</th>
            </tr>
          </thead>
          <tbody>
            {filteredPeptides.map((peptide) => (
              <tr
                key={peptide.id}
                className={getCategoryClass(peptide.cat)}
                onClick={() => openModal(peptide)}
              >
                {/* IDENTITY */}
                <td className="w" style={{ borderLeft: '2px solid var(--border2)', fontWeight: 600, minWidth: '130px' }}>
                  {peptide.name}
                </td>
                <td className="d" style={{ fontSize: '0.59rem' }}>{peptide.alias}</td>
                <td style={{ color: '#5a7080', fontSize: '0.58rem', maxWidth: '130px', whiteSpace: 'normal', lineHeight: 1.4 }}>
                  {peptide.brand || '—'}
                </td>
                <td>{getStatusBadge(peptide.status)}</td>
                <td className="mo" style={{ color: '#fff' }}>{peptide.year || '—'}</td>
                <td className="d">{peptide.country || '—'}</td>
                <td style={{ maxWidth: '160px', whiteSpace: 'normal', lineHeight: 1.4 }}>
                  {getAlsoChips(peptide.also)}
                </td>
                {/* BIOCHEMISTRY */}
                <td className="gd cy mo">{peptide.aa || '—'}</td>
                <td className="mo" style={{ color: 'var(--g1)', fontSize: '0.55rem' }}>
                  {peptide.mw > 0 ? peptide.mw.toLocaleString() : '—'}
                </td>
                <td style={{ fontSize: '0.58rem', maxWidth: '160px', whiteSpace: 'normal', lineHeight: 1.4, color: '#7a8f9c' }}>
                  {peptide.receptor || '—'}
                </td>
                <td style={{ fontSize: '0.58rem', maxWidth: '190px', whiteSpace: 'normal', lineHeight: 1.4 }}>
                  {peptide.mech}
                </td>
                <td className={getEndoClass(peptide.endo)} style={{ fontSize: '0.58rem', maxWidth: '130px', whiteSpace: 'normal', lineHeight: 1.4 }}>
                  {peptide.endo || '—'}
                </td>
                {/* PREP */}
                <td className="gd" style={{ minWidth: '130px' }}>
                  {getReconPills(peptide.recon)}
                </td>
                <td style={{ fontSize: '0.58rem', maxWidth: '190px', whiteSpace: 'normal', lineHeight: 1.4, color: '#9ab0bc' }}>
                  {peptide.recon_vol || '—'}
                </td>
                <td className="te mo" style={{ fontSize: '0.6rem' }}>
                  {peptide.shelf_recon || '—'}
                </td>
                <td className="go mo" style={{ fontSize: '0.6rem' }}>
                  {peptide.shelf_lyoph || '—'}
                </td>
                <td className="d" style={{ fontSize: '0.6rem' }}>
                  {peptide.storage_lyoph || '—'}
                </td>
                <td style={{ minWidth: '100px' }}>
                  {peptide.fasting && peptide.fasting !== 'Not required' ?
                    (peptide.fasting.startsWith('REQUIRED') ?
                      <span className="fast-yes">⚠ REQUIRED</span> :
                      <span className="fast-rec">✓ RECOMMENDED</span>) :
                    <span className="fast-no">Not required</span>}
                </td>
                {/* PK / DOSING */}
                <td className="gd" style={{ color: '#fff' }}>{peptide.route}</td>
                <td className="go mo" style={{ fontSize: '0.62rem' }}>{peptide.hl}</td>
                <td className="cy mo" style={{ fontSize: '0.62rem' }}>{peptide.peak || '—'}</td>
                <td className="w mo" style={{ fontWeight: 700, fontSize: '0.62rem' }}>{peptide.dose}</td>
                <td style={{ color: '#fff', fontSize: '0.6rem', maxWidth: '170px', whiteSpace: 'normal', lineHeight: 1.4 }}>
                  {peptide.freq}
                </td>
                <td style={{ fontSize: '0.58rem', maxWidth: '180px', whiteSpace: 'normal', lineHeight: 1.4, color: '#aad0e8' }}>
                  {peptide.cycle}
                </td>
                {/* SAFETY */}
                <td className="gd" style={{ fontSize: '0.58rem', maxWidth: '200px', whiteSpace: 'normal', lineHeight: 1.4 }}>
                  {peptide.sides}
                </td>
                <td className={getWaterClass(peptide.water)}>{peptide.water || '—'}</td>
                <td style={{ fontSize: '0.58rem', maxWidth: '175px', whiteSpace: 'normal', lineHeight: 1.4 }} {...getHormonalStyle(peptide.hormonal)}>
                  {peptide.hormonal || '—'}
                </td>
                <td className={getDesensClass(peptide.desens)} style={{ fontSize: '0.6rem' }}>
                  {peptide.desens || '—'}
                </td>
                <td className={getCancerClass(peptide.cancer)} style={{ fontSize: '0.58rem', maxWidth: '160px', whiteSpace: 'normal', lineHeight: 1.4 }}>
                  {peptide.cancer}
                </td>
                <td>
                  <div className="tox-bar">
                    <div className="tox-pips" style={{ color: getSafetyColor(peptide.safety) }}>
                      {renderToxPips(peptide.safety)}
                    </div>
                  </div>
                </td>
                {/* CLINICAL */}
                <td className="gd">{getPhaseBadge(peptide.phase)}</td>
                <td style={{ fontSize: '0.58rem', maxWidth: '140px', whiteSpace: 'normal', lineHeight: 1.4, color: 'var(--g2)' }}>
                  {peptide.approved || '—'}
                </td>
                <td style={{ fontSize: '0.58rem', maxWidth: '200px', whiteSpace: 'normal', lineHeight: 1.4, color: '#6a8090' }}>
                  {peptide.trial || '—'}
                </td>
                <td style={{ fontSize: '0.58rem', maxWidth: '160px', whiteSpace: 'normal', lineHeight: 1.4, color: '#4a6070' }}>
                  {peptide.source || '—'}
                </td>
                <td>{getGreyBadge(peptide.grey)}</td>
                {/* APPLICATION */}
                <td className="gd cy" style={{ fontWeight: 700, fontSize: '0.62rem', maxWidth: '180px', whiteSpace: 'normal', lineHeight: 1.4 }}>
                  {peptide.purpose || '—'}
                </td>
                <td style={{ fontSize: '0.58rem', maxWidth: '160px', whiteSpace: 'normal', lineHeight: 1.4, color: 'var(--g0)' }}>
                  {peptide.stack || '—'}
                </td>
                <td style={{ fontStyle: 'italic', fontSize: '0.58rem', maxWidth: '190px', whiteSpace: 'normal', lineHeight: 1.4 }}>
                  {peptide.subj || '—'}
                </td>
                <td style={{ fontSize: '0.6rem', color: 'var(--g6)' }}>{peptide.notice || '—'}</td>
                <td>{getBeginnerBadge(peptide.beginner)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedPeptide && (
        <div
          className={`modal-overlay ${selectedPeptide ? 'active' : ''}`}
          onClick={closeModal}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">
                <h2>{selectedPeptide.name}</h2>
                <div className="modal-meta">
                  <span>{selectedPeptide.cat.toUpperCase()}</span>
                  <span>
                    {selectedPeptide.mw > 0
                      ? `MW: ${selectedPeptide.mw.toLocaleString()} Da`
                      : 'MW: —'}
                  </span>
                </div>
              </div>
              <div className="close-btn" onClick={closeModal}>
                ×
              </div>
            </div>

            <div className="modal-grid">
              <div className="modal-sidebar">
                <div className="mol-viz">
                  <div
                    dangerouslySetInnerHTML={{ __html: molSVG }}
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>

                <div className="stat-grid">
                  <div className="stat-card">
                    <div className="stat-label">Safety Score</div>
                    <div
                      className="stat-value"
                      style={{ color: getSafetyColor(selectedPeptide.safety) }}
                    >
                      {selectedPeptide.safety}/10
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-label">Half-Life</div>
                    <div className="stat-value">{selectedPeptide.hl}</div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-label">Reconstitution</div>
                    <div className="stat-value" style={{ fontSize: '0.65rem', color: 'var(--g1)' }}>
                      {selectedPeptide.recon}
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-label">Cancer Risk</div>
                    <div
                      className="stat-value"
                      style={{ fontSize: '0.65rem', color: 'var(--dim)' }}
                    >
                      {selectedPeptide.cancer}
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-main">
                <div className="section-title" style={{ color: 'var(--g6)' }}>
                  // DOSING & ADMINISTRATION
                </div>
                <div className="dosing-card">
                  <div className="dosing-item">
                    <div>ROUTE</div>
                    <div>{selectedPeptide.route}</div>
                  </div>
                  <div className="dosing-item">
                    <div>DOSAGE</div>
                    <div>{selectedPeptide.dose}</div>
                  </div>
                  <div className="dosing-item">
                    <div>FREQUENCY</div>
                    <div>{selectedPeptide.freq}</div>
                  </div>
                  <div className="dosing-item">
                    <div>CYCLE</div>
                    <div>{selectedPeptide.cycle}</div>
                  </div>
                </div>

                <div className="section-title" style={{ color: 'var(--dim)' }}>
                  // CLINICAL PHARMACOLOGY
                </div>
                <div className="description">
                  <strong>{selectedPeptide.mech}</strong>
                  <br />
                  <br />
                  {selectedPeptide.desc}
                </div>

                <div className="section-title" style={{ color: 'var(--g3)' }}>
                  // RISK PROFILE
                </div>
                <div className="description" style={{ color: '#eeb', fontSize: '0.75rem' }}>
                  {selectedPeptide.sides}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
