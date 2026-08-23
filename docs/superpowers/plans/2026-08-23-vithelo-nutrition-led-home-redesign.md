# VITHELO Nutrition-Led Home Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver the approved VITHELO nutrition-led homepage: a product-first six-screen experience centred on Sleep Health and Women’s Health, with separate capsule and ruby-red gummy scientific stages, accessible motion, and a clearly secondary B2B inquiry path.

**Architecture:** Keep all product facts in the existing Zod content layer, then compose the homepage from focused pattern components rather than one large page file. Server components supply validated demo records and media status; client-leaf components alone manage focus, scroll progress, and user-selected media. The existing InquiryActionPair remains the only Email/WhatsApp implementation and stays disabled until destinations are configured.

**Tech Stack:** Next.js App Router, React 19, TypeScript, Zod 4, Motion for React, Tailwind CSS 4, Vitest + Testing Library, Playwright.

---

## Scope lock

**Must ship in this plan**

- Six homepage screens in the approved order, with a single persistent header.
- Nutrition-first navigation, `/nutrition#sleep-health`, `/nutrition#womens-health`, `/science`, `/learn`, and `/professional`.
- Separate capsule and transparent ruby-red bear-gummy stages, each with form, material, use, and safety states.
- Desktop pointer and keyboard product focus; mobile horizontal snap; desktop sticky science stages; complete reduced-motion/static alternatives.
- Status-governed `DEMO_ONLY` / `NOT_CONFIGURED` content, disabled inquiry channels, media fallbacks, responsive visual QA, and documentation alignment.

**Explicitly excluded**

- Checkout, cart, subscription, payment, CRM/CMS submission, actual Email/WhatsApp destinations, invented product claims, product labels, dosage, evidence, pricing, or Seed assets/code/copy.

## File map

| File | Responsibility |
| --- | --- |
| `src/content/schema.ts` | Add validated nutrition category, form, disclosed local-media, and homepage-content contracts. |
| `src/content/demo/home.ts` | Supply claim-safe demo homepage copy, disclosed media records, and six-screen records. |
| `src/content/demo/products.ts` | Supply three nutrition demo products with category/form classification, retaining the secondary device fixture. |
| `src/lib/content.ts` | Continue parsing all fixture data through the Zod contract; expose nutrition filtering only if the pattern needs it. |
| `src/styles/tokens.css` / `src/app/globals.css` | Add named cinematic radius and nutrition-home layout/material utilities; preserve light homepage theme and reduced-motion rules. |
| `src/components/core/navigation.ts` / `src/components/core/site-header.tsx` | Replace equal-weight primary navigation with the approved four destinations and B2B route. |
| `src/components/domain/nutrition-product-focus-rail.tsx` | Client leaf for the three-card focus rail, pointer/keyboard parity, and mobile snap behaviour. |
| `src/components/motion/scroll-explanation-stage.tsx` | Reusable client leaf that maps native scroll progress to a labelled, non-scroll-jacking scientific stage. |
| `src/components/patterns/nutrition-home-hero.tsx` | Server-rendered full-viewport product/lifestyle hero with art-directed media fallback. |
| `src/components/patterns/nutrition-manifesto.tsx` | Server-rendered cold-Ivory manifesto and category paths. |
| `src/components/patterns/nutrition-science-stage.tsx` | Server wrapper that passes validated capsule/gummy state records to the scroll leaf. |
| `src/components/patterns/nutrition-human-rhythms.tsx` | Accessible, user-controlled human-media panel with static fallback. |
| `src/components/patterns/home-page.tsx` | Compose the six screens and the subsequent science, learning, professional, inquiry, and footer-support sequence. |
| `src/app/learn/page.tsx` / `src/components/patterns/learn-page.tsx` | Add the Health Knowledge destination with safe Sleep Health and Women’s Health entry points. |
| `docs/*.md` listed in Task 8 | Make governing documentation match the approved nutrition-led hierarchy. |

## Visual and content decisions encoded in implementation

- Use only project-local media paths allowed by the media schema. Existing local media is rendered as `DEMO_ONLY`; a missing or failed media item renders its meaningful alt text and the appropriate `NOT_CONFIGURED` status. Do not import the prior concept-render pixels as product assets.
- The hero occupies `min-height: 100dvh`; its copy overlays one integrated image rather than creating a left-copy/right-image split. A `<picture>` supplies desktop and mobile art direction and reserves the media box.
- The two scientific objects are visual form representations, not technical proof. Their four labels are driven by content records. The stage title is always followed by the content status; `VERIFIED INFORMATION ONLY` is never rendered for the current demo fixture.
- Ruby red is confined to the gummy object and its image treatment. Controls, buttons, links, navigation, and status colors stay Graphite/Titanium/Ivory.
- Homepage display and body use `--font-precision`; no display component uses `--font-editorial`.

