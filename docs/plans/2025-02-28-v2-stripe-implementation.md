# Stripe-Inspired v2 Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the v2 route into a Stripe-inspired SaaS interface with prominent indigo→violet→purple gradients, unified color scheme, and card-based layout while preserving the 40-column table structure.

**Architecture:** Complete CSS redesign with gradient theming, unified indigo/purple color palette for all categories, enhanced shadows, and modern card-based styling. No React component changes required - only CSS and metadata updates.

**Tech Stack:** Next.js 15, TypeScript, CSS3 (custom properties, gradients, backdrop-filter), Google Fonts (Inter, JetBrains Mono)

---

## Task 1: Update Layout Metadata for v3.0

**Files:**
- Modify: `/mnt/c/laragon/www/peptide/peptide-nextjs/app/v2/layout.tsx:4-7`

**Step 1: Update metadata title and description**

Edit `/mnt/c/laragon/www/peptide/peptide-nextjs/app/v2/layout.tsx` and update the metadata object to reflect v3.0 Clinical Edition:

```typescript
export const metadata: Metadata = {
  title: 'PEPTIDE ANALYTICA v3.0 | Clinical Edition',
  description: 'Research-Grade Peptide Reference Vault - Stripe-Inspired SaaS Design',
}
```

**Step 2: Verify changes**

Run: `cat /mnt/c/laragon/www/peptide/peptide-nextjs/app/v2/layout.tsx | grep -A 2 "metadata:"`
Expected: Output showing updated title with "v3.0 | Clinical Edition"

**Step 3: Commit**

```bash
cd /mnt/c/laragon/www/peptide/peptide-nextjs
git add app/v2/layout.tsx
git commit -m "feat(v2): update metadata to v3.0 Clinical Edition"
```

---

## Task 2: Add Stripe-Inspired CSS Variables (Base Colors)

**Files:**
- Modify: `/mnt/c/laragon/www/peptide/peptide-nextjs/app/v2/v2.css:4-32`

**Step 1: Replace :root CSS variables**

Edit `/mnt/c/laragon/www/peptide/peptide-nextjs/app/v2/v2.css` and replace the existing `:root` block (lines 4-32) with Stripe-inspired color variables:

```css
:root {
  /* Base Colors - Light Gray Surface */
  --bg-primary: #ffffff;
  --bg-surface: #f8f9fa;
  --bg-hover: #f1f3f5;
  --bg-elevated: #f8f9fa;
  --border-color: #e9ecef;
  --border-subtle: #e9ecef;
  --border2: #e9ecef;

  /* Text Colors */
  --text-primary: #0a0a0a;
  --text-secondary: #6b7280;
  --text-muted: #adb5bd;

  /* Gradient Accent - Indigo → Violet → Purple */
  --gradient-primary: linear-gradient(135deg, #635bff 0%, #7c3aed 50%, #a855f7 100%);
  --gradient-subtle: linear-gradient(135deg, rgba(99, 91, 255, 0.05), rgba(124, 58, 237, 0.05));
  --gradient-hover: linear-gradient(135deg, rgba(99, 91, 255, 0.08), rgba(124, 58, 237, 0.08));

  /* Solid Colors - Unified Indigo/Purple */
  --color-indigo: #635bff;
  --color-violet: #7c3aed;
  --color-purple: #a855f7;

  /* Category Colors - ALL Indigo/Purple (Unified) */
  --cat-gh: #7c3aed;
  --cat-heal: #8b5cf6;
  --cat-fat: #a78bfa;
  --cat-neuro: #8b5cf6;
  --cat-long: #a855f7;
  --cat-misc: #7c3aed;

  /* Status Colors */
  --status-green: #10b981;
  --status-yellow: #f59e0b;
  --status-red: #ef4444;
  --status-gray: #6b7280;

  /* Fonts */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'SF Mono', monospace;

  /* Shadows - Stripe-Style */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 1px 3px rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.08);
  --shadow-lg: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  --shadow-button: 0 2px 8px rgba(99, 91, 255, 0.25);
  --shadow-card: 0 1px 3px rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.08);
}
```

**Step 2: Verify changes**

Run: `head -60 /mnt/c/laragon/www/peptide/peptide-nextjs/app/v2/v2.css | grep -A 5 "gradient-primary"`
Expected: Should see `--gradient-primary: linear-gradient(135deg, #635bff 0%, #7c3aed 50%, #a855f7 100%);`

**Step 3: Commit**

```bash
cd /mnt/c/laragon/www/peptide/peptide-nextjs
git add app/v2/v2.css
git commit -m "feat(v2): add Stripe-inspired CSS variables with gradient colors"
```

---

## Task 3: Update Header Styling with Gradient Text

