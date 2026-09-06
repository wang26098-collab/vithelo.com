# VITHELO Homepage Consolidation and Motion Design

> 状态：结构收口与动效已实施。Proof 屏最初的 `NOT_CONFIGURED` 方案已被新的第二屏单屏设计取代，见 `2026-09-01-vithelo-home-screen-two-design.md`。

## Goal

Turn the long eleven-section homepage into a shorter B2B decision path without changing the approved hero artwork or inventing factory facts.

## Structure

The homepage keeps seven sections in this order: `hero`, `proof`, `gummy-stage`, `solutions`, `dosage-forms`, `project-runway`, `contact`.

- Hero artwork is static. Copy may reveal once.
- Proof only presents source-bounded manufacturing facts. Its next implementation uses the user-provided manufacturing profile and the approved `V-A Editorial Proof Ledger` direction; no concept label or giant `NOT_CONFIGURED` value is presented as proof.
- Gummy and eight dosage formats remain separate but adjacent product-capability sections.
- Product directions keep the existing native vertical scroll relationship. Pagination text and horizontal controls are removed.
- Formula, manufacturing, quality, and delivery are consolidated into one OEM / ODM project runway. Quality remains a visible step and does not imply unavailable evidence.
- The standalone customer-type network and the disabled homepage form are removed.
- Contact contains preparation guidance plus Email and WhatsApp as the only primary actions.

## Motion

- Hero image: static.
- Gummy and dosage content: one-time `RELATE` reveal using opacity and small vertical translation.
- Product directions: existing vertical scroll-linked state, without pagination or arrows.
- Project runway: `EXPLAIN` progression as steps enter the viewport.
- Contact: interaction response only.
- Factory proof and quality wording remain static.
- Reduced Motion removes transforms and transitions while retaining every fact and action.

## Acceptance

- No `01 / 06`-style market pagination or left/right market controls render.
- No disabled inquiry form renders on Home.
- Eight dosage formats remain visible; Oral Films is not given an unintended full-width hierarchy.
- No unverified factory number is published.
- Hero background image has no animation or transform.
- Desktop and mobile have no horizontal overflow and retain Email and WhatsApp paths.
