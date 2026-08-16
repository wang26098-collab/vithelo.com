import { render, screen } from "@testing-library/react";
import { StatePanel } from "@/components/core/state-panel";
import { UtilityPage } from "@/components/patterns/utility-page";

it.each(["loading", "empty", "error", "success", "missing-configuration"] as const)(
  "renders a recoverable %s state",
  (state) => {
    render(
      <StatePanel
        actionHref="/"
        actionLabel="Return to home"
        state={state}
        title={`Demo ${state}`}
      />,
    );

    expect(screen.getByRole("heading", { name: `Demo ${state}` })).toBeVisible();
    expect(screen.getByRole("link", { name: "Return to home" })).toHaveAttribute("href", "/");
  },
);

it("frames utility content as a task surface", () => {
  render(
    <UtilityPage description="Find a destination." title="Search">
      <p>Task content</p>
    </UtilityPage>,
  );

  expect(screen.getByRole("heading", { name: "Search" })).toBeVisible();
  expect(screen.getByText("Task content")).toBeVisible();
});
