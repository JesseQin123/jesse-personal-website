---
version: alpha
name: Jesse Qin
description: A personal brand for an AI systems engineer who turns fragmented knowledge into governed context for people and agents.
colors:
  primary: "#FF6815"
  secondary: "#17130F"
  tertiary: "#177A68"
  neutral: "#625B54"
  surface: "#FBF9F5"
  on-surface: "#17130F"
  paper: "#F1ECE4"
  border: "#D8D1C7"
  signal-hover: "#B43A00"
  signal-soft: "#FFF0E8"
  inverse-muted: "#C8C0B7"
typography:
  headline-display:
    fontFamily: Instrument Sans
    fontSize: 72px
    fontWeight: 650
    lineHeight: 0.96
    letterSpacing: -2.2px
  headline-lg:
    fontFamily: Instrument Sans
    fontSize: 52px
    fontWeight: 620
    lineHeight: 1.0
    letterSpacing: -1.4px
  headline-md:
    fontFamily: Newsreader
    fontSize: 38px
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: -0.4px
  body-lg:
    fontFamily: Instrument Sans
    fontSize: 19px
    fontWeight: 420
    lineHeight: 1.55
  body-md:
    fontFamily: Instrument Sans
    fontSize: 16px
    fontWeight: 420
    lineHeight: 1.62
  label-caps:
    fontFamily: Instrument Sans
    fontSize: 12px
    fontWeight: 650
    lineHeight: 1.2
    letterSpacing: 1.4px
rounded:
  sm: 2px
  md: 6px
  lg: 12px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  section: 96px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.secondary}"
    rounded: "{rounded.md}"
    padding: 13px 20px
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 13px 20px
  button-primary-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.secondary}"
    rounded: "{rounded.md}"
    padding: 13px 20px
  text-link:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.signal-hover}"
    rounded: "{rounded.sm}"
    padding: 4px 0
  evidence-ledger:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.neutral}"
    rounded: "{rounded.sm}"
    padding: 16px 0
  annotation:
    backgroundColor: "{colors.signal-soft}"
    textColor: "{colors.secondary}"
    rounded: "{rounded.sm}"
    padding: 4px 8px
  inverse-panel:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.inverse-muted}"
    rounded: "{rounded.sm}"
    padding: 24px
  status-live:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.tertiary}"
    rounded: "{rounded.full}"
    padding: 4px 8px
  structural-rule:
    backgroundColor: "{colors.border}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.sm}"
    height: 1px
taste:
  variance: 7 # auto-inferred, please review — asymmetric editorial composition
  density: 5 # auto-inferred, please review — factual but never dashboard-packed
  art_direction: 8 # auto-inferred, please review — distinctive personal identity
  spacing: 7 # auto-inferred, please review — generous structural whitespace
  imagery_realism: 7 # auto-inferred, please review — documentary photography
  text_density_in_image: 3 # auto-inferred, please review — marks and visuals stay concise
---

# Design System for Jesse Qin

## 1. Visual Theme & Atmosphere

Jesse Qin's brand should feel like a field guide to complex systems: clear enough for an executive to scan, rigorous enough for an engineer to trust, and human enough to remember. The visual world combines editorial confidence with the precision of a system diagram. It is not a generic AI consultancy, a developer-tool clone, or a résumé template.

The core visual idea is **the search lens**. The `Q` in Jesse's `JQ` monogram is also an unmistakable magnifying glass: a black lens with one short orange handle. It communicates information retrieval, investigation, and the ability to find useful structure in complex knowledge without requiring a brand explanation. Orange marks focus. Ink carries the structure. Paper creates room to think.

The emotional register is calm authority with a flash of builder energy. Documentary photography of Jesse and real artifacts provide warmth. Typography does most of the expressive work. Custom diagrams and glyphs replace generic AI icons. Nothing should glow, float, or pretend to be futuristic.

### Brand architecture

