import { render, screen } from "@testing-library/react";
import { VitheloContactPage } from "@/components/patterns/vithelo-contact-page";
import { vitheloB2BContactPage } from "@/content/demo/vithelo-b2b-site";

it("shows the complete disabled project form and no invented contact target", () => {
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
  expect(screen.queryByRole("link", { name: "Email" })).not.toBeInTheDocument();
  expect(
    screen.queryByRole("link", { name: "WhatsApp" }),
  ).not.toBeInTheDocument();
  expect(screen.getByText(vitheloB2BContactPage.pendingMessage)).toBeVisible();
});
