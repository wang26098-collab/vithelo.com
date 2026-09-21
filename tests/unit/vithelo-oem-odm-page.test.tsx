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
    "custom-formulation",
    "development-capabilities",
    "formats",
    "commercial-planning",
    "quality",
    "project-path",
    "packaging-introduction",
    "quote-preparation",
    "packaging-by-format",
    "questions",
    "inquiry",
  ]);
  expect(
    within(screen.getByTestId("development-stories")).getAllByRole("article"),
  ).toHaveLength(3);
  expect(
    within(screen.getByTestId("format-gallery")).getAllByRole("link"),
  ).toHaveLength(8);
  expect(
    within(screen.getByTestId("oem-steps")).getAllByRole("article"),
  ).toHaveLength(10);
  expect(
    within(screen.getByTestId("commercial-variables")).getAllByRole("article"),
  ).toHaveLength(2);
  expect(
    within(screen.getByTestId("packaging-groups")).getAllByRole("article"),
  ).toHaveLength(4);
  expect(
    within(screen.getByTestId("quality-path")).getAllByRole("article"),
  ).toHaveLength(4);
  expect(screen.getAllByRole("img").length).toBeGreaterThanOrEqual(15);
  expect(
    screen
      .getAllByRole("link", { name: "Start a Project" })
      .every((link) => link.getAttribute("href") === "/contact"),
  ).toBe(true);
});

it("does not render a split OEM and ODM comparison", () => {
  render(<VitheloOemOdmPage content={vitheloB2BOemOdmPage} />);

  expect(screen.queryByText(/you bring the specification/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/you bring the product direction/i)).not.toBeInTheDocument();
  expect(document.body.textContent).not.toMatch(/FDA approved|certified|guaranteed/i);
});

it("renders the approved second-screen narrative before its primary image", () => {
  render(<VitheloOemOdmPage content={vitheloB2BOemOdmPage} />);

  const intro = screen
    .getAllByTestId("oem-section")
    .find((section) => section.getAttribute("data-section") === "custom-formulation");
  expect(intro).toBeDefined();
  const narrative = within(intro!).getByTestId("oem-introduction-copy");
  const media = within(intro!).getByTestId("oem-introduction-media");

  expect(intro!.firstElementChild).toBe(narrative);
  expect(narrative.nextElementSibling).toBe(media);
  expect(within(narrative).getByRole("heading", { level: 2 })).toHaveTextContent(
    "From brief to finished product.",
  );
  expect(within(narrative).getByRole("link", { name: "Start a Project" })).toHaveAttribute(
    "href",
    "/contact",
  );
  expect(within(narrative).getByRole("link", { name: "Explore Formats" })).toHaveAttribute(
    "href",
    "/products",
  );
  expect(within(narrative).getAllByTestId("intro-format-link")).toHaveLength(5);
});

it("keeps each development capability as one narrative followed by one image", () => {
  render(<VitheloOemOdmPage content={vitheloB2BOemOdmPage} />);

  const stories = within(screen.getByTestId("development-stories")).getAllByRole("article");
  expect(stories).toHaveLength(3);

  for (const story of stories) {
    const copy = within(story).getByTestId("development-story-copy");
    const media = within(story).getByTestId("development-story-media");
    expect(story.firstElementChild).toBe(copy);
    expect(copy.nextElementSibling).toBe(media);
    expect(within(copy).getAllByRole("heading")).toHaveLength(1);
  }
});

it("prioritizes only the hero image instead of the below-fold format gallery", () => {
  render(<VitheloOemOdmPage content={vitheloB2BOemOdmPage} />);
  const images = screen.getAllByRole("img");

  expect(images[0]).toHaveAttribute("loading", "eager");
  expect(images[0]).toHaveAttribute("fetchpriority", "high");
  expect(images.slice(1).every((image) => image.getAttribute("loading") === "lazy")).toBe(true);
});
