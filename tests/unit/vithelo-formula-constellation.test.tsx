import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { VitheloFormulaConstellation } from "@/components/patterns/vithelo-formula-constellation";
import { vitheloB2BHome } from "@/content/demo/vithelo-b2b-home";

function renderConstellation() {
  return render(
    <VitheloFormulaConstellation customization={vitheloB2BHome.customization} />,
  );
}

function installPointerEventMock() {
  class PointerEventMock extends MouseEvent {
    readonly pointerType: string;

    constructor(type: string, init: PointerEventInit = {}) {
      super(type, init);
      this.pointerType = init.pointerType ?? "";
    }
  }

  vi.stubGlobal("PointerEvent", PointerEventMock);
}

it("starts in overview and preserves all four decision nodes", () => {
  renderConstellation();

  expect(screen.getByTestId("customization-media-frame")).toBeInTheDocument();
  expect(screen.getByTestId("customization-decision-grid")).toBeInTheDocument();
  expect(screen.getByTestId("customization-constellation")).toHaveAttribute(
    "data-customization-state",
    "overview",
  );
  expect(screen.getAllByTestId("customization-node")).toHaveLength(4);
  const nodes = screen.getAllByTestId("customization-node");
  expect(nodes[0]).toHaveProperty("tagName", "BUTTON");
  expect(nodes.slice(1).map((node) => node.tagName)).toEqual([
    "ARTICLE",
    "ARTICLE",
    "ARTICLE",
  ]);
  expect(nodes[0]).toHaveAttribute("aria-pressed", "false");
  expect(screen.queryByTestId("customization-orbit")).not.toBeInTheDocument();
  expect(screen.queryByTestId("customization-node-icon")).not.toBeInTheDocument();
});

it("uses mouse hover as a temporary Formula preview", () => {
  installPointerEventMock();
  renderConstellation();
  const formula = screen.getByRole("button", { name: /Formula/i });

  fireEvent.pointerEnter(formula, { pointerType: "mouse" });
  expect(screen.getByTestId("customization-constellation")).toHaveAttribute(
    "data-customization-state",
    "formula",
  );
  fireEvent.pointerLeave(formula, { pointerType: "mouse" });
  expect(screen.getByTestId("customization-constellation")).toHaveAttribute(
    "data-customization-state",
    "overview",
  );

  vi.unstubAllGlobals();
});

it("supports keyboard focus and Escape", () => {
  renderConstellation();
  const formula = screen.getByRole("button", { name: /Formula/i });

  fireEvent.focus(formula);
  expect(formula).toHaveAttribute("aria-pressed", "true");
  fireEvent.blur(formula);
  expect(screen.getByTestId("customization-constellation")).toHaveAttribute(
    "data-customization-state",
    "overview",
  );

  fireEvent.focus(formula);
  expect(formula).toHaveAttribute("aria-pressed", "true");
  fireEvent.keyDown(formula, { key: "Escape" });
  expect(formula).toHaveAttribute("aria-pressed", "false");
  fireEvent.keyDown(formula, { key: "Enter" });
  expect(formula).toHaveAttribute("aria-pressed", "true");
});

it("lets Escape clear a preview that began with mouse hover", () => {
  installPointerEventMock();
  renderConstellation();
  const formula = screen.getByRole("button", { name: /Formula/i });

  fireEvent.pointerEnter(formula, { pointerType: "mouse" });
  fireEvent.pointerDown(formula, { pointerType: "mouse" });
  fireEvent.focus(formula);
  expect(formula).toHaveAttribute("aria-pressed", "true");

  fireEvent.keyDown(formula, { key: "Escape" });
  expect(formula).toHaveAttribute("aria-pressed", "false");

  vi.unstubAllGlobals();
});

