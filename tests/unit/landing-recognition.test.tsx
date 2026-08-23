import { render, screen } from "@testing-library/react";
import { AestheticLanding } from "@/components/patterns/aesthetic-landing";
import { NutritionLanding } from "@/components/patterns/nutrition-landing";

it("groups nutrition discovery by its validated health categories", () => {
  render(<NutritionLanding />);

  expect(screen.getByRole("heading", { name: "Sleep Health" })).toBeVisible();
  expect(screen.getByRole("heading", { name: "Women’s Health" })).toBeVisible();
  expect(screen.getByRole("heading", { name: "Daily Essential" })).toBeVisible();
  expect(document.querySelector("#sleep-health")).toBeTruthy();
  expect(document.querySelector("#womens-health")).toBeTruthy();
  expect(document.querySelector("#daily-essential")).toBeTruthy();
});

it("keeps aesthetic technology reachable as a separate landing route", () => {
  render(<AestheticLanding />);

  expect(screen.getByText(/complete device/i)).toBeVisible();
  expect(screen.getByText(/skin interface/i)).toBeVisible();
  expect(
    screen.getByAltText(/fictional demonstration aesthetic device/i),
  ).toHaveAttribute("loading", "eager");
});
