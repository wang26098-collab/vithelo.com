import { render, screen, within } from "@testing-library/react";
import HomePage from "@/app/page";
import { NutritionHomeHero } from "@/components/patterns/nutrition-home-hero";
import { demoHome } from "@/content/demo/home";

it("keeps the B2B homepage inquiry local and visibly not configured", async () => {
  render(await HomePage());

  const contact = document.getElementById("contact");
  expect(contact).toHaveAttribute("data-contact-state", "NOT_CONFIGURED");
  expect(within(contact!).getByLabelText("Name / Company")).toBeEnabled();
  expect(within(contact!).getByLabelText("Dosage Format")).toHaveValue("Gummies");
  expect(
    within(contact!).getByRole("button", {
      name: "Inquiry submission not configured",
    }),
  ).toBeDisabled();
  expect(within(contact!).getByText(/NOT_CONFIGURED/)).toBeVisible();
});

it("keeps missing homepage media explicit instead of inventing assets", async () => {
  render(await HomePage());

  expect(document.querySelectorAll('[data-media-status="REQUIRED_REAL_ASSET"]')).not.toHaveLength(0);
  expect(document.querySelectorAll('[data-media-status="FREE_COMMERCIAL_OR_REAL"]')).not.toHaveLength(0);
  expect(screen.getByText(/Real clean-production panorama/)).toBeVisible();
  expect(document.querySelectorAll("img")).toHaveLength(0);
});

it("uses a labelled mobile fallback in the independent legacy hero component", () => {
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
  expect(
    screen.queryByAltText("Mobile nutrition composition requires approved assets"),
  ).not.toBeInTheDocument();
});
