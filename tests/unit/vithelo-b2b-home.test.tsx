import { render, screen, within } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { VitheloB2BHome } from "@/components/patterns/vithelo-b2b-home";
import { vitheloB2BHome } from "@/content/demo/vithelo-b2b-home";

const sectionIds = [
  "hero",
  "proof",
  "capacity-boundary",
  "gummy-stage",
  "solutions",
  "dosage-forms",
  "project-runway",
  "brand-statement",
  "contact",
];

it("renders the nine narrative sections once and in order", () => {
  render(<VitheloB2BHome content={vitheloB2BHome} />);

  const sections = Array.from(document.querySelectorAll("main > section"));
  expect(sections.map((section) => section.id)).toEqual(sectionIds);
  expect(sections.map((section) => section.getAttribute("data-narrative-role"))).toEqual([
    "positioning",
    "manufacturing-system",
    "project-entry",
    "product-definition",
    "routine-to-brief",
    "format-options",
    "project-path",
    "brand-statement",
    "inquiry",
  ]);
  for (const id of sectionIds) {
    expect(document.querySelectorAll(`section#${id}`)).toHaveLength(1);
  }
});

it("renders all eight formats as one editorial format grid", () => {
  render(<VitheloB2BHome content={vitheloB2BHome} />);

  const dosage = document.getElementById("dosage-forms")!;
  expect(dosage).toBeInTheDocument();
  expect(within(dosage).getAllByTestId("format-project")).toHaveLength(8);
  expect(within(dosage).getAllByTestId("format-media")).toHaveLength(8);
  expect(within(dosage).getAllByTestId("format-media-plane")).toHaveLength(8);
  expect(within(dosage).getAllByRole("link")).toHaveLength(9);
  expect(within(dosage).getByRole("link", { name: "Explore all" })).toHaveAttribute(
    "href",
    "/products",
  );
  const title = within(dosage).getByRole("heading", {
    name: "One brief. Eight ways to deliver it.",
  });
  expect(title).toHaveAttribute("data-format-title");
  expect(title).toHaveTextContent("One brief. Eight ways to deliver it.");
  expect(dosage.querySelectorAll("[data-format-project]")).toHaveLength(8);
  expect(dosage.querySelectorAll("[data-format-media]")).toHaveLength(8);
  expect(dosage.querySelectorAll("[data-format-label]")).toHaveLength(8);
  expect(dosage.querySelectorAll("[data-motion-role='format-item']")).toHaveLength(8);
  expect(dosage).toHaveAttribute("data-format-motion", "static");
  expect(dosage).toHaveAttribute("data-layout", "editorial-format-grid");
  expect(dosage).toHaveAttribute("data-ui-stage", "editorial-format-grid");
  expect(dosage).not.toHaveAttribute("data-carousel");
  expect(within(dosage).queryByRole("tablist")).not.toBeInTheDocument();
});

it("renders manufacturing as four workstreams without unsupported facts", () => {
  render(<VitheloB2BHome content={vitheloB2BHome} />);

  const proof = document.getElementById("proof")!;
  expect(proof).toBeInTheDocument();
  expect(proof).toHaveAttribute("data-layout", "manufacturing-editorial-split");
  expect(within(proof).getAllByTestId("manufacturing-workstream")).toHaveLength(4);
  expect(within(proof).getByRole("link", { name: /Explore Manufacturing/i })).toHaveAttribute(
    "href",
    "/manufacturing",
  );
  expect(proof).not.toHaveTextContent(
    /2008|5,000\+|50\+|NOT_CONFIGURED|DEMO_ONLY|森酷|Sencool|GMP|HACCP|Halal|ISO|FDA/i,
  );
});

it("removes the dark direction intro while keeping all three product directions", () => {
  render(<VitheloB2BHome content={vitheloB2BHome} />);

  const directions = document.getElementById("solutions");
  expect(directions).toBeInTheDocument();
  expect(within(directions!).getAllByTestId("market-scene")).toHaveLength(3);
  expect(within(directions!).queryByTestId("market-intro")).not.toBeInTheDocument();
  expect(screen.queryByText("05 · PRODUCT DIRECTION")).not.toBeInTheDocument();
  expect(
    screen.queryByRole("heading", {
      name: "Begin with the routine, not the ingredient list.",
    }),
  ).not.toBeInTheDocument();
});

