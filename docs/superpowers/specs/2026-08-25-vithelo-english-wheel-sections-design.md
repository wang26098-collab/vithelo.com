# VITHELO English Homepage Interaction Revision

Date: 2026-08-25  
Status: Approved design amendment, awaiting implementation plan

## 1. Scope

This amendment changes only the independent full-homepage preview `vithelo-homepage-work/VITHELO_Homepage_FullPreview_V1.html`. It must not modify the frozen earlier preview or the source homepage under `E:\CodexWorkspace\8-23独立站\website`.

The revision covers three requirements:

1. Convert all visible homepage content to English for a cross-border B2B audience.
2. Redesign the market-solutions section as a pointer-aware, wheel-advanced editorial stage.
3. Replace the horizontal dosage-form rail with a natural vertical catalogue.

## 2. Language and positioning

- All visible navigation, headings, descriptions, labels, form fields, status messages, and footer content use English.
- Internal comments and implementation documentation may remain Chinese or bilingual.
- The market-solutions heading is `Market-Led Concepts, Ready to Build.`
- The section must not explicitly say that the product concepts are for the United States.
- VITHELO remains positioned as the factory-owned overseas brand and export division behind real OEM/ODM manufacturing.
- The page must not invent contact details, certifications, capacities, claims, regulatory status, or production commitments.

## 3. Market-solutions desktop interaction

The section presents six approved directions:

1. Women’s Wellness
2. Sleep, Stress & Mood
3. Beauty From Within
4. Gut & Digestive Health
5. Daily Essentials
6. Active Nutrition

The visual composition is one continuous editorial stage, not six cards. Each state contains a large product/lifestyle visual region, an index, title, short B2B description, and a visible progress indicator.

### Pointer zones

- The central approximately 76% of the viewport is the active stage zone.
- The left and right approximately 12% gutters are ordinary page-scroll zones.
- Wheel events are never intercepted while the pointer is in either gutter.

### Wheel behavior

- A deliberate wheel gesture in the active zone advances exactly one state.
- Additional wheel input is ignored only until the current state transition finishes.
- Scrolling upward on the first state returns to the preceding page content.
- Scrolling downward after the sixth state continues to the next homepage section.
- The interaction must not create a permanent scroll trap or global scroll-jacking.
- The current state remains understandable without animation.

### Alternative inputs and accessibility

- Previous and Next controls remain visible and keyboard operable.
- Arrow keys may change the active state when focus is inside the stage.
- Escape releases focus from the interactive stage and restores ordinary page behavior.
- Semantic headings, buttons, focus indicators, and logical DOM order are required.
- With Reduced Motion enabled, state changes are immediate and no transition lock is applied.

## 4. Mobile behavior

Mobile does not emulate pointer zones or capture touch scrolling.

- All six product directions appear in normal vertical document order.
- Each direction occupies most of the viewport and may use gentle CSS scroll snapping.
- Touch scrolling remains native and can pass through the section freely.
- All content remains visible without JavaScript or animation.

## 5. Dosage-form section

The heading is `Eight Formats. One Manufacturing System.`

The following formats appear in a vertical editorial catalogue:

1. Gummies — Custom projects from 500 bottles
2. Hard Capsules — 60,000–100,000 capsules
3. Softgels — 300,000 softgels
4. Tablets — 100,000 tablets
5. Powders — 100 kg
6. Functional Gum — 2 metric tons
7. Liquids — Contact us for MOQ
8. Oral Films — Contact us for MOQ

Each format is a wide, full-width row or chapter containing product imagery, format name, concise capability copy, and MOQ state. The layout must not use a horizontal scrollbar, carousel rail, range control, or card grid. On small screens, rows stack in the same natural reading order.

The general qualification remains visible: `Flexible MOQ based on formula and packaging.` Specific numbers are treated as project inputs supplied by the user, not universal guarantees.

## 6. Contact and unconfigured states

- Email and WhatsApp remain visible as intended contact channels but carry the `NOT_CONFIGURED` state until approved values exist.
- Project inquiry submission remains visibly disabled or non-submitting until a provider is configured.
- No placeholder value may resemble a real contact address or active submission endpoint.

## 7. Verification

Implementation is accepted when:

- No visible Chinese copy remains in the independent full preview.
- The market-solutions title does not mention the United States.
- Center-zone wheel input advances one state at a time on desktop.
- Both edge gutters preserve native page scrolling.
- First-state upward and final-state downward scrolling exit normally.
- Mobile uses native vertical flow without wheel/touch capture.
- All eight dosage forms are vertically accessible without horizontal scrolling.
- Reduced Motion, keyboard operation, and visible focus remain functional.
- The frozen earlier preview and original source homepage retain their previous hashes.

## 8. Self-review

- Placeholder scan: no unresolved design placeholders remain; production contact data intentionally stays `NOT_CONFIGURED`.
- Consistency: desktop capture is bounded to the stage center, while mobile and edge gutters preserve native scrolling.
- Scope: limited to language conversion and the two requested section redesigns.
- Ambiguity: zone widths, exit conditions, transition throttling, mobile fallback, and MOQ presentation are explicit.
