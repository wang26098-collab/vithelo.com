# VITHELO Home Screen Eight Inquiry Layout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Recompose homepage screen eight into the approved editorial split layout with direct Email and WhatsApp cards above the existing non-storing inquiry composer.

**Architecture:** Keep contact data in `siteConfig` and URL generation in `src/lib/inquiry.ts`. Change only the homepage contact composition, its CSS module rules, the inquiry action label, and tests that define the screen-eight contract; retain the existing brand signature and all previous homepage sections.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, CSS Modules, Vitest, Testing Library, Playwright.

---

## File map

- Modify `src/components/patterns/vithelo-b2b-home.tsx`: replace the current checklist/link rows with the approved intro-and-channel-card composition.
- Modify `src/components/patterns/vithelo-home-inquiry-composer.tsx`: align the Email action label with the approved wording while preserving generated inquiry URLs.
- Modify `src/components/patterns/vithelo-b2b-home.module.css`: implement desktop editorial split, channel cards, full-width composer, responsive stacking, focus and restrained hover states.
- Modify `tests/unit/vithelo-b2b-home.test.tsx`: define the structural and direct-channel contract.
- Modify `tests/unit/vithelo-home-inquiry-composer.test.tsx`: define the prefilled action labels and URL behavior.
- Modify `tests/e2e/inquiry-journeys.spec.ts`: verify the final screen in a real browser.

### Task 1: Lock the approved interaction contract with failing tests

**Files:**
- Modify: `tests/unit/vithelo-b2b-home.test.tsx`
- Modify: `tests/unit/vithelo-home-inquiry-composer.test.tsx`
- Modify: `tests/e2e/inquiry-journeys.spec.ts`

- [ ] **Step 1: Replace the current homepage contact assertion with the approved channel-card contract**

```tsx
it("renders the editorial inquiry close with two direct channel cards", () => {
  render(<VitheloB2BHome content={vitheloB2BHome} />);

  const contact = document.getElementById("contact")!;
  expect(contact).toHaveAttribute("data-layout", "editorial-channel-split");
  expect(within(contact).getByText("wang26098@gmail.com")).toBeVisible();
  expect(within(contact).getByText("+86 182 7366 9556")).toBeVisible();
  expect(within(contact).getByRole("link", { name: "Email wang26098@gmail.com" })).toHaveAttribute(
    "href",
    expect.stringContaining("mailto:wang26098@gmail.com"),
  );
  expect(within(contact).getByRole("link", { name: "WhatsApp +86 182 7366 9556" })).toHaveAttribute(
    "href",
    expect.stringContaining("https://wa.me/8618273669556"),
  );
  expect(within(contact).queryByText("Target timing")).not.toBeInTheDocument();
  expect(within(contact).getByRole("form", { name: "Prepare a project inquiry" })).toBeVisible();
});
```

- [ ] **Step 2: Update the composer test to select the approved Email action label**

```tsx
const email = screen.getByRole("link", { name: "Continue by Email" });
const whatsapp = screen.getByRole("link", { name: "Continue on WhatsApp" });
```

- [ ] **Step 3: Update the E2E contact expectations**

```ts
test("Home exposes the editorial inquiry close and both approved channels", async ({ page }) => {
  await page.goto("/");
  const contact = page.locator("#contact");
  await expect(contact).toHaveAttribute("data-layout", "editorial-channel-split");
  await expect(contact.getByRole("link", { name: "Email wang26098@gmail.com" })).toHaveAttribute("href", /mailto:wang26098@gmail\.com/);
  await expect(contact.getByRole("link", { name: "WhatsApp +86 182 7366 9556" })).toHaveAttribute("href", /https:\/\/wa\.me\/8618273669556/);
  await expect(contact.getByRole("form", { name: "Prepare a project inquiry" })).toBeVisible();
  await expect(contact.getByText("Made for what comes next.")).toBeVisible();
  await expect(contact.getByText("Target timing")).toHaveCount(0);
});
```

- [ ] **Step 4: Run focused unit tests and verify RED**

Run:

```powershell
pnpm.cmd test -- tests/unit/vithelo-b2b-home.test.tsx tests/unit/vithelo-home-inquiry-composer.test.tsx
```

Expected: FAIL because `data-layout`, visible contact values, new accessible names, and `Continue by Email` do not exist yet.

### Task 2: Implement the minimal screen-eight composition

**Files:**
- Modify: `src/components/patterns/vithelo-b2b-home.tsx`
- Modify: `src/components/patterns/vithelo-home-inquiry-composer.tsx`

- [ ] **Step 1: Add the approved layout contract and replace the old contact grid**

In the `#contact` section, add:

```tsx
data-layout="editorial-channel-split"
```

Replace `contactGrid`, `contactChecklist`, standalone link rows, and the pending message with:

```tsx
const whatsappDisplay =
  siteConfig.contact.whatsapp.status === "CONFIGURED"
    ? siteConfig.contact.whatsapp.e164.replace(
        /^86(\d{3})(\d{4})(\d{4})$/,
        "+86 $1 $2 $3",
      )
    : "WhatsApp unavailable";

<div className={styles.contactIntroGrid}>
  <div className={styles.contactIntro}>
    <p className={styles.kicker}>{content.contact.kicker}</p>
    <h2 className={styles.title} id="contact-title">{content.contact.title}</h2>
    <p className={styles.copy}>{content.contact.copy}</p>
  </div>
  <div className={styles.contactChannels} aria-label="Direct inquiry channels">
    <a
      aria-label={`Email ${siteConfig.contact.email.value}`}
      className={styles.contactChannelCard}
      href={emailHref}
    >
      <span className={styles.contactChannelIndex}>01 · Email</span>
      <strong>{siteConfig.contact.email.value}</strong>
      <span className={styles.contactChannelAction}>Open mail <span aria-hidden="true">→</span></span>
    </a>
    <a
      aria-label={`WhatsApp ${whatsappDisplay}`}
      className={styles.contactChannelCard}
      href={whatsappHref}
      rel="noreferrer"
      target="_blank"
    >
      <span className={styles.contactChannelIndex}>02 · WhatsApp</span>
      <strong>{whatsappDisplay}</strong>
      <span className={styles.contactChannelAction}>Open chat <span aria-hidden="true">→</span></span>
    </a>
  </div>
</div>
```

- [ ] **Step 2: Rename the composer Email action**

```tsx
<a className={styles.primaryAction} href={buildEmailInquiryUrl(email, inquiryContext)}>
  Continue by Email
</a>
```

- [ ] **Step 3: Run focused unit tests and confirm remaining failures are styling-independent**

Run:

```powershell
pnpm.cmd test -- tests/unit/vithelo-b2b-home.test.tsx tests/unit/vithelo-home-inquiry-composer.test.tsx
```

Expected: PASS.

### Task 3: Apply the approved VITHELO layout without changing the palette

**Files:**
- Modify: `src/components/patterns/vithelo-b2b-home.module.css`

- [ ] **Step 1: Replace obsolete contact layout rules with the editorial split**

```css
.contactIntroGrid {
  display: grid;
  grid-template-columns: minmax(0, 0.82fr) minmax(520px, 1.18fr);
  gap: clamp(3rem, 7vw, 8rem);
  align-items: end;
}

.contactIntro { align-self: end; }
.contactChannels { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
.contactChannelCard {
  min-height: 230px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid rgb(243 240 232 / 20%);
  padding: clamp(1.4rem, 2.5vw, 2.25rem);
  background: #f3f0e8;
  color: var(--ink);
  text-decoration: none;
  transition: transform var(--motion-fast) var(--ease-standard), border-color var(--motion-fast) var(--ease-standard);
}
.contactChannelCard:hover { transform: translateY(-4px); border-color: rgb(243 240 232 / 55%); }
.contactChannelIndex { color: var(--muted); font-size: 0.7rem; font-weight: 650; letter-spacing: 0.14em; text-transform: uppercase; }
.contactChannelCard strong { overflow-wrap: anywhere; font-size: clamp(1rem, 1.5vw, 1.35rem); }
.contactChannelAction { display: flex; justify-content: space-between; font-size: 0.875rem; }
```

- [ ] **Step 2: Align the composer with the full screen width and existing palette**

Keep `background: #f3f0e8`, `color: var(--ink)`, existing field borders and current action colors. Set `.inquiryComposer` to `width: 100%`, retain its current responsive padding, and keep its existing top margin so its edges align with the new top grid; do not introduce green, shadows, or new radius values.

- [ ] **Step 3: Add responsive stacking at the existing breakpoints**

```css
@media (max-width: 900px) {
  .contactIntroGrid { grid-template-columns: 1fr; gap: 2.5rem; }
}

@media (max-width: 760px) {
  .contactChannels,
  .inquiryFields { grid-template-columns: 1fr; }
  .contactChannelCard { min-height: 180px; }
  .inquirySummaryField { grid-column: auto; }
  .inquiryComposerActions { display: grid; }
}
```

- [ ] **Step 4: Run unit checks**

Run:

```powershell
pnpm.cmd test -- tests/unit/vithelo-b2b-home.test.tsx tests/unit/vithelo-home-inquiry-composer.test.tsx
pnpm.cmd lint
pnpm.cmd typecheck
```

Expected: all commands exit with code 0.

### Task 4: Browser verification and regression checks

**Files:**
- Modify only if a verified defect requires a scoped correction: the files listed above.

- [ ] **Step 1: Run the focused browser journey**

Run:

```powershell
pnpm.cmd test:e2e -- tests/e2e/inquiry-journeys.spec.ts
```

Expected: homepage inquiry journey passes; direct links and brand signature are visible.

- [ ] **Step 2: Verify desktop and mobile visually**

Inspect `1440×900`, `1024×768`, `390×844`, and `360×800`. Confirm the top split, two cards, form field order, 44px targets, focus visibility, no overflow, and unchanged palette.

- [ ] **Step 3: Run the complete verification suite**

Run:

```powershell
pnpm.cmd test
pnpm.cmd test:e2e
pnpm.cmd build
```

Expected: all applicable tests pass, build exits with code 0, and no P0/P1 visual defect remains.

- [ ] **Step 4: Present the live preview for user acceptance**

Open `http://127.0.0.1:3200/#contact` and ask the user to approve the actual implementation at desktop and mobile widths before treating the screen as visually complete.
