# VITHELO About Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-quality `/about` page that combines Nordicus-inspired spatial restraint with an evidence-bounded VITHELO manufacturing narrative.

**Architecture:** Add a dedicated Zod-validated About record and adapter method, then render it through a focused server component and CSS Module. Keep the existing generic information page intact for Manufacturing and Quality, reuse only existing `DEMO_ONLY` VITHELO media, and verify the new route independently across all six acceptance viewports.

**Tech Stack:** Next.js 16 App Router, React 19 server components, TypeScript, Zod 4, CSS Modules, Vitest + Testing Library, Playwright.

---

## File map

- Create `src/content/demo/vithelo-about-page.ts`: the only fixture that owns About copy and media references.
- Modify `src/content/schema.ts`: define `B2BAboutPageSchema` and export `B2BAboutPage`.
- Modify `src/lib/adapters/content-adapter.ts`: add `getB2BAboutPage()` to the provider-neutral interface.
- Modify `src/lib/content.ts`: validate the fixture once and expose it through the adapter.
- Create `src/components/patterns/vithelo-about-page.tsx`: semantic composition for the seven approved sections.
- Create `src/components/patterns/vithelo-about-page.module.css`: begin with a compile-safe shell, then add About-only geometry, responsive behavior and Reduced Motion fallback.
- Modify `src/styles/tokens.css`: add one reusable pure-white paper token requested by the user.
- Modify `src/app/about/page.tsx`: keep route metadata and render the validated About pattern.
- Create `tests/unit/vithelo-about-content.test.ts`: contract, evidence-boundary and adapter checks.
- Create `tests/unit/vithelo-about-page.test.tsx`: semantic structure, CTA and format rendering checks.
- Create `tests/e2e/vithelo-about.spec.ts`: responsive, no-gutter, no-overflow, keyboard and Reduced Motion acceptance.
- Modify `tests/e2e/global-header.spec.ts`: change `/about` from `light-hero` to `dark-hero` because the approved hero is image-led.
- Modify `docs/current-status.md`: record the implementation and verification result only after tests pass.

Do not stage or edit unrelated existing work. In particular, do not include the generated `next-env.d.ts` change or any unrelated homepage/OEM/PDP files in an About commit.

### Task 1: Add the validated About content boundary

**Files:**
- Create: `tests/unit/vithelo-about-content.test.ts`
- Create: `src/content/demo/vithelo-about-page.ts`
- Modify: `src/content/schema.ts`
- Modify: `src/lib/adapters/content-adapter.ts`
- Modify: `src/lib/content.ts`

- [ ] **Step 1: Write the failing content test**

Create `tests/unit/vithelo-about-content.test.ts` with these assertions:

```ts
import { vitheloB2BAboutPage } from "@/content/demo/vithelo-about-page";
import { B2BAboutPageSchema } from "@/content/schema";
import { localContentAdapter } from "@/lib/content";

it("publishes one evidence-bounded About narrative", async () => {
  const page = B2BAboutPageSchema.parse(vitheloB2BAboutPage);

  expect(page.dataStatus).toBe("DEMO_ONLY");
  expect(page.principles).toHaveLength(4);
  expect(page.capabilities.items).toHaveLength(4);
  expect(page.formats.items).toHaveLength(8);
  expect(page.formats.items.map(({ name }) => name)).toContain("Oral Films");
  expect(page.boundary.items).toHaveLength(5);
  await expect(localContentAdapter.getB2BAboutPage()).resolves.toEqual(page);
});

it("does not import reference-site brands or unsupported proof", () => {
  const serialized = JSON.stringify(vitheloB2BAboutPage);

  expect(serialized).not.toMatch(/Nordicus|Yile Health/i);
  expect(serialized).not.toMatch(
    /\b(?:GMP|HACCP|HALAL|BRC|FSSC|FDA)\b|certified facility|guaranteed|\b\d+[,+]?\s*(?:m²|clients|countries|units)\b/i,
  );
  expect(serialized).toMatch(/review|confirmed|requires|project/i);
});
```

- [ ] **Step 2: Run the content test and verify the missing exports fail**

Run:

```powershell
pnpm.cmd test -- tests/unit/vithelo-about-content.test.ts
```

Expected: FAIL because `vithelo-about-page`, `B2BAboutPageSchema`, and `getB2BAboutPage()` do not exist.

- [ ] **Step 3: Define the About schema**

Append the following contract near the other B2B page schemas in `src/content/schema.ts`. Reuse the existing `DemoMediaSchema` and `B2BLinkSchema` already defined in the file.

