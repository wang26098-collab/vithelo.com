import { render, within } from "@testing-library/react";
import { NutritionScienceStage } from "@/components/patterns/nutrition-science-stage";
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

it("renders the approved capsule science stage as live website content", () => {
  render(<NutritionScienceStage stage={demoHome.scienceStages[0]} />);

  const stage = document.getElementById("capsule-science");
  expect(stage).toHaveAttribute("data-static-design", "screen-04-approved");
  expect(stage).toHaveAttribute("data-content-status", "DEMO_ONLY");
  expect(within(stage!).getByRole("heading", { name: "Precision inside every capsule." })).toBeVisible();
  expect(within(stage!).getByTestId("capsule-science-live-content")).toHaveAttribute("data-motion-intent", "EXPLAIN");
  expect(within(stage!).getByTestId("capsule-visual")).toBeVisible();
  expect(within(stage!).getAllByTestId("capsule-science-state")).toHaveLength(4);
  expect(within(stage!).getByText("OUTER FORM")).toBeVisible();
  expect(within(stage!).getByText("INNER FORM")).toBeVisible();
  expect(within(stage!).getByText("NOT_CONFIGURED")).toBeVisible();
});

it("keeps all capsule science records in document order for reduced motion", () => {
  setReducedMotion(true);
  render(<NutritionScienceStage stage={demoHome.scienceStages[0]} />);

  const stage = document.getElementById("capsule-science")!;
  expect(within(stage).getByTestId("capsule-science-static")).toBeVisible();
  expect(
    within(stage)
      .getAllByTestId("capsule-science-state")
      .map((state) => state.dataset.stateLabel),
  ).toEqual(["FORM", "MATERIAL", "USE", "SAFETY"]);
});