### Task 1: Establish nutrition category, product-form, and homepage contracts

**Files:**
- Modify: `src/content/schema.ts`
- Modify: `src/content/demo/home.ts`
- Modify: `src/content/demo/products.ts`
- Modify: `src/lib/content.ts`
- Modify: `tests/unit/content-schema.test.ts`
- Create: `tests/unit/nutrition-home-content.test.ts`

- [ ] **Step 1: Write failing schema and home-content tests.**

```ts
it("requires a nutrition category and product form for nutrition products", () => {
  const products = demoProducts.items.filter((item) => item.kind === "nutrition");
  expect(products.map((item) => ProductSchema.parse(item).healthCategory)).toEqual([
    "sleep-health",
    "womens-health",
    "daily-essential",
  ]);
  expect(products.map((item) => ProductSchema.parse(item).form)).toEqual([
    "capsule",
    "gummy",
    "capsule",
  ]);
});

it("keeps the capsule and gummy scientific stages as independent demo records", () => {
  expect(demoHome.scienceStages.map((stage) => stage.form)).toEqual(["capsule", "gummy"]);
  expect(demoHome.scienceStages.every((stage) => stage.dataStatus === "DEMO_ONLY")).toBe(true);
  expect(demoHome.scienceStages.flatMap((stage) => stage.states.map((state) => state.label))).toEqual([
    "FORM", "MATERIAL", "USE", "SAFETY", "FORM", "MATERIAL", "USE", "SAFETY",
  ]);
});
```

- [ ] **Step 2: Run the focused tests and verify the missing fields fail.**

Run: `pnpm.cmd test -- tests/unit/content-schema.test.ts tests/unit/nutrition-home-content.test.ts`

Expected: FAIL because `healthCategory`, `form`, and `scienceStages` are absent.

- [ ] **Step 3: Add contracts with only the approved vocabulary.**

In `src/content/schema.ts`, replace the current single `MediaSchema` with the following disclosed-media union, then define and export these exact contracts before `NutritionProductSchema`:

```ts
const DemoMediaSchema = z.object({
  status: z.literal("DEMO_ONLY"),
  src: z.string().regex(/^\/media\/[\w./-]+$/),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  alt: z.string().min(1),
});

const MissingMediaSchema = z.object({
  status: z.literal("NOT_CONFIGURED"),
  alt: z.string().min(1),
  message: z.string().min(1),
});

export const MediaSchema = z.discriminatedUnion("status", [
  DemoMediaSchema,
  MissingMediaSchema,
]);

export const NutritionHealthCategorySchema = z.enum([
  "sleep-health",
  "womens-health",
  "daily-essential",
]);

export const NutritionFormSchema = z.enum(["capsule", "gummy"]);

const ScienceStageStateSchema = z.object({
  label: z.enum(["FORM", "MATERIAL", "USE", "SAFETY"]),
  summary: z.string().min(1),
  status: z.union([DataStatusSchema, ConfiguredStatusSchema]),
});

const ScienceStageSchema = z.object({
  id: z.enum(["capsule-stage", "gummy-stage"]),
  dataStatus: DataStatusSchema,
  form: NutritionFormSchema,
  title: z.string().min(1),
  media: MediaSchema,
  states: z.array(ScienceStageStateSchema).length(4),
});
```

Extend `NutritionProductSchema` with `healthCategory: NutritionHealthCategorySchema` and `form: NutritionFormSchema`. Replace the old B2B-specific `HomeContentSchema` fields with the records the homepage actually consumes: claim-safe hero actions as links, two category paths, `scienceStages`, human-rhythm media, and the professional inquiry context. Export `NutritionHealthCategory`, `NutritionForm`, and `ScienceStage` inferred types.

- [ ] **Step 4: Populate the three nutrition records and six-screen data without inventing facts.**

Keep all status fields `DEMO_ONLY` or `NOT_CONFIGURED`. Add three nutrition fixtures in this order: Sleep Health capsule, Women’s Health gummy, Daily Essential capsule. Their `name` and `descriptor` stay clearly demonstrative, for example `Demo Sleep Formula` and `Demonstration nutrition product`; none may promise sleep, balance, or efficacy. Map any already-present local asset through a `DEMO_ONLY` record with its `/media/...` path and intrinsic dimensions; otherwise use a `NOT_CONFIGURED` record with a meaningful `message`. Keep `demo-device-01` as the secondary Aesthetic Technology fixture and update its missing media record to include `message`.

For each science state use this safe structure:

```ts
{
  label: "SAFETY",
  summary: "Safety details require approved product input.",
  status: { status: "NOT_CONFIGURED", message: "Safety details require approved product input." },
}
```

Use the approved visual titles `Capsule form study` and `Gummy form study`; form, material, use, and safety summaries remain disclosure language rather than product claims.

