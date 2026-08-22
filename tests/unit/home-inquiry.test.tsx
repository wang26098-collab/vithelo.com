import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

it("prioritizes the VITHELO B2B inquiry journey", () => {
  render(<HomePage />);

  expect(
    screen.getByRole("heading", { name: "Precision for what comes next." }),
  ).toBeVisible();
  expect(screen.getAllByRole("button", { name: "Email Inquiry" })[0]).toBeDisabled();
  expect(screen.getAllByRole("button", { name: "WhatsApp" })[0]).toBeDisabled();
  expect(screen.getByRole("heading", { name: "For Product Partners" })).toBeVisible();
  expect(screen.getByRole("heading", { name: "For Professional Partners" })).toBeVisible();
  expect(
    screen.getByRole("heading", { name: "Two product worlds. One VITHELO standard." }),
  ).toBeVisible();
  expect(screen.getByRole("heading", { name: "Tell us what you are building." })).toBeVisible();
  expect(screen.getByText("Source not configured")).toBeVisible();
  expect(screen.getByText("Scope requires approved source input")).toBeVisible();
  expect(screen.getByText("This demonstration record is not product evidence")).toBeVisible();
  expect(document.querySelector('[data-testid="hero-art-direction"] source')).toBeInTheDocument();
});
