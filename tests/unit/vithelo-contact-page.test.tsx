import { render, screen } from "@testing-library/react";
import { VitheloContactPage } from "@/components/patterns/vithelo-contact-page";
import { vitheloB2BContactPage } from "@/content/demo/vithelo-b2b-site";

it("shows the complete disabled project form with approved direct contact targets", () => {
  render(
    <VitheloContactPage
      content={vitheloB2BContactPage}
      initialFormat="Gummies"
      initialSubject="Gummy development"
    />,
  );

  expect(
    screen.getByRole("group", { name: "Project requirements" }),
  ).toBeDisabled();
  for (const label of vitheloB2BContactPage.fields) {
    expect(screen.getByLabelText(label)).toBeDisabled();
  }
  expect(
    screen.getByRole("button", {
      name: "Inquiry submission not configured",
    }),
  ).toBeDisabled();
  expect(screen.getByRole("link", { name: "Email" })).toHaveAttribute(
    "href",
    expect.stringContaining("mailto:wang26098@gmail.com"),
  );
  expect(screen.getByRole("link", { name: "WhatsApp" })).toHaveAttribute(
    "href",
    expect.stringContaining("https://wa.me/8618273669556"),
  );
  expect(screen.getByText(/Email and WhatsApp are available/)).toBeVisible();
});
