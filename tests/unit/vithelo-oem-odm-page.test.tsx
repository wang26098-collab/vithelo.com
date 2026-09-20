import { render, screen, within } from "@testing-library/react";
import { VitheloOemOdmPage } from "@/components/patterns/vithelo-oem-odm-page";
import { vitheloB2BOemOdmPage } from "@/content/demo/vithelo-b2b-site";

it("renders the unified OEM ODM decision sequence", () => {
  render(<VitheloOemOdmPage content={vitheloB2BOemOdmPage} />);

  expect(
    screen
      .getAllByTestId("oem-section")
      .map((section) => section.getAttribute("data-section")),
  ).toEqual([
    "hero",
    "capabilities",
    "formats",
    "project-path",
    "commercial-variables",
    "packaging",
    "quality",
    "quote-preparation",
    "questions",
    "inquiry",
  ]);
  expect(
    within(screen.getByTestId("capability-map")).getAllByRole("article"),
  ).toHaveLength(7);
  expect(
    within(screen.getByTestId("format-field")).getAllByRole("link"),
  ).toHaveLength(8);
  expect(
    within(screen.getByTestId("oem-steps")).getAllByRole("article"),
  ).toHaveLength(6);
  expect(
    within(screen.getByTestId("commercial-variables")).getAllByRole("article"),
  ).toHaveLength(2);
  expect(
    within(screen.getByTestId("packaging-groups")).getAllByRole("article"),
  ).toHaveLength(4);
  expect(
    within(screen.getByTestId("quality-path")).getAllByRole("article"),
  ).toHaveLength(4);
  expect(screen.getByRole("link", { name: "Start a Project" })).toHaveAttribute(
    "href",
    "/contact",
  );
});

it("does not render a split OEM and ODM comparison", () => {
  render(<VitheloOemOdmPage content={vitheloB2BOemOdmPage} />);

  expect(screen.queryByText(/you bring the specification/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/you bring the product direction/i)).not.toBeInTheDocument();
  expect(document.body.textContent).not.toMatch(/FDA approved|certified|guaranteed/i);
});
