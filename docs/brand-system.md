# Brand System

This document explains the brand rules already expressed by the site. It does not approve a final brand name, logo, claim, product fact, or market position beyond the V6.1 specification.

## Core model

The platform presents one master brand with Nutrition as the public-primary world and Aesthetic Technology as a professional-secondary capability:

```text
                         One human and trust system
                                     |
                  HUMAN × MATERIAL × PRECISION
                         /                       \
              Nutrition            Aesthetic Technology
       public product discovery    professional capability and fit
```

Nutrition leads public orientation, product discovery, and health-category routes. Aesthetic Technology remains reachable through its own route and Professional, but is not a primary homepage or navigation destination. Both share tokens, evidence rules, accessibility, and state behavior; this prevents a stitched-store experience without giving both worlds equal public weight.

## Brand expression

- `HUMAN` starts with a person's task, routine, use context, safety, or professional intent.
- `MATERIAL` connects the visible object to formula, ingredient, technology, media, and source records.
- `PRECISION` keeps verified facts, placeholders, boundaries, and configuration states distinct.

The voice is calm, precise, human, progressive, and elevated. Copy says what is known, names what is missing, and avoids unsupported certainty.

## Shared visual language

- VITHELO identity treatment remains replaceable until final approved vector masters are supplied.
- Cold Ivory, Graphite, Titanium, and restrained Optical light.
- Thin rules, material fields, generous whitespace, and low-radius geometry.
- One neo-grotesk precision sans serves display, UI, and body text.
- Shadows limited to overlays. Ordinary content uses structure and hairlines.

Exact implemented values live in [Design system](design-system.md) and `src/styles/tokens.css`.

## Product-world distinction

| World | Implemented expression | Required decision context |
| --- | --- | --- |
| Nutrition | Cold-Ivory product discovery, soft material media, category and form relationships | Product, `healthCategory`, `form`, formula, ingredient, use, evidence, quality, Safety |
| Aesthetic Technology | Titanium materiality, complete-device and engineering rhythm | Product, technology, interface, use, Safety, specifications, professional fit |

Color does not carry this distinction. Neither world receives an independent brand palette.

## Reality gradient

The implementation uses three demonstration images and labels them according to their role:

- Brand and Science may use an abstract material field.
- Landings may use representative, non-claiming product-world imagery.
- PDPs use clearly disclosed demonstration or fictional imagery.
- Evidence, Safety, and manufacturing sections render record structure and missing-input states rather than simulated proof.

See [Data governance](data-governance.md) for the boundary between representation and fact.

## Reference boundary

The local Seed mirror informed hierarchy, pacing, commerce clarity, media confidence, and trust placement only. No Seed identity, copy, green microbiome styling, product logic, layout, motion, or code belongs in this repository.

## Related

- [Design system](design-system.md)
- [Page patterns](page-patterns.md)
- [Motion system](motion-system.md)
- [Missing production inputs](missing-production-inputs.md)
