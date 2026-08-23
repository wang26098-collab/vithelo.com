import { render, screen } from "@testing-library/react";
import { ScrollExplanationStage } from "@/components/motion/scroll-explanation-stage";
import { demoHome } from "@/content/demo/home";

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

it("keeps all science facts readable while surfacing demo and missing states", () => {
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
  expect(screen.getAllByText("DEMO_ONLY")).toHaveLength(4);
  expect(screen.getByText("NOT_CONFIGURED")).toBeVisible();
  expect(screen.queryByText("VERIFIED INFORMATION ONLY")).not.toBeInTheDocument();
});

it("renders the four science records in document order as the reduced-motion equivalent", () => {
  setReducedMotion(true);

  render(
    <ScrollExplanationStage
      intent="EXPLAIN"
      stage={demoHome.scienceStages[0]}
      visual={<div data-testid="capsule-visual" />}
    />,
  );

  const staticStage = screen.getByTestId("reduced-motion-static");
  expect(staticStage).toBeVisible();
  expect(
    screen.getAllByTestId("science-state").map((state) => state.dataset.stateLabel),
  ).toEqual(["FORM", "MATERIAL", "USE", "SAFETY"]);
  expect(screen.getByTestId("capsule-visual")).toBeVisible();
});
