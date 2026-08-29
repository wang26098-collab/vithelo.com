import { render, screen, within } from "@testing-library/react";
import HomePage from "@/app/page";

it("renders the VITHELO B2B homepage identity and eleven-section sequence", async () => {
  render(await HomePage());

  const hero = document.getElementById("hero");
  expect(hero).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "VITHELO home" })).toBeVisible();
  expect(
    within(hero!).getByRole("heading", {
      name: "Your nutrition product, from first brief to finished batch.",
    }),
  ).toBeVisible();
  expect(screen.getByText("One factory. Eight product formats.")).toBeVisible();

  expect(Array.from(document.querySelectorAll("main > section")).map((section) => section.id)).toEqual([
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
  ]);
});