```ts
const B2BAboutTextItemSchema = z.object({
  title: z.string().min(1),
  copy: z.string().min(1),
});

export const B2BAboutPageSchema = z.object({
  dataStatus: z.literal("DEMO_ONLY"),
  hero: z.object({
    kicker: z.literal("ABOUT VITHELO"),
    title: z.string().min(1),
    copy: z.string().min(1),
    media: DemoMediaSchema,
    primaryAction: B2BLinkSchema,
    secondaryAction: B2BLinkSchema,
  }),
  role: z.object({
    kicker: z.string().min(1),
    title: z.string().min(1),
    copy: z.string().min(1),
    media: DemoMediaSchema,
  }),
  principles: z.array(B2BAboutTextItemSchema).length(4),
  capabilities: z.object({
    kicker: z.string().min(1),
    title: z.string().min(1),
    copy: z.string().min(1),
    media: DemoMediaSchema,
    items: z.array(B2BAboutTextItemSchema).length(4),
  }),
  formats: z.object({
    kicker: z.string().min(1),
    title: z.string().min(1),
    copy: z.string().min(1),
    media: DemoMediaSchema,
    items: z
      .array(
        z.object({
          name: z.string().min(1),
          href: z.string().regex(/^\/products\/[a-z][\w-]*$/),
        }),
      )
      .length(8),
  }),
  collaboration: z.object({
    kicker: z.string().min(1),
    title: z.string().min(1),
    copy: z.string().min(1),
    items: z.array(B2BAboutTextItemSchema).length(4),
  }),
  boundary: z.object({
    kicker: z.string().min(1),
    title: z.string().min(1),
    copy: z.string().min(1),
    items: z.array(z.string().min(1)).length(5),
  }),
  cta: z.object({
    kicker: z.string().min(1),
    title: z.string().min(1),
    copy: z.string().min(1),
    action: B2BLinkSchema,
  }),
});

export type B2BAboutPage = z.infer<typeof B2BAboutPageSchema>;
```

- [ ] **Step 4: Create the fixture with approved English copy**

Create `src/content/demo/vithelo-about-page.ts` and parse the record at export time:

```ts
import { B2BAboutPageSchema } from "@/content/schema";

const demoMedia = (
  src: string,
  alt: string,
  width: number,
  height: number,
) => ({ status: "DEMO_ONLY" as const, src, alt, width, height });

export const vitheloB2BAboutPage = B2BAboutPageSchema.parse({
  dataStatus: "DEMO_ONLY",
  hero: {
    kicker: "ABOUT VITHELO",
    title: "Purpose in every decision. Precision in every handoff.",
    copy: "VITHELO is a nutrition OEM / ODM manufacturing partner connecting product ideas with clearer development and production routes.",
    media: demoMedia(
      "/media/b2b/sanitized-factory-production-line.jpg",
      "Demonstration manufacturing line in a clean production environment",
      961,
      1280,
    ),
    primaryAction: { label: "Explore Our Capabilities", href: "/manufacturing" },
    secondaryAction: { label: "Start a Project", href: "/contact" },
  },
  role: {
    kicker: "OUR ROLE",
    title: "Built around the product you are trying to make.",
    copy: "We connect format, formula direction, sensory expectations, packaging and project inputs before a manufacturing route is confirmed.",
    media: demoMedia(
      "/media/b2b/vithelo-project-entry-atmospheric-panorama.png",
      "Demonstration product brief and ingredient direction arranged in a warm studio",
      1536,
      1024,
    ),
  },
  principles: [
    { title: "Context", copy: "Begin with the product goal, dosage form, intended pack and project setting." },
    { title: "Precision", copy: "Define the inputs, open questions and review boundaries before confirmation." },
    { title: "Continuity", copy: "Keep development, manufacturing and documentation decisions connected." },
    { title: "Collaboration", copy: "Coordinate each discipline around one working project brief." },
  ],
  capabilities: {
    kicker: "THE WORK BEHIND THE PRODUCT",
    title: "One project. Multiple disciplines. One clear route.",
    copy: "A useful manufacturing conversation keeps product definition, development, production review and documentation within the same project context.",
    media: demoMedia(
      "/media/b2b/vithelo-product-definition-atmospheric.png",
      "Demonstration VITHELO bottle with suspended nutrition material",
      1536,
      1024,
    ),
    items: [
      { title: "Product Definition", copy: "Align the format, formula direction, sensory target and packaging brief." },
      { title: "Development Review", copy: "Discuss feasibility and sample priorities against confirmed inputs." },
      { title: "Production Route", copy: "Review the manufacturing path once the relevant product decisions are available." },
      { title: "Quality & Documents", copy: "Define applicable checks and document availability against the confirmed project." },
    ],
  },
  formats: {
    kicker: "DOSAGE FORM RANGE",
    title: "Eight formats. One connected development conversation.",
    copy: "Compare the format that best fits the intended experience, formula direction and pack.",
    media: demoMedia(
      "/media/b2b/vithelo-customization-constellation.png",
      "Demonstration VITHELO product system with several oral dosage forms",
      1536,
      1024,
    ),
    items: [
      { name: "Gummies", href: "/products/gummies" },
      { name: "Hard Capsules", href: "/products/hard-capsules" },
      { name: "Softgels", href: "/products/softgels" },
      { name: "Tablets", href: "/products/tablets" },
      { name: "Powders", href: "/products/powders" },
      { name: "Liquid Drops", href: "/products/liquids" },
      { name: "Functional Gum", href: "/products/functional-gum" },
      { name: "Oral Films", href: "/products/oral-films" },
    ],
  },
  collaboration: {
    kicker: "CONNECTED SUPPORT",
    title: "Keep the brief intact from first conversation to project review.",
    copy: "Commercial, development, production and quality discussions work best when they share the same approved inputs and open questions.",
    items: [
      { title: "Commercial Context", copy: "Capture the intended product, volume context and destination questions." },
      { title: "Product Development", copy: "Translate the brief into format, formula and sample decisions." },
      { title: "Production Review", copy: "Assess manufacturing fit after the relevant inputs are confirmed." },
      { title: "Quality Documentation", copy: "Review applicable checks and records within the confirmed scope." },
    ],
  },
  boundary: {
    kicker: "VERIFICATION BOUNDARY",
    title: "Documents before claims.",
    copy: "The public site does not treat unverified company or manufacturing information as proof.",
    items: [
      "Legal company entity requires final confirmation.",
      "Public company address requires final confirmation.",
      "Certification subject, scope and validity require approved records.",
      "Production capacity requires approved production data.",
      "Market coverage requires approved commercial data.",
    ],
  },
  cta: {
    kicker: "START A PROJECT",
    title: "Bring the product direction. We’ll review the route.",
    copy: "Share the dosage form, formula direction, intended pack and expected volume through the configured inquiry channels.",
    action: { label: "Start a Project", href: "/contact" },
  },
});
```

