import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

it("renders the temporary wordmark and demo disclosure", () => {
  render(<HomePage />);
  expect(screen.getByText("A PRIME")).toBeInTheDocument();
  expect(screen.getByText(/demonstration content/i)).toBeInTheDocument();
});
