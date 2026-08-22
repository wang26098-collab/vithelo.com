# VITHELO B2B Inquiry Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the existing A PRIME demonstration into a VITHELO-branded, B2B-first experience whose primary conversions are user-controlled Email Inquiry and WhatsApp inquiry.

**Architecture:** Preserve the existing token, component, schema, adapter, and page-pattern layers. Add validated site/contact configuration, pure inquiry-link builders, reusable inquiry actions, and a focused contact route; then recompose Home and Professional around those primitives without inventing contact details, claims, or product facts.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 5, Tailwind CSS 4, Radix Dialog, Motion, Zod 4, Vitest, Testing Library, Playwright.

---

## Scope and file map

This is an incremental redesign. The current schema-driven products, evidence, safety, utility routes, motion primitives, and quality infrastructure remain in place.

Files to create:

- `src/content/site-config.ts`: validated brand and contact configuration.
- `src/content/demo/home.ts`: validated B2B-first Home content.
- `src/lib/inquiry.ts`: pure email and WhatsApp URL builders.
- `src/components/core/brand-mark.tsx`: VITHELO wordmark treatment with accessible text fallback.
- `src/components/core/inquiry-action-pair.tsx`: consistent Email Inquiry and WhatsApp actions.
- `src/components/core/mobile-inquiry-bar.tsx`: mobile-only sticky inquiry actions.
- `src/app/contact/page.tsx`: dedicated Start a Project route.
- `tests/unit/site-config.test.ts`: brand/contact validation.
- `tests/unit/inquiry-links.test.ts`: exact email and WhatsApp link behavior.
- `tests/unit/inquiry-actions.test.tsx`: configured and missing-configuration action states.
- `tests/unit/home-inquiry.test.tsx`: Home conversion hierarchy.
- `tests/e2e/inquiry-journeys.spec.ts`: cross-route inquiry journeys.
- `public/media/vithelo-hero-composite.png`: approved desktop Home visual.
- `public/media/vithelo-hero-composite-mobile.png`: approved mobile Home visual.

Files to modify:

- `src/content/schema.ts`: add Home and site configuration schemas.
- `src/app/layout.tsx`: VITHELO metadata, brand contract, and mobile inquiry bar.
- `src/components/core/navigation.ts`: Capabilities and Start a Project structure.
- `src/components/core/site-header.tsx`: VITHELO mark and primary inquiry action.
- `src/components/core/mobile-menu.tsx`: Start a Project entry and updated navigation.
- `src/components/domain/project-intake.tsx`: local context builder plus channel choice.
- `src/components/patterns/home-page.tsx`: selected A direction.
- `src/components/patterns/professional-page.tsx`: contextual inquiry path.
- `src/components/patterns/nutrition-pdp.tsx`: contextual inquiry action.
- `src/components/patterns/device-pdp.tsx`: contextual inquiry action.
- `src/styles/tokens.css`: VITHELO Optical color calibration and removal of editorial-serif dependence.
- Existing unit and e2e tests that still assert A PRIME or legacy navigation.
- `docs/visual-qa.md` and `docs/missing-production-inputs.md`: acceptance evidence and contact gaps.

## Task 1: Add validated VITHELO site and Home configuration

**Files:**

- Modify: `src/content/schema.ts`
- Create: `src/content/site-config.ts`
- Create: `src/content/demo/home.ts`
- Create: `tests/unit/site-config.test.ts`

- [ ] **Step 1: Write the failing configuration tests**

Create `tests/unit/site-config.test.ts`:

```ts
import { HomeContentSchema, SiteConfigSchema } from "@/content/schema";
import { demoHome } from "@/content/demo/home";
import { siteConfig } from "@/content/site-config";

describe("VITHELO site configuration", () => {
  it("uses the approved master brand and visible signature", () => {
    const parsed = SiteConfigSchema.parse(siteConfig);
    expect(parsed.brand.name).toBe("VITHELO");
    expect(parsed.brand.signature).toBe("PRECISION · SCIENCE · HUMAN");
  });

  it("keeps unavailable contact channels explicit", () => {
    const parsed = SiteConfigSchema.parse(siteConfig);
    expect(parsed.contact.email.status).toBe("NOT_CONFIGURED");
    expect(parsed.contact.email.value).toBeNull();
    expect(parsed.contact.whatsapp.status).toBe("NOT_CONFIGURED");
    expect(parsed.contact.whatsapp.e164).toBeNull();
  });

  it("validates the B2B-first Home content", () => {
    const parsed = HomeContentSchema.parse(demoHome);
    expect(parsed.dataStatus).toBe("DEMO_ONLY");
    expect(parsed.hero.primaryAction).toBe("email");
    expect(parsed.hero.secondaryAction).toBe("whatsapp");
    expect(parsed.capabilities).toHaveLength(5);
  });
});
```

- [ ] **Step 2: Run the test and verify the expected failure**

Run:

```powershell
pnpm.cmd test -- tests/unit/site-config.test.ts
```

Expected: FAIL because `SiteConfigSchema`, `HomeContentSchema`, and their records do not exist.

