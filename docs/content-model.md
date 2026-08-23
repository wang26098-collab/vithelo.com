# Content Model

The content layer keeps product truth separate from page composition. Zod validates local fixtures before the adapter returns them to routes and patterns.

## Data flow

```text
src/content/demo/*
        |
src/content/schema.ts validates every record
        |
src/lib/content.ts implements ContentAdapter
        |
route entry points load records
        |
page patterns and domain components render them
```

Commerce remains behind a separate `CommerceAdapter` in `src/lib/adapters/commerce-adapter.ts`.

## Schema reference

All current business records use `dataStatus: "DEMO_ONLY"`. All unavailable configured resources use `{ status: "NOT_CONFIGURED", message: string }`.

| Schema | Required implemented fields |
| --- | --- |
| `MediaSchema` | `DEMO_ONLY` local `src`, width, height, and alt; or `NOT_CONFIGURED` alt and message |
| `CommerceSchema` | `status`, non-empty `message` |
| `SafetySchema` | commerce-state fields plus `dataStatus` |
| `IngredientSchema` | `id`, `dataStatus`, `name`, `descriptor` |
| `FormulaSchema` | ingredient fields plus `ingredientIds[]` |
| `TechnologySchema` | `id`, `dataStatus`, `name`, `descriptor` |
| `EvidenceSchema` | `id`, `dataStatus`, literal `SOURCE_PLACEHOLDER` type, title, summary, source, scope, supported-statement boundary, limitation, `relationshipIds[]` |
| `CapabilitySchema` | `id`, `dataStatus`, `name`, `descriptor` |
| `MarketConfigurationSchema` | configured-state fields plus `dataStatus` |
| `NutritionProductSchema` | shared product fields plus literal kind `nutrition`, required `healthCategory`, required `form`, non-empty `formulaIds[]`, non-empty `ingredientIds[]` |
| `DeviceProductSchema` | shared product fields plus literal kind `device`, non-empty `technologyIds[]` |

The shared product fields are `id`, `slug`, `dataStatus`, `name`, `descriptor`, at least one media record, commerce state, Safety state, and at least one relationship ID. `ProductSchema` is a discriminated union on `kind`.

## Current fixture inventory

- Three Nutrition products: `demo-sleep-formula` (`sleep-health`, capsule), `demo-womens-formula` (`womens-health`, gummy), and `demo-daily-formula` (`daily-essential`, capsule).
- One Device product: `demo-precision-device`.
- One formula, one ingredient, one technology, and one evidence placeholder.
- Two professional capability records.
- One missing market-configuration record.

These counts describe current demonstration data only. They are not a production catalog commitment.

## ContentAdapter surface

`ContentAdapter` exposes:

- `listProducts()`
- `getProductBySlug(slug)`
- `listFormulas()`
- `listIngredients()`
- `listTechnologies()`
- `listEvidence()`
- `listCapabilities()`
- `getMarketConfiguration()`

The local implementation validates fixtures at module load and returns `null` for a missing product slug.

## CommerceAdapter surface

- `getPrice(productId)` returns an explicit unavailable state.
- `addToCart({ productId, quantity })` returns an explicit unavailable state.

The local adapter does not create a cart, order, inquiry, or payment.

## Relationship rules

- Nutrition products refer to formula and ingredient records by ID and carry validated `healthCategory` (`sleep-health`, `womens-health`, or `daily-essential`) plus `form` (`capsule` or `gummy`).
- Homepage science records keep capsule and gummy as separate `ScienceStage` records, each with FORM, MATERIAL, USE, and SAFETY states. These labels are disclosure structures, not product proof.
- Device products refer to technology records by ID.
- Evidence refers to related records through `relationshipIds`.
- Pages resolve these references before passing subsets to domain components.
- Consumer and professional views may share validated product truth, but their business expression remains separate.

## How to add approved data later

1. Supply the missing production inputs listed in [Missing production inputs](missing-production-inputs.md).
2. Extend the relevant Zod contract before adding new fields to a fixture or provider mapping.
3. Parse provider data at the adapter boundary.
4. Connect records through IDs instead of embedding copied facts in pages.
5. Replace `DEMO_ONLY` or `NOT_CONFIGURED` only when the value, source, owner, market, and approval are known.
6. Run the acceptance gate in [Acceptance](acceptance.md).

## Related

- [Data governance](data-governance.md)
- [Page patterns](page-patterns.md)
- [Missing production inputs](missing-production-inputs.md)
