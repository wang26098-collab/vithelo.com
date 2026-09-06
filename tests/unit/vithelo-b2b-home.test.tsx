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

it("keeps all eight dosage formats in one section without a horizontal rail", () => {
  render(<VitheloB2BHome content={vitheloB2BHome} />);

  const dosage = document.getElementById("dosage-forms");
  expect(dosage).toBeInTheDocument();
  expect(within(dosage!).getAllByTestId("dosage-item")).toHaveLength(8);
  expect(dosage).toHaveAttribute("data-layout", "desktop-editorial-field");
  expect(dosage).toHaveAttribute("data-ui-stage", "editorial-format-field");
  expect(dosage).not.toHaveAttribute("data-carousel");
});

it("renders manufacturing as an image-led editorial scene without public governance statuses", () => {
  render(<VitheloB2BHome content={vitheloB2BHome} />);

  const proof = document.getElementById("proof");
  expect(proof).toBeInTheDocument();
  expect(proof).toHaveAttribute("data-layout", "full-width-visual-editorial-caption");
  expect(within(proof!).getByTestId("manufacturing-scene")).toBeInTheDocument();
  expect(within(proof!).getAllByTestId("manufacturing-detail")).toHaveLength(4);
  expect(proof).not.toHaveTextContent(/Evidence required|Pending|Not configured/i);
});

it("renders product directions as a visible vertical editorial sequence", () => {
  render(<VitheloB2BHome content={vitheloB2BHome} />);

  const directions = document.getElementById("solutions");
  expect(directions).toHaveAttribute("data-layout", "vertical-editorial-sequence");
  expect(within(directions!).getAllByTestId("market-story")).toHaveLength(6);
  expect(within(directions!).getAllByTestId("market-story-image")).toHaveLength(6);
  expect(within(directions!).queryByRole("button")).not.toBeInTheDocument();
  expect(directions).not.toHaveTextContent(/\d{2} \/ \d{2}/);
});

it("renders capability boundary as a structured scope map without numeric counters", () => {
  render(<VitheloB2BHome content={vitheloB2BHome} />);

  const boundary = document.getElementById("capacity-boundary");
  expect(boundary).toBeInTheDocument();
  expect(within(boundary!).getAllByTestId("capability-boundary-item")).toHaveLength(4);
  expect(boundary).toHaveTextContent("Dosage formats");
  expect(boundary).toHaveTextContent("Development routes");
  expect(boundary).toHaveTextContent("Manufacturing scope");
  expect(boundary).toHaveTextContent("Evidence status");
  expect(boundary).not.toHaveTextContent(/\d[\d,+]*\s*(?:B|t|formats|clients|countries)/i);
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
  expect(within(proof!).getByRole("heading", { name: "Manufacturing, made visible." })).toBeVisible();
  expect(proof).toHaveTextContent("A working environment for nutrition products and project teams.");
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
  expect(document.querySelectorAll("[data-motion-role='collection-item']")).toHaveLength(8);
  expect(document.querySelectorAll("[data-motion-role='process-step']")).toHaveLength(6);
});

it("reveals each motion section once and disconnects on unmount", () => {
  const observe = vi.fn();
  const unobserve = vi.fn();
  const disconnect = vi.fn();
  let observerCallback: IntersectionObserverCallback = () => undefined;
  const observer = {
    disconnect,
    observe,
    takeRecords: vi.fn(() => []),
    unobserve,
  };
  class IntersectionObserverMock {
    constructor(callback: IntersectionObserverCallback) {
      observerCallback = callback;
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
  expect(observe).toHaveBeenCalledTimes(6);
  expect(observe.mock.calls.map(([element]) => element.id)).toEqual([
    "proof",
    "capacity-boundary",
    "gummy-stage",
    "solutions",
    "dosage-forms",
    "project-runway",
  ]);

  const proof = document.getElementById("proof")!;
  observerCallback(
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