- [ ] **Step 3: Add the schemas**

Append these contracts to `src/content/schema.ts`:

```ts
const MissingEmailConfigSchema = z.object({
  status: z.literal("NOT_CONFIGURED"),
  value: z.null(),
  message: z.string().min(1),
});

const ConfiguredEmailSchema = z.object({
  status: z.literal("CONFIGURED"),
  value: z.string().email(),
  message: z.string().min(1),
});

const MissingWhatsAppConfigSchema = z.object({
  status: z.literal("NOT_CONFIGURED"),
  e164: z.null(),
  message: z.string().min(1),
});

const ConfiguredWhatsAppSchema = z.object({
  status: z.literal("CONFIGURED"),
  e164: z.string().regex(/^\d{8,15}$/),
  message: z.string().min(1),
});

export const SiteConfigSchema = z.object({
  brand: z.object({
    name: z.literal("VITHELO"),
    signature: z.literal("PRECISION · SCIENCE · HUMAN"),
    designFormula: z.literal("HUMAN × MATERIAL × PRECISION"),
  }),
  contact: z.object({
    email: z.discriminatedUnion("status", [MissingEmailConfigSchema, ConfiguredEmailSchema]),
    whatsapp: z.discriminatedUnion("status", [MissingWhatsAppConfigSchema, ConfiguredWhatsAppSchema]),
  }),
});

export const HomeContentSchema = z.object({
  dataStatus: DataStatusSchema,
  hero: z.object({
    headline: z.string().min(1),
    supportingText: z.string().min(1),
    primaryAction: z.literal("email"),
    secondaryAction: z.literal("whatsapp"),
    desktopMedia: MediaSchema,
    mobileMedia: MediaSchema,
  }),
  partnerPaths: z.array(z.object({
    id: z.enum(["product-partners", "professional-partners"]),
    title: z.string().min(1),
    summary: z.string().min(1),
    intentIds: z.array(z.string().min(1)).min(1),
    preferredChannel: z.enum(["email", "whatsapp"]),
  })).length(2),
  capabilities: z.array(z.object({
    id: z.string().min(1),
    title: z.string().min(1),
    summary: z.string().min(1),
    inquiryContext: z.string().min(1),
  })).length(5),
});

export type SiteConfig = z.infer<typeof SiteConfigSchema>;
export type HomeContent = z.infer<typeof HomeContentSchema>;
```

- [ ] **Step 4: Add the actual missing configuration and demo Home record**

Create `src/content/site-config.ts`:

```ts
import { SiteConfigSchema } from "@/content/schema";

export const siteConfig = SiteConfigSchema.parse({
  brand: {
    name: "VITHELO",
    signature: "PRECISION · SCIENCE · HUMAN",
    designFormula: "HUMAN × MATERIAL × PRECISION",
  },
  contact: {
    email: {
      status: "NOT_CONFIGURED",
      value: null,
      message: "Email inquiry address not configured",
    },
    whatsapp: {
      status: "NOT_CONFIGURED",
      e164: null,
      message: "WhatsApp number not configured",
    },
  },
});
```

Create `src/content/demo/home.ts`:

```ts
import { HomeContentSchema } from "@/content/schema";

export const demoHome = HomeContentSchema.parse({
  dataStatus: "DEMO_ONLY",
  hero: {
    headline: "Precision for what comes next.",
    supportingText: "Nutrition and aesthetic technology developed for brands, distributors, and professional partners.",
    primaryAction: "email",
    secondaryAction: "whatsapp",
    desktopMedia: {
      status: "NOT_CONFIGURED",
      alt: "VITHELO nutrition and aesthetic technology product-world composition",
    },
    mobileMedia: {
      status: "NOT_CONFIGURED",
      alt: "VITHELO product-world composition for mobile",
    },
  },
  partnerPaths: [
    {
      id: "product-partners",
      title: "For Product Partners",
      summary: "Product development, private label, OEM / ODM, and distribution context.",
      intentIds: ["develop", "private-label", "oem-odm", "distribution"],
      preferredChannel: "email",
    },
    {
      id: "professional-partners",
      title: "For Professional Partners",
      summary: "Aesthetic technology, clinic, studio, and professional system context.",
      intentIds: ["professional-systems", "device-distribution"],
      preferredChannel: "whatsapp",
    },
  ],
  capabilities: [
    { id: "product-development", title: "Product Development", summary: "Approved scope and product inputs required.", inquiryContext: "Product Development" },
    { id: "formulation-system", title: "Formulation / System Development", summary: "Approved formula or system inputs required.", inquiryContext: "Formulation / System Development" },
    { id: "private-label", title: "Private Label", summary: "Approved category and market inputs required.", inquiryContext: "Private Label" },
    { id: "professional-technology", title: "Professional Technology", summary: "Approved device and professional-use inputs required.", inquiryContext: "Professional Technology" },
    { id: "distribution-support", title: "Distribution Support", summary: "Approved portfolio and market inputs required.", inquiryContext: "Distribution Support" },
  ],
});
```

