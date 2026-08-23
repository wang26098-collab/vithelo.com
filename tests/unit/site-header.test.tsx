import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SiteHeader } from "@/components/core/site-header";

it("exposes the nutrition-led primary destinations and an accessible mobile menu", async () => {
  render(<SiteHeader />);

  for (const [label, href] of [
    ["Products", "/nutrition"],
    ["Science", "/science"],
    ["Health Knowledge", "/learn"],
    ["Professional Partnership", "/professional"],
  ] as const) {
    expect(screen.getAllByRole("link", { name: label })[0]).toHaveAttribute("href", href);
  }
  expect(screen.queryByRole("link", { name: /^Aesthetic Technology$/ })).not.toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Professional Partnership" })).toHaveAttribute(
    "href",
    "/professional",
  );
  expect(screen.getByTestId("vithelo-monogram")).toBeVisible();
  expect(screen.getByText("PRECISION · SCIENCE · HUMAN")).toBeVisible();

  const menuButton = screen.getByRole("button", { name: /open menu/i });
  fireEvent.click(menuButton);
  expect(screen.getByRole("dialog", { name: /site navigation/i })).toBeVisible();

  fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  expect(menuButton).toHaveFocus();
});