**Files:**
- Modify: `/mnt/c/laragon/www/peptide/peptide-nextjs/app/v2/v2.css:48-116`

**Step 1: Update header and title styles**

Replace the header section (lines 48-116) with gradient-enhanced styles:

```css
/* ==================== HEADER ==================== */

header {
  padding: 24px 32px 20px;
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-subtle);
  box-shadow: var(--shadow-card);
}

.header-inner {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
}

h1 {
  font-family: var(--font-sans);
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.2;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

h1 span {
  font-weight: 700;
}

.vbadge {
  display: inline-block;
  background: var(--gradient-primary);
  border: none;
  color: #ffffff;
  font-family: var(--font-mono);
  font-size: 0.6rem;
  padding: 4px 12px;
  border-radius: 6px;
  margin-left: 12px;
  letter-spacing: 0.02em;
  font-weight: 600;
  box-shadow: var(--shadow-button);
}

.subtitle {
  color: var(--text-secondary);
  font-family: var(--font-sans);
  font-size: 0.75rem;
  margin-top: 6px;
}

.header-meta {
  text-align: right;
}

.cc {
  font-family: var(--font-sans);
  font-size: 2rem;
  font-weight: 700;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}

.cl {
  font-size: 0.7rem;
  color: var(--text-secondary);
  margin-top: 4px;
  font-weight: 500;
}
```

**Step 2: Verify gradient text is applied**

Run: `grep -A 5 "^h1 {" /mnt/c/laragon/www/peptide/peptide-nextjs/app/v2/v2.css | head -10`
Expected: Should see `-webkit-background-clip: text;` and gradient background

**Step 3: Commit**

```bash
cd /mnt/c/laragon/www/peptide/peptide-nextjs
git add app/v2/v2.css
git commit -m "feat(v2): add gradient text effect to header title and count"
```

---

## Task 4: Update Warning Banner with Gradient Accent

**Files:**
- Modify: `/mnt/c/laragon/www/peptide/peptide-nextjs/app/v2/v2.css:118-128`

**Step 1: Add gradient left border to warning banner**

Replace the warning-banner section with:

```css
/* ==================== WARNING BANNER ==================== */

.warning-banner {
  padding: 12px 32px;
  border-bottom: 1px solid var(--border-subtle);
  background: var(--bg-surface);
  font-family: var(--font-sans);
  font-size: 0.75rem;
  color: var(--text-secondary);
  line-height: 1.5;
  border-left: 4px solid;
  border-image: var(--gradient-primary) 1;
}
```

**Step 2: Verify gradient border**

Run: `grep -A 3 ".warning-banner {" /mnt/c/laragon/www/peptide/peptide-nextjs/app/v2/v2.css`
Expected: Should see `border-image: var(--gradient-primary) 1;`

**Step 3: Commit**

```bash
cd /mnt/c/laragon/www/peptide/peptide-nextjs
git add app/v2/v2.css
git commit -m "feat(v2): add gradient left border to warning banner"
```

---

## Task 5: Update Filter Buttons with Unified Gradient Active State

**Files:**
- Modify: `/mnt/c/laragon/www/peptide/peptide-nextjs/app/v2/v2.css:143-210`

**Step 1: Update button base and active styles**

Replace the buttons section (lines 143-210) with unified gradient styling:

```css
/* ==================== CONTROLS ==================== */

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  background: var(--bg-surface);
  border-bottom: 1px solid var(--border-subtle);
  gap: 16px;
  flex-wrap: wrap;
}

.fg {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.btn {
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  padding: 8px 16px;
  cursor: pointer;
  font-family: var(--font-sans);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  font-weight: 500;
  transition: all 0.2s ease;
  border-radius: 8px;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
  color: var(--text-primary);
}

/* Active states - ALL use gradient (unified) */
.btn.a-all,
.btn.a-gh,
.btn.a-heal,
.btn.a-fat,
.btn.a-neuro,
.btn.a-long,
.btn.a-misc {
  background: var(--gradient-primary);
  color: #ffffff;
  border-color: transparent;
  box-shadow: var(--shadow-button);
}

.btn.a-all:hover,
.btn.a-gh:hover,
.btn.a-heal:hover,
.btn.a-fat:hover,
.btn.a-neuro:hover,
.btn.a-long:hover,
.btn.a-misc:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(99, 91, 255, 0.35);
}
```

**Step 2: Verify unified gradient buttons**

Run: `grep -A 4 "\.btn\.a-gh" /mnt/c/laragon/www/peptide/peptide-nextjs/app/v2/v2.css`
Expected: Should see gradient background, white text, no separate colors per category

**Step 3: Commit**

```bash
cd /mnt/c/laragon/www/peptide/peptide-nextjs
git add app/v2/v2.css
git commit -m "feat(v2): unify filter buttons with indigo gradient active state"
```

