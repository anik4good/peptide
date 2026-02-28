# Peptide Dashboard v2 - Stripe-Inspired SaaS Design

**Date:** 2025-02-28
**Design Approach:** Pure Stripe Clone
**Status:** Approved - Ready for Implementation

---

## Overview

Transform the v2 route into a **Stripe-inspired SaaS interface** with:
- Prominent gradients (indigo→violet→purple)
- Card-based layout on light gray surface
- Unified indigo/purple color scheme
- Professional, modern aesthetic

---

## Color Palette

### Base Colors
| Usage | Color | Hex |
|-------|-------|-----|
| Background | Light Gray Surface | `#f8f9fa` |
| Card Background | White | `#ffffff` |
| Border | Subtle | `#e9ecef` |
| Text Primary | Near Black | `#0a0a0a` |
| Text Secondary | Medium Gray | `#6b7280` |

### Accent Gradient
```
Primary: linear-gradient(135deg, #635bff 0%, #7c3aed 50%, #a855f7 100')
Indigo base: #635bff
Violet mid: #7c3aed
Purple accent: #a855f7
```

### Category Colors (Unified)
All categories use indigo/purple spectrum:
- Active filters: `#635bff` background
- Pills: Gradient indigo→violet
- Badges: Solid indigo with opacity

### Shadows
```css
Card: 0 1px 3px rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.08)
Button: 0 2px 8px rgba(99, 91, 255, 0.25)
Modal: 0 25px 50px -12px rgba(0, 0, 0, 0.25)
```

---

## Typography

### Font Stack
```css
/* All text */
font-family: 'Inter', system-ui, sans-serif;

/* Data/code only */
font-family: 'JetBrains Mono', monospace;
```

### Type Scale
| Element | Weight | Size | Letter-spacing | Special |
|---------|--------|------|----------------|---------|
| H1 (Title) | 700 | 2rem | -0.02em | Gradient text |
| H2 (Modal) | 600 | 1.5rem | -0.01em | Dark |
| Section headers | 600 | 0.75rem | 0.06em | Uppercase, gray |
| Table headers | 600 | 0.7rem | 0.05em | Uppercase, gray |
| Table body | 400 | 0.875rem | normal | Dark |
| Buttons | 500 | 0.8rem | 0.02em | Uppercase |
| Data values | 500 | 0.8rem | normal | Monospace |

### Gradient Text Effect
- Main title: Full gradient (indigo→violet→purple)
- Version badge: Gradient
- Category names in filters: Subtle gradient
- Accent text (counts, stats): Gradient

---

## Component Designs

### 1. Header

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│ PEPTIDE ANALYTICA                    v3.0 • Clinical Edition   37 │
│ Research-Grade Peptide Reference Vault                                 │
├─────────────────────────────────────────────────────────────────┤
│ [All] [GH] [Healing] [Fat Loss] [Neuro] [Longevity] [Misc] [🔍]  │
└─────────────────────────────────────────────────────────────────┘
```

**Styling:**
- Background: White card with subtle shadow
- Main title: **Gradient text**
- Subtitle: Gray `#6b7280`
- Version badge: Gradient background, white text
- Count: Gradient text

**Filter Buttons:**
- Inactive: White, gray border, gray text
- Active: **Gradient background**, white text, shadow
- Height: 36px, radius: 8px
- Hover: Lift (`translateY(-1px)`)

**Search Input:**
- White background, gray border
- Focus: Indigo border with shadow glow
- Clean and minimal

---

### 2. Table

**Container:**
- Light gray background (`#f8f9fa`)
- Horizontal scroll with gradient fade on right edge
- Sticky white header

**Row Styling:**
- White background, subtle bottom border
- Hover: **Gradient tint** (indigo 3% opacity)
- Cursor: pointer
- Smooth 0.2s transition

**Header:**
- White with subtle bottom shadow
- Text: Uppercase, 0.7rem, gray
- Sort indicators: Indigo when active
- Sticky: z-index 10

**Column Styling:**
- Peptide name: Bold, gradient text on hover
- Category: **Gradient pill** (indigo→violet, white text)
- Type badge: Gray badge, minimal
- MW: Monospace, gray
- Status:
  - Active: Green gradient badge
  - Deprecated: Gray badge

**Category Column:**
All categories use same gradient pill:
```css
background: linear-gradient(135deg, #635bff, #7c3aed);
color: white;
border-radius: 16px;
box-shadow: 0 2px 8px rgba(99, 91, 255, 0.25);
```

---

### 3. Modal

**Overlay:**
- `rgba(0,0,0,0.4)` + `backdrop-filter: blur(8px)`
- Content: White card, 16px radius, prominent shadow

**Header:**
- **Gradient background** (indigo→violet)
- Title: White, large
- Close button: White with hover opacity

**Grid:**
- Sidebar (280px): Light gray, gradient section headers
- Main: White background

**Stat Cards:**
- White background, subtle border
- **Gradient accent** for each stat
- Monospace values

**Dosing Card:**
- **Gradient border**
- Light green tint background
- Gradient labels

---

### 4. Additional Gradient Accents

- Warning banner: **Gradient left border**
- Scrollbar: Custom with gradient thumb
- Loading states: Gradient shimmer
- Empty state: Gradient illustration placeholder

---

## File Changes

1. **`app/v2/v2.css`** - Complete redesign with Stripe-inspired styling
2. **`app/v2/layout.tsx`** - Update metadata for v3.0
3. **`app/v2/page.tsx`** - May need minor class adjustments

---

## CSS Variables to Add

```css
:root {
  /* Stripe-inspired colors */
  --bg-primary: #ffffff;
  --bg-surface: #f8f9fa;
  --border-color: #e9ecef;
  --text-primary: #0a0a0a;
  --text-secondary: #6b7280;

  /* Gradient accent */
  --gradient-primary: linear-gradient(135deg, #635bff 0%, #7c3aed 50%, #a855f7 100%);
  --gradient-subtle: linear-gradient(135deg, rgba(99, 91, 255, 0.05), rgba(124, 58, 237, 0.05));

  /* Solid colors */
  --color-indigo: #635bff;
  --color-violet: #7c3aed;
  --color-purple: #a855f7;

  /* Shadows */
  --shadow-card: 0 1px 3px rgba(0,0,0,0.05), 0 8px 24px rgba(0,0,0,0.08);
  --shadow-button: 0 2px 8px rgba(99, 91, 255, 0.25);
  --shadow-modal: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
```

---

## Verification Checklist

After implementation:
- [ ] Gradient text visible on title
- [ ] Gradient buttons on active filters
- [ ] All category pills use indigo gradient
- [ ] Table hover has subtle gradient tint
- [ ] Modal header has gradient background
- [ ] Cards have proper shadows
- [ ] Search input has indigo focus ring
- [ ] Scrollbar has gradient thumb
- [ ] 40-column table structure preserved

---

**Design approved:** 2025-02-28
**Approach:** Pure Stripe Clone - Prominent gradients, unified indigo theme
