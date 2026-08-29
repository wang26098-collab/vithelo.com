# Data Governance

The current site is an honest demonstration. Its main governance rule is simple: presentation must never create certainty that the source data does not contain.

## Status vocabulary

| Status | Meaning | Current use |
| --- | --- | --- |
| `DEMO_ONLY` | The record exists to demonstrate structure and interaction, not a production fact | Products, formula, ingredient, technology, evidence, capability, Safety, market fixtures |
| `NOT_CONFIGURED` | A required fact, provider, source, or policy is unavailable | Media, price, cart, Safety sources, market, search, payment, identity, support, project submission |

These are data states, not temporary visual badges. Removing the label requires approved source data and an implemented production pathway.

## Fact ownership

- Product, formula, ingredient, technology, evidence, Safety, capability, market, and commerce records stay separate.
- Page routes and patterns may reference records but may not own or duplicate business facts.
- Evidence records must keep source, scope, supported-statement boundary, and limitation together.
- Safety content remains visible even when its only truthful state is `NOT_CONFIGURED`.
- Provider-specific mapping belongs behind `ContentAdapter` or `CommerceAdapter`.

## Prohibited invention

Do not add or infer:

- nutrition dose, benefit, efficacy, suitability, storage, or health claim;
- device mechanism, output, parameter, mode, treatment claim, intended use, or regulatory status;
- certification, facility, quality-system, testing, traceability, or manufacturing proof;
- price, currency, tax, shipping, returns, warranty, support entitlement, MOQ, lead time, or market eligibility;
- business capacity, customer proof, project outcome, or inquiry response commitment.

Neutral missing-state copy is required when the page needs the field for decision structure.

## Approved-data transition

Before replacing a demonstration value:

1. Identify the source document or provider record.
2. Identify the accountable owner and approval status.
3. Identify the intended market and locale.
4. Map the value to a Zod field and record relationship.
5. Preserve source, scope, limitation, Safety, and policy context where applicable.
6. Validate through the adapter and relevant unit tests.
7. Run the claim scan and the full gate in [Acceptance](acceptance.md).

If any step is missing, keep `DEMO_ONLY` or `NOT_CONFIGURED` visible.

## Current enforcement

- `src/content/schema.ts` restricts all current `dataStatus` values to the literal `DEMO_ONLY`.
- `src/lib/content.ts` parses every local fixture before exposing it.
- `tests/unit/content-schema.test.ts` checks fixture status, relationships, Safety, evidence, market, and adapter results.
- `tests/e2e/demo-integrity.spec.ts` checks visible disclosure and scans rendered copy for high-risk claims and forbidden dash characters.
- The repository acceptance scan checks fixture source for unapproved regulatory or claim phrases.

## Related

- [Content model](content-model.md)
- [Missing production inputs](missing-production-inputs.md)
- [Acceptance](acceptance.md)
