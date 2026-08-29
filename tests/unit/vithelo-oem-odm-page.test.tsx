import { render, screen, within } from "@testing-library/react";
import { VitheloOemOdmPage } from "@/components/patterns/vithelo-oem-odm-page";
import { vitheloB2BOemOdmPage } from "@/content/demo/vithelo-b2b-site";

it("renders one six-step project path and four quality checkpoints", () => {
  render(<VitheloOemOdmPage content={vitheloB2BOemOdmPage} />);

  expect(
    within(screen.getByTestId("oem-steps")).getAllByRole("article"),
  ).toHaveLength(6);
  expect(
    within(screen.getByTestId("quality-path")).getAllByRole("article"),
  ).toHaveLength(4);
  expect(screen.getByText(/factory-owned overseas brand/i)).toBeVisible();
  expect(document.body.textContent).not.toMatch(/certified|FDA approved|guaranteed/i);
});