- [ ] **Step 5: Verify and commit**

Run:

```powershell
pnpm.cmd test -- tests/unit/site-config.test.ts
pnpm.cmd typecheck
```

Expected: both commands exit with code 0.

Commit:

```powershell
git add src/content/schema.ts src/content/site-config.ts src/content/demo/home.ts tests/unit/site-config.test.ts
git commit -m "feat: add validated Vithelo site configuration"
```

## Task 2: Replace the temporary brand shell and navigation

**Files:**

- Create: `src/components/core/brand-mark.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/components/core/navigation.ts`
- Modify: `src/components/core/site-header.tsx`
- Modify: `src/components/core/mobile-menu.tsx`
- Modify: `tests/unit/app-shell.test.tsx`
- Modify: `tests/unit/site-header.test.tsx`

- [ ] **Step 1: Rewrite the shell tests to express the VITHELO contract**

Use these assertions in `tests/unit/app-shell.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

it("renders the VITHELO brand and demo disclosure", () => {
  render(<HomePage />);
  expect(screen.getByText("VITHELO")).toBeInTheDocument();
  expect(screen.getByText(/demonstration content/i)).toBeInTheDocument();
});
```

Replace the link list in `tests/unit/site-header.test.tsx` with:

```tsx
for (const label of [
  "Nutrition",
  "Aesthetic Technology",
  "Capabilities",
  "Science",
  "Professional",
]) {
  expect(screen.getAllByRole("link", { name: label })[0]).toBeVisible();
}
expect(screen.getByRole("link", { name: "Start a Project" })).toHaveAttribute("href", "/contact");
```

- [ ] **Step 2: Run the focused tests and verify failure**

Run:

```powershell
pnpm.cmd test -- tests/unit/app-shell.test.tsx tests/unit/site-header.test.tsx
```

Expected: FAIL on A PRIME, By Need, and the absent Start a Project action.

- [ ] **Step 3: Add the brand mark component**

Create `src/components/core/brand-mark.tsx`:

```tsx
import Link from "next/link";
import { siteConfig } from "@/content/site-config";

type BrandMarkProps = { showSignature?: boolean };

export function BrandMark({ showSignature = false }: BrandMarkProps) {
  return (
    <Link aria-label="VITHELO home" className="inline-flex min-h-11 flex-col justify-center no-underline" href="/">
      <span className="text-sm font-medium tracking-[0.28em] text-[var(--color-foreground)]">
        {siteConfig.brand.name}
      </span>
      {showSignature ? (
        <span className="mt-1 text-[0.625rem] tracking-[0.16em] text-[var(--color-muted)]">
          {siteConfig.brand.signature}
        </span>
      ) : null}
    </Link>
  );
}
```

- [ ] **Step 4: Update metadata, direction contract, navigation, and header**

Set `metadata` in `src/app/layout.tsx` to:

```ts
export const metadata: Metadata = {
  title: "VITHELO",
  description: "Nutrition and aesthetic technology for product and professional partners.",
};
```

Replace the navigation arrays in `src/components/core/navigation.ts` with:

```ts
export const primaryNavigation = [
  { label: "Nutrition", href: "/nutrition" },
  { label: "Aesthetic Technology", href: "/aesthetic-technology" },
  { label: "Capabilities", href: "/professional#capabilities" },
  { label: "Science", href: "/science" },
  { label: "Professional", href: "/professional" },
] as const;

export const secondaryNavigation = [
  { label: "Support", href: "/support" },
] as const;

export const utilityNavigation = [
  { label: "Search", href: "/search" },
] as const;
```

In `src/components/core/site-header.tsx`, replace the A PRIME link with `<BrandMark />`, remove Account and Cart utilities, and add this action before the mobile menu:

```tsx
<Button asChild className="hidden xl:inline-flex" size="small">
  <Link href="/contact">Start a Project</Link>
</Button>
```

In `src/components/core/mobile-menu.tsx`, render a `Start a Project` link after the primary links and before secondary links:

```tsx
<Button asChild className="mt-6 w-full" size="large">
  <Link href="/contact">Start a Project</Link>
</Button>
```

- [ ] **Step 5: Verify and commit**

Run:

```powershell
pnpm.cmd test -- tests/unit/app-shell.test.tsx tests/unit/site-header.test.tsx
pnpm.cmd lint
pnpm.cmd typecheck
```

Expected: all commands pass.

Commit:

```powershell
git add src/app/layout.tsx src/components/core/brand-mark.tsx src/components/core/navigation.ts src/components/core/site-header.tsx src/components/core/mobile-menu.tsx tests/unit/app-shell.test.tsx tests/unit/site-header.test.tsx
git commit -m "feat: apply Vithelo brand shell and navigation"
```

## Task 3: Build safe email and WhatsApp inquiry URLs

**Files:**

- Create: `src/lib/inquiry.ts`
- Create: `tests/unit/inquiry-links.test.ts`

- [ ] **Step 1: Write failing pure-function tests**

Create `tests/unit/inquiry-links.test.ts`:

