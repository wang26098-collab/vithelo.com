import { render, screen, within } from "@testing-library/react";
import { VitheloAboutPage } from "@/components/patterns/vithelo-about-page";
import { vitheloB2BAboutPage } from "@/content/demo/vithelo-about-page";

it("renders the seven-part About narrative with one h1", () => {
  const { container } = render(
    <VitheloAboutPage content={vitheloB2BAboutPage} />,
  );

  expect(container.querySelectorAll("h1")).toHaveLength(1);
  expect(screen.getAllByTestId("about-section")).toHaveLength(7);
  expect(
    screen.getByRole("heading", { name: "About VITHELO", level: 1 }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: /Purpose in every decision/i }),
  ).toHaveAttribute("data-about-role-title");
  expect(
    screen.getAllByRole("link", { name: "Start a Project" }),
  ).toHaveLength(1);
  expect(
    screen.getByRole("link", { name: "Start a Project" }),
  ).toHaveAttribute("href", "/contact");
  expect(screen.getByRole("link", { name: "Capabilities" })).toHaveAttribute(
    "href",
    "/manufacturing",
  );
});

it("keeps all eight formats in one section", () => {
  render(<VitheloAboutPage content={vitheloB2BAboutPage} />);
  const formats = screen.getByTestId("about-formats");

  expect(within(formats).getAllByRole("link")).toHaveLength(8);
  expect(
    within(formats).getByRole("link", { name: "Oral Films" }),
  ).toHaveAttribute("href", "/products/oral-films");
});

it("renders verification boundaries as visible text", () => {
  render(<VitheloAboutPage content={vitheloB2BAboutPage} />);
  const boundary = screen.getByTestId("about-boundary");

  expect(boundary).toHaveTextContent(
    "Legal company entity requires final confirmation.",
  );
  expect(boundary).toHaveTextContent(
    "Production capacity requires approved production data.",
  );
});

it("loads only the hero image eagerly with high fetch priority", () => {
  render(<VitheloAboutPage content={vitheloB2BAboutPage} />);
  const images = screen.getAllByRole("img");

  expect(images[0]).toHaveAttribute("loading", "eager");
  expect(images[0]).toHaveAttribute("fetchpriority", "high");
  expect(images.slice(1).every((image) => image.getAttribute("loading") === "lazy")).toBe(true);
});
