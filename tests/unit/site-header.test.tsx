import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SiteHeader } from "@/components/core/site-header";

it("exposes the five locked primary destinations and an accessible mobile menu", async () => {
  render(<SiteHeader />);

  for (const label of [
    "Nutrition",
    "Aesthetic Technology",
    "Capabilities",
    "Science",
    "Professional",
  ]) {
    expect(screen.getAllByRole("link", { name: label })[0]).toBeVisible();
  }
  expect(screen.getByRole("link", { name: "Start a Project" })).toHaveAttribute(
    "href",
    "/contact",
  );

  const menuButton = screen.getByRole("button", { name: /open menu/i });
  fireEvent.click(menuButton);
  expect(screen.getByRole("dialog", { name: /site navigation/i })).toBeVisible();

  fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
  await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  expect(menuButton).toHaveFocus();
});
