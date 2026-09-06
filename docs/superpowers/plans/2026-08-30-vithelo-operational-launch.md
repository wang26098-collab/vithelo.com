# VITHELO Operational Launch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the current VITHELO demonstration into a small, credible B2B inquiry website that can be deployed and operated without inventing product, factory, certification, MOQ, or contact information.

**Architecture:** Keep the existing Next.js routes and validated content boundary. Replace scattered page-level colors with one launch palette, promote only approved content from `DEMO_ONLY`, and make Email/WhatsApp the first operational conversion path. Keep the project brief form disabled until an inquiry provider, consent wording, retention policy, and routing owner are approved.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, CSS Modules, Zod, Vitest, Testing Library, Playwright.

---

## Launch scope

### Must have

- Approved business email and WhatsApp number with owners and response expectations.
- No public unverified MOQ, certifications, capacity, lead time, efficacy, or regulatory claims.
- Working Email and WhatsApp links on every primary conversion path.
- One coherent color system with no full-width orange sections.
- Home, Products, OEM/ODM, Insights, Contact, privacy notice, and not-found route working on mobile and desktop.
- Accurate metadata, sitemap, robots rules, canonical production URL, and social preview.
- Zero P0/P1 accessibility, overflow, broken-link, or interaction defects.
- Lint, typecheck, unit tests, E2E, and production build passing.

### Should have

- At least one approved factory/process image and one approved product-format image with usage rights.
- Lightweight privacy-friendly analytics only after provider and consent decisions.
- Domain email authentication and a documented inquiry response owner.

### Could have

- Connected project brief submission, CRM routing, CMS, search, and additional articles.

### Won't have in the first launch

- Cart, checkout, account system, online pricing, invented certifications, automated quotation, or market-specific regulated claims.

## Parallel business-input lane

Engineering cannot safely manufacture these values. Before Task 3 is completed, obtain and approve:

1. Public inquiry email address.
2. WhatsApp number in E.164 format.
3. Legal company name, registered location, privacy contact, and domain owner.
4. Production domain and deployment provider.
5. Approved English statements for factory relationship, eight formats, quality process, and project workflow.
6. Written decision to hide every specific MOQ until independently verified.
7. Usage rights and alt text for every launch image.

---

### Task 1: Freeze unsafe launch content

**Files:**
- Modify: `src/content/demo/vithelo-b2b-site.ts`
- Modify: `src/content/demo/vithelo-b2b-home.ts`
- Test: `tests/unit/vithelo-b2b-pages-content.test.ts`
- Test: `tests/unit/vithelo-b2b-home-content.test.ts`

- [ ] **Step 1: Add failing assertions that reject public specific MOQ values**

```ts
for (const format of vitheloB2BProductsPage.formats) {
  expect(format.moq).toMatch(/contact us|formula and packaging/i);
  expect(format.moq).not.toMatch(/\d/);
}
```

- [ ] **Step 2: Run the focused tests and verify they fail on the current numeric demo values**

Run: `pnpm.cmd test -- tests/unit/vithelo-b2b-pages-content.test.ts tests/unit/vithelo-b2b-home-content.test.ts`

Expected: FAIL because several formats publish numeric MOQ figures.

- [ ] **Step 3: Replace every public format MOQ with the approved bounded language**

Use only:

```ts
moq: "Flexible MOQ based on formula and packaging. Contact us for MOQ."
```

Do not change product formats, page order, or customization fields.

- [ ] **Step 4: Scan launch content for prohibited claims and market references**

Run:

```powershell
Get-ChildItem src/content -Recurse -File | Select-String -Pattern 'FDA approved','clinically proven','guaranteed','United States','USA','world-class','unlock','empower'
```

Expected: no unapproved public-facing matches.

- [ ] **Step 5: Re-run focused tests**

Expected: PASS.

---

### Task 2: Consolidate the launch color system

**Files:**
- Modify: `src/styles/tokens.css`
- Modify: `src/components/core/vithelo-b2b-site-frame.module.css`
- Modify: `src/components/patterns/vithelo-b2b-home.module.css`
- Modify: `src/components/patterns/vithelo-b2b-pages.module.css`
- Test: `tests/unit/tokens.test.ts`
- Test: `tests/e2e/vithelo-premium-ui.spec.ts`

- [ ] **Step 1: Add failing token and E2E assertions**

Assert that the launch palette has one source of truth and that Contact/CTA sections do not resolve to `#ec5b32` or `rgb(236, 91, 50)`.

```ts
expect(tokens).toContain("--color-background: #f4f5f1");
expect(tokens).toContain("--color-surface: #fbfbf8");
expect(tokens).toContain("--color-graphite: #181b1a");
expect(tokens).toContain("--color-deep-ink: #173247");
```

- [ ] **Step 2: Run focused tests and verify failure**