- [ ] **Step 5: Expose the record through the adapter**

In `src/lib/adapters/content-adapter.ts`, import `B2BAboutPage` and add:

```ts
getB2BAboutPage(): Promise<B2BAboutPage>;
```

In `src/lib/content.ts`, import the fixture and schema, parse once beside the other B2B records, and add:

```ts
const b2bAboutPage = B2BAboutPageSchema.parse(vitheloB2BAboutPage);

// inside localContentAdapter
async getB2BAboutPage() {
  return b2bAboutPage;
},
```

- [ ] **Step 6: Run the content test**

Run:

```powershell
pnpm.cmd test -- tests/unit/vithelo-about-content.test.ts
```

Expected: 2 tests PASS.

- [ ] **Step 7: Commit only the content boundary**

```powershell
git add src/content/schema.ts src/content/demo/vithelo-about-page.ts src/lib/adapters/content-adapter.ts src/lib/content.ts tests/unit/vithelo-about-content.test.ts
git commit -m "feat(about): add validated page content"
```

### Task 2: Build the semantic About composition

**Files:**
- Create: `tests/unit/vithelo-about-page.test.tsx`
- Create: `src/components/patterns/vithelo-about-page.tsx`
- Create: `src/components/patterns/vithelo-about-page.module.css`
- Modify: `src/app/about/page.tsx`

- [ ] **Step 1: Read the installed Next.js 16 guidance before editing**

Read these repository-local files completely:

```text
node_modules/next/dist/docs/01-app/01-getting-started/03-layouts-and-pages.md
node_modules/next/dist/docs/01-app/01-getting-started/12-images.md
node_modules/next/dist/docs/01-app/01-getting-started/14-metadata-and-og-images.md
```

- [ ] **Step 2: Write the failing component test**

Create `tests/unit/vithelo-about-page.test.tsx`:

```tsx
import { render, screen, within } from "@testing-library/react";
import { VitheloAboutPage } from "@/components/patterns/vithelo-about-page";
import { vitheloB2BAboutPage } from "@/content/demo/vithelo-about-page";

it("renders the seven-part About narrative with one h1", () => {
  const { container } = render(<VitheloAboutPage content={vitheloB2BAboutPage} />);

  expect(container.querySelectorAll("h1")).toHaveLength(1);
  expect(screen.getAllByTestId("about-section")).toHaveLength(7);
  expect(screen.getByRole("heading", { name: /Purpose in every decision/i })).toBeInTheDocument();
  expect(screen.getAllByRole("link", { name: "Start a Project" })).toHaveLength(2);
  expect(screen.getAllByRole("link", { name: "Start a Project" })[0]).toHaveAttribute("href", "/contact");
});

it("keeps all eight formats in one section", () => {
  render(<VitheloAboutPage content={vitheloB2BAboutPage} />);
  const formats = screen.getByTestId("about-formats");

  expect(within(formats).getAllByRole("link")).toHaveLength(8);
  expect(within(formats).getByRole("link", { name: "Oral Films" })).toHaveAttribute(
    "href",
    "/products/oral-films",
  );
});

it("renders verification boundaries as visible text", () => {
  render(<VitheloAboutPage content={vitheloB2BAboutPage} />);
  const boundary = screen.getByTestId("about-boundary");

  expect(boundary).toHaveTextContent("Legal company entity requires final confirmation.");
  expect(boundary).toHaveTextContent("Production capacity requires approved production data.");
});
```

