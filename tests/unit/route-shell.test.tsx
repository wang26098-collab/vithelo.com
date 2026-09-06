import { render, screen } from "@testing-library/react";
import { RouteShell } from "@/components/core/route-shell";
import { vitheloB2BSite } from "@/content/demo/vithelo-b2b-site";

const navigationState = vi.hoisted(() => ({ pathname: "/" }));

vi.mock("next/navigation", () => ({
  usePathname: () => navigationState.pathname,
}));

function renderShell() {
  return render(
    <RouteShell
      siteContent={vitheloB2BSite}
      disclosure={<div>Disclosure</div>}
      header={<div>Global header</div>}
      mobileResource={<div>Mobile resource</div>}
    >
      <main>Route content</main>
    </RouteShell>,
  );
}

it.each([
  "/",
  "/products",
  "/oem-odm",
  "/insights",
  "/insights/gummy-development-guide",
  "/contact",
])("does not duplicate the legacy chrome on %s", (pathname) => {
  navigationState.pathname = pathname;
  renderShell();

  expect(screen.getByText("Route content")).toBeVisible();
  expect(screen.queryByText("Disclosure")).not.toBeInTheDocument();
  expect(screen.queryByText("Global header")).not.toBeInTheDocument();
  expect(screen.queryByText("Mobile resource")).not.toBeInTheDocument();
});

it.each(["/products/gummies", "/manufacturing", "/quality", "/about"])(
  "uses the shared B2B header instead of legacy chrome on %s", (pathname) => {
    navigationState.pathname = pathname;
    renderShell();
    expect(screen.getAllByRole("banner")).toHaveLength(1);
    expect(screen.getByRole("banner")).toHaveAttribute("data-header-theme", "light-hero");
    expect(screen.getByRole("banner")).toHaveAttribute("data-navigation-state", "top");
    expect(screen.queryByText("Global header")).not.toBeInTheDocument();
    expect(screen.queryByText("Mobile resource")).not.toBeInTheDocument();
  },
);

it("preserves the existing global chrome on non-home routes", () => {
  navigationState.pathname = "/nutrition";
  renderShell();

  expect(screen.getByText("Disclosure")).toBeVisible();
  expect(screen.getByText("Global header")).toBeVisible();
  expect(screen.getByText("Route content")).toBeVisible();
  expect(screen.getByText("Mobile resource")).toBeVisible();
});