```ts
import { buildEmailInquiryUrl, buildInquiryMessage, buildWhatsAppInquiryUrl } from "@/lib/inquiry";

const context = {
  cooperationType: "Private Label",
  productWorld: "Nutrition",
  market: "Singapore",
  summary: "Looking for an initial product discussion.",
};

it("builds a stable inquiry message", () => {
  expect(buildInquiryMessage(context)).toBe(
    "Cooperation type: Private Label\nProduct world: Nutrition\nMarket: Singapore\nProject summary: Looking for an initial product discussion.",
  );
});

it("builds an encoded mailto URL", () => {
  const url = buildEmailInquiryUrl("hello@vithelo.example", context);
  expect(url).toContain("mailto:hello@vithelo.example?");
  expect(url).toContain("subject=VITHELO%20inquiry%3A%20Private%20Label");
  expect(url).toContain("body=Cooperation%20type%3A%20Private%20Label");
});

it("builds an encoded WhatsApp URL", () => {
  const url = buildWhatsAppInquiryUrl("8613800138000", context);
  expect(url).toBe(`https://wa.me/8613800138000?text=${encodeURIComponent(buildInquiryMessage(context))}`);
});
```

- [ ] **Step 2: Run and verify failure**

Run:

```powershell
pnpm.cmd test -- tests/unit/inquiry-links.test.ts
```

Expected: FAIL because `src/lib/inquiry.ts` is missing.

- [ ] **Step 3: Implement the pure builders**

Create `src/lib/inquiry.ts`:

```ts
export type InquiryContext = {
  cooperationType: string;
  productWorld: string;
  market: string;
  summary: string;
};

export function buildInquiryMessage(context: InquiryContext) {
  return [
    `Cooperation type: ${context.cooperationType}`,
    `Product world: ${context.productWorld}`,
    `Market: ${context.market}`,
    `Project summary: ${context.summary}`,
  ].join("\n");
}

export function buildEmailInquiryUrl(email: string, context: InquiryContext) {
  const subject = `VITHELO inquiry: ${context.cooperationType}`;
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildInquiryMessage(context))}`;
}

export function buildWhatsAppInquiryUrl(e164: string, context: InquiryContext) {
  return `https://wa.me/${e164}?text=${encodeURIComponent(buildInquiryMessage(context))}`;
}
```

- [ ] **Step 4: Verify and commit**

Run:

```powershell
pnpm.cmd test -- tests/unit/inquiry-links.test.ts
pnpm.cmd typecheck
```

Expected: PASS and code 0.

Commit:

```powershell
git add src/lib/inquiry.ts tests/unit/inquiry-links.test.ts
git commit -m "feat: add inquiry channel URL builders"
```

## Task 4: Add reusable inquiry actions and the Start a Project route

**Files:**

- Create: `src/components/core/inquiry-action-pair.tsx`
- Create: `src/components/core/mobile-inquiry-bar.tsx`
- Modify: `src/components/domain/project-intake.tsx`
- Create: `src/app/contact/page.tsx`
- Modify: `src/app/layout.tsx`
- Create: `tests/unit/inquiry-actions.test.tsx`
- Modify: `tests/unit/trust-business.test.tsx`

- [ ] **Step 1: Write the missing-configuration and form tests**

Create `tests/unit/inquiry-actions.test.tsx`:

```tsx
import { fireEvent, render, screen } from "@testing-library/react";
import { InquiryActionPair } from "@/components/core/inquiry-action-pair";
import { ProjectIntake } from "@/components/domain/project-intake";

it("does not invent contact targets when both channels are missing", () => {
  render(<InquiryActionPair />);
  expect(screen.getByRole("button", { name: "Email Inquiry" })).toBeDisabled();
  expect(screen.getByRole("button", { name: "WhatsApp" })).toBeDisabled();
  expect(screen.getByText(/email inquiry address not configured/i)).toBeVisible();
  expect(screen.getByText(/whatsapp number not configured/i)).toBeVisible();
});