- [ ] **Step 5: Preserve the adapter boundary.**

Keep `localContentAdapter.listProducts()` as the source of homepage products. If filtering is needed, add one typed method instead of filtering fixtures in a page:

```ts
async listNutritionProducts(): Promise<NutritionProduct[]> {
  return this.products.filter((product): product is NutritionProduct => product.kind === "nutrition");
}
```

Export `type Media = z.infer<typeof MediaSchema>` and `type NutritionProduct = z.infer<typeof NutritionProductSchema>`, then parse every returned record with `ProductSchema` during adapter construction, matching the existing validation pattern.

- [ ] **Step 6: Run focused tests and commit the content boundary.**

Run: `pnpm.cmd test -- tests/unit/content-schema.test.ts tests/unit/nutrition-home-content.test.ts`

Expected: PASS, with three nutrition products, two independent science-stage records, and no configured fact presented as demo truth.

```powershell
git -c safe.directory='E:/CodexWorkspace/Project-12 网站' add src/content/schema.ts src/content/demo/home.ts src/content/demo/products.ts src/lib/content.ts tests/unit/content-schema.test.ts tests/unit/nutrition-home-content.test.ts
git -c safe.directory='E:/CodexWorkspace/Project-12 网站' commit -m "feat: model nutrition-led home content"
```

### Task 2: Lock the visual tokens and nutrition-led navigation

**Files:**
- Modify: `src/styles/tokens.css`
- Modify: `src/app/globals.css`
- Modify: `src/components/core/navigation.ts`
- Modify: `src/components/core/site-header.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `tests/unit/site-header.test.tsx`
- Modify: `tests/e2e/core-journeys.spec.ts`

- [ ] **Step 1: Write failing navigation assertions.**

```ts
for (const [label, href] of [
  ["Products", "/nutrition"],
  ["Science", "/science"],
  ["Health Knowledge", "/learn"],
  ["Professional Partnership", "/professional"],
] as const) {
  expect(screen.getAllByRole("link", { name: label })[0]).toHaveAttribute("href", href);
}

expect(screen.queryByRole("link", { name: "Aesthetic Technology", exact: true })).not.toBeInTheDocument();
```

- [ ] **Step 2: Run the header test and verify it fails against the superseded five-item navigation.**

Run: `pnpm.cmd test -- tests/unit/site-header.test.tsx`

Expected: FAIL because `Nutrition`, `Aesthetic Technology`, and `Capabilities` still appear in primary navigation.

- [ ] **Step 3: Replace the navigation data and header wording.**

Set `primaryNavigation` exactly to:

```ts
export const primaryNavigation = [
  { label: "Products", href: "/nutrition" },
  { label: "Science", href: "/science" },
  { label: "Health Knowledge", href: "/learn" },
  { label: "Professional Partnership", href: "/professional" },
] as const;
```

Keep the VITHELO wordmark/monogram unchanged. Replace the header CTA `Start a Project` with `Professional Partnership` linking to `/professional`, or remove the duplicate CTA when the desktop geometry is tighter than the approved one-line header. Update only header descriptions that still claim two equal product worlds. Do not add Aesthetic Technology to any primary or mobile navigation list.

- [ ] **Step 4: Add named visual tokens and global layout primitives.**

Add these tokens in `src/styles/tokens.css`; use them instead of page-local equivalents:

```css
--radius-cinematic: 1.25rem;
--color-human-mauve: #a37683;
--color-ruby-material: #9b2831;
--home-header-height: 4.75rem;
```

Keep `--color-ruby-material` out of button, link, focus, and status rules. Add global utilities for `.home-viewport`, `.home-cinematic-media`, and `.home-section` using intrinsic sizing, `overflow: clip`, and the named cinematic radius only for media/scientific stages. In `src/app/layout.tsx`, update metadata and the body comment so they describe a nutrition-led VITHELO experience with a secondary professional capability; do not change the global header, disclosure, or mobile inquiry-bar composition.

- [ ] **Step 5: Run unit and journey checks and commit.**

Run: `pnpm.cmd test -- tests/unit/site-header.test.tsx`

Expected: PASS.

```powershell
git -c safe.directory='E:/CodexWorkspace/Project-12 网站' add src/styles/tokens.css src/app/globals.css src/components/core/navigation.ts src/components/core/site-header.tsx src/app/layout.tsx tests/unit/site-header.test.tsx tests/e2e/core-journeys.spec.ts
git -c safe.directory='E:/CodexWorkspace/Project-12 网站' commit -m "feat: set nutrition-led navigation and visual tokens"
```

### Task 3: Build the accessible product-focus rail and scroll-stage primitive

**Files:**
- Create: `src/components/domain/nutrition-product-focus-rail.tsx`
- Create: `src/components/motion/scroll-explanation-stage.tsx`
- Modify: `src/components/motion/reveal.tsx`
- Create: `tests/unit/nutrition-product-focus-rail.test.tsx`
- Create: `tests/unit/scroll-explanation-stage.test.tsx`

- [ ] **Step 1: Write the product-focus interaction tests.**

```tsx
render(<NutritionProductFocusRail products={threeNutritionProducts} />);

