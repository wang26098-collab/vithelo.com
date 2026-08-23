import { render, screen } from "@testing-library/react";
import { DevicePdp } from "@/components/patterns/device-pdp";
import { NutritionPdp } from "@/components/patterns/nutrition-pdp";
import { demoEvidence } from "@/content/demo/evidence";
import { demoProducts } from "@/content/demo/products";
import { EvidenceSchema, FormulaSchema, IngredientSchema, ProductSchema, TechnologySchema } from "@/content/schema";

const products = demoProducts.items.map((item) => ProductSchema.parse(item));
const formulas = demoProducts.formulas.map((item) => FormulaSchema.parse(item));
const ingredients = demoProducts.ingredients.map((item) => IngredientSchema.parse(item));
const technologies = demoProducts.technologies.map((item) => TechnologySchema.parse(item));
const evidence = demoEvidence.items.map((item) => EvidenceSchema.parse(item));

it.each(["nutrition", "device"] as const)("keeps %s commerce and critical safety visible", (kind) => {
  const product = products.find((item) => item.kind === kind)!;

  if (product.kind === "nutrition") {
    render(
      <NutritionPdp
        evidence={evidence}
        formulas={formulas}
        ingredients={ingredients}
        product={product}
      />,
    );
  } else {
    render(<DevicePdp product={product} technologies={technologies} />);
  }

  expect(screen.getByRole("heading", { name: product.name })).toBeVisible();
  expect(screen.getByText(/price not configured/i)).toBeVisible();
  expect(screen.getByRole("button", { name: /add to cart|start inquiry/i })).toBeVisible();
  expect(screen.getByRole("heading", { name: /safety/i })).toBeVisible();
  expect(screen.getByRole("link", { name: "Start a Project" })).toHaveAttribute(
    "href",
    expect.stringContaining("/contact?"),
  );
});
