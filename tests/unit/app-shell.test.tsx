import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

it("renders the VITHELO brand and demo disclosure", () => {
  render(<HomePage />);
  expect(screen.getByText("VITHELO")).toBeInTheDocument();
  expect(screen.getByText(/demonstration content/i)).toBeInTheDocument();
});