---

## Task 6: Update Search Input with Indigo Focus Ring

**Files:**
- Modify: `/mnt/c/laragon/www/peptide/peptide-nextjs/app/v2/v2.css:212-234`

**Step 1: Update search input focus styles**

Replace the search section with:

```css
/* ==================== SEARCH ==================== */

#search-input {
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  padding: 10px 14px;
  font-family: var(--font-sans);
  font-size: 0.875rem;
  width: 280px;
  border-radius: 8px;
  outline: none;
  transition: all 0.2s ease;
}

#search-input:focus {
  border-color: var(--color-indigo);
  box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.15), 0 2px 8px rgba(99, 91, 255, 0.1);
}

#search-input::placeholder {
  color: var(--text-muted);
}
```

**Step 2: Verify indigo focus ring**

Run: `grep -A 2 "#search-input:focus" /mnt/c/laragon/www/peptide/peptide-nextjs/app/v2/v2.css`
Expected: Should see indigo focus shadow

**Step 3: Commit**

```bash
cd /mnt/c/laragon/www/peptide/peptide-nextjs
git add app/v2/v2.css
git commit -m "feat(v2): add indigo focus ring to search input"
```

---

## Task 7: Update Table Container and Sticky Header

**Files:**
- Modify: `/mnt/c/laragon/www/peptide/peptide-nextjs/app/v2/v2.css:236-291`

**Step 1: Update table scroll and header styles**

Replace the table container and header section with:

```css
/* ==================== TABLE ==================== */

.table-scroll {
  max-height: calc(100vh - 240px);
  overflow-x: auto;
  background: var(--bg-surface);
  border-bottom: 1px solid var(--border-subtle);
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
  font-family: var(--font-sans);
}

thead tr:first-child th {
  background: var(--bg-primary);
  padding: 12px 16px;
  font-family: var(--font-sans);
  font-size: 0.7rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border-color);
}

/* Category header colors - unified indigo/purple spectrum */
th.gg0 { color: var(--color-indigo); }
th.gg1 { color: var(--color-violet); }
th.gg2 { color: var(--color-purple); }
th.gg3 { color: var(--color-indigo); }
th.gg4 { color: var(--color-violet); }
th.gg5 { color: var(--color-purple); }
th.gg6 { color: var(--color-indigo); }

th.sh {
  position: sticky;
  background: var(--bg-primary);
  top: 0;
  z-index: 10;
  padding: 10px 16px;
  border-bottom: 1px solid var(--border-color);
  font-family: var(--font-sans);
  font-size: 0.7rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--text-secondary);
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  transition: all 0.2s ease;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
}

th.sh:hover {
  background: var(--bg-hover);
  color: var(--color-indigo);
}
```

**Step 2: Verify table styling**

Run: `grep -A 3 "th\.sh {" /mnt/c/laragon/www/peptide/peptide-nextjs/app/v2/v2.css | head -8`
Expected: Should see `top: 0;`, `z-index: 10;`, and shadow

**Step 3: Commit**

```bash
cd /mnt/c/laragon/www/peptide/peptide-nextjs
git add app/v2/v2.css
git commit -m "feat(v2): update table header with sticky positioning and indigo hover"
```

---

## Task 8: Update Table Rows with Gradient Hover Effect

**Files:**
- Modify: `/mnt/c/laragon/www/peptide/peptide-nextjs/app/v2/v2.css:293-326`

**Step 1: Update table cell and row styles**

Replace the tbody/td section with unified gradient hover:

```css
td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--border-subtle);
  white-space: nowrap;
  vertical-align: middle;
  font-size: 0.875rem;
  color: var(--text-primary);
  background: var(--bg-primary);
}

tr {
  transition: all 0.2s ease;
  cursor: pointer;
}

/* Hover: subtle gradient tint */
tr:hover td {
  background: var(--gradient-hover);
}

/* Category row backgrounds - all unified indigo tints */
tr.c-gh td { background: rgba(124, 58, 237, 0.02); }
tr.c-heal td { background: rgba(139, 92, 246, 0.02); }
tr.c-fat td { background: rgba(167, 139, 250, 0.02); }
tr.c-neuro td { background: rgba(139, 92, 246, 0.02); }
tr.c-long td { background: rgba(168, 85, 247, 0.02); }
tr.c-misc td { background: rgba(124, 58, 237, 0.02); }

tr.c-gh:hover td,
tr.c-heal:hover td,
tr.c-fat:hover td,
tr.c-neuro:hover td,
tr.c-long:hover td,
tr.c-misc:hover td {
  background: var(--gradient-hover);
}
```

**Step 2: Verify gradient hover**