it("restores overview when the active constellation leaves the viewport", () => {
  installPointerEventMock();
  const observe = vi.fn();
  const disconnect = vi.fn();
  let observerCallback: IntersectionObserverCallback | undefined;

  class IntersectionObserverMock {
    constructor(callback: IntersectionObserverCallback) {
      observerCallback = callback;
    }

    disconnect = disconnect;
    observe = observe;
    takeRecords = vi.fn(() => []);
    unobserve = vi.fn();
  }

  vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);

  const { unmount } = renderConstellation();
  const formula = screen.getByRole("button", { name: /Formula/i });
  const constellation = screen.getByTestId("customization-constellation");

  fireEvent.pointerEnter(formula, { pointerType: "mouse" });
  expect(observe).toHaveBeenCalledWith(constellation);

  act(() => {
    observerCallback?.(
      [
        {
          isIntersecting: false,
          target: constellation,
        } as unknown as IntersectionObserverEntry,
      ],
      {} as IntersectionObserver,
    );
  });

  expect(constellation).toHaveAttribute("data-customization-state", "overview");
  expect(disconnect).toHaveBeenCalledTimes(1);

  unmount();
  vi.unstubAllGlobals();
});

it("toggles on touch and restores after an outside pointer", () => {
  installPointerEventMock();
  renderConstellation();
  const formula = screen.getByRole("button", { name: /Formula/i });

  fireEvent.pointerEnter(formula, { pointerType: "touch" });
  expect(formula).toHaveAttribute("aria-pressed", "false");

  fireEvent.pointerDown(formula, { pointerType: "touch" });
  fireEvent.click(formula);
  expect(formula).toHaveAttribute("aria-pressed", "true");

  fireEvent.pointerDown(formula, { pointerType: "touch" });
  fireEvent.click(formula);
  expect(formula).toHaveAttribute("aria-pressed", "false");

  fireEvent.pointerDown(formula, { pointerType: "touch" });
  fireEvent.click(formula);
  expect(formula).toHaveAttribute("aria-pressed", "true");
  fireEvent.pointerDown(document.body, { pointerType: "touch" });
  expect(formula).toHaveAttribute("aria-pressed", "false");

  vi.unstubAllGlobals();
});

it("returns to keyboard activation after touch interaction", () => {
  installPointerEventMock();
  renderConstellation();
  const formula = screen.getByRole("button", { name: /Formula/i });

  fireEvent.pointerDown(formula, { pointerType: "touch" });
  fireEvent.click(formula);
  expect(formula).toHaveAttribute("aria-pressed", "true");

  fireEvent.pointerDown(document.body, { pointerType: "touch" });
  expect(formula).toHaveAttribute("aria-pressed", "false");

  fireEvent.keyDown(document, { key: "Tab" });
  fireEvent.focus(formula);
  expect(formula).toHaveAttribute("aria-pressed", "true");

  vi.unstubAllGlobals();
});

it("clears touch activation with Escape and lets two later taps toggle off", () => {
  installPointerEventMock();
  renderConstellation();
  const formula = screen.getByRole("button", { name: /Formula/i });

  fireEvent.pointerDown(formula, { pointerType: "touch" });
  fireEvent.click(formula);
  expect(formula).toHaveAttribute("aria-pressed", "true");
  fireEvent.keyDown(formula, { key: "Escape" });
  expect(formula).toHaveAttribute("aria-pressed", "false");

  fireEvent.keyDown(document, { key: "Tab" });
  fireEvent.focus(formula);
  expect(formula).toHaveAttribute("aria-pressed", "true");
  fireEvent.pointerDown(formula, { pointerType: "touch" });
  fireEvent.click(formula);
  expect(formula).toHaveAttribute("aria-pressed", "true");
  fireEvent.pointerDown(formula, { pointerType: "touch" });
  fireEvent.click(formula);
  expect(formula).toHaveAttribute("aria-pressed", "false");

  vi.unstubAllGlobals();
});

it("exposes three Formula details only in the active state", () => {
  installPointerEventMock();
  renderConstellation();
  const formula = screen.getByRole("button", { name: /Formula/i });
  const details = screen.getByTestId("formula-details");

  expect(details).toHaveAttribute("aria-hidden", "true");
  fireEvent.pointerEnter(formula, { pointerType: "mouse" });
  expect(details).toHaveAttribute("aria-hidden", "false");
  expect(within(details).getAllByRole("heading", { level: 4 })).toHaveLength(3);

  vi.unstubAllGlobals();
});