- **Master brand:** `Jesse Qin`, represented by a `JQ` search-lens monogram and the full wordmark.
- **Descriptor:** `AI systems · context infrastructure` when a descriptor is useful.
- **Product:** `Jesse AI`, treated as a named product beneath the master brand.
- **Retired as master mark:** `JAI`. It is ambiguous between Jesse's identity and Jesse AI, and reads like a generic AI app acronym.
- **Favicon/avatar:** the `JQ` search-lens mark only; never squeeze the full wordmark into a square.

## 2. Color Palette & Roles

| Token | Hex | Role |
|---|---:|---|
| `primary` | `#FF6815` | Jesse's original orange; active decisions, primary actions, one key phrase |
| `secondary` | `#17130F` | Warm ink; primary type, dark fields, mark structure |
| `tertiary` | `#177A68` | Verified/live status only; never a competing brand color |
| `neutral` | `#625B54` | Supporting copy, captions, metadata |
| `surface` | `#FBF9F5` | Main canvas; warm without looking beige |
| `paper` | `#F1ECE4` | Secondary sections, evidence ledgers, quiet diagrams |
| `border` | `#D8D1C7` | Rules, structural separation, diagram scaffolding |
| `signal-hover` | `#B43A00` | Accessible orange hover/text state on light surfaces |
| `signal-soft` | `#FFF0E8` | Selected annotations and subtle orange fields |
| `inverse-muted` | `#C8C0B7` | Secondary copy on ink surfaces |

### Color behavior

- Aim for 78% surface/paper, 17% ink/neutral, and 5% orange.
- Orange is a narrative signal: the search handle, one CTA, or one active focus.
- Primary orange buttons use ink text, not white text, to maintain contrast.
- Deep orange is reserved for small text on light backgrounds when the vivid orange would fail contrast.
- Teal appears only for a genuinely live, healthy, or verified system state.
- Never color every icon orange. Most supporting graphics are ink; the active focus may be orange.

## 3. Typography Rules

### Families

- **Instrument Sans:** master wordmark companion, hero, navigation, body, UI, tables, and labels. It feels engineered without defaulting to Inter.
- **Newsreader:** selected section theses, pull quotes, reflection, and occasional project titles. It introduces judgment and humanity without making the whole site literary.

### Hierarchy

| Role | Desktop | Mobile | Use |
|---|---:|---:|---|
| Hero display | 64–76px / 0.96 | 38–44px / 1.00 | One decisive statement; maximum four mobile lines |
| Page heading | 48–56px / 1.00 | 34–40px / 1.04 | Case-study and archive titles |
| Editorial thesis | 34–42px / 1.08 | 28–34px / 1.10 | Newsreader; one per major section |
| Section heading | 28–34px / 1.12 | 25–30px / 1.14 | Evidence-led section titles |
| Body lead | 18–20px / 1.55 | 17–18px / 1.55 | 55–70 characters per line |
| Body | 15–17px / 1.62 | 16px / 1.60 | Never shrink for density |
| Label | 11–12px / 1.20 | 12px / 1.20 | Short uppercase English only |

### Principles

- Use weight and line breaks, not gradients, to create drama.
- Pair one sans headline with one restrained Newsreader phrase; do not alternate fonts in every line.
- Keep headings sentence case. Uppercase is for compact labels, never paragraphs.
- Use tabular numerals for dates and telemetry.
- The wordmark is custom geometry; do not approximate it with the body font when the real asset is available.

## 4. Component Stylings

### Logo and wordmark

- The preferred mark is a simple, separately legible `JQ` monogram. The `Q` is a literal magnifying glass: an ink circle with one short orange handle at approximately 4:30.
- The `J` remains a plain geometric letter. It must not merge into the `Q` through a bridge, path, or hidden-symbol construction.
- Use a strong silhouette with no internal ornament so it survives at favicon size.
- The primary mark is two-tone ink and orange. A one-color ink fallback is allowed where color is unavailable.
- The full lockup pairs the mark with `Jesse Qin`; the product lockup reads `Jesse AI by Jesse Qin` rather than `JAI`.
- Clear space equals the width of the magnifying-glass handle. No enclosing rounded-square app tile in the desktop header.