const womenCard = screen.getByRole("link", { name: /Demo Women.*Formula/i });
fireEvent.focus(womenCard);
expect(womenCard.closest("article")).toHaveAttribute("data-active", "true");

fireEvent.keyDown(womenCard, { key: "ArrowRight" });
expect(screen.getByRole("link", { name: /Demo Daily Essential/i })).toHaveFocus();
expect(screen.getAllByTestId("product-focus-fact")).toHaveLength(3);
```

Add a reduced-motion test asserting all three facts are visible and no card depends on hover to expose name, descriptor, form, category, or safety status.

- [ ] **Step 2: Run the new unit test and verify it fails because the component does not exist.**

Run: `pnpm.cmd test -- tests/unit/nutrition-product-focus-rail.test.tsx`

Expected: FAIL with module-not-found for `nutrition-product-focus-rail`.

- [ ] **Step 3: Implement the rail as one client leaf.**

Use the following public contract:

```ts
type NutritionProductFocusRailProps = {
  products: readonly NutritionProduct[];
};
```

Use a roving `activeIndex`, `onPointerEnter`, `onFocus`, and `ArrowLeft` / `ArrowRight` / `Home` / `End` handlers. Render every product as a real `<a href={`/nutrition/${product.slug}`}>`; all facts are in each article, not conditionally mounted. On `lg` and above, animate `flexGrow` from `1` to `1.4` with `motion.article`; on small screens use `overflow-x-auto snap-x snap-mandatory` and cards with `snap-center min-w-[82vw]`. If `useReducedMotion()` is true, do not animate and render `data-testid="reduced-motion-static"`.

Each card must carry `data-active`, `data-category`, `data-form`, and `data-testid="nutrition-product-card"`. When `product.media[0].status === "DEMO_ONLY"`, render its local image using the record’s `src`, `width`, `height`, and `alt`; otherwise render a labelled static fallback using its `alt` and `message`. Do not render price, cart, subscription, efficacy, or a global ruby-red control.

- [ ] **Step 4: Write scroll-stage tests before implementation.**

```tsx
render(
  <ScrollExplanationStage
    intent="EXPLAIN"
    stage={demoHome.scienceStages[0]}
    visual={<div data-testid="capsule-visual" />}
  />,
);

expect(screen.getByRole("heading", { name: "Capsule form study" })).toBeVisible();
expect(screen.getAllByTestId("science-state")).toHaveLength(4);
expect(screen.getByText("Safety details require approved product input.")).toBeVisible();
expect(screen.queryByText("VERIFIED INFORMATION ONLY")).not.toBeInTheDocument();
```

Add the reduced-motion assertion that all four records appear in document order under `data-testid="reduced-motion-static"`.

- [ ] **Step 5: Implement a non-scroll-jacking scroll-stage primitive.**

Use this public contract:

```ts
type ScrollExplanationStageProps = {
  intent: "EXPLAIN";
  stage: ScienceStage;
  visual: ReactNode;
};
```

Use `useScroll({ target: sectionRef, offset: ["start start", "end end"] })` inside the client component and `useMotionValueEvent(scrollYProgress, "change", ...)` to set the active state index. The outer section uses `min-height: 190vh` at desktop and `min-height: auto` below `1024px`; its inner visual wrapper is `sticky top-[var(--home-header-height)]` only on desktop. No handler may call `preventDefault`, set document scroll position, or consume wheel/touch events.

Render the four state articles in DOM order at all times. The active state may gain opacity/connector emphasis, but it cannot be the sole readable copy. Render `stage.dataStatus` as `DEMO_ONLY`, and render a `NOT_CONFIGURED` status/message whenever the state status is unconfigured. The component must set `data-motion-intent="EXPLAIN"` and use only tokenized motion timings/easings from `reveal.tsx`.

- [ ] **Step 6: Run focused tests and commit the interaction primitives.**

Run: `pnpm.cmd test -- tests/unit/nutrition-product-focus-rail.test.tsx tests/unit/scroll-explanation-stage.test.tsx`

Expected: PASS, including keyboard focus, all static facts, and complete reduced-motion state visibility.

```powershell
git -c safe.directory='E:/CodexWorkspace/Project-12 网站' add src/components/domain/nutrition-product-focus-rail.tsx src/components/motion/scroll-explanation-stage.tsx src/components/motion/reveal.tsx tests/unit/nutrition-product-focus-rail.test.tsx tests/unit/scroll-explanation-stage.test.tsx
git -c safe.directory='E:/CodexWorkspace/Project-12 网站' commit -m "feat: add accessible nutrition focus and science motion"
```

### Task 4: Implement Screens 1–3 and compose their visual states

**Files:**
- Create: `src/components/patterns/nutrition-home-hero.tsx`
- Create: `src/components/patterns/nutrition-manifesto.tsx`
- Create: `src/components/patterns/nutrition-product-discovery.tsx`
- Modify: `src/components/patterns/home-page.tsx`
- Modify: `src/app/page.tsx`
- Modify: `tests/unit/home-inquiry.test.tsx`
- Create: `tests/e2e/nutrition-home-sequence.spec.ts`

- [ ] **Step 1: Replace the obsolete homepage assertions with failing screen-order tests.**

```tsx
render(<HomePage />);

