import { render, screen } from "@testing-library/react";
import { AestheticLanding } from "@/components/patterns/aesthetic-landing";
import { NutritionLanding } from "@/components/patterns/nutrition-landing";
import { demoProducts } from "@/content/demo/products";
import { FormulaSchema, ProductSchema, TechnologySchema } from "@/content/schema";

const products = demoProducts.items.map((item) => ProductSchema.parse(item));
const formulas = demoProducts.formulas.map((item) => FormulaSchema.parse(item));
const technologies = demoProducts.technologies.map((item) => TechnologySchema.parse(item));

it("groups nutrition discovery by its validated health categories", () => {
  render(<NutritionLanding formulas={formulas} products={products} />);

  expect(screen.getByRole("heading", { name: "Sleep Health" })).toBeVisible();
  expect(screen.getByRole("heading", { name: "Women’s Health" })).toBeVisible();
  expect(screen.getByRole("heading", { name: "Daily Essential" })).toBeVisible();
  expect(document.querySelector("#sleep-health")).toBeTruthy();
  expect(document.querySelector("#womens-health")).toBeTruthy();
  expect(document.querySelector("#daily-essential")).toBeTruthy();
});

it("keeps aesthetic technology reachable as a separate landing route", () => {
  render(<AestheticLanding products={products} technologies={technologies} />);

  expect(screen.getByText(/complete device/i)).toBeVisible();
  expect(screen.getByText(/skin interface/i)).toBeVisible();
  expect(
    screen.getByAltText(/fictional demonstration aesthetic device/i),
  ).toHaveAttribute("loading", "eager");
});
