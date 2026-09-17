import { render, screen, within } from "@testing-library/react";
import HomePage from "@/app/page";
import { NutritionHomeHero } from "@/components/patterns/nutrition-home-hero";
import { demoHome } from "@/content/demo/home";

it("uses a local inquiry composer while exposing approved direct channels", async () => {
  render(await HomePage());

  const contact = document.getElementById("contact");
  expect(contact).toHaveAttribute("data-contact-state", "CONFIGURED");
  expect(contact).toHaveAttribute("data-layout", "editorial-channel-split");
  expect(within(contact!).getByLabelText("Your brand or company")).toBeVisible();
  expect(within(contact!).getByLabelText("Dosage form")).toBeVisible();
  expect(within(contact!).queryByRole("button")).not.toBeInTheDocument();
  expect(within(contact!).getByRole("link", { name: "Email wang26098@gmail.com" })).toHaveAttribute(
    "href",
    expect.stringContaining("mailto:wang26098@gmail.com"),
  );
  expect(within(contact!).getByRole("link", { name: "WhatsApp +86 182 7366 9556" })).toHaveAttribute(
    "href",
    expect.stringContaining("https://wa.me/8618273669556"),
  );
});

it("keeps rendered homepage imagery explicit without exposing asset metadata", async () => {
  render(await HomePage());

  expect(document.querySelectorAll('[data-media-status="FREE_COMMERCIAL_OR_REAL"]')).not.toHaveLength(0);
  expect(screen.queryByText(/Lifestyle asset/)).not.toBeInTheDocument();
  expect(document.querySelectorAll("img")).toHaveLength(13);
  expect(document.querySelectorAll("[data-testid='market-scene'] img")).toHaveLength(3);
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
