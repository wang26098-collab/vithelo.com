import { fireEvent, render, screen } from "@testing-library/react";
import { NutritionProductFocusRail } from "@/components/domain/nutrition-product-focus-rail";
import { demoProducts } from "@/content/demo/products";
import { ProductSchema, type NutritionProduct } from "@/content/schema";

function nutritionProducts(): NutritionProduct[] {
  return demoProducts.items.flatMap((product) => {
    const parsedProduct = ProductSchema.parse(product);
    return parsedProduct.kind === "nutrition" ? [parsedProduct] : [];
  });
}

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

it("keeps pointer and keyboard focus in the same active product state", () => {
  render(<NutritionProductFocusRail products={nutritionProducts()} />);

  const womenCard = screen.getByRole("link", { name: /Demo Women.*Formula/i });
  const dailyCard = screen.getByRole("link", { name: /Demo Daily Formula/i });

  fireEvent.pointerEnter(womenCard);
  expect(womenCard.closest("article")).toHaveAttribute("data-active", "true");

  fireEvent.focus(womenCard);
  expect(womenCard.closest("article")).toHaveAttribute("data-active", "true");

  fireEvent.keyDown(womenCard, { key: "ArrowRight" });
  expect(dailyCard).toHaveFocus();
  expect(dailyCard.closest("article")).toHaveAttribute("data-active", "true");
});

it("renders every product fact without hover and exposes mobile snap semantics", () => {
  render(<NutritionProductFocusRail products={nutritionProducts()} />);

  expect(screen.getAllByTestId("nutrition-product-card")).toHaveLength(3);
  expect(screen.getAllByTestId("product-focus-fact")).toHaveLength(3);
  expect(screen.getByText("sleep-health")).toBeVisible();
  expect(screen.getByText("womens-health")).toBeVisible();
  expect(screen.getByText("daily-essential")).toBeVisible();
  expect(screen.getAllByTestId("product-focus-fact")).toHaveLength(3);
  expect(screen.getAllByTestId("product-focus-fact")[0]).toHaveTextContent(
    "Safety details require approved product input",
  );

  const rail = screen.getByTestId("nutrition-product-focus-rail");
  expect(rail.className).toContain("snap-x");
  expect(rail.className).toContain("snap-mandatory");
  expect(screen.getAllByTestId("nutrition-product-card")[0]?.className).toContain(
    "min-w-[82vw]",
  );
});

it("uses an explicit static equivalent when reduced motion is requested", () => {
  setReducedMotion(true);

  render(<NutritionProductFocusRail products={nutritionProducts()} />);

  expect(screen.getByTestId("reduced-motion-static")).toBeVisible();
  expect(screen.getAllByTestId("product-focus-fact")).toHaveLength(3);
  expect(screen.getByRole("link", { name: /Demo Sleep Formula/i })).toBeVisible();
  expect(screen.getByRole("link", { name: /Demo Women.*Formula/i })).toBeVisible();
  expect(screen.getByRole("link", { name: /Demo Daily Formula/i })).toBeVisible();
});
