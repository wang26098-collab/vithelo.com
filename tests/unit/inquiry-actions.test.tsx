import { fireEvent, render, screen } from "@testing-library/react";
import { InquiryActionPair } from "@/components/core/inquiry-action-pair";
import { ProjectIntake } from "@/components/domain/project-intake";

it("does not invent contact targets when both channels are missing", () => {
  render(<InquiryActionPair />);

  expect(screen.getByRole("button", { name: "Email Inquiry" })).toBeDisabled();
  expect(screen.getByRole("button", { name: "WhatsApp" })).toBeDisabled();
  expect(screen.getByText(/email inquiry address not configured/i)).toBeVisible();
  expect(screen.getByText(/whatsapp number not configured/i)).toBeVisible();
});

it("collects local context before exposing channel state", () => {
  render(<ProjectIntake />);

  fireEvent.click(screen.getByRole("button", { name: "Private Label" }));

  expect(screen.getByLabelText("Product world")).toBeVisible();
  expect(screen.getByLabelText("Country or market")).toBeVisible();
  expect(screen.getByLabelText("Project summary")).toBeVisible();
  expect(screen.getByRole("button", { name: "Email Inquiry" })).toBeDisabled();
  expect(screen.getByRole("button", { name: "WhatsApp" })).toBeDisabled();
});