- [ ] **Step 3: Run the component test and verify the missing component fails**

Run:

```powershell
pnpm.cmd test -- tests/unit/vithelo-about-page.test.tsx
```

Expected: FAIL because `VitheloAboutPage` does not exist.

- [ ] **Step 4: Implement the page component**

Create `src/components/patterns/vithelo-about-page.tsx` as a server component. Use `next/image` for all media and `next/link` for actions. The top-level contract is:

```tsx
import Image from "next/image";
import Link from "next/link";
import styles from "@/components/patterns/vithelo-about-page.module.css";
import type { B2BAboutPage } from "@/content/schema";

const sectionProps = (name: string) => ({
  "data-testid": "about-section",
  "data-section": name,
});

function DemoImage({
  media,
  sizes,
  priority = false,
}: {
  media: B2BAboutPage["hero"]["media"];
  sizes: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={media.src}
      alt={media.alt}
      width={media.width}
      height={media.height}
      sizes={sizes}
      priority={priority}
    />
  );
}

export function VitheloAboutPage({ content }: { content: B2BAboutPage }) {
  return (
    <main className={styles.page} data-content-status={content.dataStatus} data-ui-stage="about-architectural-ledger">
      <section {...sectionProps("hero")} data-header-hero className={styles.hero}>
        <DemoImage media={content.hero.media} sizes="100vw" priority />
        <div className={styles.heroShade} aria-hidden="true" />
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>{content.hero.kicker}</p>
          <h1>{content.hero.title}</h1>
          <p>{content.hero.copy}</p>
          <div className={styles.actions}>
            <Link href={content.hero.primaryAction.href}>{content.hero.primaryAction.label}</Link>
            <Link href={content.hero.secondaryAction.href}>{content.hero.secondaryAction.label}</Link>
          </div>
        </div>
      </section>

      <div className={styles.paperBody}>
        <section {...sectionProps("role")} className={styles.role}>
          <div className={styles.roleCopy}>
            <p className={styles.kicker}>{content.role.kicker}</p>
            <h2>{content.role.title}</h2>
            <p>{content.role.copy}</p>
          </div>
          <figure className={styles.roleMedia}>
            <DemoImage media={content.role.media} sizes="(max-width: 720px) 100vw, 42vw" />
          </figure>
        </section>

        <section {...sectionProps("principles")} className={styles.principles} aria-labelledby="principles-title">
          <p className={styles.kicker} id="principles-title">HOW WE WORK</p>
          <div className={styles.ledger}>
            {content.principles.map((item, index) => (
              <article key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h2>{item.title}</h2>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section {...sectionProps("capabilities")} className={styles.capabilities}>
          <div className={styles.capabilityIntro}>
            <p className={styles.kicker}>{content.capabilities.kicker}</p>
            <h2>{content.capabilities.title}</h2>
            <p>{content.capabilities.copy}</p>
          </div>
          <figure className={styles.capabilityMedia}>
            <DemoImage media={content.capabilities.media} sizes="100vw" />
          </figure>
          <div className={styles.capabilityList}>
            {content.capabilities.items.map((item, index) => (
              <article key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section {...sectionProps("formats")} className={styles.formats}>
          <figure className={styles.formatMedia}>
            <DemoImage media={content.formats.media} sizes="100vw" />
          </figure>
          <div className={styles.formatCopy}>
            <p className={styles.kicker}>{content.formats.kicker}</p>
            <h2>{content.formats.title}</h2>
            <p>{content.formats.copy}</p>
            <nav data-testid="about-formats" aria-label="Explore dosage formats">
              {content.formats.items.map((item, index) => (
                <Link href={item.href} key={item.href}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </section>

        <section {...sectionProps("collaboration")} className={styles.collaboration}>
          <header>
            <p className={styles.kicker}>{content.collaboration.kicker}</p>
            <h2>{content.collaboration.title}</h2>
            <p>{content.collaboration.copy}</p>
          </header>
          <div className={styles.collaborationList}>
            {content.collaboration.items.map((item, index) => (
              <article key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{item.title}</h3><p>{item.copy}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section {...sectionProps("closing")} className={styles.closing}>
          <div className={styles.boundary} data-testid="about-boundary">
            <div>
              <p className={styles.kicker}>{content.boundary.kicker}</p>
              <h2>{content.boundary.title}</h2>
              <p>{content.boundary.copy}</p>
            </div>
            <ul>{content.boundary.items.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div className={styles.cta}>
            <p className={styles.kicker}>{content.cta.kicker}</p>
            <h2>{content.cta.title}</h2>
            <p>{content.cta.copy}</p>
            <Link href={content.cta.action.href}>{content.cta.action.label}</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
```