### Supporting visual language

- Do not derive a large icon family from the logo. The mark carries one idea and should stay special.
- Prefer numbered rows, typographic labels, rules, dates, and real project artifacts over decorative category icons.
- When a search or retrieval action genuinely appears, reuse the circular lens and short orange handle at a restrained scale.
- Remove icons when they add no information. Do not replace one generic icon set with another ornamental set.

### Navigation

- Use the horizontal mark + `Jesse Qin` wordmark; remove the orange app-tile treatment.
- 64–72px header, solid surface, one quiet bottom rule. Avoid blur-heavy glass.
- Active state is a short orange underline, not a pill or filled tab.
- Keep one primary action at the far right. Other links remain typographic.

### Buttons and links

- Primary: vivid orange, ink text, 6px radius, no scale-on-hover gimmick.
- Secondary: surface, ink text, one-pixel border, 6px radius.
- Text links: ink with an orange directional notch or underline on hover.
- Do not make every button pill-shaped. Reserve `rounded.full` for status only.

### Evidence and case studies

- Replace repeated card grids with ledgers, split fields, annotated diagrams, and editorial bands.
- Each case gets one identifying visual motif rather than a generic category icon.
- Data labels align to rules; values carry stronger typography.
- Confidentiality notes are quiet metadata, not dominant legal copy.

## 5. Layout Principles

### Composition

- Use a 12-column desktop grid with an intentionally asymmetric 5/7 or 7/5 split.
- Hero: thesis and actions on one side; documentary portrait plus a single context-path overlay on the other.
- Major sections alternate between editorial narrative, evidence ledger, and one art-directed system visual.
- Do not repeat three equal cards. Vary scale: one anchor case, two supporting cases; one lead proof, a supporting ledger.
- Use rules and alignment before containers. A section should not need a rounded box to feel organized.

### Signature page rhythm

1. **Identity:** mark, wordmark, role, New York.
2. **Thesis:** what Jesse changes in a system.
3. **Evidence line:** current role, education, public system proof.
4. **Owned systems:** one large case plus two contrasting supporting cases.
5. **Operating model:** capability paths shown as relationships, not icon cards.
6. **Chronology:** a simple date-led ledger.
7. **Public practice:** GitHub, live AI usage, Jesse AI as three different artifacts—not cloned cards.
8. **Contact:** a decisive ink field with one orange path into the CTA.

### Spacing

- Base scale: 4 / 8 / 16 / 24 / 32 / 48 / 72 / 96px.
- Sections use 80–112px desktop and 56–72px mobile spacing.
- The density belongs inside evidence, not around it. Give every evidence group a clear edge and breathing room.

## 6. Depth & Elevation

- Default depth is flat: type, rules, tonal paper changes, and diagram overlap.
- Standard surface: no shadow, one-pixel border or one tonal step.
- Elevated portrait caption: `0 12px 32px rgba(23, 19, 15, 0.10)`.
- Popovers and Jesse AI panel may use `0 18px 48px rgba(23, 19, 15, 0.14)`.
- Never add shadows to every case, proof item, or capability.
- Use a subtle indexing grid only where it helps align content; it should never become a neural-network illustration.
- Generated imagery should resemble editorial technical documentation or real project artifacts, never a futuristic network cloud.

## 7. Do's and Don'ts

### Do

- Make the `JQ` search-lens mark recognizable at favicon size.
- Let the real portrait and real work carry trust.
- Remove icons that merely repeat a nearby label.
- Give each major section a different composition while preserving the same grid and typographic DNA.
- Treat orange as a focus signal and ink as system structure.
- Make live AI usage look like a real public instrument, not a decorative résumé metric.
- Preserve explicit dates, evidence boundaries, and recruiter scanability.

### Don't

