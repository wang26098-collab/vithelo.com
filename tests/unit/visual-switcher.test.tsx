import { act } from "react";
import { hydrateRoot } from "react-dom/client";
import { renderToString } from "react-dom/server";
import { fireEvent, render, screen } from "@testing-library/react";
import { MembraneReveal } from "@/components/motion/membrane-reveal";
import { Reveal } from "@/components/motion/reveal";
import { ScaleShift } from "@/components/motion/scale-shift";
import { VisualSwitcher } from "@/components/motion/visual-switcher";

const items = [
  {
    id: "structure",
    label: "Structure",
    content: "Approved-data slot A",
    visual: <span>Static visual A</span>,
  },
  {
    id: "use",
    label: "Use",
    content: "Approved-data slot B",
    visual: <span>Static visual B</span>,
  },
];

function setReducedMotion(matches: boolean) {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: query === "(prefers-reduced-motion: reduce)" && matches,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

beforeEach(() => setReducedMotion(false));

it("switches facts by keyboard without removing inactive text from document order", () => {
  render(
    <VisualSwitcher intent="EXPLAIN" label="Demo formula" items={items} />,
  );

  fireEvent.keyDown(screen.getByRole("tab", { name: "Use" }), {
    key: "Enter",
  });

  expect(screen.getByRole("tab", { name: "Use" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  expect(screen.getByText("Approved-data slot B")).toBeVisible();
  expect(screen.getByText("Approved-data slot A")).toBeVisible();
  expect(screen.getAllByTestId("switcher-fact")).toHaveLength(2);
  expect(screen.getAllByTestId("switcher-fact")[0]).toHaveTextContent(
    "Approved-data slot A",
  );
});

it("supports click, Space, and arrow-key selection with managed tab stops", () => {
  render(
    <VisualSwitcher intent="RELATE" label="Demo formula" items={items} />,
  );

  const structure = screen.getByRole("tab", { name: "Structure" });
  const use = screen.getByRole("tab", { name: "Use" });

  fireEvent.click(use);
  expect(use).toHaveAttribute("aria-selected", "true");

  fireEvent.keyDown(structure, { key: " " });
  expect(structure).toHaveAttribute("aria-selected", "true");

  fireEvent.keyDown(structure, { key: "ArrowRight" });
  expect(use).toHaveAttribute("aria-selected", "true");
  expect(use).toHaveAttribute("tabindex", "0");
  expect(structure).toHaveAttribute("tabindex", "-1");
});

it("does not intercept vertical scrolling keys on its horizontal tablist", () => {
  render(
    <VisualSwitcher intent="RELATE" label="Demo formula" items={items} />,
  );

  const structure = screen.getByRole("tab", { name: "Structure" });
  expect(fireEvent.keyDown(structure, { key: "ArrowDown" })).toBe(true);
  expect(structure).toHaveAttribute("aria-selected", "true");
});

it("keeps always-visible facts as document sections instead of inactive tab panels", () => {
  render(
    <VisualSwitcher intent="EXPLAIN" label="Demo formula" items={items} />,
  );

  const facts = screen.getAllByTestId("switcher-fact");
  expect(facts[0].tagName).toBe("ARTICLE");
  expect(facts[0]).not.toHaveAttribute("role", "tabpanel");
  expect(facts[1]).not.toHaveAttribute("role", "tabpanel");
  expect(facts[1]).toHaveTextContent("Approved-data slot B");
});

it("keeps semantic content static when reduced motion is requested", () => {
  setReducedMotion(true);

  render(
    <>
      <Reveal intent="ORIENT">Orientation copy</Reveal>
      <MembraneReveal intent="FOCUS">Membrane copy</MembraneReveal>
      <ScaleShift intent="CONFIRM" active>
        Scale copy
      </ScaleShift>
      <VisualSwitcher intent="EXPLAIN" label="Demo formula" items={items} />
    </>,
  );

  expect(screen.getByText("Orientation copy")).toBeVisible();
  expect(screen.getByText("Membrane copy")).toBeVisible();
  expect(screen.getByText("Scale copy")).toBeVisible();
  expect(screen.getByText("Approved-data slot A")).toBeVisible();
  expect(screen.getByText("Approved-data slot B")).toBeVisible();
  expect(screen.getAllByTestId("reduced-motion-static")).toHaveLength(4);
});

it("reconciles a static server render into an animated client reveal", async () => {
  setReducedMotion(false);
  Object.defineProperty(globalThis, "IntersectionObserver", {
    configurable: true,
    value: class {
      disconnect() {}
      observe() {}
      takeRecords() {
        return [];
      }
      unobserve() {}
    },
  });

  const container = document.createElement("div");
  container.innerHTML = renderToString(
    <Reveal intent="ORIENT">Hydrated orientation</Reveal>,
  );
  document.body.append(container);

  const root = hydrateRoot(
    container,
    <Reveal intent="ORIENT">Hydrated orientation</Reveal>,
  );
  await act(async () => {});

  expect(container.firstElementChild).toHaveAttribute(
    "data-motion-mode",
    "animated",
  );

  await act(async () => root.unmount());
  container.remove();
});