- [ ] **Step 5: Add a compile-safe CSS Module shell**

Create `src/components/patterns/vithelo-about-page.module.css` with the class names used by the component. Keep this first version deliberately minimal; Task 3 replaces it with the approved visual system.

```css
.page {}
.hero {}
.heroShade {}
.heroCopy {}
.kicker {}
.actions {}
.paperBody {}
.role {}
.roleCopy {}
.roleMedia {}
.principles {}
.ledger {}
.capabilities {}
.capabilityIntro {}
.capabilityMedia {}
.capabilityList {}
.formats {}
.formatMedia {}
.formatCopy {}
.collaboration {}
.collaborationList {}
.closing {}
.boundary {}
.cta {}
```

- [ ] **Step 6: Route validated content into the component**

Replace `src/app/about/page.tsx` with:

```tsx
import type { Metadata } from "next";
import { VitheloAboutPage } from "@/components/patterns/vithelo-about-page";
import { localContentAdapter } from "@/lib/content";

export const metadata: Metadata = {
  title: "About VITHELO | Nutrition OEM / ODM",
  description: "How VITHELO connects nutrition product definition, development, manufacturing review and project support.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const content = await localContentAdapter.getB2BAboutPage();
  return <VitheloAboutPage content={content} />;
}
```

- [ ] **Step 7: Run the component tests**

Run:

```powershell
pnpm.cmd test -- tests/unit/vithelo-about-page.test.tsx tests/unit/vithelo-about-content.test.ts
```

Expected: 5 tests PASS.

- [ ] **Step 8: Commit the semantic composition**

```powershell
git add src/app/about/page.tsx src/components/patterns/vithelo-about-page.tsx src/components/patterns/vithelo-about-page.module.css tests/unit/vithelo-about-page.test.tsx
git commit -m "feat(about): add semantic page composition"
```

### Task 3: Implement the approved Nordicus-inspired visual system

**Files:**
- Modify: `src/components/patterns/vithelo-about-page.module.css`
- Modify: `src/styles/tokens.css`
- Modify: `tests/e2e/global-header.spec.ts`

- [ ] **Step 1: Add the reusable pure-white token**

In the light `:root` block of `src/styles/tokens.css`, add:

```css
--color-paper: #fff;
```

Do not change existing homepage tokens or dark-theme values.

- [ ] **Step 2: Create the CSS Module with the approved geometry**

Replace the compile-safe contents of `src/components/patterns/vithelo-about-page.module.css` with these non-negotiable rules:

```css
.page {
  overflow: clip;
  background: #252c2c;
  color: var(--color-graphite);
}

.page img { display: block; width: 100%; height: 100%; object-fit: cover; }
.hero { position: relative; display: flex; min-height: max(760px, 96svh); align-items: flex-end; color: #fff; }
.hero > img { position: absolute; inset: 0; object-position: 52% 54%; filter: saturate(.62) contrast(1.02) hue-rotate(150deg); }
.heroShade { position: absolute; inset: 0; background: linear-gradient(90deg, rgb(12 18 18 / 84%), rgb(22 31 32 / 48%) 50%, transparent 78%), linear-gradient(0deg, rgb(10 14 14 / 68%), transparent 48%); }
.heroCopy { position: relative; z-index: 1; width: min(calc(100% - 96px), 1320px); margin: 0 auto clamp(96px, 12vh, 148px); }
.heroCopy h1 { max-width: 980px; margin: 1rem 0 0; font-size: clamp(3.4rem, 7vw, 7.5rem); font-weight: 430; letter-spacing: -.068em; line-height: .91; }
.heroCopy > p:not(.kicker) { max-width: 660px; margin: 1.5rem 0 0; color: rgb(255 255 255 / 78%); font-size: clamp(1rem, 1.35vw, 1.18rem); }
.kicker { margin: 0; font-size: .68rem; font-weight: 650; letter-spacing: .18em; text-transform: uppercase; }
.actions { display: flex; flex-wrap: wrap; gap: .75rem; margin-top: 2rem; }
.actions a, .cta > a { min-height: 48px; display: inline-flex; align-items: center; justify-content: center; padding: .85rem 1.25rem; border: 1px solid rgb(255 255 255 / 70%); color: inherit; font-size: .75rem; letter-spacing: .08em; text-decoration: none; text-transform: uppercase; }
.actions a:first-child, .cta > a { background: #fff; color: var(--color-graphite); }

.paperBody { position: relative; z-index: 2; margin-top: -32px; border-radius: 32px 32px 0 0; background: var(--color-paper); }
.role, .principles, .collaboration, .boundary { width: min(calc(100% - 96px), 1320px); margin-inline: auto; padding-block: clamp(88px, 10vw, 160px); }
.role { display: grid; grid-template-columns: minmax(0, 1fr) minmax(360px, .8fr); gap: clamp(48px, 8vw, 120px); align-items: center; }
.roleCopy h2, .capabilityIntro h2, .formatCopy h2, .collaboration h2, .boundary h2, .cta h2 { margin: 1rem 0 0; font-size: clamp(2.7rem, 5.4vw, 6rem); font-weight: 430; letter-spacing: -.06em; line-height: .94; }
.roleCopy > p:last-child, .capabilityIntro > p:last-child, .formatCopy > p, .collaboration header > p:last-child, .boundary > div > p:last-child, .cta > p { color: var(--color-muted); line-height: 1.65; }
.roleMedia { min-height: 560px; margin: 0; overflow: hidden; border-radius: var(--radius-cinematic); }

.principles { padding-top: 24px; }
.ledger { margin-top: 2.25rem; border-bottom: 1px solid var(--color-border); }
.ledger article { display: grid; grid-template-columns: 72px minmax(220px, .7fr) minmax(0, 1fr); gap: 2rem; align-items: start; border-top: 1px solid var(--color-border); padding-block: 1.65rem; }
.ledger span, .capabilityList span, .collaborationList span { color: #7f8988; font-size: .68rem; letter-spacing: .14em; }
.ledger h2, .capabilityList h3, .collaborationList h3 { margin: 0; font-size: clamp(1.25rem, 2vw, 2rem); font-weight: 500; letter-spacing: -.03em; }
.ledger p, .capabilityList p, .collaborationList p { max-width: 42rem; margin: 0; color: var(--color-muted); line-height: 1.6; }

.capabilities { display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(380px, .95fr); background: #171b1a; color: #f6f7f3; }
.capabilityIntro { padding: clamp(80px, 10vw, 150px) max(48px, calc((100vw - 1320px) / 2)); padding-right: clamp(48px, 8vw, 120px); }
.capabilityIntro > p:last-child { color: rgb(246 247 243 / 66%); }
.capabilityMedia { min-height: 700px; margin: 0; overflow: hidden; }
.capabilityList { grid-column: 1 / -1; display: grid; grid-template-columns: repeat(4, 1fr); border-top: 1px solid rgb(255 255 255 / 18%); }
.capabilityList article { min-height: 260px; padding: 2.5rem; border-right: 1px solid rgb(255 255 255 / 18%); }
.capabilityList h3 { margin-top: 2.5rem; }
.capabilityList p { margin-top: 1rem; color: rgb(246 247 243 / 60%); }

.formats { position: relative; min-height: 900px; color: #fff; }
.formatMedia, .formatMedia img { position: absolute; inset: 0; width: 100%; height: 100%; margin: 0; }
.formatMedia::after { position: absolute; inset: 0; background: linear-gradient(90deg, rgb(15 20 19 / 84%), rgb(15 20 19 / 38%) 62%, transparent), linear-gradient(0deg, rgb(12 16 15 / 48%), transparent); content: ""; }
.formatCopy { position: relative; z-index: 1; width: min(calc(100% - 96px), 1320px); margin-inline: auto; padding-block: clamp(100px, 12vw, 168px); }
.formatCopy > p { max-width: 570px; color: rgb(255 255 255 / 70%); }
.formatCopy nav { width: min(680px, 100%); margin-top: 3rem; border-bottom: 1px solid rgb(255 255 255 / 34%); }
.formatCopy nav a { display: grid; grid-template-columns: 64px 1fr; min-height: 58px; align-items: center; border-top: 1px solid rgb(255 255 255 / 34%); color: #fff; text-decoration: none; }
.formatCopy nav span { color: rgb(255 255 255 / 54%); font-size: .66rem; letter-spacing: .14em; }

.collaboration { display: grid; grid-template-columns: minmax(0, .9fr) minmax(0, 1.1fr); gap: clamp(56px, 9vw, 140px); }
.collaborationList { border-bottom: 1px solid var(--color-border); }
.collaborationList article { display: grid; grid-template-columns: 58px minmax(0, 1fr); gap: 1.5rem; border-top: 1px solid var(--color-border); padding-block: 1.7rem; }
.collaborationList p { margin-top: .7rem; }

.boundary { display: grid; grid-template-columns: minmax(0, .8fr) minmax(0, 1fr); gap: clamp(48px, 8vw, 120px); border-top: 1px solid var(--color-border); }
.boundary ul { margin: 0; padding: 0; list-style: none; }
.boundary li { border-top: 1px solid var(--color-border); padding: 1.2rem 0; color: var(--color-muted); }
.boundary li:last-child { border-bottom: 1px solid var(--color-border); }

.cta { padding: clamp(100px, 14vw, 190px) max(48px, calc((100vw - 1320px) / 2)); background: #171b1a; color: #fff; text-align: center; }
.cta h2, .cta > p { max-width: 900px; margin-inline: auto; }
.cta > p { max-width: 660px; color: rgb(255 255 255 / 66%); }
.cta > a { margin-top: 2rem; }

.page a:focus-visible { outline: 2px solid currentColor; outline-offset: 4px; }

@media (max-width: 900px) {
  .heroCopy, .role, .principles, .formatCopy, .collaboration, .boundary { width: min(calc(100% - 56px), 760px); }
  .role, .collaboration, .boundary { grid-template-columns: 1fr; }
  .capabilities { grid-template-columns: 1fr 1fr; }
  .capabilityList { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 620px) {
  .hero { min-height: 760px; }
  .heroCopy, .role, .principles, .formatCopy, .collaboration, .boundary { width: calc(100% - 32px); }
  .heroCopy { margin-bottom: 4.5rem; }
  .heroCopy h1 { font-size: clamp(3rem, 14vw, 4.4rem); }
  .actions { align-items: stretch; flex-direction: column; }
  .paperBody { margin-top: -22px; border-radius: 22px 22px 0 0; }
  .role { grid-template-columns: 1fr; }
  .roleMedia { min-height: 400px; }
  .ledger article { grid-template-columns: 42px 1fr; gap: 1rem; }
  .ledger p { grid-column: 2; }
  .capabilities { grid-template-columns: 1fr; }
  .capabilityIntro { padding: 78px 16px; }
  .capabilityMedia { min-height: 500px; }
  .capabilityList { grid-template-columns: 1fr; }
  .capabilityList article { min-height: 0; padding: 2rem 1rem; border-right: 0; border-top: 1px solid rgb(255 255 255 / 18%); }
  .formats { min-height: 820px; }
  .collaboration, .boundary { gap: 3rem; }
  .cta { padding: 90px 16px; }
}

@media (prefers-reduced-motion: reduce) {
  .page *, .page *::before, .page *::after { animation-duration: 0s !important; transition-duration: 0s !important; }
}
```

