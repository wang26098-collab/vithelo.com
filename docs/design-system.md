# Design System

The implemented design system is a token-led layer feeding core components, domain components, and page patterns. `src/styles/tokens.css` is the numeric source of truth; `src/app/globals.css` applies global behavior and shared layout utilities.

## Token reference

### Color

| Token | Light value or role |
| --- | --- |
| `--color-ivory` | `#f3f4f0` |
| `--color-ivory-deep` | `#e5e7e2` |
| `--color-graphite` | `#20211f` |
| `--color-graphite-soft` | `#555750` |
| `--color-titanium` | `#a6aaa8` |
| `--color-titanium-light` | `#d4d8d5` |
| `--color-optical` | `#dedbea` |
| `--color-optical-strong` | `#716983` |

Semantic tokens are `background`, `surface`, `foreground`, `muted`, `border`, and `focus`. The `[data-theme="dark"]` block supplies dark parity for those roles. The current app does not expose a theme switcher.

### Typography

- Precision stack: `ui-sans-serif, Aptos, "Helvetica Neue", Helvetica, Arial, sans-serif`.
- Homepage display, UI, and body use the precision neo-grotesk stack; no editorial-serif display treatment is used.
- Desktop headings: H1 `3.25rem`, H2 `2.5rem`, H3 `1.875rem`.
- Mobile headings: H1 `2.5rem`, H2 `2rem`, H3 `1.5rem`.
- Labels use `0.8125rem` and `0.08em` tracking.

### Spacing and geometry

- Spacing scale: `4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 120, 160` pixels.
- Radii: `0, 4, 8, 12` pixels. The 12px value is exceptional, not a card default.
- `--radius-cinematic`: `20px`, restricted to cinematic media frames and the capsule/gummy science stages; it is not a general card radius.
- Overlay shadow: `0 16px 48px rgb(32 33 31 / 0.12)`.
- Containers: standard `82rem`, reading `44rem`, form `38rem`, data `92rem`.
- Container gutter: fluid from 20px to 64px.
- Sticky layers: `P1` through `P4` map to z-index 10, 20, 30, and 40.

### Motion values

Fast is 150ms, Standard 240ms, Narrative 500ms, and Immersive 900ms. Semantic usage is defined in [Motion system](motion-system.md).

## Component layers

```text
tokens.css and globals.css
          |
core + customized Radix UI
          |
domain components
          |
page patterns
```

### Core components

- `Button`: primary, secondary, text, and icon variants; small, default, large, and icon sizes; disabled and `aria-busy` support.
- `SiteHeader`, `MegaMenu`, `MobileMenu`: four primary destinations — Products, Science, Health Knowledge, and Professional Partnership — plus focus-managed Dialog drawer.
- `DemoDisclosure`: persistent global demonstration notice.
- `StatePanel`: loading, empty, error, loaded, success, disabled, and missing-configuration states.
- `StickyResource`: `P1` to `P4` priority, mobile viewport anchoring, and automatic pause while Dialog is open.

The Radix wrappers in `src/components/ui/` provide Dialog and Navigation Menu behavior. Their visual defaults are replaced by VITHELO tokens.

### Domain components

Product, commerce, formula, technology, evidence, Safety, capability, and project-intake components consume validated records or explicit UI state. They do not own production facts.

## Global accessibility behavior

- `:focus-visible` uses a 2px Optical outline and focus ring.
- Interactive controls use a minimum 44px target.
- Body uses `100dvh` and fluid containers.
- Status is conveyed through text and semantics, not color alone.
- Error panels use `role="alert"`; other states use polite status announcements.
- Mobile navigation uses a labeled Radix Dialog with focus trapping, Escape close, and focus restoration.
- Global Reduced Motion CSS shortens animation and transition durations; component-level fallbacks remove semantic motion transforms.

## Change rules

Add or change a reusable numeric value in `src/styles/tokens.css`, then consume it in components. Do not introduce page-local palette families, arbitrary radii, generic elevated cards, random duration props, or a Nutrition-green and Device-blue split. Ruby red is reserved for the gummy material representation, never controls, links, navigation, or status.

## Related

- [Brand system](brand-system.md)
- [Motion system](motion-system.md)
- [Page patterns](page-patterns.md)
- [Acceptance](acceptance.md)
