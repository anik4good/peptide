# Peptide Dashboard Redesign - Clean Research Aesthetic

**Date:** 2025-02-28
**Design Approach:** Clean Research Paper
**Status:** To Be Implemented

## Overview & Goals

Transform the dashboard into a **clean, readable, modern research interface**. The new design emphasizes:

- **Excellent readability** - High contrast, light background
- **Professional minimalism** - Clean lines, generous whitespace
- **Modern aesthetic** - Subtle shadows, refined typography
- **Data clarity** - Information hierarchy without visual noise

### What We're Removing (from original design)

- Scanline overlay effect
- Gradient borders and glow effects
- Legend bar with colored dots
- Dark/black background
- Neon accent colors

### What We're Creating

- Light/off-white background
- Dark text for excellent contrast
- Subtle gray borders and dividers
- Muted accent colors
- Card-based layout with soft shadows

---

## Design Principles

1. **Readability first** - High contrast WCAG AA compliant
2. **Whitespace** - Generous padding and margins
3. **Subtle depth** - Soft shadows, no harsh effects
4. **Professional** - Academic paper aesthetic

---

## Color Palette: Clean Research

### Primary Colors

| Usage | Color | Hex | Usage |
|-------|-------|-----|-------|
| Background | White | `#ffffff` | Main container background |
| Card Background | Off-White | `#f8f9fa` | Cards, headers, modal |
| Border | Subtle Gray | `#e9ecef` | Dividers, borders |
| Text Primary | Dark Gray | `#212529` | Headings, primary content |
| Text Secondary | Medium Gray | `#6c757d` | Labels, metadata |
| Accent | Professional Blue | `#0d6efd` | Primary actions, links |
| Hover Background | Light Blue | `#f1f3f5` | Interactive states |

### Category Colors (Muted, Professional)

Each category gets a subtle color for identification:

| Category | Color | Hex |
|----------|-------|-----|
| GH | Warm Gray | `#6c757d` |
| Healing | Sage Green | `#82c91e` |
| Fat Loss | Muted Orange | `#fd7e14` |
| Neuro | Soft Purple | `#6f42c1` |
| Longevity | Teal | `#20c997` |
| Misc | Slate Blue | `#0d6efd` |

---

## Typography: Professional Clean

### Font Stack

```css
/* Headings - Professional Sans */
font-family: 'Inter', system-ui, sans-serif;

/* Body/UI - Clean Sans */
font-family: 'Inter', system-ui, sans-serif;

/* Data/Code - Monospace */
font-family: 'JetBrains Mono', 'SF Mono', monospace;
```

### Type Scale

| Element | Font | Weight | Size | Letter-spacing |
|---------|------|--------|------|----------------|
| H1 (Title) | Inter | 700 | 1.75rem | -0.025em |
| H2 (Modal Title) | Inter | 600 | 1.5rem | -0.01em |
| Section Title | Inter | 600 | 0.75rem | 0.05em uppercase |
| Table Header | Inter | 600 | 0.7rem | 0.05em uppercase |
| Table Body | Inter | 400 | 0.875rem | normal |
| Data Values | JetBrains Mono | 400 | 0.8rem | normal |
| Meta/Labels | Inter | 400 | 0.75rem | normal |

---

## Component Designs

### 1. Header

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│ PEPTIDE ANALYTICA                    v3.0 • Clinical Edition   37   │
│ Research-Grade Peptide Reference Vault                             │
├─────────────────────────────────────────────────────────────────┤
│ [GH] [Healing] [Fat Loss] [Neuro] [Longevity] [Misc]        [🔍]    │
└─────────────────────────────────────────────────────────────────┘
```

**Specifications:**
- Background: `#ffffff` with subtle bottom shadow
- Title in Inter, dark gray `#212529`
- Subtitle in Inter, medium gray `#6c757d`
- Category filter pills (minimal design)
- Search input with soft border

### 2. Data Table

**Layout:**
```
┌──────────────────────────────────────────────────────────────────┐
│ Peptide           Cat   Type     MW        Research      Status   │
├──────────────────────────────────────────────────────────────────┤
│ CJC-1295          GH    Syn      3,368     Muscle growth  Active   │
│ BPC-157           Heal  Syn      1,419.5   Tissue repair  Active   │
│ Ipamorelin         GH    Syn      711.9     GH secretion  Active   │
└──────────────────────────────────────────────────────────────────┘
```

