'use client';

import { useState, useEffect } from 'react';
import { CATEGORIES } from '@/lib/db/schema';

interface Peptide {
  id?: string;
  name: string;
  alias?: string;
  cat: string;
  mw?: number;
  mech?: string;
  desc?: string;
  dose?: string;
  freq?: string;
  route?: string;
  cycle?: string;
  hl?: string;
  recon?: string;
  sides?: string;
  cancer?: string;
  safety?: number;
  status?: string;
  smiles?: string;
}

export default function AdminPage() {
  const [peptides, setPeptides] = useState<Peptide[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [formData, setFormData] = useState<Peptide>({
    name: '',
    alias: '',
    cat: 'GH-Axis',
    mw: 0,
    mech: '',
    desc: '',
    dose: '',
    freq: '',
    route: '',
    cycle: '',
    hl: '',
    recon: '',
    sides: '',
    cancer: '',
    safety: 5,
    status: 'Research',
    smiles: ''
  });

  useEffect(() => {
    fetchPeptides();
  }, []);

  const fetchPeptides = async () => {
    try {
      const res = await fetch('/api/peptides');
      const data = await res.json();
      setPeptides(data);
    } catch (error) {
      console.error('Error fetching peptides:', error);
      showMessage('error', 'Failed to load peptides');
    }
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Handle numeric fields
    if (name === 'mw' || name === 'safety') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingId) {
        // Update existing peptide
        const res = await fetch(`/api/peptides/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        if (res.ok) {
          showMessage('success', 'Peptide updated successfully!');
          resetForm();
          fetchPeptides();
        } else {
          showMessage('error', 'Failed to update peptide');
        }
      } else {
        // Create new peptide
        const res = await fetch('/api/peptides', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        if (res.ok) {
          showMessage('success', 'Peptide added successfully!');
          resetForm();
          fetchPeptides();
        } else {
          const error = await res.json();
          showMessage('error', error.error || 'Failed to add peptide');
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      showMessage('error', 'An error occurred');
    }
  };

  const handleEdit = (peptide: Peptide) => {
    setFormData(peptide);
    setEditingId(peptide.id || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this peptide?')) return;

    try {
      const res = await fetch(`/api/peptides/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        showMessage('success', 'Peptide deleted successfully!');
        fetchPeptides();
      } else {
        showMessage('error', 'Failed to delete peptide');
      }
    } catch (error) {
      console.error('Error deleting peptide:', error);
      showMessage('error', 'An error occurred');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      alias: '',
      cat: 'GH-Axis',
      mw: 0,
      mech: '',
      desc: '',
      dose: '',
      freq: '',
      route: '',
      cycle: '',
      hl: '',
      recon: '',
      sides: '',
      cancer: '',
      safety: 5,
      status: 'Research',
      smiles: ''
    });
    setEditingId(null);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: 'var(--sans)' }}>
      {/* Header */}
      <header style={{ marginBottom: '0' }}>
        <div className="header-inner">
          <div>
            <h1>
              PEPTIDE <span>ANALYTICA</span>
              <span className="vbadge">ADMIN</span>
            </h1>
            <div className="subtitle">// Manage Peptide Database · Add · Edit · Delete</div>
          </div>
          <div className="header-meta">
            <a
              href="/"
              style={{
                color: 'var(--g1)',
                textDecoration: 'none',
                fontFamily: 'var(--mono)',
                fontSize: '0.6rem'
              }}
            >
              ← Back to Dashboard
            </a>
          </div>
        </div>
      </header>

      <div style={{ padding: '28px', maxWidth: '1400px', margin: '0 auto' }}>
        {/* Message */}
        {message && (
          <div
            style={{
              padding: '12px 20px',
              marginBottom: '20px',
              borderRadius: '4px',
              border: `1px solid ${message.type === 'success' ? 'var(--g2)' : 'var(--g3)'}`,
              background: message.type === 'success' ? 'rgba(0, 255, 136, 0.1)' : 'rgba(255, 60, 90, 0.1)',
              color: message.type === 'success' ? 'var(--g2)' : 'var(--g3)',
              fontFamily: 'var(--mono)',
              fontSize: '0.55rem'
            }}
          >
            {message.text}
          </div>
        )}

        {/* Form */}
        <div
          style={{
            background: 'var(--card)',
            border: '1px solid var(--border2)',
            borderRadius: '4px',
            padding: '25px',
            marginBottom: '30px'
          }}
        >
          <h2
            style={{
              color: '#fff',
              fontSize: '1.2rem',
              marginBottom: '20px',
              fontWeight: '600'
            }}
          >
            {editingId ? 'Edit Peptide' : 'Add New Peptide'}
          </h2>

          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px',
                marginBottom: '20px'
              }}
            >
              {/* Required Fields */}
              <div>
                <label
                  style={{
                    display: 'block',
                    color: 'var(--dim)',
                    fontSize: '0.5rem',
                    marginBottom: '5px',
                    fontFamily: 'var(--mono)',
                    letterSpacing: '1px'
                  }}
                >
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: 'var(--bg)',
                    border: '1px solid var(--border2)',
                    borderRadius: '3px',
                    color: 'var(--text)',
                    fontSize: '0.6rem'
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    color: 'var(--dim)',
                    fontSize: '0.5rem',
                    marginBottom: '5px',
                    fontFamily: 'var(--mono)',
                    letterSpacing: '1px'
                  }}
                >
                  Category *
                </label>
                <select
                  name="cat"
                  value={formData.cat}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: 'var(--bg)',
                    border: '1px solid var(--border2)',
                    borderRadius: '3px',
                    color: 'var(--text)',
                    fontSize: '0.6rem'
                  }}
                >
                  {Object.entries(CATEGORIES).map(([key, val]) => (
                    <option key={key} value={key}>
                      {val.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    color: 'var(--dim)',
                    fontSize: '0.5rem',
                    marginBottom: '5px',
                    fontFamily: 'var(--mono)',
                    letterSpacing: '1px'
                  }}
                >
                  Aliases
                </label>
                <input
                  type="text"
                  name="alias"
                  value={formData.alias}
                  onChange={handleChange}
                  placeholder="Alternative names, separated by /"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: 'var(--bg)',
                    border: '1px solid var(--border2)',
                    borderRadius: '3px',
                    color: 'var(--text)',
                    fontSize: '0.6rem'
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    color: 'var(--dim)',
                    fontSize: '0.5rem',
                    marginBottom: '5px',
                    fontFamily: 'var(--mono)',
                    letterSpacing: '1px'
                  }}
                >
                  Molecular Weight (Da)
                </label>
                <input
                  type="number"
                  name="mw"
                  value={formData.mw}
                  onChange={handleChange}
                  step="0.1"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: 'var(--bg)',
                    border: '1px solid var(--border2)',
                    borderRadius: '3px',
                    color: 'var(--text)',
                    fontSize: '0.6rem'
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    color: 'var(--dim)',
                    fontSize: '0.5rem',
                    marginBottom: '5px',
                    fontFamily: 'var(--mono)',
                    letterSpacing: '1px'
                  }}
                >
                  Safety Score (1-10)
                </label>
                <input
                  type="number"
                  name="safety"
                  value={formData.safety}
                  onChange={handleChange}
                  min="1"
                  max="10"
                  required
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: 'var(--bg)',
                    border: '1px solid var(--border2)',
                    borderRadius: '3px',
                    color: 'var(--text)',
                    fontSize: '0.6rem'
                  }}
                />
              </div>
            </div>

            {/* Textarea fields */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '20px',
                marginBottom: '20px'
              }}
            >
              <div style={{ gridColumn: '1 / -1' }}>
                <label
                  style={{
                    display: 'block',
                    color: 'var(--dim)',
                    fontSize: '0.5rem',
                    marginBottom: '5px',
                    fontFamily: 'var(--mono)',
                    letterSpacing: '1px'
                  }}
                >
                  Mechanism of Action
                </label>
                <textarea
                  name="mech"
                  value={formData.mech}
                  onChange={handleChange}
                  rows={2}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: 'var(--bg)',
                    border: '1px solid var(--border2)',
                    borderRadius: '3px',
                    color: 'var(--text)',
                    fontSize: '0.6rem',
                    fontFamily: 'var(--mono)',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label
                  style={{
                    display: 'block',
                    color: 'var(--dim)',
                    fontSize: '0.5rem',
                    marginBottom: '5px',
                    fontFamily: 'var(--mono)',
                    letterSpacing: '1px'
                  }}
                >
                  Description
                </label>
                <textarea
                  name="desc"
                  value={formData.desc}
                  onChange={handleChange}
                  rows={4}
                  required
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: 'var(--bg)',
                    border: '1px solid var(--border2)',
                    borderRadius: '3px',
                    color: 'var(--text)',
                    fontSize: '0.6rem',
                    fontFamily: 'var(--mono)',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    color: 'var(--dim)',
                    fontSize: '0.5rem',
                    marginBottom: '5px',
                    fontFamily: 'var(--mono)',
                    letterSpacing: '1px'
                  }}
                >
                  Dosage
                </label>
                <input
                  type="text"
                  name="dose"
                  value={formData.dose}
                  onChange={handleChange}
                  placeholder="e.g., 100–300 mcg"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: 'var(--bg)',
                    border: '1px solid var(--border2)',
                    borderRadius: '3px',
                    color: 'var(--text)',
                    fontSize: '0.6rem'
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    color: 'var(--dim)',
                    fontSize: '0.5rem',
                    marginBottom: '5px',
                    fontFamily: 'var(--mono)',
                    letterSpacing: '1px'
                  }}
                >
                  Frequency
                </label>
                <input
                  type="text"
                  name="freq"
                  value={formData.freq}
                  onChange={handleChange}
                  placeholder="e.g., Daily, 2x Weekly"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: 'var(--bg)',
                    border: '1px solid var(--border2)',
                    borderRadius: '3px',
                    color: 'var(--text)',
                    fontSize: '0.6rem'
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    color: 'var(--dim)',
                    fontSize: '0.5rem',
                    marginBottom: '5px',
                    fontFamily: 'var(--mono)',
                    letterSpacing: '1px'
                  }}
                >
                  Route
                </label>
                <input
                  type="text"
                  name="route"
                  value={formData.route}
                  onChange={handleChange}
                  placeholder="SQ, IM, Oral, etc."
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: 'var(--bg)',
                    border: '1px solid var(--border2)',
                    borderRadius: '3px',
                    color: 'var(--text)',
                    fontSize: '0.6rem'
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    color: 'var(--dim)',
                    fontSize: '0.5rem',
                    marginBottom: '5px',
                    fontFamily: 'var(--mono)',
                    letterSpacing: '1px'
                  }}
                >
                  Cycle Length
                </label>
                <input
                  type="text"
                  name="cycle"
                  value={formData.cycle}
                  onChange={handleChange}
                  placeholder="e.g., 4-6 Weeks, 12 Weeks"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: 'var(--bg)',
                    border: '1px solid var(--border2)',
                    borderRadius: '3px',
                    color: 'var(--text)',
                    fontSize: '0.6rem'
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    color: 'var(--dim)',
                    fontSize: '0.5rem',
                    marginBottom: '5px',
                    fontFamily: 'var(--mono)',
                    letterSpacing: '1px'
                  }}
                >
                  Half-Life
                </label>
                <input
                  type="text"
                  name="hl"
                  value={formData.hl}
                  onChange={handleChange}
                  placeholder="e.g., 2 hrs, 7 Days"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: 'var(--bg)',
                    border: '1px solid var(--border2)',
                    borderRadius: '3px',
                    color: 'var(--text)',
                    fontSize: '0.6rem'
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    color: 'var(--dim)',
                    fontSize: '0.5rem',
                    marginBottom: '5px',
                    fontFamily: 'var(--mono)',
                    letterSpacing: '1px'
                  }}
                >
                  Reconstitution
                </label>
                <input
                  type="text"
                  name="recon"
                  value={formData.recon}
                  onChange={handleChange}
                  placeholder="BAC Water, Sterile Water, etc."
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: 'var(--bg)',
                    border: '1px solid var(--border2)',
                    borderRadius: '3px',
                    color: 'var(--text)',
                    fontSize: '0.6rem'
                  }}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label
                  style={{
                    display: 'block',
                    color: 'var(--dim)',
                    fontSize: '0.5rem',
                    marginBottom: '5px',
                    fontFamily: 'var(--mono)',
                    letterSpacing: '1px'
                  }}
                >
                  Side Effects / Risk Profile
                </label>
                <textarea
                  name="sides"
                  value={formData.sides}
                  onChange={handleChange}
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: 'var(--bg)',
                    border: '1px solid var(--border2)',
                    borderRadius: '3px',
                    color: 'var(--text)',
                    fontSize: '0.6rem',
                    fontFamily: 'var(--mono)',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    color: 'var(--dim)',
                    fontSize: '0.5rem',
                    marginBottom: '5px',
                    fontFamily: 'var(--mono)',
                    letterSpacing: '1px'
                  }}
                >
                  Cancer Risk
                </label>
                <input
                  type="text"
                  name="cancer"
                  value={formData.cancer}
                  onChange={handleChange}
                  placeholder="Risk assessment"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: 'var(--bg)',
                    border: '1px solid var(--border2)',
                    borderRadius: '3px',
                    color: 'var(--text)',
                    fontSize: '0.6rem'
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: 'block',
                    color: 'var(--dim)',
                    fontSize: '0.5rem',
                    marginBottom: '5px',
                    fontFamily: 'var(--mono)',
                    letterSpacing: '1px'
                  }}
                >
                  Regulatory Status
                </label>
                <input
                  type="text"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  placeholder="FDA Approved, Research, Phase X, etc."
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: 'var(--bg)',
                    border: '1px solid var(--border2)',
                    borderRadius: '3px',
                    color: 'var(--text)',
                    fontSize: '0.6rem'
                  }}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label
                  style={{
                    display: 'block',
                    color: 'var(--dim)',
                    fontSize: '0.5rem',
                    marginBottom: '5px',
                    fontFamily: 'var(--mono)',
                    letterSpacing: '1px'
                  }}
                >
                  SMILES Notation
                </label>
                <textarea
                  name="smiles"
                  value={formData.smiles}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Molecular structure notation (leave empty for macromolecules)"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: 'var(--bg)',
                    border: '1px solid var(--border2)',
                    borderRadius: '3px',
                    color: 'var(--text)',
                    fontSize: '0.55rem',
                    fontFamily: 'monospace'
                  }}
                />
                <div style={{ fontSize: '0.4rem', color: 'var(--dim)', marginTop: '3px' }}>
                  SMILES is a chemical notation system for representing molecular structures. Leave empty for large peptides/proteins.
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="submit"
                style={{
                  padding: '8px 20px',
                  background: 'var(--g6)',
                  border: 'none',
                  borderRadius: '3px',
                  color: '#030507',
                  fontFamily: 'var(--mono)',
                  fontSize: '0.6rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.15s'
                }}
              >
                {editingId ? 'Update Peptide' : 'Add Peptide'}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  style={{
                    padding: '8px 20px',
                    background: 'transparent',
                    border: '1px solid var(--border2)',
                    borderRadius: '3px',
                    color: 'var(--text)',
                    fontFamily: 'var(--mono)',
                    fontSize: '0.6rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s'
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Peptide List */}
        <div>
          <h2
            style={{
              color: '#fff',
              fontSize: '1.1rem',
              marginBottom: '15px',
              fontWeight: '600'
            }}
          >
            Existing Peptides ({peptides.length})
          </h2>

          <div
            style={{
              background: 'var(--card)',
              border: '1px solid var(--border2)',
              borderRadius: '4px',
              overflow: 'hidden'
            }}
          >
            {peptides.map((peptide) => (
              <div
                key={peptide.id}
                style={{
                  padding: '12px 15px',
                  borderBottom: '1px solid var(--border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '15px',
                  flexWrap: 'wrap'
                }}
              >
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <div style={{ fontWeight: 600, color: '#fff', fontSize: '0.7rem' }}>
                    {peptide.name}
                  </div>
                  <div style={{ fontSize: '0.5rem', color: 'var(--dim)' }}>
                    {peptide.cat}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => handleEdit(peptide)}
                    style={{
                      padding: '5px 12px',
                      background: 'transparent',
                      border: '1px solid var(--g1)',
                      borderRadius: '3px',
                      color: 'var(--g1)',
                      fontFamily: 'var(--mono)',
                      fontSize: '0.55rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(peptide.id!)}
                    style={{
                      padding: '5px 12px',
                      background: 'transparent',
                      border: '1px solid var(--g3)',
                      borderRadius: '3px',
                      color: 'var(--g3)',
                      fontFamily: 'var(--mono)',
                      fontSize: '0.55rem',
                      cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
