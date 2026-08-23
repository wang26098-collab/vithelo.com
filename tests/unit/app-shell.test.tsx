import { render, within } from "@testing-library/react";
import HomePage from "@/app/page";

it("renders the VITHELO Nutrition identity and demo disclosure in the hero", () => {
  render(<HomePage />);

  const hero = document.getElementById("nutrition-hero");
  expect(hero).toBeInTheDocument();

  expect(within(hero!).getByText("VITHELO · Nutrition", { selector: "p" })).toBeVisible();
  expect(within(hero!).getByText("DEMO_ONLY", { selector: "p" })).toBeVisible();
});
