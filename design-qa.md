# Design QA — Jesse Qin Editorial Profile, Solo Unicorn Orange Revision

- Source visual truth: `/Users/jesseqin/Downloads/Generated image 1 (3).png`
- Brand color reference: `/tmp/solo-unicorn-reference-1440x1024.png`
- User-rejected implementation evidence: `/var/folders/fw/2lj0x9jn771f5y2wypjbpy580000gn/T/TemporaryItems/NSIRD_screencaptureui_PwMEph/Screenshot 2026-07-11 at 6.40.46 PM.png`
- Final desktop implementation screenshot: `/tmp/jesse-profile-orange-final-desktop.png`
- Final mobile implementation screenshot: `/tmp/jesse-profile-orange-mobile-390x844.png`
- Final mobile project screenshot: `/tmp/jesse-profile-orange-mobile-projects.png`
- Final mobile menu screenshot: `/tmp/jesse-profile-orange-mobile-menu.png`
- Candidate-positioning desktop screenshot: `/tmp/jesse-profile-evidence-desktop.png`
- Evidence-led project screenshot: `/tmp/jesse-profile-evidence-projects-final.png`
- Hiring-first section screenshot: `/tmp/jesse-profile-hire-advisory-desktop.png`
- Secondary advisory screenshot: `/tmp/jesse-profile-advisory-secondary.png`
- Candidate-positioning mobile screenshot: `/tmp/jesse-profile-evidence-mobile.png`
- Mobile evidence screenshot: `/tmp/jesse-profile-evidence-mobile-projects.png`
- Full-view comparison evidence: `/tmp/jesse-profile-design-qa-comparison-final.png`
- Desktop viewport: `1280 × 720`
- Mobile viewport: `390 × 844`
- State: public homepage, light theme, initial desktop position; mobile menu open and Projects anchor state also tested.

## Full-view comparison evidence

The selected design and final implementation were normalized into one side-by-side comparison image. The selected mock is a `1487 × 1057` concept rather than a native `1280 × 720` browser capture, so the comparison uses its normalized top region and evaluates composition rather than false pixel precision.

The implementation preserves the selected direction: fixed editorial identity rail, serif thesis, a restrained orange phrase, a context-graph visual, persistent navigation, compact two-column evidence ledger, and public work immediately after the hero. The color treatment intentionally departs from the first implementation: the canvas is near-white, the sidebar is only slightly warmer, ink carries links and icons, and the exact Solo Unicorn orange is limited to decisive signals.

Focused-region evidence was required for the two custom raster assets and mobile behavior. The simplified context graph was inspected at its real hero display size. The recolored toolbox cover was inspected in the mobile project section. The mobile menu open state and anchor navigation were captured separately.

## Findings

- No actionable P0, P1, or P2 differences remain.
- Fonts and typography: `DM Serif Display` and `DM Sans` preserve the selected editorial serif/sans contrast. The desktop thesis holds a deliberate four-line rhythm at 1280px; mobile scales without clipping or horizontal overflow.
- Spacing and layout rhythm: the identity rail is 300px at 1280px and expands only on wider screens. Navigation stays on one line, the graph aligns with the hero statement, the evidence ledger appears in the first viewport, and desktop `scrollWidth` remains within the viewport.
- Colors and visual tokens: `#FBFAF7` is the main canvas, `#F7F4EE` the quiet rail, `#11100E` the ink, `#5F5A54` supporting text, and `#FF6815` the precise brand signal. Orange no longer colors every link, icon, CTA, and surface simultaneously.
- Image quality and asset fidelity: Jesse's supplied portrait is unchanged. The context graph is a dedicated readable raster asset rather than a CSS/SVG approximation. The toolbox cover is a dedicated `2120 × 742` ink/white/orange raster asset and retains the verified project title.
- Copy and content: the primary identity is AI systems engineer, with ontology and context graphs stated immediately. Public work is structured as problem, role, proof, and demonstrated capability; the Context Graph is accurately labeled as a public thesis/reference architecture rather than a deployed client case. The site contains no explicit job-seeking language; `$500 / 60 minutes` advisory, private coaching, and selected build partnerships remain available under a neutral `Work with me` path. No confidential employer or client details were introduced.
- Interaction and accessibility: semantic landmarks, one H1, skip navigation, keyboard focus, native links, alt text, 44px mobile controls, reduced-motion handling, and menu open/close states remain present.

## Comparison history

1. Rejected cream/orange implementation
   - Findings: the Solo Unicorn poster background was applied across the whole résumé; orange colored the role, links, icons, hero phrase, diagram, and CTA; the dense architectural-plate image became unreadable; the hero columns forced a six-line title; the layout overflowed horizontally.
   - Evidence: user screenshot at `/var/folders/fw/2lj0x9jn771f5y2wypjbpy580000gn/T/TemporaryItems/NSIRD_screencaptureui_PwMEph/Screenshot 2026-07-11 at 6.40.46 PM.png`.

2. Brand-system correction
   - Fixes: restored a near-white reading canvas, reduced orange to roughly 4% of the viewport, returned ordinary links/icons to ink, changed the CTA to an ink block with an orange arrow, and added explicit anti-slop rules against full-page cream and dense diagrams.
   - Evidence: validated `DESIGN.md` version `1.1.0`; lint produced no errors or broken token references.

3. Hero and responsive correction
   - Fixes: replaced the architectural poster with a seven-entity simplified graph, narrowed the desktop rail, moved the graph to the top of the hero, enforced four-line headline variants, reduced navigation gaps, and removed horizontal overflow.
   - Post-fix evidence: `/tmp/jesse-profile-orange-final-desktop.png` and `/tmp/jesse-profile-design-qa-comparison-final.png`.

4. Public-work visual correction
   - Fix: replaced the remaining dark-teal toolbox banner with an ink/white/orange project cover while preserving the verified title and concept.
   - Post-fix evidence: `/tmp/jesse-profile-orange-mobile-projects.png`.

5. Expertise-clarity and evidence revision
   - Earlier findings: consultant, coach, founder, and solo operator had equal identity weight; public projects stated outputs but not the problem, ownership, proof, or capability demonstrated.
   - Fixes: made AI systems engineer the primary identity, introduced evidence-led public case formatting, labeled the Context Graph honestly as a reference architecture, and grouped advisory/coaching into a dedicated collaboration section. Explicit job-seeking language added during an earlier iteration was removed so the site reads as a durable personal profile.
   - Post-fix evidence: `/tmp/jesse-profile-evidence-desktop.png`, `/tmp/jesse-profile-evidence-projects-final.png`, `/tmp/jesse-profile-hire-advisory-desktop.png`, `/tmp/jesse-profile-advisory-secondary.png`, and `/tmp/jesse-profile-evidence-mobile-projects.png`.

## Primary interactions tested

- Desktop and mobile page rendering.
- Mobile menu open state and close-on-navigation behavior.
- Mobile `Projects` navigation updates the URL to `#projects`, closes the menu, and presents the selected-work section.
- Desktop and mobile `Review public evidence` navigation lands on the evidence-led project section.
- `Work with me` navigation presents advisory, coaching, and selected build partnerships.
- No browser console errors were observed. Two pre-existing React Router v7 future-flag warnings remain and do not affect the experience.

## Follow-up polish

- P3: At widths near 1280px, the context graph is intentionally simplified and functions primarily as a visual proof of systems thinking; a future interactive graph could add progressive detail without shrinking labels.
- P3: A verified résumé PDF can later add a quiet download action without changing the first-viewport hierarchy.

final result: passed
