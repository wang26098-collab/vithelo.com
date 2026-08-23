import { fireEvent, render, screen, within } from "@testing-library/react";
import HomePage from "@/app/page";
import { NutritionHomeHero } from "@/components/patterns/nutrition-home-hero";
import { demoHome } from "@/content/demo/home";

it("renders the six nutrition screens in order before the inquiry path", async () => {
  render(await HomePage());

  expect(document.getElementById("nutrition-hero")).toBeInTheDocument();
  expect(document.getElementById("nutrition-hero")).toHaveAttribute("data-motion-intent", "ORIENT");
  expect(
    within(document.getElementById("nutrition-hero")!).getByRole("heading", {
      name: "Sleep deeper. Live in balance.",
    }),
  ).toBeVisible();
  expect(screen.getByTestId("nutrition-hero-media-demo")).toBeInTheDocument();
  expect(screen.getByTestId("nutrition-hero-approved-art")).toHaveAttribute(
    "srcset",
    expect.stringContaining("vithelo-home-screen-01-background.png"),
  );
  expect(document.getElementById("nutrition-hero")).toHaveAttribute(
    "data-static-design",
    "screen-01-approved",
  );
  expect(document.getElementById("nutrition-hero")).toHaveAttribute(
    "data-content-status",
    "DEMO_ONLY",
  );
  const heroNavigation = within(document.getElementById("nutrition-hero")!).getByRole(
    "navigation",
    { name: "Hero navigation" },
  );
  expect(within(heroNavigation).getByRole("link", { name: "Our approach" })).toHaveAttribute(
    "href",
    "#nutrition-manifesto",
  );
  expect(within(heroNavigation).getByRole("link", { name: "Sleep health" })).toHaveAttribute(
    "href",
    "/nutrition#sleep-health",
  );
  expect(within(document.getElementById("nutrition-hero")!).getByRole("link", { name: "Explore our range" })).toHaveAttribute(
    "href",
    "#nutrition-products",
  );
  expect(screen.getByTestId("nutrition-hero-live-content")).toHaveAttribute(
    "data-motion-intent",
    "ORIENT",
  );
  expect(within(heroNavigation).getByRole("link", { name: "About" })).toHaveAttribute(
    "href",
    "/professional",
  );

  expect(document.getElementById("nutrition-manifesto")).toBeInTheDocument();
  expect(document.getElementById("nutrition-manifesto")).toHaveAttribute("data-motion-intent", "RELATE");
  expect(document.getElementById("nutrition-manifesto")).toHaveAttribute(
    "data-static-design",
    "screen-02-approved",
  );
  expect(screen.getByTestId("nutrition-manifesto-background")).toHaveAttribute(
    "src",
    expect.stringContaining("vithelo-home-screen-02-background.png"),
  );
  expect(screen.getByTestId("nutrition-manifesto-live-content")).toHaveAttribute(
    "data-motion-intent",
    "RELATE",
  );
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
  expect(document.getElementById("nutrition-products")).toHaveAttribute(
    "data-static-design",
    "screen-03-approved",
  );
  expect(screen.getByRole("heading", { name: "Find your daily formula." })).toBeVisible();
  expect(screen.getByRole("link", { name: "View all products" })).toHaveAttribute(
    "href",
    "/nutrition",
  );
  expect(screen.getAllByTestId("nutrition-product-card")).toHaveLength(3);
  expect(screen.getAllByTestId("nutrition-product-card-image").map((image) => image.getAttribute("src"))).toEqual(
    expect.arrayContaining([
      expect.stringContaining("vithelo-product-card-sleep.png"),
      expect.stringContaining("vithelo-product-card-womens.png"),
      expect.stringContaining("vithelo-product-card-daily.png"),
    ]),
  );

  const capsuleScience = document.getElementById("capsule-science");
  const gummyScience = document.getElementById("gummy-science");
  const humanRhythms = document.getElementById("human-rhythms");

  expect(capsuleScience).toBeInTheDocument();
  expect(gummyScience).toBeInTheDocument();
  expect(humanRhythms).toBeInTheDocument();
  expect(capsuleScience!.compareDocumentPosition(gummyScience!)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  expect(gummyScience!.compareDocumentPosition(humanRhythms!)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  expect(capsuleScience).toHaveAttribute("data-static-design", "screen-04-approved");
  expect(within(capsuleScience!).getByRole("heading", { name: "Precision inside every capsule." })).toBeVisible();
  expect(within(gummyScience!).getByRole("heading", { name: "Gummy form study" })).toBeVisible();
  expect(within(capsuleScience!).getByText("OUTER FORM", { exact: true })).toBeVisible();
  expect(within(gummyScience!).getByText("FORM", { exact: true })).toBeVisible();
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

it("keeps non-approved capsule and gummy media visibly disclosed", async () => {
  render(await HomePage());

  expect(document.getElementById("capsule-science")).toHaveTextContent("NOT_CONFIGURED");
  expect(document.getElementById("gummy-science")).toHaveTextContent("NOT_CONFIGURED");
  expect(within(document.getElementById("capsule-science")!).getByTestId("capsule-visual")).toBeVisible();
  expect(within(document.getElementById("gummy-science")!).getByTestId("form-media-fallback")).toBeVisible();
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
