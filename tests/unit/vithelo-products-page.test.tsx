import { render, screen, within } from "@testing-library/react";
import { VitheloProductsPage } from "@/components/patterns/vithelo-products-page";
import { vitheloB2BProductsPage } from "@/content/demo/vithelo-b2b-site";

it("renders eight formats as one ledger without a carousel", () => {
  render(<VitheloProductsPage content={vitheloB2BProductsPage} />);

  const ledger = screen.getByTestId("format-ledger");
  expect(within(ledger).getAllByRole("article")).toHaveLength(8);
  expect(ledger).toHaveAttribute("data-layout", "showcase-directory");
  expect(ledger).not.toHaveAttribute("data-carousel");
  expect(
    screen.getByText("Flexible MOQ based on formula and packaging."),
  ).toBeVisible();
  expect(screen.getAllByText("Contact us for MOQ")).toHaveLength(2);
});
