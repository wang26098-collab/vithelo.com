import { render, screen } from "@testing-library/react";
import { RouteShell } from "@/components/core/route-shell";
import type { B2BSiteContent } from "@/content/schema";

vi.mock("next/navigation", () => ({
  usePathname: () => "/about",
}));

const links = [
  { label: "Products", href: "/products" },
  { label: "OEM / ODM", href: "/oem-odm" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

const siteContent: B2BSiteContent = {
  dataStatus: "DEMO_ONLY",
  identity: "Nutrition OEM / ODM manufacturing partner",
  navigation: [...links],
  requestQuote: { label: "Start a Project", href: "/contact" },
  footerLinks: [...links],
  disclosure: "DEMO_ONLY · Production records require final verification.",
};

it("uses the dark shared header over the About image hero", () => {
  render(
    <RouteShell
      siteContent={siteContent}
      disclosure={<div>Disclosure</div>}
      header={<div>Legacy header</div>}
      mobileResource={<div>Mobile resource</div>}
    >
      <main>About route</main>
    </RouteShell>,
  );

  expect(screen.getByRole("banner")).toHaveAttribute(
    "data-header-theme",
    "dark-hero",
  );
});