Run: `grep "gradient-hover" /mnt/c/laragon/www/peptide/peptide-nextjs/app/v2/v2.css`
Expected: Should see gradient-hover applied to hover states

**Step 3: Commit**

```bash
cd /mnt/c/laragon/www/peptide/peptide-nextjs
git add app/v2/v2.css
git commit -m "feat(v2): add gradient hover effect to table rows"
```

---

## Task 9: Update Pills with Unified Gradient Styling

**Files:**
- Modify: `/mnt/c/laragon/www/peptide/peptide-nextjs/app/v2/v2.css:328-367`

**Step 1: Update all pills to use gradient**

Replace the pills section with unified gradient styling:

```css
/* ==================== PILLS ==================== */

.pill {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 16px;
  font-family: var(--font-sans);
  font-size: 0.65rem;
  font-weight: 500;
  margin: 2px;
}

/* All pills use gradient (unified) */
.pill-bac,
.pill-sw,
.pill-aa,
.pill-pbs,
.pill-pre {
  background: var(--gradient-primary);
  color: #ffffff;
  border: none;
  box-shadow: 0 2px 6px rgba(99, 91, 255, 0.2);
}
```

**Step 2: Verify unified gradient pills**

Run: `grep -A 3 "\.pill-bac," /mnt/c/laragon/www/peptide/peptide-nextjs/app/v2/v2.css`
Expected: Should see all pill variants sharing gradient styling

**Step 3: Commit**

```bash
cd /mnt/c/laragon/www/peptide/peptide-nextjs
git add app/v2/v2.css
git commit -m "feat(v2): unify pills with indigo gradient background"
```

---

## Task 10: Update Chips with Unified Indigo Styling

**Files:**
- Modify: `/mnt/c/laragon/www/peptide/peptide-nextjs/app/v2/v2.css:369-409`

**Step 1: Update chips to use indigo spectrum**

Replace the chips section:

```css
/* ==================== CHIPS ==================== */

.chip {
  display: inline-block;
  padding: 3px 8px;
  border-radius: 6px;
  font-family: var(--font-sans);
  font-size: 0.65rem;
  font-weight: 500;
  margin: 1px;
}

/* All chips use indigo/purple spectrum (unified) */
.chip-gh,
.chip-heal,
.chip-fat,
.chip-neuro,
.chip-long,
.chip-misc {
  background: rgba(99, 91, 255, 0.1);
  color: var(--color-indigo);
  border: 1px solid rgba(99, 91, 255, 0.2);
}
```

**Step 2: Verify unified chips**

Run: `grep -A 3 "\.chip-gh," /mnt/c/laragon/www/peptide/peptide-nextjs/app/v2/v2.css`
Expected: Should see all chip variants unified

**Step 3: Commit**

```bash
cd /mnt/c/laragon/www/peptide/peptide-nextjs
git add app/v2/v2.css
git commit -m "feat(v2): unify chips with indigo color scheme"
```

---

## Task 11: Update Badges with Modern Styling

**Files:**
- Modify: `/mnt/c/laragon/www/peptide/peptide-nextjs/app/v2/v2.css:411-462`

**Step 1: Update badge styles**

Replace the badges section with refined styling:

```css
/* ==================== BADGES ==================== */

.badge {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 6px;
  font-family: var(--font-sans);
  font-size: 0.7rem;
  font-weight: 500;
}

.b-gr {
  background: rgba(16, 185, 129, 0.15);
  color: #059669;
  border: 1px solid rgba(16, 185, 129, 0.25);
}

.b-ye {
  background: rgba(245, 158, 11, 0.15);
  color: #d97706;
  border: 1px solid rgba(245, 158, 11, 0.25);
}

.b-cy {
  background: rgba(99, 91, 255, 0.15);
  color: var(--color-indigo);
  border: 1px solid rgba(99, 91, 255, 0.25);
}

.b-te {
  background: rgba(16, 185, 129, 0.15);
  color: #059669;
  border: 1px solid rgba(16, 185, 129, 0.25);
}

.b-pu {
  background: rgba(124, 58, 237, 0.15);
  color: var(--color-violet);
  border: 1px solid rgba(124, 58, 237, 0.25);
}

.b-re {
  background: rgba(239, 68, 68, 0.15);
  color: #dc2626;
  border: 1px solid rgba(239, 68, 68, 0.25);
}

.b-gy {
  background: var(--bg-surface);
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
}
```

**Step 2: Verify badge updates**

Run: `grep "\.b-cy {" /mnt/c/laragon/www/peptide/peptide-nextjs/app/v2/v2.css -A 3`
Expected: Should see indigo-based color

**Step 3: Commit**

```bash
cd /mnt/c/laragon/www/peptide/peptide-nextjs
git add app/v2/v2.css
git commit -m "feat(v2): update badges with refined colors"
```

