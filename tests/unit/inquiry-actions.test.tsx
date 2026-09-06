import { fireEvent, render, screen } from "@testing-library/react";
import { InquiryActionPair } from "@/components/core/inquiry-action-pair";
import { ProjectIntake } from "@/components/domain/project-intake";

it("exposes the approved contact targets", () => {
  render(<InquiryActionPair />);

  expect(screen.getByRole("link", { name: "Email Inquiry" })).toHaveAttribute(
    "href",
    expect.stringContaining("mailto:wang26098@gmail.com"),
  );
  expect(screen.getByRole("link", { name: "WhatsApp" })).toHaveAttribute(
    "href",
    expect.stringContaining("https://wa.me/8618273669556"),
  );
  expect(screen.queryByText("NOT_CONFIGURED")).not.toBeInTheDocument();
});

it("preserves validated context supplied by an inquiry link", () => {
  render(
    <ProjectIntake
      initialProductWorld="Aesthetic Technology"
      initialSummary="Demo Precision Device"
    />,
  );

  fireEvent.click(screen.getByRole("button", { name: "Distribution" }));

  expect(screen.getByLabelText("Product world")).toHaveValue("Aesthetic Technology");
  expect(screen.getByLabelText("Project summary")).toHaveValue("Demo Precision Device");
});

it("collects local context before exposing channel state", () => {
  render(<ProjectIntake />);

  fireEvent.click(screen.getByRole("button", { name: "Private Label" }));

  expect(screen.getByLabelText("Product world")).toBeVisible();
  expect(screen.getByLabelText("Country or market")).toBeVisible();
  expect(screen.getByLabelText("Project summary")).toBeVisible();
  expect(screen.getByRole("link", { name: "Email Inquiry" })).toBeVisible();
  expect(screen.getByRole("link", { name: "WhatsApp" })).toBeVisible();
});
