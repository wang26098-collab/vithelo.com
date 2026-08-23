import { render, screen, within } from "@testing-library/react";
import { beforeEach, vi } from "vitest";
import HomePage from "@/app/page";
import { NutritionHomeHero } from "@/components/patterns/nutrition-home-hero";
import { demoHome } from "@/content/demo/home";

beforeEach(() => {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

it("renders the nutrition-first hero, manifesto, and product discovery before inquiry support", () => {
  render(<HomePage />);

  expect(document.getElementById("nutrition-hero")).toBeInTheDocument();
  expect(document.getElementById("nutrition-hero")).toHaveAttribute("data-motion-intent", "ORIENT");
  expect(
    within(document.getElementById("nutrition-hero")!).getByRole("heading", {
      name: "Nutrition for the rhythms that shape a life.",
    }),
  ).toBeVisible();
  expect(screen.getByTestId("nutrition-hero-media-demo")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Professional partnership" })).toHaveAttribute(
    "href",
    "/professional",
  );

  expect(document.getElementById("nutrition-manifesto")).toBeInTheDocument();
  expect(document.getElementById("nutrition-manifesto")).toHaveAttribute("data-motion-intent", "RELATE");
  expect(
    within(document.getElementById("nutrition-manifesto")!).getByRole("heading", {
      name: "Nutrition for the rhythms that shape a life.",
    }),
  ).toBeVisible();
  expect(screen.getByRole("link", { name: "Sleep Health" })).toHaveAttribute(
    "href",
    "/nutrition#sleep-health",
  );
  expect(screen.getByRole("link", { name: "Women’s Health" })).toHaveAttribute(
    "href",
    "/nutrition#womens-health",
  );

  expect(document.getElementById("nutrition-products")).toBeInTheDocument();
  expect(document.getElementById("nutrition-products")).toHaveAttribute("data-motion-intent", "FOCUS");
  expect(screen.getByRole("heading", { name: "Find your daily formula." })).toBeVisible();
  expect(screen.getAllByTestId("nutrition-product-card")).toHaveLength(3);

  expect(screen.getByRole("heading", { name: "Tell us what you are building." })).toBeVisible();
  expect(screen.getAllByRole("button", { name: "Email Inquiry" })[0]).toBeDisabled();
  expect(screen.getAllByRole("button", { name: "WhatsApp" })[0]).toBeDisabled();
});

it("uses a labelled mobile fallback when mobile hero media is not configured", () => {
  render(
    <NutritionHomeHero
      hero={{
        ...demoHome.hero,
        mobileMedia: {
          status: "NOT_CONFIGURED",
          alt: "Mobile nutrition composition requires approved assets",
          message: "Mobile nutrition media requires approved product assets.",
        },
      }}
    />,
  );

  expect(screen.getByTestId("nutrition-hero-media-desktop-demo")).toBeInTheDocument();
  expect(screen.getByTestId("nutrition-hero-media-mobile-fallback")).toHaveTextContent(
    "Mobile nutrition media requires approved product assets.",
  );
  expect(screen.queryByAltText("Mobile nutrition composition requires approved assets")).not.toBeInTheDocument();
});
