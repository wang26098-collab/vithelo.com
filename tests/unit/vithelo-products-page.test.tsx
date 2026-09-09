import { fireEvent, render, screen } from "@testing-library/react";
import { VitheloProductsPage } from "@/components/patterns/vithelo-products-page";
import { vitheloB2BProductsPage } from "@/content/demo/vithelo-b2b-site";

it("renders the left filter rail and demo-only discovery results", () => {
  render(<VitheloProductsPage content={vitheloB2BProductsPage} />);
  expect(screen.getByRole("complementary", { name: "Product filters" })).toBeVisible();
  expect(screen.getByRole("button", { name: "Gummies" })).toBeVisible();
  expect(screen.getByRole("button", { name: "Pet Health" })).toBeVisible();
  expect(screen.getByText(/100 results/)).toBeVisible();
});

it("filters the result cards by selected health direction", () => {
  render(<VitheloProductsPage content={vitheloB2BProductsPage} />);
  fireEvent.click(screen.getByRole("button", { name: "Sleep & Rest" }));
  expect(screen.getByText(/10 results/)).toBeVisible();
  expect(screen.getAllByRole("heading", { name: /^Sleep & Rest/ })).toHaveLength(10);
  expect(screen.queryByRole("heading", { name: "Pet Health" })).not.toBeInTheDocument();
});