expect(screen.getByRole("heading", { name: "Nutrition for the rhythms that shape a life." })).toBeVisible();
expect(screen.getByRole("heading", { name: "Find your daily formula." })).toBeVisible();
expect(screen.queryByRole("heading", { name: "Two product worlds. One VITHELO standard." })).not.toBeInTheDocument();
expect(document.querySelector('[data-testid="nutrition-hero-art-direction"] source')).toBeInTheDocument();
```

In Playwright, assert screen order by their stable section IDs: `#nutrition-hero`, `#nutrition-manifesto`, `#nutrition-products`, `#capsule-science`, `#gummy-science`, and `#human-rhythms`.

- [ ] **Step 2: Run the home test and verify the old equal-weight composition fails.**

Run: `pnpm.cmd test -- tests/unit/home-inquiry.test.tsx`

Expected: FAIL because the old hero and equal product-world headings are still rendered.

- [ ] **Step 3: Create the hero with product-first art direction and safe fallback.**

`NutritionHomeHero` receives the validated hero record. Render one `<picture data-testid="nutrition-hero-art-direction">` only when desktop/mobile records have `status === "DEMO_ONLY"`, using their local `/media/...` paths, `sizes`, dimensions, and `priority`. Overlay the typography within that media box: two short claim-safe statements, Sleep Health/Women’s Health context labels, a primary link to `/nutrition`, and a restrained link to `/professional`.

Use `aria-label="Explore nutrition products"` for the primary link. If the record media is `NOT_CONFIGURED` or image load fails, show a full-size Ivory fallback with the alt text and `NOT_CONFIGURED` message while retaining both routes. Mark this section `data-motion-intent="ORIENT"`; reveal copy and media only through the existing reduced-motion-safe primitives.

- [ ] **Step 4: Create the manifesto and discovery sections.**

`NutritionManifesto` renders the exact approved headline and only two underlined links:

```tsx
<a href="/nutrition#sleep-health">Sleep Health</a>
<a href="/nutrition#womens-health">Women&apos;s Health</a>
```

Give the section `id="nutrition-manifesto"`, `data-motion-intent="RELATE"`, an Ivory background, and no cards/icons/supporting grid.

`NutritionProductDiscovery` renders `id="nutrition-products"`, heading `Find your daily formula.`, and passes the three validated nutrition fixtures to `NutritionProductFocusRail`. The page component fetches content via the adapter, validates `demoHome`, and does not embed product facts or media status inline.

- [ ] **Step 5: Run targeted tests and capture the first visual checkpoint.**

Run: `pnpm.cmd test -- tests/unit/home-inquiry.test.tsx tests/unit/nutrition-product-focus-rail.test.tsx`

Run: `pnpm.cmd test:e2e -- tests/e2e/nutrition-home-sequence.spec.ts --project=desktop-1440`

Expected: PASS; the screenshot artifact shows a full-viewport integrated hero, monumental Ivory manifesto, and continuous three-product row with no equal-weight Aesthetic Technology section.

- [ ] **Step 6: Commit Screens 1–3.**

```powershell
git -c safe.directory='E:/CodexWorkspace/Project-12 网站' add src/components/patterns/nutrition-home-hero.tsx src/components/patterns/nutrition-manifesto.tsx src/components/patterns/nutrition-product-discovery.tsx src/components/patterns/home-page.tsx src/app/page.tsx tests/unit/home-inquiry.test.tsx tests/e2e/nutrition-home-sequence.spec.ts
git -c safe.directory='E:/CodexWorkspace/Project-12 网站' commit -m "feat: build nutrition-led home opening sequence"
```

### Task 5: Implement Screens 4–6 and the post-narrative conversion path

**Files:**
- Create: `src/components/domain/nutrition-form-visual.tsx`
- Create: `src/components/patterns/nutrition-science-stage.tsx`
- Create: `src/components/patterns/nutrition-human-rhythms.tsx`
- Modify: `src/components/patterns/home-page.tsx`
- Modify: `tests/unit/home-inquiry.test.tsx`
- Modify: `tests/e2e/nutrition-home-sequence.spec.ts`
- Modify: `tests/e2e/inquiry-journeys.spec.ts`

