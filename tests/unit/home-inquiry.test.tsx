import { fireEvent, render, screen, within } from "@testing-library/react";
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

it("renders the six nutrition screens in order before the inquiry path", () => {
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
  expect(within(document.getElementById("nutrition-manifesto")!).getByRole("link", { name: "Sleep Health" })).toHaveAttribute(
    "href",
    "/nutrition#sleep-health",
  );
  expect(within(document.getElementById("nutrition-manifesto")!).getByRole("link", { name: "Women’s Health" })).toHaveAttribute(
    "href",
    "/nutrition#womens-health",
  );

  expect(document.getElementById("nutrition-products")).toBeInTheDocument();
  expect(document.getElementById("nutrition-products")).toHaveAttribute("data-motion-intent", "FOCUS");
  expect(screen.getByRole("heading", { name: "Find your daily formula." })).toBeVisible();
  expect(screen.getAllByTestId("nutrition-product-card")).toHaveLength(3);

  const capsuleScience = document.getElementById("capsule-science");
  const gummyScience = document.getElementById("gummy-science");
  const humanRhythms = document.getElementById("human-rhythms");

  expect(capsuleScience).toBeInTheDocument();
  expect(gummyScience).toBeInTheDocument();
  expect(humanRhythms).toBeInTheDocument();
  expect(capsuleScience!.compareDocumentPosition(gummyScience!)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  expect(gummyScience!.compareDocumentPosition(humanRhythms!)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  expect(within(capsuleScience!).getByRole("heading", { name: "Capsule form study" })).toBeVisible();
  expect(within(gummyScience!).getByRole("heading", { name: "Gummy form study" })).toBeVisible();
  expect(screen.getAllByText("FORM", { exact: true })).toHaveLength(2);
  expect(
    within(humanRhythms!).getByRole("heading", {
      name: "Your health moves with your rhythms.",
    }),
  ).toBeVisible();
  expect(within(humanRhythms!).getByRole("link", { name: "Sleep Health" })).toHaveAttribute(
    "href",
    "/nutrition#sleep-health",
  );
  expect(within(humanRhythms!).getByRole("link", { name: "Women’s Health" })).toHaveAttribute(
    "href",
    "/nutrition#womens-health",
  );
  expect(within(humanRhythms!).getByRole("button", { name: "Pause health rhythm media" })).toBeVisible();
  expect(within(humanRhythms!).queryByRole("video")).not.toBeInTheDocument();

  fireEvent.click(within(humanRhythms!).getByRole("button", { name: "Pause health rhythm media" }));
  expect(within(humanRhythms!).getByRole("button", { name: "Play health rhythm media" })).toBeVisible();

  expect(screen.getByRole("heading", { name: "Precision starts with responsible information." })).toBeVisible();
  expect(screen.getByRole("heading", { name: "Health Knowledge" })).toBeVisible();
  expect(screen.getByRole("heading", { name: "Professional partnership" })).toBeVisible();
  expect(screen.getByRole("heading", { name: "Tell us what you are building." })).toBeVisible();
  expect(screen.getAllByRole("button", { name: "Email Inquiry" })[0]).toBeDisabled();
  expect(screen.getAllByRole("button", { name: "WhatsApp" })[0]).toBeDisabled();
});

it("keeps non-approved capsule and gummy media visibly disclosed", () => {
  render(<HomePage />);

  expect(document.getElementById("capsule-science")).toHaveTextContent("NOT_CONFIGURED");
  expect(document.getElementById("gummy-science")).toHaveTextContent("NOT_CONFIGURED");
  expect(screen.getAllByTestId("form-media-fallback")).toHaveLength(2);
  expect(document.querySelectorAll("[class*='ruby-material'] button, [class*='ruby-material'] a")).toHaveLength(0);
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