---

## Task 12: Update Fasting Indicators

**Files:**
- Modify: `/mnt/c/laragon/www/peptide/peptide-nextjs/app/v2/v2.css:464-481`

**Step 1: Update fasting badge styles**

Replace the fasting section:

```css
/* ==================== FASTING BADGES ==================== */

.fast-yes {
  color: #dc2626;
  font-weight: 600;
  font-size: 0.7rem;
}

.fast-rec {
  color: var(--color-indigo);
  font-weight: 500;
  font-size: 0.7rem;
}

.fast-no {
  color: var(--text-secondary);
  font-size: 0.7rem;
}
```

**Step 2: Verify fasting updates**

Run: `grep "\.fast-rec" /mnt/c/laragon/www/peptide/peptide-nextjs/app/v2/v2.css -A 2`
Expected: Should see indigo color

**Step 3: Commit**

```bash
cd /mnt/c/laragon/www/peptide/peptide-nextjs
git add app/v2/v2.css
git commit -m "feat(v2): update fasting indicators with indigo accent"
```

---

## Task 13: Update Text Color Utilities

**Files:**
- Modify: `/mnt/c/laragon/www/peptide/peptide-nextjs/app/v2/v2.css:483-494`

**Step 1: Update text color utility classes**

Replace the text colors section:

```css
/* ==================== TEXT COLORS ==================== */

.w { color: var(--text-primary); }
.d { color: var(--text-secondary); }
.mo { font-family: var(--font-mono); }
.gd { color: var(--text-primary); font-weight: 600; }
.cy { color: var(--color-indigo); }
.te { color: var(--color-violet); }
.go { color: var(--text-secondary); }
.re { color: #dc2626; }
.mi { color: #f59e0b; }
.gr { color: var(--status-green); }
```

**Step 2: Verify text colors**

Run: `grep "\.cy {" /mnt/c/laragon/www/peptide/peptide-nextjs/app/v2/v2.css`
Expected: Should see indigo color

**Step 3: Commit**

```bash
cd /mnt/c/laragon/www/peptide/peptide-nextjs
git add app/v2/v2.css
git commit -m "feat(v2): update text utilities with indigo color scheme"
```

---

## Task 14: Update Toxicity Bar Styling

**Files:**
- Modify: `/mnt/c/laragon/www/peptide/peptide-nextjs/app/v2/v2.css:496-513`

**Step 1: Update toxicity pip styles**

No changes needed - keep as is but ensure neutral gray for empty pips:

```css
/* ==================== TOXICITY BAR ==================== */

.tox-bar {
  display: flex;
  align-items: center;
  gap: 4px;
}

.tox-pips {
  display: flex;
  gap: 2px;
}

.tox-pip {
  width: 3px;
  height: 14px;
  border-radius: 2px;
  background: var(--border-subtle);
}
```

**Step 2: Verify toxicity bar**

Run: `grep -A 3 "\.tox-pip {" /mnt/c/laragon/www/peptide/peptide-nextjs/app/v2/v2.css`
Expected: Should see border-subtle background

**Step 3: Commit (if any changes made)**

```bash
cd /mnt/c/laragon/www/peptide/peptide-nextjs
git add app/v2/v2.css
git commit -m "style(v2): refine toxicity bar styling"
```

---

## Task 15: Update Modal Overlay with Blur

**Files:**
- Modify: `/mnt/c/laragon/www/peptide/peptide-nextjs/app/v2/v2.css:515-533`

**Step 1: Update modal overlay styles**

Replace the modal overlay section:

```css
/* ==================== MODAL ==================== */

.modal-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 1000;
  opacity: 0;
  transition: opacity 0.25s ease;
}

.modal-overlay.active {
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
}
```

**Step 2: Verify modal blur**

Run: `grep "backdrop-filter" /mnt/c/laragon/www/peptide/peptide-nextjs/app/v2/v2.css`
Expected: Should see `backdrop-filter: blur(8px);`

**Step 3: Commit**

```bash
cd /mnt/c/laragon/www/peptide/peptide-nextjs
git add app/v2/v2.css
git commit -m "feat(v2): add backdrop blur to modal overlay"
```

---

## Task 16: Update Modal Content with Card Styling

**Files:**
- Modify: `/mnt/c/laragon/www/peptide/peptide-nextjs/app/v2/v2.css:535-550`

**Step 1: Update modal content styles**

Replace the modal content section:

```css
.modal-content {
  width: 95%;
  max-width: 1100px;
  max-height: 90vh;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-lg);
  transform: scale(0.98);
  transition: transform 0.3s ease;
  overflow: hidden;
  border-radius: 16px;
}

.modal-overlay.active .modal-content {
  transform: scale(1);
}
```

**Step 2: Verify modal radius**