- [ ] **Step 1: Add failing capsule, gummy, and human-rhythm tests.**

```tsx
render(<HomePage />);

expect(screen.getByRole("heading", { name: "Capsule form study" })).toBeVisible();
expect(screen.getByRole("heading", { name: "Gummy form study" })).toBeVisible();
expect(screen.getAllByText("FORM", { exact: true })).toHaveLength(2);
expect(screen.getByRole("heading", { name: "Your health moves with your rhythms." })).toBeVisible();
expect(screen.getByRole("button", { name: "Pause health rhythm media" })).toBeVisible();
expect(screen.getAllByRole("button", { name: "Email Inquiry" })[0]).toBeDisabled();
```

Add a test that asserts the gummy stage comes after the capsule stage in document order, and that no button/link uses the ruby material token as a primary action class.

- [ ] **Step 2: Run the tests and verify missing distinct stages fail.**

Run: `pnpm.cmd test -- tests/unit/home-inquiry.test.tsx`

Expected: FAIL because capsule, gummy, and human-rhythm patterns are not yet part of `HomePage`.

- [ ] **Step 3: Create an explicitly non-evidentiary form visual.**

`NutritionFormVisual` accepts `{ form: NutritionForm; media: Media }`. When `media.status === "DEMO_ONLY"`, it renders the record’s local image with object-contain sizing; otherwise it renders a semantic visual fallback marked `data-testid="form-media-fallback"`. The capsule fallback is a dark two-part form within a Titanium/frosted stage; the gummy fallback is a single translucent ruby-red bear silhouette within the same light stage. The fallback has no dosage, ingredient, molecular, certification, or outcome text. Its adjacent status label always makes its non-approved media state visible.

- [ ] **Step 4: Create independent scientific stage wrappers.**

`NutritionScienceStage` receives one `ScienceStage`, maps `capsule-stage` to `id="capsule-science"` and `gummy-stage` to `id="gummy-science"`, and passes `NutritionFormVisual` to `ScrollExplanationStage`. It must render `FORM`, `MATERIAL`, `USE`, and `SAFETY` exactly once per stage. Apply `--radius-cinematic` to the frosted visual container only. Do not share scroll state between the two wrappers.

- [ ] **Step 5: Create the Screen 6 media panel and static alternative.**

`NutritionHumanRhythms` renders the approved heading, two `/nutrition` category links, a visible pause/play toggle labelled `Pause health rhythm media` / `Play health rhythm media`, and an image or poster fallback. It never autoplays video. When reduced motion is enabled, it shows one static image and both category links under `data-testid="reduced-motion-static"`; when motion is allowed, direct user selection or scroll state may change the image. All supporting text is content-supplied and claim-safe.

- [ ] **Step 6: Append the conversion sequence after Screen 6.**

In `HomePage`, add sections after `#human-rhythms` in this order: evidence boundary with its current `DEMO_ONLY` source/scope/limitation disclosure; Health Knowledge links; Professional Partnership summary and route; `InquiryActionPair` using a specific nutrition partnership context; support/footer links. The inquiry component remains disabled and visibly `NOT_CONFIGURED` until `siteConfig` is configured. Do not move inquiry actions into the hero or introduce form submission.

- [ ] **Step 7: Run stage, inquiry, and reduced-motion checks; commit.**

Run: `pnpm.cmd test -- tests/unit/home-inquiry.test.tsx tests/unit/scroll-explanation-stage.test.tsx`

Run: `pnpm.cmd test:e2e -- tests/e2e/nutrition-home-sequence.spec.ts tests/e2e/inquiry-journeys.spec.ts`

Expected: PASS; capsule and gummy are distinct in order, disabled channels expose `NOT_CONFIGURED`, and every stage remains readable with reduced motion.

```powershell
git -c safe.directory='E:/CodexWorkspace/Project-12 网站' add src/components/domain/nutrition-form-visual.tsx src/components/patterns/nutrition-science-stage.tsx src/components/patterns/nutrition-human-rhythms.tsx src/components/patterns/home-page.tsx tests/unit/home-inquiry.test.tsx tests/e2e/nutrition-home-sequence.spec.ts tests/e2e/inquiry-journeys.spec.ts
git -c safe.directory='E:/CodexWorkspace/Project-12 网站' commit -m "feat: add nutrition science and rhythm stages"
```

### Task 6: Complete nutrition discovery and Health Knowledge destinations

**Files:**
- Modify: `src/components/patterns/nutrition-landing.tsx`
- Modify: `src/app/nutrition/page.tsx`
- Create: `src/app/learn/page.tsx`
- Create: `src/components/patterns/learn-page.tsx`
- Modify: `tests/unit/landing-recognition.test.tsx`
- Modify: `tests/e2e/core-journeys.spec.ts`
- Modify: `tests/e2e/responsive.spec.ts`

