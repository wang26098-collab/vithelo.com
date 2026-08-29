import { render, screen } from "@testing-library/react";
import { VitheloB2BSiteFrame } from "@/components/core/vithelo-b2b-site-frame";
import { vitheloB2BSite } from "@/content/demo/vithelo-b2b-site";

it("renders one shared B2B navigation and request quote path", () => {
  render(
    <VitheloB2BSiteFrame content={vitheloB2BSite}>
      <main>Page body</main>
    </VitheloB2BSiteFrame>,
  );

  expect(screen.getByRole("link", { name: "VITHELO home" })).toHaveAttribute(
    "href",
    "/",
  );
  for (const [label, href] of [
    ["Products", "/products"],
    ["OEM / ODM", "/oem-odm"],
    ["Insights", "/insights"],
    ["Contact", "/contact"],
  ]) {
    expect(screen.getAllByRole("link", { name: label })[0]).toHaveAttribute(
      "href",
      href,
    );
  }
  expect(screen.getByRole("link", { name: "Request Quote" })).toHaveAttribute(
    "href",
    "/contact",
  );
  expect(screen.getByText(/Factory-owned overseas brand/)).toBeVisible();
});