Run: `pnpm.cmd test -- tests/unit/tokens.test.ts`

Expected: FAIL because current home and page CSS still define independent palettes.

- [ ] **Step 3: Establish the five-level background family in `tokens.css`**

```css
--color-optical-white: #fbfbf8;
--color-background: #f4f5f1;
--color-titanium-mist: #e8ebe7;
--color-aluminum: #d7dcd8;
--color-graphite: #181b1a;
--color-graphite-soft: #303532;
--color-deep-ink: #173247;
--color-signal: #b94e3b;
```

Signal color is limited to buttons, focus indicators, and small status marks.

- [ ] **Step 4: Remove duplicate local palette declarations**

Replace `--ivory`, `--paper`, `--orange`, `--b2b-ivory`, `--b2b-paper`, and `--b2b-orange` with global semantic tokens. Preserve existing layout and responsive rules.

- [ ] **Step 5: Apply the approved homepage color sequence**

Use photo → white → mineral → titanium → white → deep ink → photo/graphite → cool light → mineral → photo tint → graphite. Remove the full-width orange Contact background, orange inner-page CTA, and orange Contact Hero overlay.

- [ ] **Step 6: Remove decorative orange dosage-format blobs**

Keep all eight formats in one viewport-oriented directory. Replace `.formatSignal` candy gradients with neutral media treatment or a restrained titanium line/number treatment.

- [ ] **Step 7: Run token and premium UI tests**

Run: `pnpm.cmd test -- tests/unit/tokens.test.ts`

Run: `pnpm.cmd test:e2e -- tests/e2e/vithelo-premium-ui.spec.ts`

Expected: PASS with no full-section signal color and no horizontal overflow.

---

### Task 3: Activate the minimum inquiry path

**Files:**
- Modify: `src/content/schema.ts`
- Modify: `src/content/site-config.ts`
- Modify: `src/components/patterns/vithelo-contact-page.tsx`
- Modify: `src/components/patterns/vithelo-b2b-home.tsx`
- Test: `tests/unit/site-config.test.ts`
- Test: `tests/unit/vithelo-contact-page.test.tsx`
- Test: `tests/e2e/inquiry-journeys.spec.ts`

- [ ] **Step 1: Obtain approved Email and WhatsApp values**

Do not perform the remaining activation steps while either value lacks an owner and approval.

- [ ] **Step 2: Add failing configured-state tests**

```ts
expect(screen.getByRole("link", { name: /email/i })).toHaveAttribute(
  "href",
  `mailto:${siteConfig.contact.email.value}`,
);
expect(screen.getByRole("link", { name: /whatsapp/i })).toHaveAttribute(
  "href",
  `https://wa.me/${siteConfig.contact.whatsapp.e164.replace("+", "")}`,
);
```

The test fixture must import the same validated, user-approved production configuration used by the rendered page.

- [ ] **Step 3: Configure validated contact records**

Change both contact states from `NOT_CONFIGURED` to the schema's configured state and populate the approved values. If the schema lacks a configured branch, add a Zod discriminated union so configured records require a value and unconfigured records require `null`.

- [ ] **Step 4: Render safe direct-contact actions**

Email uses `mailto:`. WhatsApp uses `https://wa.me/<digits>` with no spaces or plus sign in the path. External WhatsApp links include an accessible name and safe target behavior.

- [ ] **Step 5: Keep project-brief submission disabled**

Do not enable the fieldset or create an API endpoint in this task. Add a short instruction telling users to include format, formula direction, packaging, volume, and target timing in Email or WhatsApp.

- [ ] **Step 6: Run unit and inquiry E2E tests**

Run: `pnpm.cmd test -- tests/unit/site-config.test.ts tests/unit/vithelo-contact-page.test.tsx tests/unit/inquiry-links.test.ts`

Run: `pnpm.cmd test:e2e -- tests/e2e/inquiry-journeys.spec.ts`

Expected: PASS; direct channels work and the unconfigured form does not imply submission.

---

### Task 4: Add minimum legal and operational transparency

**Files:**
- Create: `src/app/privacy/page.tsx`
- Create: `src/content/legal.ts`
- Modify: `src/components/core/vithelo-b2b-site-frame.tsx`
- Modify: `src/content/schema.ts`
- Test: `tests/unit/seo-routes.test.ts`
- Test: `tests/e2e/core-journeys.spec.ts`

- [ ] **Step 1: Obtain approved legal identity and privacy copy**

Required fields: legal company name, contact address, privacy email, inquiry data purpose, retention approach, sharing/provider statement, and rights/contact procedure.

- [ ] **Step 2: Add failing route and footer-link tests**

```ts
expect(footerLinks).toEqual(
  expect.arrayContaining([expect.objectContaining({ href: "/privacy" })]),
);
```

