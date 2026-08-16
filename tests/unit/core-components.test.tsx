import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { CircleNotch } from "@phosphor-icons/react";
import { Button } from "@/components/core/button";
import { DemoDisclosure } from "@/components/core/demo-disclosure";
import { SiteHeader } from "@/components/core/site-header";
import { StatePanel } from "@/components/core/state-panel";
import { StickyResource } from "@/components/core/sticky-resource";

it("exposes button hierarchy and composed loading state", () => {
  const { rerender } = render(<Button variant="primary">Continue</Button>);
  expect(screen.getByRole("button", { name: "Continue" })).toHaveAttribute(
    "data-variant",
    "primary",
  );

  rerender(
    <Button aria-busy="true" disabled>
      <CircleNotch data-icon="inline-start" data-loading />
      Loading
    </Button>,
  );
  expect(screen.getByRole("button", { name: "Loading" })).toBeDisabled();
  expect(screen.getByRole("button", { name: "Loading" })).toHaveAttribute(
    "aria-busy",
    "true",
  );
});

it("renders recoverable state and demo disclosure primitives", () => {
  render(
    <>
      <StatePanel
        state="missing-configuration"
        title="Price not configured"
        actionHref="/"
        actionLabel="Return home"
      />
      <DemoDisclosure />
    </>,
  );

  expect(
    screen.getByRole("heading", { name: "Price not configured" }),
  ).toBeVisible();
  expect(screen.getByRole("link", { name: "Return home" })).toHaveAttribute(
    "href",
    "/",
  );
  expect(screen.getByText(/demonstration content/i)).toBeVisible();
});

it("maps sticky resources to the requested priority", () => {
  render(<StickyResource priority="P3">Saved configuration</StickyResource>);
  expect(screen.getByRole("complementary", { name: "Sticky resource" })).toHaveAttribute(
    "data-priority",
    "P3",
  );
});

it("pauses sticky resources while a dialog is open", async () => {
  render(
    <>
      <SiteHeader />
      <StickyResource>Commerce action</StickyResource>
    </>,
  );

  fireEvent.click(screen.getByRole("button", { name: /open menu/i }));
  await waitFor(() =>
    expect(screen.getByRole("complementary", { hidden: true })).toHaveAttribute(
      "data-paused",
      "true",
    ),
  );
});