- [ ] **Step 1: Write failing route and anchor tests.**

```ts
await page.goto("/nutrition#sleep-health");
await expect(page.locator("#sleep-health")).toBeVisible();
await expect(page.locator("#womens-health")).toBeVisible();

await page.goto("/learn");
await expect(page.getByRole("heading", { name: "Health Knowledge" })).toBeVisible();
await expect(page.getByRole("link", { name: "Sleep Health" })).toHaveAttribute("href", "/nutrition#sleep-health");
```

- [ ] **Step 2: Run route tests and verify `/learn` is missing.**

Run: `pnpm.cmd test:e2e -- tests/e2e/core-journeys.spec.ts --project=desktop-1440`

Expected: FAIL because `/learn` has no page and the nutrition landing does not expose the required anchors.

- [ ] **Step 3: Group nutrition products by validated category.**

Update `NutritionLanding` to render the existing product decision content under `#sleep-health`, `#womens-health`, and `#daily-essential` sections. Use `healthCategory`, `form`, media status, safety, and evidence-boundary records from the adapter. The old product detail route continues to expose Commerce `NOT_CONFIGURED` and Safety. Remove only the landing copy that gives Nutrition and Aesthetic Technology equal homepage priority; do not remove the `/aesthetic-technology` route.

- [ ] **Step 4: Add the lean Health Knowledge page.**

`LearnPage` receives the content adapter and renders `Health Knowledge`, a short boundary note that educational content is demonstration content, two category entry links, and the existing `/science` and `/support` recovery routes. It does not manufacture article bodies or health guidance. Use the same neutral light theme and 44px targets.

- [ ] **Step 5: Verify destinations and commit.**

Run: `pnpm.cmd test -- tests/unit/landing-recognition.test.tsx`

Run: `pnpm.cmd test:e2e -- tests/e2e/core-journeys.spec.ts tests/e2e/responsive.spec.ts`

Expected: PASS; products/knowledge routes work, category anchors exist, and no core route overflows.

```powershell
git -c safe.directory='E:/CodexWorkspace/Project-12 网站' add src/components/patterns/nutrition-landing.tsx src/app/nutrition/page.tsx src/app/learn/page.tsx src/components/patterns/learn-page.tsx tests/unit/landing-recognition.test.tsx tests/e2e/core-journeys.spec.ts tests/e2e/responsive.spec.ts
git -c safe.directory='E:/CodexWorkspace/Project-12 网站' commit -m "feat: add nutrition discovery and health knowledge routes"
```

### Task 7: Verify responsive, motion, disclosure, and visual acceptance

**Files:**
- Modify: `tests/e2e/accessibility.spec.ts`
- Modify: `tests/e2e/demo-integrity.spec.ts`
- Modify: `tests/e2e/responsive.spec.ts`
- Modify: `tests/e2e/core-journeys.spec.ts`
- Modify: `tests/unit/home-inquiry.test.tsx`

- [ ] **Step 1: Replace superseded homepage acceptance assertions.**

Update the reduced-motion E2E assertion to this exact user-visible content:

```ts
await page.emulateMedia({ reducedMotion: "reduce" });
await page.goto("/");
await expect(page.getByRole("heading", { name: "Nutrition for the rhythms that shape a life." })).toBeVisible();
await expect(page.getByRole("heading", { name: "Capsule form study" })).toBeVisible();
await expect(page.getByRole("heading", { name: "Gummy form study" })).toBeVisible();
await expect(page.locator('[data-testid="reduced-motion-static"]')).toHaveCount(expect.any(Number));
```

Add Playwright desktop checks for `#capsule-science` and `#gummy-science` showing a sticky visual whose bounds remain within the viewport during the middle of its section, and mobile checks that those stages render as normal vertical content. Assert the product rail has horizontal snap semantics on `390x844` and has no horizontal document overflow.

- [ ] **Step 2: Add explicit content-governance checks.**

For `/`, `/nutrition`, `/learn`, `/science`, and `/professional`, retain the existing visible `DEMO_ONLY` / `NOT_CONFIGURED` checks. Add:

```ts
expect(visibleText).not.toMatch(/sleep deeper|live in balance|clinically proven|certified|guaranteed|cures?|treats?/i);
expect(visibleText).not.toContain("VERIFIED INFORMATION ONLY");
```

The last assertion is correct for the current fixture: no record is validated. Keep the forbidden em/en-dash check.

- [ ] **Step 3: Run focused E2E acceptance checks.**

Run: `pnpm.cmd test:e2e -- tests/e2e/accessibility.spec.ts tests/e2e/demo-integrity.spec.ts tests/e2e/responsive.spec.ts tests/e2e/core-journeys.spec.ts`

