import { render, screen } from "@testing-library/react";
import { AestheticLanding } from "@/components/patterns/aesthetic-landing";
import { NutritionLanding } from "@/components/patterns/nutrition-landing";

it("keeps the two product worlds recognizable without color-channel theming", () => {
  const { rerender } = render(<NutritionLanding />);

  expect(screen.getByText(/formulation precision/i)).toBeVisible();
  expect(screen.getByText(/daily practice/i)).toBeVisible();

  rerender(<AestheticLanding />);

  expect(screen.getByText(/complete device/i)).toBeVisible();
  expect(screen.getByText(/skin interface/i)).toBeVisible();
  expect(
    screen.getByAltText(/fictional demonstration aesthetic device/i),
  ).toHaveAttribute("loading", "eager");
});