During visual QA, tune only object positions, line lengths and spacing required to remove P0/P1 defects. Do not add gradients, colors or motion outside the approved system.

- [ ] **Step 3: Update the header theme contract**

In `tests/e2e/global-header.spec.ts`, change only the `/about` row:

```ts
["/about", "dark-hero", "/about"],
```

- [ ] **Step 4: Run focused unit tests and type checking**

Run:

```powershell
pnpm.cmd test -- tests/unit/vithelo-about-content.test.ts tests/unit/vithelo-about-page.test.tsx tests/unit/route-shell.test.tsx
pnpm.cmd typecheck
```

Expected: all focused tests PASS and typecheck exits 0.

- [ ] **Step 5: Commit the visual system**

```powershell
git add src/styles/tokens.css src/components/patterns/vithelo-about-page.module.css tests/e2e/global-header.spec.ts
git commit -m "style(about): add architectural visual system"
```

### Task 4: Add responsive and evidence-boundary E2E coverage

**Files:**
- Create: `tests/e2e/vithelo-about.spec.ts`
- Modify: `tests/e2e/vithelo-b2b-site.spec.ts`

- [ ] **Step 1: Write the About acceptance test**

Create `tests/e2e/vithelo-about.spec.ts`:

```ts
import { expect, test } from "@playwright/test";

test("About preserves the approved narrative and geometry", async ({ page }) => {
  await page.goto("/about");
  const main = page.locator("main");

  await expect(main).toHaveAttribute("data-ui-stage", "about-architectural-ledger");
  await expect(main.locator("h1")).toHaveCount(1);
  await expect(page.getByTestId("about-section")).toHaveCount(7);
  await expect(page.getByTestId("about-formats").getByRole("link")).toHaveCount(8);
  await expect(page.getByTestId("about-boundary")).toContainText("requires final confirmation");

  const paper = page.locator('[data-section="role"]').locator("xpath=parent::*");
  const paperBox = await paper.boundingBox();
  expect(paperBox?.x).toBe(0);
  expect(paperBox?.width).toBe(await page.evaluate(() => innerWidth));

  const width = await page.evaluate(() => ({
    client: document.documentElement.clientWidth,
    scroll: document.documentElement.scrollWidth,
  }));
  expect(width.scroll).toBeLessThanOrEqual(width.client + 1);
});

test("About keeps navigation and CTAs keyboard reachable", async ({ page }) => {
  await page.goto("/about");
  const links = page.locator("main a");

  for (let index = 0; index < (await links.count()); index += 1) {
    const link = links.nth(index);
    const box = await link.boundingBox();
    expect(box?.height).toBeGreaterThanOrEqual(44);
  }

  await page.getByRole("link", { name: "Explore Our Capabilities" }).focus();
  await expect(page.getByRole("link", { name: "Explore Our Capabilities" })).toBeFocused();
});

test("About exposes final content with Reduced Motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/about");

  await expect(page.getByTestId("about-section")).toHaveCount(7);
  await expect(page.getByText("Documents before claims.")).toBeVisible();
  const duration = await page.locator("main").evaluate((element) =>
    parseFloat(getComputedStyle(element).transitionDuration),
  );
  expect(duration).toBeLessThanOrEqual(0.00001);
});
```