it("renders the third screen as three project entry routes", () => {
  render(<VitheloB2BHome content={vitheloB2BHome} />);

  const runway = document.getElementById("capacity-boundary")!;
  expect(runway).toBeInTheDocument();
  expect(runway).toHaveAttribute("data-layout", "project-entry-routes");
  expect(within(runway).getAllByTestId("project-entry-route")).toHaveLength(3);
  expect(within(runway).getByRole("link", { name: /Find Your Starting Route/i })).toHaveAttribute(
    "href",
    "/oem-odm",
  );
  expect(runway).toHaveTextContent("Private Label");
  expect(runway).toHaveTextContent("Adapt & Differentiate");
  expect(runway).toHaveTextContent("Custom Development");
  expect(runway).not.toHaveTextContent(/Sleep Health|Active Nutrition|Women’s Health/);
  expect(runway).not.toHaveTextContent(/Shop Now|price|MOQ|Seed|Pending verification/i);
});

it("renders the fourth screen as a customization constellation", () => {
  render(<VitheloB2BHome content={vitheloB2BHome} />);

  const stage = document.getElementById("gummy-stage")!;
  expect(stage).toHaveAttribute("data-layout", "customization-constellation");
  expect(within(stage).getByTestId("customization-visual")).toBeInTheDocument();
  expect(within(stage).getAllByTestId("customization-node")).toHaveLength(4);
  expect(
    within(stage).getByRole("link", { name: /Explore OEM \/ ODM/i }),
  ).toHaveAttribute(
    "href",
    "/oem-odm",
  );
  expect(within(stage).queryByText(/^YOUR BRAND$/i)).not.toBeInTheDocument();
  expect(stage).not.toHaveTextContent(/Fast Sampling|Confidential/i);
});

it("renders the editorial inquiry close with two direct channel cards", () => {
  render(<VitheloB2BHome content={vitheloB2BHome} />);

  const contact = document.getElementById("contact")!;
  expect(contact).toHaveAttribute("data-contact-state", "CONFIGURED");
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

it("leaves shared navigation to the site frame and uses page routes", () => {
  render(<VitheloB2BHome content={vitheloB2BHome} />);

  expect(screen.queryByRole("banner")).not.toBeInTheDocument();
  expect(screen.queryByRole("contentinfo")).not.toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Start a Project" })).toHaveAttribute(
    "href",
    "/contact",
  );
  expect(screen.getByRole("link", { name: "Explore Formats" })).toHaveAttribute(
    "href",
    "/products",
  );
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "VITHELO — Nutrition OEM / ODM Manufacturer",
  );
  expect(document.querySelector("main")?.textContent).not.toMatch(/[\u3400-\u9fff]/);
});

it("presents manufacturing as a customer-facing project system", () => {
  render(<VitheloB2BHome content={vitheloB2BHome} />);

  const proof = document.getElementById("proof");
  expect(within(proof!).getByRole("heading", { name: "Built to connect development with production." })).toBeVisible();
  expect(proof).toHaveTextContent("Product Development");
  expect(proof).toHaveTextContent("Quality Documentation");
  expect(proof).not.toHaveTextContent(/NOT_CONFIGURED|Evidence required|Pending|audited|annual growth/i);
});

it("keeps the signature close inside the ninth section", () => {
  render(<VitheloB2BHome content={vitheloB2BHome} />);

  const contact = document.getElementById("contact");
  expect(within(contact!).getByText("Made for what comes next.")).toBeVisible();
  expect(document.querySelectorAll("main > section")).toHaveLength(9);
});

