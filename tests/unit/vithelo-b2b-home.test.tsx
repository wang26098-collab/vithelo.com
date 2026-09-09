import { render, screen, within } from "@testing-library/react";
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
  "contact",
];

it("renders the consolidated seven sections once and in order", () => {
  render(<VitheloB2BHome content={vitheloB2BHome} />);

  const sections = Array.from(document.querySelectorAll("main > section"));
  expect(sections.map((section) => section.id)).toEqual(sectionIds);
  for (const id of sectionIds) {
    expect(document.querySelectorAll(`section#${id}`)).toHaveLength(1);
  }
});

it("renders all eight formats as one featured format wall", () => {
  render(<VitheloB2BHome content={vitheloB2BHome} />);

  const dosage = document.getElementById("dosage-forms")!;
  expect(dosage).toBeInTheDocument();
  expect(within(dosage).getAllByTestId("format-project")).toHaveLength(8);
  expect(within(dosage).getAllByTestId("format-media")).toHaveLength(8);
  expect(within(dosage).getAllByTestId("format-media-plane")).toHaveLength(8);
  expect(within(dosage).getAllByRole("link")).toHaveLength(8);
  const title = within(dosage).getByRole("heading", {
    name: "One system. Eight expressions.",
  });
  expect(title).toHaveAttribute("data-format-title");
  expect(title.querySelectorAll("[data-format-char]")).toHaveLength(
    Array.from("One system. Eight expressions.").length,
  );
  expect(title.querySelectorAll("[data-format-word]")).toHaveLength(4);
  expect(dosage.querySelectorAll("[data-format-project]")).toHaveLength(8);
  expect(dosage.querySelectorAll("[data-format-media]")).toHaveLength(8);
  expect(dosage.querySelectorAll("[data-format-label]")).toHaveLength(8);
  expect(dosage).toHaveAttribute("data-format-motion", "static");
  expect(dosage).toHaveAttribute("data-layout", "featured-format-wall");
  expect(dosage).toHaveAttribute("data-ui-stage", "featured-format-wall");
  expect(dosage).not.toHaveAttribute("data-carousel");
  expect(within(dosage).queryByRole("tablist")).not.toBeInTheDocument();
});

it("renders manufacturing as the approved editorial split with facts and capabilities", () => {
  render(<VitheloB2BHome content={vitheloB2BHome} />);

  const proof = document.getElementById("proof")!;
  expect(proof).toBeInTheDocument();
  expect(proof).toHaveAttribute("data-layout", "manufacturing-editorial-split");
  expect(within(proof).getByTestId("manufacturing-scene")).toBeInTheDocument();
  expect(within(proof).getAllByTestId("manufacturing-metric")).toHaveLength(4);
  expect(within(proof).getAllByTestId("manufacturing-capability")).toHaveLength(4);
  expect(within(proof).queryByRole("link", { name: "Explore Our Factory" })).not.toBeInTheDocument();
  expect(proof).not.toHaveTextContent(
    /NOT_CONFIGURED|DEMO_ONLY|森酷|Sencool|GMP|HACCP|Halal|ISO|FDA/i,
  );
});

it("renders three product directions inside one sticky product switcher", () => {
  render(<VitheloB2BHome content={vitheloB2BHome} />);

  const directions = document.getElementById("solutions");
  expect(directions).toHaveAttribute("data-layout", "sticky-product-switcher");
  expect(within(directions!).getAllByTestId("market-story")).toHaveLength(3);
  expect(within(directions!).getAllByTestId("market-story-image")).toHaveLength(3);
  expect(within(directions!).getAllByTestId("market-step")).toHaveLength(3);
  expect(within(directions!).queryByRole("button")).not.toBeInTheDocument();
  expect(directions).not.toHaveTextContent(/\d{2} \/ \d{2}/);
});

it("renders the third screen as a three-product editorial runway", () => {
  render(<VitheloB2BHome content={vitheloB2BHome} />);

  const runway = document.getElementById("capacity-boundary")!;
  expect(runway).toBeInTheDocument();
  expect(runway).toHaveAttribute("data-layout", "editorial-product-runway");
  expect(within(runway).getAllByTestId("featured-product-card")).toHaveLength(3);
  expect(within(runway).getAllByTestId("featured-product-image")).toHaveLength(3);
  expect(within(runway).getByRole("link", { name: /View All Products/i })).toHaveAttribute(
    "href",
    "/products",
  );
  expect(within(runway).getAllByRole("link", { name: /Discuss This Product/i })).toHaveLength(3);
  expect(runway).toHaveTextContent("Sleep Health");
  expect(runway).toHaveTextContent("Active Nutrition");
  expect(runway).toHaveTextContent("Women’s Health");
  expect(runway).not.toHaveTextContent(/Shop Now|price|MOQ|Seed|Pending verification/i);
});

it("renders the fourth screen as a customization constellation", () => {
  render(<VitheloB2BHome content={vitheloB2BHome} />);

  const stage = document.getElementById("gummy-stage")!;
  expect(stage).toHaveAttribute("data-layout", "customization-constellation");
  expect(within(stage).getByTestId("customization-visual")).toBeInTheDocument();
  expect(within(stage).getAllByTestId("customization-node")).toHaveLength(4);
  expect(within(stage).getAllByTestId("customization-benefit")).toHaveLength(4);
  expect(
    within(stage).getByRole("link", { name: /Start Your Customization/i }),
  ).toHaveAttribute("href", "/contact");
  expect(within(stage).getByRole("link", { name: /Explore Customization/i })).toHaveAttribute(
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

it("presents manufacturing as a customer-facing capability story", () => {
  render(<VitheloB2BHome content={vitheloB2BHome} />);

  const proof = document.getElementById("proof");
  expect(within(proof!).getByRole("heading", { name: "From Formula to Finished Product" })).toBeVisible();
  expect(proof).toHaveTextContent("5,000+");
  expect(proof).toHaveTextContent("Multi-format Production");
  expect(proof).not.toHaveTextContent(/NOT_CONFIGURED|Evidence required|Pending|audited|annual growth/i);
});

it("keeps the signature close inside the seventh section", () => {
  render(<VitheloB2BHome content={vitheloB2BHome} />);

  const contact = document.getElementById("contact");
  expect(within(contact!).getByText("Made for what comes next.")).toBeVisible();
  expect(document.querySelectorAll("main > section")).toHaveLength(8);
});

it("maps homepage content to semantic motion roles", () => {
  render(<VitheloB2BHome content={vitheloB2BHome} />);

  expect(document.getElementById("proof")).toHaveAttribute(
    "data-motion-intent",
    "EXPLAIN",
  );
  expect(document.querySelector("[data-motion-role='proof-ledger']")).toBeInTheDocument();
  expect(document.querySelector("[data-motion-role='media']")).toBeInTheDocument();
  expect(document.querySelectorAll("[data-motion-role='collection-item']")).toHaveLength(11);
  expect(document.querySelectorAll("[data-motion-role='process-step']")).toHaveLength(6);
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