- [ ] **Step 2: Add `/about` to the public evidence scan**

In `tests/e2e/vithelo-b2b-site.spec.ts`, add `"/about"` to `publicRoutes`. Extend the premium-shell loop with:

```ts
["/about", "about-architectural-ledger"],
```

Do not weaken the forbidden-copy regular expression.

- [ ] **Step 3: Run all six viewport projects**

Run:

```powershell
pnpm.cmd exec playwright test tests/e2e/vithelo-about.spec.ts tests/e2e/global-header.spec.ts --workers=4
```

Expected: all tests PASS across `desktop-1440`, `desktop-1280`, `tablet-1024`, `tablet-768`, `mobile-390`, and `mobile-375`.

- [ ] **Step 4: Capture targeted visual evidence**

Start the app only if no suitable local server is already running, then capture `/about` at 1440×1000, 768×1024 and 390×844. Inspect:

- the paper body reaches both viewport edges;
- the top radius does not create grey side gutters;
- hero copy clears the fixed header;
- the factory image remains a demonstration scene, not a claim;
- ledger rows and the eight-format index do not overflow;
- mobile buttons are at least 44px high;
- no section resembles a generic elevated-card grid.

If a defect is found, patch only `vithelo-about-page.module.css` or the About fixture copy, rerun the focused unit and E2E tests, and repeat the screenshot check.

- [ ] **Step 5: Commit E2E coverage**

```powershell
git add tests/e2e/vithelo-about.spec.ts tests/e2e/vithelo-b2b-site.spec.ts src/components/patterns/vithelo-about-page.module.css
git commit -m "test(about): cover responsive page acceptance"
```

### Task 5: Run the release-quality gates and document the result

**Files:**
- Modify: `docs/current-status.md`

- [ ] **Step 1: Run the required quality gates**

Run in order:

```powershell
pnpm.cmd lint
pnpm.cmd typecheck
pnpm.cmd test
pnpm.cmd exec playwright test tests/e2e/vithelo-about.spec.ts tests/e2e/global-header.spec.ts tests/e2e/vithelo-b2b-site.spec.ts --workers=4
pnpm.cmd build
```

Expected: each command exits 0. Record the actual pass counts. Do not claim full E2E green unless the complete `pnpm.cmd test:e2e` suite is also run and passes.

- [ ] **Step 2: Review the final diff for surgical scope**

Run:

```powershell
git diff --check
git status --short
git diff -- src/app/about/page.tsx src/components/patterns/vithelo-about-page.tsx src/components/patterns/vithelo-about-page.module.css src/content/demo/vithelo-about-page.ts src/content/schema.ts src/lib/adapters/content-adapter.ts src/lib/content.ts src/styles/tokens.css tests/unit/vithelo-about-content.test.ts tests/unit/vithelo-about-page.test.tsx tests/e2e/vithelo-about.spec.ts tests/e2e/global-header.spec.ts tests/e2e/vithelo-b2b-site.spec.ts
```

Verify that every changed line maps to the approved About page, its content boundary, tests or status record.

- [ ] **Step 3: Update current status in Chinese**

Add a concise dated entry to `docs/current-status.md` that records:

- `/about` now uses the Architectural Ledger direction;
- Nordicus contributes visual structure and Yile contributes content categories only;
- the page uses pure-white edge-to-edge content surfaces;
- claims and manufacturing imagery remain `DEMO_ONLY` or pending verification;
- the exact commands and actual pass counts from Step 1;
- final visual acceptance remains pending until the user sees the implemented page.

- [ ] **Step 4: Commit only the completed About work**

Stage the exact About-related files, inspect `git diff --cached --stat`, then commit:

```powershell
git commit -m "feat: build VITHELO about page"
```

Do not push or deploy; neither action is part of this request.