it("collects local context before exposing channel state", () => {
  render(<ProjectIntake />);
  fireEvent.click(screen.getByRole("button", { name: "Private Label" }));
  expect(screen.getByLabelText("Product world")).toBeVisible();
  expect(screen.getByLabelText("Country or market")).toBeVisible();
  expect(screen.getByLabelText("Project summary")).toBeVisible();
  expect(screen.getByRole("button", { name: "Email Inquiry" })).toBeDisabled();
  expect(screen.getByRole("button", { name: "WhatsApp" })).toBeDisabled();
});
```

- [ ] **Step 2: Run and verify failure**

Run:

```powershell
pnpm.cmd test -- tests/unit/inquiry-actions.test.tsx tests/unit/trust-business.test.tsx
```

Expected: FAIL because `InquiryActionPair` and the new fields do not exist.

- [ ] **Step 3: Implement the reusable action pair**

Create `src/components/core/inquiry-action-pair.tsx`:

```tsx
import { EnvelopeSimple, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/core/button";
import { siteConfig } from "@/content/site-config";
import { buildEmailInquiryUrl, buildWhatsAppInquiryUrl, type InquiryContext } from "@/lib/inquiry";

const emptyContext: InquiryContext = {
  cooperationType: "General business inquiry",
  productWorld: "Not selected",
  market: "Not provided",
  summary: "Please provide project context.",
};

type InquiryActionPairProps = {
  context?: InquiryContext;
  className?: string;
  showConfigurationMessages?: boolean;
};

export function InquiryActionPair({ context = emptyContext, className, showConfigurationMessages = true }: InquiryActionPairProps) {
  const email = siteConfig.contact.email;
  const whatsapp = siteConfig.contact.whatsapp;

  return (
    <div className={className}>
      <div className="flex flex-col gap-3 sm:flex-row">
        {email.status === "NOT_CONFIGURED" ? (
          <Button disabled size="large"><EnvelopeSimple aria-hidden="true" />Email Inquiry</Button>
        ) : (
          <Button asChild size="large">
            <a href={buildEmailInquiryUrl(email.value, context)}><EnvelopeSimple aria-hidden="true" />Email Inquiry</a>
          </Button>
        )}
        {whatsapp.status === "NOT_CONFIGURED" ? (
          <Button disabled size="large" variant="secondary"><WhatsappLogo aria-hidden="true" />WhatsApp</Button>
        ) : (
          <Button asChild size="large" variant="secondary">
            <a href={buildWhatsAppInquiryUrl(whatsapp.e164, context)} rel="noreferrer" target="_blank"><WhatsappLogo aria-hidden="true" />WhatsApp</a>
          </Button>
        )}
      </div>
      {showConfigurationMessages ? (
        <div className="mt-3 text-sm text-[var(--color-muted)]">
          <p>{email.message}</p>
          <p>{whatsapp.message}</p>
        </div>
      ) : null}
    </div>
  );
}
```

- [ ] **Step 4: Recompose Project Intake and add `/contact`**

Keep the existing intent selection and replace its form with these exact fields and action output:

```tsx
const [productWorld, setProductWorld] = useState("Nutrition");
const [market, setMarket] = useState("");
const [summary, setSummary] = useState("");

const context = {
  cooperationType: selected.label,
  productWorld,
  market: market || "Not provided",
  summary: summary || "No project summary provided.",
};
```

Render labeled controls named `productWorld`, `market`, and `summary`, followed by:

```tsx
<InquiryActionPair className="mt-8" context={context} />
<p className="mt-3 text-sm text-[var(--color-muted)]">
  DEMO_ONLY. No information is transmitted by this page.
</p>
```

Create `src/app/contact/page.tsx`:

```tsx
import { ProjectIntake } from "@/components/domain/project-intake";

export default function ContactPage() {
  return (
    <main className="container-standard section-space">
      <div className="max-w-3xl">
        <h1 className="text-[length:var(--font-size-h1-mobile)] leading-tight sm:text-[length:var(--font-size-h1)]">
          Start a Project
        </h1>
        <p className="mt-5 text-lg text-[var(--color-muted)]">
          Choose the business context first, then continue through email or WhatsApp.
        </p>
      </div>
      <div className="mt-16 border-t border-[var(--color-border)] pt-12">
        <ProjectIntake />
      </div>
    </main>
  );
}
```

- [ ] **Step 5: Add the mobile sticky inquiry bar**

Create `src/components/core/mobile-inquiry-bar.tsx`:

```tsx
"use client";

import { InquiryActionPair } from "@/components/core/inquiry-action-pair";
import { StickyResource } from "@/components/core/sticky-resource";

export function MobileInquiryBar() {
  return (
    <StickyResource className="block lg:hidden" label="Inquiry channels" priority="P1">
      <InquiryActionPair showConfigurationMessages={false} />
    </StickyResource>
  );
}
```

Render `<MobileInquiryBar />` after `{children}` in `src/app/layout.tsx`.

- [ ] **Step 6: Verify and commit**

Run:

```powershell
pnpm.cmd test -- tests/unit/inquiry-actions.test.tsx tests/unit/trust-business.test.tsx
pnpm.cmd lint
pnpm.cmd typecheck
pnpm.cmd build
```

Expected: all commands pass and `/contact` appears in the build route list.

Commit:

```powershell
git add src/components/core/inquiry-action-pair.tsx src/components/core/mobile-inquiry-bar.tsx src/components/domain/project-intake.tsx src/app/contact/page.tsx src/app/layout.tsx tests/unit/inquiry-actions.test.tsx tests/unit/trust-business.test.tsx
git commit -m "feat: add email and WhatsApp inquiry experience"
```

## Task 5: Recompose Home around project inquiry

**Files:**

- Modify: `src/app/page.tsx`
- Modify: `src/components/patterns/home-page.tsx`
- Create: `tests/unit/home-inquiry.test.tsx`
- Modify: `tests/e2e/core-journeys.spec.ts`

- [ ] **Step 1: Write the failing Home hierarchy test**

Create `tests/unit/home-inquiry.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

it("prioritizes the VITHELO B2B inquiry journey", () => {
  render(<HomePage />);
  expect(screen.getByRole("heading", { name: "Precision for what comes next." })).toBeVisible();
  expect(screen.getByRole("button", { name: "Email Inquiry" })).toBeDisabled();
  expect(screen.getByRole("button", { name: "WhatsApp" })).toBeDisabled();
  expect(screen.getByRole("heading", { name: "For Product Partners" })).toBeVisible();
  expect(screen.getByRole("heading", { name: "For Professional Partners" })).toBeVisible();
  expect(screen.getByRole("heading", { name: "Two product worlds. One VITHELO standard." })).toBeVisible();
  expect(screen.getByRole("heading", { name: "Tell us what you are building." })).toBeVisible();
});
```

- [ ] **Step 2: Run and verify failure**

Run:

```powershell
pnpm.cmd test -- tests/unit/home-inquiry.test.tsx
```

Expected: FAIL on the legacy Human. Material. Precision. Home.

- [ ] **Step 3: Pass validated Home content into the pattern**

Update `src/app/page.tsx`:

```tsx
import { HomePagePattern } from "@/components/patterns/home-page";
import { demoHome } from "@/content/demo/home";
import { demoEvidence } from "@/content/demo/evidence";
import { demoProducts } from "@/content/demo/products";
import { EvidenceSchema, ProductSchema } from "@/content/schema";

const products = demoProducts.items.map((product) => ProductSchema.parse(product));
const evidence = demoEvidence.items.map((record) => EvidenceSchema.parse(record));

export default function HomePage() {
  return <HomePagePattern content={demoHome} evidence={evidence} products={products} />;
}
```

Extend `HomePagePatternProps` with `content: HomeContent`.

- [ ] **Step 4: Replace the Home sequence with the selected A direction**

The Home component must render these sections in order:

```tsx
<main>
  <section aria-labelledby="home-hero-title">{/* asymmetric Hero, InquiryActionPair, approved media */}</section>
  <section aria-labelledby="partner-paths-title">{/* two editorial partner paths */}</section>
  <section aria-labelledby="product-worlds-title">{/* Nutrition and Aesthetic Technology */}</section>
  <section aria-labelledby="capabilities-title">{/* five-row capability index */}</section>
  <section aria-labelledby="science-material-human-title">{/* evidence boundary and Science return */}</section>
  <section aria-labelledby="consumer-support-title">{/* secondary product-support path */}</section>
  <section aria-labelledby="final-inquiry-title">{/* same InquiryActionPair labels */}</section>
</main>
```

Use these exact headings:

```ts
const homeHeadings = {
  hero: content.hero.headline,
  partnerPaths: "Choose the right starting point.",
  productWorlds: "Two product worlds. One VITHELO standard.",
  capabilities: "Capabilities for product and professional partners.",
  science: "Precision starts with responsible information.",
  consumer: "Product understanding remains available.",
  finalInquiry: "Tell us what you are building.",
} as const;
```

Hero implementation requirements:

```tsx
<InquiryActionPair className="mt-9" />
<Image
  alt={content.hero.desktopMedia.alt}
  className="object-cover"
  fill
  priority
  sizes="(min-width: 1024px) 58vw, 100vw"
  src="/media/vithelo-hero-composite.png"
/>
```

Until Task 7 creates the asset, temporarily keep `/media/home-membrane.png` in the implementation branch so tests and build pass. Switch the source only in Task 7 after the file exists.

- [ ] **Step 5: Update the hydration journey and verify**

Change the first e2e heading assertion to:

```ts
await page.getByRole("heading", { name: "Precision for what comes next." }).waitFor();
```

Run:

```powershell
pnpm.cmd test -- tests/unit/home-inquiry.test.tsx tests/unit/landing-recognition.test.tsx
pnpm.cmd typecheck
pnpm.cmd build
```

Expected: all commands pass.

- [ ] **Step 6: Commit**

```powershell
git add src/app/page.tsx src/components/patterns/home-page.tsx tests/unit/home-inquiry.test.tsx tests/e2e/core-journeys.spec.ts
git commit -m "feat: make Home inquiry-first"
```

## Task 6: Add contextual inquiry paths to Professional and PDPs

**Files:**

- Modify: `src/components/patterns/professional-page.tsx`
- Modify: `src/components/patterns/nutrition-pdp.tsx`
- Modify: `src/components/patterns/device-pdp.tsx`
- Modify: `tests/unit/pdp-priority.test.tsx`
- Modify: `tests/unit/trust-business.test.tsx`

- [ ] **Step 1: Add failing contextual inquiry assertions**

Append to `tests/unit/pdp-priority.test.tsx`:

```tsx
expect(screen.getByRole("link", { name: "Start a Project" })).toHaveAttribute(
  "href",
  expect.stringContaining("/contact?"),
);
```

Append to the professional test:

```tsx
expect(screen.getByRole("link", { name: "Start a Project" })).toHaveAttribute("href", "/contact");
```

- [ ] **Step 2: Run and verify failure**

Run:

```powershell
pnpm.cmd test -- tests/unit/pdp-priority.test.tsx tests/unit/trust-business.test.tsx
```

Expected: FAIL because the current pages have no contextual Start a Project links.

- [ ] **Step 3: Add stable context URLs**

In Nutrition PDP, add:

```tsx
<Button asChild variant="secondary">
  <Link href={`/contact?world=nutrition&subject=${encodeURIComponent(product.name)}`}>
    Start a Project
  </Link>
</Button>
```

In Device PDP, add:

```tsx
<Button asChild variant="secondary">
  <Link href={`/contact?world=aesthetic-technology&subject=${encodeURIComponent(product.name)}`}>
    Start a Project
  </Link>
</Button>
```

In Professional Hero, replace `Start project intake` with:

```tsx
<Button asChild size="large">
  <Link href="/contact">Start a Project</Link>
</Button>
```

Add `id="capabilities"` to the capabilities section so the primary navigation target resolves.

- [ ] **Step 4: Verify and commit**

Run:

```powershell
pnpm.cmd test -- tests/unit/pdp-priority.test.tsx tests/unit/trust-business.test.tsx
pnpm.cmd lint
pnpm.cmd typecheck
```

Expected: all pass.

Commit:

```powershell
git add src/components/patterns/professional-page.tsx src/components/patterns/nutrition-pdp.tsx src/components/patterns/device-pdp.tsx tests/unit/pdp-priority.test.tsx tests/unit/trust-business.test.tsx
git commit -m "feat: add contextual project inquiry paths"
```

## Task 7: Produce and integrate the VITHELO visual assets and token calibration

**Files:**

- Create: `public/media/vithelo-hero-composite.png`
- Create: `public/media/vithelo-hero-composite-mobile.png`
- Modify: `src/components/patterns/home-page.tsx`
- Modify: `src/styles/tokens.css`
- Modify: `tests/unit/tokens.test.ts`

- [ ] **Step 1: Generate the desktop and mobile hero assets**

Use the available image-generation tool with this exact prompt for the desktop asset:

```text
VITHELO premium B2B nutrition and aesthetic technology brand website hero. Asymmetric editorial product still life. Group a restrained nutrition bottle, frosted product vessel, and compact professional aesthetic technology system on the right 58 percent of the frame. Preserve clean negative space on the left 42 percent for website copy. Materials are brushed titanium, frosted glass, graphite polymer, cold ivory paper, and one restrained pale optical reflection. Soft natural side light, realistic shadows, controlled highlights, cool neutral white balance, believable scale, accurate perspective, premium commercial photography. Calm, exact, human, credible, progressive. No text, no logo, no Seed products, no green wellness styling, no blue medical gradient, no gold luxury styling, no neon, no laboratory data, no certificates, no medical procedure, no distorted packaging. 16:9 landscape.
```

Use the same prompt with `4:5 portrait, product grouping centered in the lower 60 percent with clean copy space above` for the mobile asset.

Save the approved outputs at the exact paths listed above. Do not use scripts or PIL to manufacture the final aesthetic composition.

- [ ] **Step 2: Replace the temporary Home media source**

Use a `<picture>` wrapper so mobile receives the dedicated crop:

```tsx
<picture>
  <source media="(max-width: 767px)" srcSet="/media/vithelo-hero-composite-mobile.png" />
  <Image
    alt={content.hero.desktopMedia.alt}
    className="object-cover"
    fill
    priority
    sizes="(min-width: 1024px) 58vw, 100vw"
    src="/media/vithelo-hero-composite.png"
  />
</picture>
```

- [ ] **Step 3: Calibrate the VITHELO palette and type contract**

Update the prototype values in `src/styles/tokens.css`:

```css
:root {
  --color-ivory: #f4f4f0;
  --color-ivory-deep: #e5e7e2;
  --color-graphite: #191b1a;
  --color-graphite-soft: #626762;
  --color-titanium: #a7aca8;
  --color-titanium-light: #d4d8d5;
  --color-optical: #b8d0c8;
  --color-optical-strong: #58756c;
  --font-precision: ui-sans-serif, Aptos, "Helvetica Neue", Helvetica, Arial, sans-serif;
  --font-editorial: var(--font-precision);
}
```

Update `tests/unit/tokens.test.ts` to expect `#f4f4f0`, `#b8d0c8`, and `--font-editorial: var(--font-precision);`.

- [ ] **Step 4: Verify asset presence, tokens, and build**

Run:

```powershell
Test-Path 'public\media\vithelo-hero-composite.png'
Test-Path 'public\media\vithelo-hero-composite-mobile.png'
pnpm.cmd test -- tests/unit/tokens.test.ts tests/unit/home-inquiry.test.tsx
pnpm.cmd build
```

Expected: both `Test-Path` calls print `True`, tests pass, and build exits with code 0.

- [ ] **Step 5: Commit**

```powershell
git add public/media/vithelo-hero-composite.png public/media/vithelo-hero-composite-mobile.png src/components/patterns/home-page.tsx src/styles/tokens.css tests/unit/tokens.test.ts
git commit -m "feat: add Vithelo hero visual system"
```

## Task 8: Complete inquiry e2e coverage and visual acceptance

**Files:**

- Create: `tests/e2e/inquiry-journeys.spec.ts`
- Modify: `tests/e2e/core-journeys.spec.ts`
- Modify: `tests/e2e/responsive.spec.ts`
- Modify: `tests/e2e/accessibility.spec.ts`
- Modify: `docs/visual-qa.md`
- Modify: `docs/missing-production-inputs.md`

- [ ] **Step 1: Add inquiry journey tests**

Create `tests/e2e/inquiry-journeys.spec.ts`:

```ts
import { expect, test } from "@playwright/test";

test("Home exposes both inquiry channels without inventing targets", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Precision for what comes next." })).toBeVisible();
  await expect(page.getByRole("button", { name: "Email Inquiry" }).first()).toBeDisabled();
  await expect(page.getByRole("button", { name: "WhatsApp" }).first()).toBeDisabled();
  await expect(page.getByText("Email inquiry address not configured").first()).toBeVisible();
  await expect(page.getByText("WhatsApp number not configured").first()).toBeVisible();
});

test("Start a Project collects local context without submission", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: "Private Label" }).click();
  await page.getByLabel("Product world").selectOption("Nutrition");
  await page.getByLabel("Country or market").fill("Singapore");
  await page.getByLabel("Project summary").fill("Initial private label discussion");
  await expect(page.getByRole("button", { name: "Email Inquiry" })).toBeDisabled();
  await expect(page.getByRole("button", { name: "WhatsApp" })).toBeDisabled();
  await expect(page.getByText(/no information is transmitted/i)).toBeVisible();
});

test("mobile inquiry bar does not cover the open menu", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("dialog", { name: /site navigation/i })).toBeVisible();
  await expect(page.getByLabel("Inquiry channels")).toHaveAttribute("aria-hidden", "true");
});
```

- [ ] **Step 2: Update legacy e2e assertions**

Replace A PRIME and By Need expectations with VITHELO, Capabilities, and Start a Project. Keep all product Safety, Science return-loop, responsive overflow, reduced-motion, and `DEMO_ONLY` assertions.

Add this responsive assertion at all six configured viewports:

```ts
await expect(page.locator("body")).toHaveJSProperty("scrollWidth", await page.locator("body").evaluate((body) => body.clientWidth));
```

- [ ] **Step 3: Run the complete automated gate**

Run:

```powershell
pnpm.cmd lint
pnpm.cmd typecheck
pnpm.cmd test
pnpm.cmd test:e2e
pnpm.cmd build
```

Expected: every command exits with code 0.

- [ ] **Step 4: Perform the manual visual review**

Capture Home, Contact, Professional, Nutrition PDP, and Device PDP at 1440, 1024, 768, 390, and 375 px. Record PASS or FAIL in `docs/visual-qa.md` for:

- Hero headline, supporting copy, and both actions fit the first viewport
- Desktop navigation stays on one line and below 80 px
- VITHELO remains recognizable without relying on the wordmark alone
- Nutrition and Aesthetic Technology are distinct through material and context, not channel colors
- No repeated equal-card grid or three consecutive zigzag sections
- Mobile sticky inquiry bar pauses under menu, dialog, and keyboard
- Safety and product actions remain visible
- No clipping, overlap, horizontal overflow, unsupported claim, or invented contact target
- Light and dark appearances preserve contrast and hierarchy
- Reduced Motion preserves every fact and action

Fix only observed P0 or P1 defects, rerun the affected check, and record the changed file and passing result.

- [ ] **Step 5: Update production-input gaps**

Add these explicit items to `docs/missing-production-inputs.md`:

```markdown
- VITHELO inquiry email address, owner, and expected response policy.
- VITHELO WhatsApp number in E.164 format, account owner, supported hours, and privacy handling.
- Approved desktop and mobile Home hero imagery.
- Approved product sheets, capability statements, market eligibility, and inquiry-routing rules.
```

- [ ] **Step 6: Commit final acceptance evidence**

```powershell
git add tests/e2e docs/visual-qa.md docs/missing-production-inputs.md src
git commit -m "test: verify Vithelo inquiry journeys and visual acceptance"
```

## Execution order and stopping rules

Execute Tasks 1 through 8 in order. Do not place an email address or WhatsApp number in code until the user supplies and approves it. A missing channel remains disabled with `NOT_CONFIGURED`; it must never silently fall back to a made-up target.

Do not generate or imply product claims, certifications, device mechanisms, pricing, MOQ, lead time, warranty, shipping, returns, market eligibility, or production capacity. Add every future fact through a validated content or configuration record with a source owner.

Task 7 is a visual-asset gate. Do not substitute CSS jars, fake product UI, script-composited imagery, or copied Seed assets for the final Home visual. If image generation is not approved or the result fails visual review, keep the existing explicit demo media and stop before claiming the redesign is visually complete.