Run: `grep -A 2 "\.modal-content {" /mnt/c/laragon/www/peptide/peptide-nextjs/app/v2/v2.css | tail -3`
Expected: Should see `border-radius: 16px;`

**Step 3: Commit**

```bash
cd /mnt/c/laragon/www/peptide/peptide-nextjs
git add app/v2/v2.css
git commit -m "feat(v2): update modal with rounded card styling"
```

---

## Task 17: Update Modal Header with Gradient Background

**Files:**
- Modify: `/mnt/c/laragon/www/peptide/peptide-nextjs/app/v2/v2.css:552-593`

**Step 1: Update modal header with gradient**

Replace the modal header section:

```css
.modal-header {
  padding: 24px 28px;
  border-bottom: 1px solid transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--gradient-primary);
}

.modal-title h2 {
  font-family: var(--font-sans);
  font-size: 1.5rem;
  color: #ffffff;
  line-height: 1.2;
  font-weight: 600;
}

.modal-meta {
  margin-top: 6px;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.85);
  font-family: var(--font-sans);
}

.modal-meta span {
  margin: 0 6px;
}

.close-btn {
  font-size: 1.5rem;
  line-height: 1;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.15s ease;
  padding: 8px;
  border-radius: 8px;
  opacity: 0.9;
}

.close-btn:hover {
  opacity: 1;
  background: rgba(255, 255, 255, 0.15);
}
```

**Step 2: Verify gradient header**

Run: `grep -A 3 "\.modal-header {" /mnt/c/laragon/www/peptide/peptide-nextjs/app/v2/v2.css`
Expected: Should see gradient background

**Step 3: Commit**

```bash
cd /mnt/c/laragon/www/peptide/peptide-nextjs
git add app/v2/v2.css
git commit -m "feat(v2): add gradient background to modal header"
```

---

## Task 18: Update Modal Grid and Sidebar

**Files:**
- Modify: `/mnt/c/laragon/www/peptide/peptide-nextjs/app/v2/v2.css:595-636`

**Step 1: Update modal grid layout**

Replace the modal grid section:

```css
.modal-grid {
  display: grid;
  grid-template-columns: 280px 1fr;
  max-height: calc(90vh - 120px);
}

.modal-sidebar {
  background: var(--bg-surface);
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
  background: var(--bg-primary);
}

.section-title {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-weight: 600;
}

.section-title::after {
  content: '';
  height: 1px;
  background: var(--border-color);
  flex-grow: 1;
}
```

**Step 2: Verify modal grid**

Run: `grep "grid-template-columns" /mnt/c/laragon/www/peptide/peptide-nextjs/app/v2/v2.css | grep modal`
Expected: Should see `280px 1fr`

**Step 3: Commit**

```bash
cd /mnt/c/laragon/www/peptide/peptide-nextjs
git add app/v2/v2.css
git commit -m "feat(v2): update modal grid layout with proper sidebar width"
```

---

## Task 19: Update Modal Cards with Gradient Accents

**Files:**
- Modify: `/mnt/c/laragon/www/peptide/peptide-nextjs/app/v2/v2.css:638-690`

**Step 1: Update stat cards and molecule viz**

Replace the stat cards and molecule viz sections:

```css
.mol-viz {
  width: 100%;
  height: 200px;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-sm);
}

.mol-viz::after {
  content: '2D_STRUCTURAL_RENDER';
  position: absolute;
  bottom: 8px;
  right: 10px;
  font-family: var(--font-mono);
  font-size: 0.5rem;
  color: var(--text-muted);
  opacity: 0.7;
}

.stat-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.stat-card {
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  padding: 14px;
  border-radius: 10px;
  box-shadow: var(--shadow-sm);
  border-left: 3px solid;
  border-image: var(--gradient-primary) 1;
}

.stat-label {
  font-family: var(--font-sans);
  font-size: 0.65rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 6px;
  font-weight: 500;
}

.stat-value {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-primary);
  font-weight: 500;
}
```

**Step 2: Verify stat card accents**

Run: `grep -A 2 "\.stat-card {" /mnt/c/laragon/www/peptide/peptide-nextjs/app/v2/v2.css | tail -5`
Expected: Should see gradient border-left

**Step 3: Commit**

```bash
cd /mnt/c/laragon/www/peptide/peptide-nextjs
git add app/v2/v2.css
git commit -m "feat(v2): add gradient accents to modal stat cards"
```

---

## Task 20: Update Dosing Card with Gradient Border

**Files:**
- Modify: `/mnt/c/laragon/www/peptide/peptide-nextjs/app/v2/v2.css:692-718`

**Step 1: Update dosing card styling**

Replace the dosing card section:

```css
.dosing-card {
  background: rgba(16, 185, 129, 0.04);
  border: 1px solid transparent;
  border-left: 4px solid;
  border-image: var(--gradient-primary) 1;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 20px;
  margin-bottom: 28px;
  border-radius: 0 12px 12px 0;
  box-shadow: var(--shadow-sm);
}

.dosing-item > div:first-child {
  font-family: var(--font-sans);
  font-size: 0.65rem;
  color: var(--color-indigo);
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-weight: 600;
}

.dosing-item > div:last-child {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--text-primary);
  font-weight: 400;
}
```

**Step 2: Verify dosing card**

Run: `grep -A 3 "\.dosing-card {" /mnt/c/laragon/www/peptide/peptide-nextjs/app/v2/v2.css`
Expected: Should see gradient border-left

**Step 3: Commit**

```bash
cd /mnt/c/laragon/www/peptide/peptide-nextjs
git add app/v2/v2.css
git commit -m "feat(v2): add gradient border to dosing card"
```

---

## Task 21: Update Description Styling

**Files:**
- Modify: `/mnt/c/laragon/www/peptide/peptide-nextjs/app/v2/v2.css:720-732`

**Step 1: Update description styles**

Replace the description section:

```css
.description {
  line-height: 1.7;
  font-size: 0.9rem;
  font-family: var(--font-sans);
  color: var(--text-primary);
  margin-bottom: 24px;
  max-width: 720px;
}

.description strong {
  color: var(--color-indigo);
  font-weight: 600;
}
```

**Step 2: Verify description**

Run: `grep "\.description strong" /mnt/c/laragon/www/peptide/peptide-nextjs/app/v2/v2.css -A 2`
Expected: Should see indigo color

**Step 3: Commit**

```bash
cd /mnt/c/laragon/www/peptide/peptide-nextjs
git add app/v2/v2.css
git commit -m "feat(v2): update description with indigo accent"
```

---

## Task 22: Add Custom Scrollbar with Gradient Thumb

**Files:**
- Modify: `/mnt/c/laragon/www/peptide/peptide-nextjs/app/v2/v2.css` (add after animations section)

**Step 1: Add custom scrollbar styles**

After the animations section (around line 750), add:

```css
/* ==================== CUSTOM SCROLLBAR ==================== */

.table-scroll::-webkit-scrollbar,
.modal-sidebar::-webkit-scrollbar,
.modal-main::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.table-scroll::-webkit-scrollbar-track,
.modal-sidebar::-webkit-scrollbar-track,
.modal-main::-webkit-scrollbar-track {
  background: var(--bg-surface);
  border-radius: 4px;
}

.table-scroll::-webkit-scrollbar-thumb,
.modal-sidebar::-webkit-scrollbar-thumb,
.modal-main::-webkit-scrollbar-thumb {
  background: var(--gradient-primary);
  border-radius: 4px;
}

.table-scroll::-webkit-scrollbar-thumb:hover,
.modal-sidebar::-webkit-scrollbar-thumb:hover,
.modal-main::-webkit-scrollbar-thumb:hover {
  background: var(--color-indigo);
}

/* Firefox scrollbar */
.table-scroll,
.modal-sidebar,
.modal-main {
  scrollbar-width: thin;
  scrollbar-color: var(--color-indigo) var(--bg-surface);
}
```

**Step 2: Verify scrollbar styles**

Run: `grep "webkit-scrollbar-thumb" /mnt/c/laragon/www/peptide/peptide-nextjs/app/v2/v2.css`
Expected: Should see gradient thumb styles

**Step 3: Commit**

```bash
cd /mnt/c/laragon/www/peptide/peptide-nextjs
git add app/v2/v2.css
git commit -m "feat(v2): add custom gradient scrollbar"
```

---

## Task 23: Verify All Gradient Styles Are Applied

**Files:**
- All CSS changes in `/mnt/c/laragon/www/peptide/peptide-nextjs/app/v2/v2.css`

**Step 1: Run comprehensive verification**

Check all gradient applications:

```bash
cd /mnt/c/laragon/www/peptide/peptide-nextjs
echo "=== Checking gradient applications ===" && \
grep -n "gradient" app/v2/v2.css | head -20
```

Expected: Should see gradient-primary used in multiple locations

**Step 2: Check unified category colors**

```bash
echo "=== Checking unified indigo colors ===" && \
grep -n "cat-gh\|cat-heal\|cat-fat\|cat-neuro\|cat-long\|cat-misc" app/v2/v2.css | grep "color:"
```

