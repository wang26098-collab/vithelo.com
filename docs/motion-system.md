# Motion System

The behavior language is `SCALE × REVEAL × RESPONSE`. Motion explains relationships and state; it never supplies the only copy, product fact, Safety information, or commerce action.

## Intent contract

Every shared motion primitive requires one semantic intent:

| Intent | Use |
| --- | --- |
| `ORIENT` | Establish location, product world, or a major transition |
| `RELATE` | Connect records, views, or nearby concepts |
| `EXPLAIN` | Clarify a mechanism, formula, technology, or evidence relationship |
| `FOCUS` | Direct attention to the active element without hiding peers |
| `CONFIRM` | Acknowledge a completed local state change |

Components accept the intent union, not arbitrary duration props.

## Token timing

- Fast: 150ms.
- Standard: 240ms.
- Narrative: 500ms.
- Immersive: 900ms.
- Standard easing: `cubic-bezier(0.2, 0, 0, 1)`.

## Primitive reference

- `Reveal`: one-time viewport opacity and vertical reveal; distance and duration derive from intent.
- `MediaReveal`: one-time opacity and clip-path reveal.
- `ScrollExplanationStage`: maps native scroll progress to a labelled capsule or gummy science state without intercepting scroll. Desktop keeps the visual column sticky within its own stage; mobile does not.
- `NutritionProductFocusRail`: pointer, focus, and Arrow Left/Right/Home/End select the active product. Desktop emphasizes the active card by flex growth; mobile uses native horizontal snap.
- `VisualSwitcher`: horizontal tabs switch only the visual region while every text fact remains as an ordinary article in document order.
- `useReducedMotion`: subscribes to `(prefers-reduced-motion: reduce)` and returns `true` during server rendering for a static-first fallback.

## VisualSwitcher behavior

- Click, Enter, Space, Arrow Left, Arrow Right, Home, and End are supported.
- Up and Down remain available for page scrolling.
- Roving tab stops keep one selected tab in the tab order.
- Inactive facts remain visible and are not mislabeled as inactive tab panels.
- The changing visual is decorative and hidden from assistive technology.

## Reduced Motion

Reduced Motion has two layers:

1. Global CSS reduces animation and transition durations and disables smooth scrolling.
2. Motion primitives render meaningful content statically, remove large transforms, and expose `data-motion-mode="static"` or the reduced-motion test marker.

The manifesto remains complete without motion. The product rail, capsule stage, gummy stage, and human-rhythms panel each retain all meaningful text in a static reduced-motion layout. Formula and Technology components also render a server-safe static information layout before interactive motion is available.

## Limits

- No scroll-jacking, sustained drift, decorative parallax, or motion-only fact.
- No sticky narrative that traps reading or input. Science-stage sticky visuals remain within their own desktop section and become sequential on mobile and in Reduced Motion.
- No brand-heavy navigation animation.
- No animation may delay commerce or Safety.
- Use transform and opacity for routine motion. Avoid layout thrashing and large blur/filter effects.
- Delete motion that cannot name an intent.

## Verification

`tests/unit/visual-switcher.test.tsx` covers keyboard behavior, persistent text facts, Reduced Motion, and server-to-client reconciliation. `tests/e2e/accessibility.spec.ts` verifies that reduced-motion pages retain meaningful static content.

## Related

- [Design system](design-system.md)
- [Page patterns](page-patterns.md)
- [Acceptance](acceptance.md)