it("renders a non-interactive daybreak statement between runway and inquiry", () => {
  render(<VitheloB2BHome content={vitheloB2BHome} />);

  const statement = document.getElementById("brand-statement")!;
  expect(statement).toHaveAttribute("data-narrative-role", "brand-statement");
  expect(
    within(statement).getByRole("heading", {
      name: "From the fresh vitality of daybreak’s first light, to the quiet peace when all the world slips into night.",
    }),
  ).toBeVisible();
  expect(
    within(statement).getByText(
      "Every dawn and dusk of yours, warmth and companionship stay close beside you.",
    ),
  ).toBeVisible();
  expect(statement.querySelectorAll("[data-statement-line]")).toHaveLength(2);
  expect(within(statement).queryByRole("link")).not.toBeInTheDocument();
  expect(within(statement).queryByRole("button")).not.toBeInTheDocument();
  expect(statement.nextElementSibling).toHaveAttribute("id", "contact");
});

it("maps homepage content to semantic motion roles", () => {
  render(<VitheloB2BHome content={vitheloB2BHome} />);

  expect(document.getElementById("proof")).toHaveAttribute(
    "data-motion-intent",
    "EXPLAIN",
  );
  expect(document.querySelector("[data-motion-role='workstream-ledger']")).toBeInTheDocument();
  expect(document.querySelector("[data-motion-role='media']")).toBeInTheDocument();
  expect(document.querySelectorAll("[data-motion-role='entry-route']")).toHaveLength(3);
  expect(document.querySelectorAll("[data-motion-role='format-item']")).toHaveLength(8);
  expect(document.querySelectorAll("[data-motion-role='process-step']")).toHaveLength(6);
});

it("keeps the hero and manufacturing facts static", () => {
  const css = readFileSync(
    join(process.cwd(), "src/components/patterns/vithelo-b2b-home.module.css"),
    "utf8",
  );

  expect(css).not.toContain("hero-copy-arrive");
  expect(css).not.toContain(".homepage[data-motion-mode=\"enhanced\"] .heroContent");
});

it("reveals each motion section once and disconnects on unmount", () => {
  const observe = vi.fn();
  const unobserve = vi.fn();
  const disconnect = vi.fn();
  const observerCallbacks: IntersectionObserverCallback[] = [];
  const observer = {
    disconnect,
    observe,
    takeRecords: vi.fn(() => []),
    unobserve,
  };
  class IntersectionObserverMock {
    constructor(callback: IntersectionObserverCallback) {
      observerCallbacks.push(callback);
      return observer;
    }
  }
  vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);
  vi.stubGlobal("matchMedia", vi.fn(() => ({
    addEventListener: vi.fn(),
    matches: false,
    removeEventListener: vi.fn(),
  })));

  const { unmount } = render(<VitheloB2BHome content={vitheloB2BHome} />);

  expect(document.querySelector("main")).toHaveAttribute("data-motion-enabled", "true");
  expect(observe).toHaveBeenCalledTimes(16);
  expect(observe.mock.calls.slice(0, 7).map(([element]) => element.id)).toEqual([
    "proof",
    "capacity-boundary",
    "gummy-stage",
    "solutions",
    "dosage-forms",
    "project-runway",
    "",
  ]);

  const proof = document.getElementById("proof")!;
  observerCallbacks[0](
    [
      { isIntersecting: true, target: proof } as unknown as IntersectionObserverEntry,
    ],
    observer as unknown as IntersectionObserver,
  );
  expect(proof).toHaveAttribute("data-motion-state", "visible");
  expect(within(proof).getByText("Product Development")).toBeInTheDocument();
  expect(within(proof).getByText("Quality Documentation")).toBeInTheDocument();
  expect(unobserve).toHaveBeenCalledWith(proof);

  unmount();
  expect(disconnect).toHaveBeenCalled();
  vi.unstubAllGlobals();
});

it("keeps the static final state when reduced motion is requested", () => {
  const observe = vi.fn();
  class IntersectionObserverMock {
    observe = observe;
    disconnect = vi.fn();
    unobserve = vi.fn();
  }
  vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);
  vi.stubGlobal("matchMedia", vi.fn(() => ({
    addEventListener: vi.fn(),
    matches: true,
    removeEventListener: vi.fn(),
  })));

  render(<VitheloB2BHome content={vitheloB2BHome} />);

  expect(document.querySelector("main")).toHaveAttribute("data-motion-mode", "static");
  expect(document.querySelector("main")).not.toHaveAttribute("data-motion-enabled");
  expect(observe).not.toHaveBeenCalled();
  vi.unstubAllGlobals();
});