Expected: All categories should use indigo/purple spectrum (#7c3aed, #8b5cf6, #a78bfa, #a855f7)

**Step 3: Test in browser (manual)**

Run: `npm run dev` (in separate terminal)
Visit: `http://localhost:3000/v2`
Verify:
- [ ] Header title has gradient text
- [ ] Active filter buttons have gradient background
- [ ] All category pills use indigo gradient
- [ ] Table hover shows gradient tint
- [ ] Modal header has gradient background
- [ ] Scrollbar has gradient thumb
- [ ] 40 columns preserved

**Step 4: Final commit if any tweaks needed**

```bash
git add app/v2/v2.css
git commit -m "style(v2): final tweaks to Stripe-inspired design"
```

---

## Task 24: Create Verification Checklist Document

**Files:**
- Create: `/mnt/c/laragon/www/peptide/peptide-nextjs/docs/plans/2025-02-28-v2-stripe-verification.md`

**Step 1: Create verification checklist**

Create the checklist file:

```markdown
# Stripe-Inspired v2 Redesign - Verification Checklist

**Date:** 2025-02-28
**Design Reference:** docs/plans/2025-02-28-stripe-inspired-saas-design.md

---

## Visual Verification

### Header
- [ ] Main title (PEPTIDE ANALYTICA) has gradient text (indigo→violet→purple)
- [ ] Version badge (v3.0) has gradient background with white text
- [ ] Compound count has gradient text
- [ ] Header has card shadow

### Filter Buttons
- [ ] All inactive buttons: white background, gray border
- [ ] Active state: gradient background, white text, shadow
- [ ] Hover: lift effect (-1px translateY)
- [ ] All categories use same gradient (unified indigo)

### Table
- [ ] 40 columns preserved
- [ ] Background is light gray surface (#f8f9fa)
- [ ] Header is sticky with proper z-index
- [ ] Row hover shows gradient tint
- [ ] All category rows use indigo tint (not separate colors)
- [ ] Category header text uses indigo/purple spectrum

### Pills/Chips/Badges
- [ ] Reconstitution pills use gradient background
- [ ] "Also Used For" chips use indigo color
- [ ] Status badges have refined colors
- [ ] No rainbow colors - all indigo/purple based

### Modal
- [ ] Header has gradient background
- [ ] Header text is white
- [ ] Overlay has blur effect
- [ ] Stat cards have gradient left border
- [ ] Dosing card has gradient left border
- [ ] Close button has white color

### Scrollbar
- [ ] Custom scrollbar present
- [ ] Thumb has gradient color
- [ ] Track is light gray

### Color Verification
- [ ] Primary gradient: #635bff → #7c3aed → #a855f7
- [ ] Background: #f8f9fa (light gray surface)
- [ ] Card backgrounds: #ffffff (white)
- [ ] Border: #e9ecef (subtle)
- [ ] Text primary: #0a0a0a
- [ ] Text secondary: #6b7280

---

## Technical Verification

### CSS Variables
- [ ] All variables defined in :root
- [ ] Gradient variables present
- [ ] Shadow variables present
- [ ] Category colors unified to indigo spectrum

### Metadata
- [ ] Title updated to "v3.0 | Clinical Edition"
- [ ] Description mentions Stripe-inspired design

### Structure
- [ ] 40-column table intact
- [ ] No layout breaks
- [ ] Responsive behavior maintained

---

## Browser Testing

Test in:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if on Mac)

Check:
- [ ] Gradients render correctly
- [ ] Hover effects smooth
- [ ] Modal opens/closes properly
- [ ] Scrollbar styling applied
- [ ] Text remains readable

---

## Performance

- [ ] No layout shifts
- [ ] Smooth animations (0.2s transitions)
- [ ] No console errors
- [ ] Fast load times

---

**Verified by:** _____________
**Date:** _____________
**Notes:**
```

**Step 2: Commit checklist**

```bash
cd /mnt/c/laragon/www/peptide/peptide-nextjs
git add docs/plans/2025-02-28-v2-stripe-verification.md
git commit -m "docs(v2): add verification checklist for Stripe-inspired redesign"
```

---

## Implementation Complete

**Summary of Changes:**
1. Updated layout metadata to v3.0 Clinical Edition
2. Added Stripe-inspired CSS variables (gradients, unified indigo theme)
3. Applied gradient text to header title and count
4. Unified all category buttons with gradient active state
5. Updated table with gradient hover effects
6. Unified pills, chips, and badges to indigo/purple spectrum
7. Added gradient modal header
8. Added gradient accents to stat cards and dosing card
9. Added custom gradient scrollbar
10. Preserved 40-column table structure

**Files Modified:**
- `/mnt/c/laragon/www/peptide/peptide-nextjs/app/v2/layout.tsx`
- `/mnt/c/laragon/www/peptide/peptide-nextjs/app/v2/v2.css`

**Files Created:**
- `/mnt/c/laragon/www/peptide/peptide-nextjs/docs/plans/2025-02-28-v2-stripe-verification.md`
