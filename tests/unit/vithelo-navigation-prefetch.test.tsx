import { fireEvent, render, screen } from "@testing-library/react";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { VitheloB2BNavigation } from "@/components/core/vithelo-b2b-navigation";
import { vitheloB2BSite } from "@/content/demo/vithelo-b2b-site";

const linkProps = vi.hoisted(() => [] as Array<{ href: string; prefetch: unknown }>);
const linkStatus = vi.hoisted(() => ({ pending: false }));

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    prefetch,
    ...props
  }: AnchorHTMLAttributes<HTMLAnchorElement> & {
    children: ReactNode;
    href: string;
    prefetch?: boolean;
  }) => {
    linkProps.push({ href, prefetch });
    return (
      <a
        href={href}
        {...props}
        onClick={(event) => {
          event.preventDefault();
          props.onClick?.(event);
        }}
      >
        {children}
      </a>
    );
  },
  useLinkStatus: () => linkStatus,
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/products",
}));

afterEach(() => {
  linkProps.length = 0;
  linkStatus.pending = false;
});

it("marks the in-place feedback when a navigation is pending", () => {
  linkStatus.pending = true;
  const { container } = render(
    <VitheloB2BNavigation
      content={vitheloB2BSite}
      theme="light-hero"
      variant="internal"
    />,
  );

  const feedback = container.querySelectorAll(
    "[data-link-pending-feedback]",
  );
  expect(feedback.length).toBeGreaterThan(0);
  expect(
    Array.from(feedback).every(
      (item) => item.getAttribute("data-pending") === "true",
    ),
  ).toBe(true);
  expect(feedback[0]).toHaveAttribute("role", "status");
  expect(feedback[0]).toHaveTextContent("Opening…");
});

it("keeps the mobile menu visible until the route actually changes", () => {
  render(
    <VitheloB2BNavigation
      content={vitheloB2BSite}
      theme="light-hero"
      variant="internal"
    />,
  );

  const menu = document.querySelector("details");
  expect(menu).not.toBeNull();
  if (!menu) return;
  menu.open = true;
  fireEvent.click(
    screen
      .getByRole("navigation", { name: "Mobile primary navigation" })
      .querySelector('a[href="/oem-odm"]')!,
  );
  expect(menu.open).toBe(true);
});

it("disables viewport prefetching for every persistent navigation link", () => {
  render(
    <VitheloB2BNavigation
      content={vitheloB2BSite}
      theme="light-hero"
      variant="internal"
    />,
  );

  expect(linkProps.length).toBeGreaterThan(0);
  expect(linkProps.every(({ prefetch }) => prefetch === false)).toBe(true);
});

it("keeps an in-place feedback element inside every navigation link", () => {
  const { container } = render(
    <VitheloB2BNavigation
      content={vitheloB2BSite}
      theme="light-hero"
      variant="internal"
    />,
  );

  expect(
    container.querySelectorAll("[data-link-pending-feedback]"),
  ).toHaveLength(linkProps.length);
});
