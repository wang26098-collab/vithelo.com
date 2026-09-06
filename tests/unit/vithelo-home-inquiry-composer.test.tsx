import { fireEvent, render, screen } from "@testing-library/react";
import { VitheloHomeInquiryComposer } from "@/components/patterns/vithelo-home-inquiry-composer";

const formats = [
  "Gummies",
  "Hard Capsules",
  "Softgels",
  "Tablets",
  "Powders",
  "Functional Gum",
  "Liquids",
  "Oral Films",
];

it("builds email and WhatsApp inquiries from the current fields without submitting", () => {
  render(
    <VitheloHomeInquiryComposer
      email="wang26098@gmail.com"
      formats={formats}
      whatsapp="8618273669556"
    />,
  );

  fireEvent.change(screen.getByLabelText("Your brand or company"), {
    target: { value: "Northstar Labs" },
  });
  fireEvent.change(screen.getByLabelText("Dosage form"), {
    target: { value: "Oral Films" },
  });
  fireEvent.change(screen.getByLabelText("Estimated volume"), {
    target: { value: "50,000 packs" },
  });
  fireEvent.change(screen.getByLabelText("Primary market"), {
    target: { value: "EU" },
  });
  fireEvent.change(screen.getByLabelText("Project summary"), {
    target: { value: "Mint format with compact packaging" },
  });

  const email = screen.getByRole("link", { name: "Continue by Email" });
  const whatsapp = screen.getByRole("link", { name: "Continue on WhatsApp" });
  expect(decodeURIComponent(email.getAttribute("href") ?? "")).toContain("Northstar Labs");
  expect(decodeURIComponent(email.getAttribute("href") ?? "")).toContain("Oral Films");
  expect(decodeURIComponent(whatsapp.getAttribute("href") ?? "")).toContain("50,000 packs");
  expect(decodeURIComponent(whatsapp.getAttribute("href") ?? "")).toContain(
    "Mint format with compact packaging",
  );
  expect(screen.getByText("Your information is not stored on this website.")).toBeVisible();
  expect(screen.queryByRole("button")).not.toBeInTheDocument();
});
