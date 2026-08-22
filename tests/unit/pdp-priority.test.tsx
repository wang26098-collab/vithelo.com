import { render, screen } from "@testing-library/react";
import { DevicePdp } from "@/components/patterns/device-pdp";
import { NutritionPdp } from "@/components/patterns/nutrition-pdp";
import { demoProducts } from "@/content/demo/products";

it.each([
  ["nutrition", NutritionPdp],
  ["device", DevicePdp],
] as const)("keeps %s commerce and critical safety visible", (kind, Pattern) => {
  const product = demoProducts.items.find((item) => item.kind === kind)!;

  render(<Pattern product={product as never} />);

  expect(screen.getByRole("heading", { name: product.name })).toBeVisible();
  expect(screen.getByText(/price not configured/i)).toBeVisible();
  expect(screen.getByRole("button", { name: /add to cart|start inquiry/i })).toBeVisible();
  expect(screen.getByRole("heading", { name: /safety/i })).toBeVisible();
  expect(screen.getByRole("link", { name: "Start a Project" })).toHaveAttribute(
    "href",
    expect.stringContaining("/contact?"),
  );
});
