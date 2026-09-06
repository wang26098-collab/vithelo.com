import { render, screen, within } from "@testing-library/react";
import HomePage from "@/app/page";

it("renders the VITHELO B2B homepage identity and consolidated sequence", async () => {
  render(await HomePage());

  const hero = document.getElementById("hero");
  expect(hero).toBeInTheDocument();
  expect(screen.getAllByRole("link", { name: "VITHELO home" })).toHaveLength(2);
  expect(
    within(hero!).getByRole("heading", {
      name: "VITHELO — Nutrition OEM / ODM Manufacturer",
    }),
  ).toBeVisible();
  expect(screen.getByText("One manufacturing system, eight product formats.")).toBeVisible();

  expect(Array.from(document.querySelectorAll("main > section")).map((section) => section.id)).toEqual([
    "hero",
    "proof",
    "capacity-boundary",
    "gummy-stage",
    "solutions",
    "dosage-forms",
    "project-runway",
    "contact",
  ]);
});