**Specifications:**
- White background with horizontal divider lines
- Header row with light gray background `#f8f9fa`
- Row height: 48px (comfortable reading)
- Hover state: light blue tint `#f1f3f5`
- Category column shows pill
- Status badges with minimal borders

**Column Details:**
1. **Peptide** - Name in Inter semibold, dark
2. **Cat** - Category pill
3. **Type** - Synthetic/Natural in Inter gray
4. **MW** - Molecular weight in JetBrains Mono
5. **Research** - Primary application in Inter
6. **Status** - Badge (Active/Deprecated)

### 3. Detail Modal

**Layout:**
```
┌─────────────────────────────────────────────────────────────────┐
│ BPC-157                         [×]                             [Expand] │
│ Healing • Synthetic • 99.2% Purity                                      │
├─────────────────────────────────────────────────────────────────┤
│ ┌─────────┐ ┌─────────────────────────────────────────────────┐ │
│ │         │ │ Description                                      │ │
│ │  2D     │ │ Body Protection Compound-157 is a pentadecape... │ │
│ │  STRUCT │ │                                                  │ │
│ │         │ │ Dosing Information                               │ │
│ │         │ │ Typical: 250-500mcg • Frequency: 2x daily       │ │
│ │         │ │                                                  │ │
│ │         │ │ Quick Stats                                      │ │
│ │         │ │ MW: 1419.5 • Half-life: ~4 hours                │ │
│ └─────────┘ └─────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

**Specifications:**
- White background with subtle shadow
- 280px sidebar with light gray background `#f8f9fa`
- Main content area with white background
- Close button simple X
- Section headers in uppercase Inter, gray

**Sidebar:**
- 2D structure placeholder
- Quick stats grid (MW, half-life, etc.)
- Section headers in uppercase Inter

**Main Content:**
- Description in paragraph form, Inter, dark gray
- Dosing information in clean grid
- All text `#212529` except labels in `#6c757d`

### 4. Controls & Filters

**Filter Buttons:**
- Minimal outline style
- No background when inactive
- Light gray background when active `#f1f3f5`
- Text in Inter uppercase
- Height: 36px
- Border-radius: 6px

**Search Input:**
- Subtle gray border `#dee2e6`
- White background
- Inter font
- Width: 240px
- Focus: blue border `#0d6efd`
- Border-radius: 6px
- Padding: 8px 12px

---

## Implementation Notes

### File Changes Required

1. **`app/v1/layout.tsx`**
   - Font imports: Inter, JetBrains Mono
   - Basic layout structure

2. **`app/v1/v1.css`**
   - New color palette (light theme)
   - Clean component styles
   - Soft shadows
   - No scanlines or gradients

3. **`app/v1/page.tsx`**
   - No legend bar
   - Updated table structure
   - Simplified modal design

### New CSS Variables

```css
:root {
  /* Colors - Light Theme */
  --bg-primary: #ffffff;
  --bg-elevated: #f8f9fa;
  --bg-hover: #f1f3f5;
  --border-color: #dee2e6;
  --border-subtle: #e9ecef;
  --accent-blue: #0d6efd;
  --text-primary: #212529;
  --text-secondary: #6c757d';
  --text-muted: #adb5bd;

  /* Category colors (muted) */
  --cat-gh: #6c757d;
  --cat-heal: #82c91e;
  --cat-fat: #fd7e14;
  --cat-neuro: #6f42c1;
  --cat-long: #20c997;
  --cat-misc: #0d6efd;

  /* Fonts */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'SF Mono', monospace;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
```

---

## Verification Checklist

After implementation:

- [ ] Background is white/light gray
- [ ] Text is dark with excellent contrast
- [ ] No scanline effects
- [ ] No gradient borders
- [ ] Table rows have comfortable hover states
- [ ] Modal opens smoothly
- [ ] All filters work
- [ ] Search input has blue focus ring
- [ ] Responsive on mobile
- [ ] Color contrast passes WCAG AA standards

---

## Next Steps

1. Update `app/v1/v1.css` with new color palette
2. Rebuild Docker container
3. Verify both routes work:
   - http://localhost:8012 (original)
   - http://localhost:8012/v1 (new clean design)

---

**Design updated:** 2025-02-28
**Approach:** Clean Research Paper - Light theme, excellent readability
**Typography:** Inter + JetBrains Mono
