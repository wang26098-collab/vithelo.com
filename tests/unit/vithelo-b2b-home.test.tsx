import { render, screen, within } from "@testing-library/react";
import { VitheloB2BHome } from "@/components/patterns/vithelo-b2b-home";
import { vitheloB2BHome } from "@/content/demo/vithelo-b2b-home";

const sectionIds = [
  "hero",
  "proof",
  "gummy-stage",
  "solutions",
  "dosage-forms",
  "custom-development",
  "manufacturing",
  "quality",
  "project-runway",
  "company-fit",
  "contact",
];

it("renders the approved eleven sections once and in order", () => {
  render(<VitheloB2BHome content={vitheloB2BHome} />);

  const sections = Array.from(document.querySelectorAll("main > section"));
  expect(sections.map((section) => section.id)).toEqual(sectionIds);
  for (const id of sectionIds) {
    expect(document.querySelectorAll(`section#${id}`)).toHaveLength(1);
  }
});

it("keeps all eight dosage formats in one section without a horizontal rail", () => {
  render(<VitheloB2BHome content={vitheloB2BHome} />);

  const dosage = document.getElementById("dosage-forms");
  expect(dosage).toBeInTheDocument();
  expect(within(dosage!).getAllByTestId("dosage-item")).toHaveLength(8);
  expect(dosage).toHaveAttribute("data-layout", "desktop-4x2");
  expect(dosage).not.toHaveAttribute("data-carousel");
});

it("renders the project form and contact channels as visibly not configured", () => {
  render(<VitheloB2BHome content={vitheloB2BHome} />);

  const contact = document.getElementById("contact");
  expect(contact).toHaveAttribute("data-contact-state", "NOT_CONFIGURED");
  expect(within(contact!).getByRole("button", { name: "Inquiry submission not configured" })).toBeDisabled();
  expect(within(contact!).getByText(/Contact details pending approval/)).toBeVisible();
  expect(within(contact!).getByRole("link", { name: "Email" })).toHaveAttribute("href", "#contact-pending");
  expect(within(contact!).getByRole("link", { name: "WhatsApp" })).toHaveAttribute("href", "#contact-pending");
});

it("leaves shared navigation to the site frame and uses page routes", () => {
  render(<VitheloB2BHome content={vitheloB2BHome} />);

  expect(screen.queryByRole("banner")).not.toBeInTheDocument();
  expect(screen.queryByRole("contentinfo")).not.toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Start a Project" })).toHaveAttribute(
    "href",
    "/contact",
  );
  expect(screen.getByRole("link", { name: "Explore Formats" })).toHaveAttribute(
    "href",
    "/products",
  );
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    "Your nutrition product, from first brief to finished batch.",
  );
  expect(document.querySelector("main")?.textContent).not.toMatch(/[\u3400-\u9fff]/);
});