Expected: PASS at all configured Playwright projects, with no lost focus, under-44px controls, overflow, unavailable safety, hidden reduced-motion facts, or unmarked claim.

- [ ] **Step 4: Inspect visual evidence at all six acceptance viewports.**

Run: `pnpm.cmd test:e2e -- tests/e2e/nutrition-home-sequence.spec.ts`

Expected screenshot checkpoints at `1440x1000`, `1280x900`, `1024x768`, `768x1024`, `390x844`, and `375x812` show: product-dominant first viewport; Ivory manifesto; enlarged/contracted desktop product rail; distinct capsule and gummy scientific stages; human rhythm panel; no overlapping sticky regions; and no global red UI.

- [ ] **Step 5: Commit the acceptance suite.**

```powershell
git -c safe.directory='E:/CodexWorkspace/Project-12 网站' add tests/e2e/accessibility.spec.ts tests/e2e/demo-integrity.spec.ts tests/e2e/responsive.spec.ts tests/e2e/core-journeys.spec.ts tests/unit/home-inquiry.test.tsx
git -c safe.directory='E:/CodexWorkspace/Project-12 网站' commit -m "test: cover nutrition-led home acceptance"
```

### Task 8: Align governing documentation and run the production gate

**Files:**
- Modify: `docs/brand-system.md`
- Modify: `docs/design-system.md`
- Modify: `docs/content-model.md`
- Modify: `docs/page-patterns.md`
- Modify: `docs/motion-system.md`
- Modify: `docs/acceptance.md`
- Modify: `docs/missing-production-inputs.md`
- Create: `docs/visual-qa/vithelo-nutrition-home-redesign.md`

- [ ] **Step 1: Update documentation with the implemented contracts, not aspirational claims.**

Record these exact decisions:

- One master brand; Nutrition is public-primary and Aesthetic Technology is professional-secondary.
- Homepage display typography is neo-grotesk only; `--radius-cinematic` is 20px and restricted to cinematic media/science stages.
- Nutrition records require `healthCategory` and `form`; capsule/gummy presentation remains `DEMO_ONLY` until approved packaging/form records arrive.
- Motion intents are `ORIENT`, `RELATE`, `FOCUS`, and `EXPLAIN`; sticky scenes never intercept native scrolling; reduced motion is static and complete.
- Missing production inputs include approved desktop/mobile hero assets, packaging media for each nutrition product, capsule form media, gummy form media, adult human media/poster, verified safety/formula/evidence records, and actual Email/WhatsApp destinations.
- Acceptance requires separate Screen 4 capsule and Screen 5 gummy stages, six viewport review, no P0/P1, and the command gate below.

- [ ] **Step 2: Add a visual-QA record linked to the approved specification.**

Create `docs/visual-qa/vithelo-nutrition-home-redesign.md` with a six-row table: screen ID, composition check, desktop result, tablet result, mobile result, and issue severity. Link the approved specification and record the evidence filenames produced by `nutrition-home-sequence.spec.ts`. Record `DEMO_ONLY` asset gaps as production-input gaps, not visual defects.

- [ ] **Step 3: Run the complete production gate.**

Run: `pnpm.cmd lint`

Expected: exit code 0.

Run: `pnpm.cmd typecheck`

Expected: exit code 0.

Run: `pnpm.cmd test`

Expected: exit code 0.

Run: `pnpm.cmd test:e2e`

Expected: exit code 0.

Run: `pnpm.cmd build`

Expected: exit code 0.

- [ ] **Step 4: Inspect the final diff and commit only implementation-owned files.**

Run: `git -c safe.directory='E:/CodexWorkspace/Project-12 网站' diff --check`

Expected: no whitespace errors.

```powershell
git -c safe.directory='E:/CodexWorkspace/Project-12 网站' add docs/brand-system.md docs/design-system.md docs/content-model.md docs/page-patterns.md docs/motion-system.md docs/acceptance.md docs/missing-production-inputs.md docs/visual-qa/vithelo-nutrition-home-redesign.md
git -c safe.directory='E:/CodexWorkspace/Project-12 网站' commit -m "docs: align nutrition-led brand system"
```

Do not add unrelated pre-existing untracked files or generated `next-env.d.ts` changes to any commit.

## Final handoff checklist

- [ ] The persistent header is rendered once, with Products, Science, Health Knowledge, and Professional Partnership only.
- [ ] Hero through human-rhythm sequence matches the six approved compositions in order.
- [ ] Capsule and gummy are separate scientific screens and remain separate at all viewports.
- [ ] Product focus works with pointer, keyboard, touch, and reduced motion.
- [ ] No factual claim, label, certification, price, dosage, or media is invented; status disclosure remains visible.
- [ ] Email and WhatsApp routes remain disabled/not configured until approved destinations are supplied.
- [ ] Documentation, unit tests, E2E tests, build, and visual QA all pass.