- Do not use `JAI` as the master personal-brand mark.
- Do not use generic Lucide-style briefcases, graduation caps, network nodes, robots, brains, sparkles, or AI orbs as primary brand visuals.
- Do not put every icon inside an orange rounded square.
- Do not use purple/blue neon, cyan glow, gradient blobs, yellow cast, or sci-fi HUD decoration.
- Do not use Inter, pure black, three-equal-card rows, pill buttons, glassmorphism, or scale-on-hover buttons.
- Do not repeat the same rounded card composition for proof, cases, capabilities, writing, and public work.
- Do not turn the logo into a literal brain, robot face, circuit board, infinity mark, speech bubble, or neural-network web.
- Do not add lines, nodes, or paths solely to make the page look technical.
- Do not fabricate metrics, product screens, endorsements, customer logos, or employer visuals.

## 8. Responsive Behavior

- At 1024px and below, reduce the hero split and remove nonessential background notation.
- At 768px and below, stack major splits; image follows the first CTA group.
- At 640px and below, the header uses the mark plus `Jesse Qin`; navigation moves into a full-width menu with typographic rows.
- At 390×844, show identity, H1, one supporting paragraph, and two actions before secondary evidence.
- The mark remains at least 28px on mobile and 32px on desktop; never substitute the full wordmark at favicon scale.
- Custom glyphs scale from 20px to 28px without changing stroke proportion.
- Maintain 44px touch targets and 16px minimum form text.
- Avoid horizontally scrolling cards; ledgers stack label above value.
- Honor `prefers-reduced-motion`; paths may draw only when they communicate navigation or a relationship.

## 9. Agent Prompt Guide

### Brand injection block

> Jesse Qin. Warm paper `#FBF9F5`, structural ink `#17130F`, original Jesse orange `#FF6815`, graphite `#625B54`, and rules `#D8D1C7`. Editorial systems intelligence: calm, rigorous, human, and specific. The signature mark is `JQ`, with the `Q` drawn as a black search lens and one short orange handle. Use documentary realism and restrained technical documentation. No generic AI iconography, rounded app tiles, neural-network webs, brains, robots, sparkles, neon, gradients, fake metrics, or repeated card grids.

### For: `30x-image generate logo`

Create an original identity system for the master brand `Jesse Qin`, not for a generic AI product. The primary mark is a minimal, immediately legible `JQ` monogram. The `J` is a plain black geometric letter. The `Q` is unmistakably a magnifying glass: a strong black circular lens with one short vivid-orange handle at approximately 4:30. Pair it with the exact wordmark `Jesse Qin` when a lockup is shown. Use clean vector-like geometry, a strong silhouette, balanced spacing, and generous padding.

Committed logo axes:

- Mark Geometry: Typographic monogram
- Stroke & Weight: Medium uniform
- Negative Space Strategy: None; the search metaphor is literal and immediate
- Color Application: Two-tone primary + neutral

Palette: orange `#FF6815`, warm ink `#17130F`, surface `#FBF9F5`. Flat color only. The mark must also be credible in one-color ink. Do not place the mark in a rounded-square app tile.

Hard exclusions: no bridge, arch, hidden path, literal brain, robot, circuit board, infinity loop, chat bubble, sparkle, neural network, globe, hexagon-tech badge, gradient, glow, 3D, mockup scene, watermark, or extra copy. Do not use `JAI` as the master mark. Do not imitate any existing technology-company logo.

### Systems-illustration prompt

Create a sparse editorial systems illustration on `#FBF9F5`. Show two to five entities, one explicit boundary, one provenance path, and one active decision terminal in `#FF6815`. Use `#17130F` for structure and `#D8D1C7` for inactive scaffolding. Every line must carry meaning. No decorative networks, labels, fake UI, glow, shadows, or embedded statistics.

### Photography prompt

Use Jesse's supplied real portrait. Preserve identity, age, glasses, expression, clothing, and body proportions. Keep documentary New York or real-workspace context, neutral daylight, visible natural texture, and modest contrast. Do not fabricate a suit, luxury office, keynote stage, executive studio, or cinematic teal-orange grade.
