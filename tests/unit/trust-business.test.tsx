import { fireEvent, render, screen, within } from "@testing-library/react";
import { ProfessionalPage } from "@/components/patterns/professional-page";
import { SciencePage } from "@/components/patterns/science-page";

it("reveals evidence scope and limitation without converting it into a claim", () => {
  render(<SciencePage />);

  fireEvent.click(screen.getByRole("button", { name: /view source context/i }));

  expect(screen.getByText(/scope/i)).toBeVisible();
  expect(screen.getByText(/limitations/i)).toBeVisible();
});

it("starts professional intake from a business intent", () => {
  render(<ProfessionalPage />);

  expect(screen.getByRole("link", { name: "Start a Project" })).toHaveAttribute(
    "href",
    "/contact",
  );

  fireEvent.click(screen.getByRole("button", { name: /develop a product/i }));

  expect(screen.getByRole("heading", { name: /project basics/i })).toBeVisible();
  const summary = screen.getByLabelText("Project summary");
  expect(summary).toBeVisible();
  expect(
    within(summary.parentElement!).getByText(
      "What product world and early brief should we understand?",
    ),
  ).toBeVisible();
});