- [ ] **Step 3: Add validated legal content**

Keep the legal text in `src/content/legal.ts`, not inside the route component. Mark the route `NOT_CONFIGURED` and exclude it from production deployment until approved copy is supplied; never write generic substitute legal promises.

- [ ] **Step 4: Render the privacy route and footer entry**

Use the existing site frame, reading-width container, semantic headings, and visible contact route.

- [ ] **Step 5: Run route and journey tests**

Run: `pnpm.cmd test -- tests/unit/seo-routes.test.ts tests/unit/vithelo-b2b-site-frame.test.tsx`

Expected: PASS.

---

### Task 5: Production metadata and deployment configuration

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/robots.ts`
- Modify: `src/app/sitemap.ts`
- Modify: `.env.example`
- Test: `tests/unit/metadata-brand.test.ts`
- Test: `tests/unit/deployment-runtime.test.mjs`

- [ ] **Step 1: Obtain the approved production origin**

Record the user-approved HTTPS origin in the deployment environment; do not invent or infer a domain.

- [ ] **Step 2: Add failing metadata tests**

Assert production canonical URLs, the VITHELO title template, English locale, social preview image dimensions, and inclusion of all launch routes.

- [ ] **Step 3: Configure metadata from an environment variable**

Add `NEXT_PUBLIC_SITE_URL` to `.env.example`. Parse it once and use it for `metadataBase`, sitemap, and robots output. Build must fail with a clear message in production when the value is absent or invalid.

- [ ] **Step 4: Keep non-launch routes out of indexing**

Exclude any remaining demo, legacy, preview, or unapproved route from sitemap and prevent indexing where applicable.

- [ ] **Step 5: Run metadata and build tests**

Run: `pnpm.cmd test -- tests/unit/metadata-brand.test.ts tests/unit/deployment-runtime.test.mjs tests/unit/seo-routes.test.ts`

Expected: PASS.

---

### Task 6: Launch media audit

**Files:**
- Modify: `src/content/demo/vithelo-b2b-home.ts`
- Modify: `src/content/demo/vithelo-b2b-site.ts`
- Modify: `docs/missing-production-inputs.md`
- Test: `tests/e2e/demo-integrity.spec.ts`

- [ ] **Step 1: Inventory every rendered launch image**

For each image record its route, section, source, creator, license URL, width, height, crop, focal point, and alt text.

- [ ] **Step 2: Add a failing integrity assertion for missing media metadata**

```ts
expect(media.sourceUrl).toMatch(/^https:\/\//);
expect(media.licenseUrl).toMatch(/^https:\/\//);
expect(media.alt.trim().length).toBeGreaterThan(0);
```

- [ ] **Step 3: Remove or replace any image without documented launch rights**

Do not generate replacement images. Preserve the layout using approved free media or a neutral non-deceptive treatment.

- [ ] **Step 4: Update the production-input gap document**

Remove only gaps actually resolved with evidence. Keep real factory photography as a post-launch improvement if free media is legally adequate for the first launch, but do not describe stock imagery as the factory.

- [ ] **Step 5: Run integrity tests**

Run: `pnpm.cmd test:e2e -- tests/e2e/demo-integrity.spec.ts`

Expected: PASS with all rendered media attributable and no demo image presented as factual manufacturing proof.

---

### Task 7: Full launch acceptance

**Files:**
- Modify only tests or application files directly implicated by a verified defect.
- Record: `docs/visual-qa.md`

- [ ] **Step 1: Run the complete automated gate**

```powershell
pnpm.cmd lint
pnpm.cmd typecheck
pnpm.cmd test
pnpm.cmd test:e2e
pnpm.cmd build
```

Expected: every command exits with code 0.

- [ ] **Step 2: Review the six acceptance viewports**

Check 320×568, 375×812, 768×1024, 1024×768, 1440×900, and 1920×1080 for clipping, overflow, sticky overlap, text hierarchy, image crops, disabled-state clarity, keyboard focus, and Contact visibility.

- [ ] **Step 3: Run a production-data scan**

Verify no visible `DEMO_ONLY` or `NOT_CONFIGURED` remains on launch routes except intentionally disabled features that are explicitly explained. Verify there are no numeric MOQ promises or unsupported claims.

- [ ] **Step 4: Perform a real inquiry smoke test**

From desktop and mobile, open the Email action and WhatsApp action, verify the destination, send one test inquiry, and confirm the assigned owner receives it.

- [ ] **Step 5: Record the launch evidence**

Update `docs/visual-qa.md` with viewport results, inquiry test date, production commit, known P2 issues, and confirmation that P0 = 0 and P1 = 0.

## Launch decision

Deploy only when Tasks 1–7 pass and the business-input lane has approved contact, legal, domain, claims, and media inputs. A visually complete site with disabled contact channels is not operationally launchable.
