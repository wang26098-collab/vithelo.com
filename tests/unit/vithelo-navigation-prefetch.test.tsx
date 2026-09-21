import { act, fireEvent, render, screen, within } from "@testing-library/react";
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
  vi.useRealTimers();
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
  expect(within(feedback[0] as HTMLElement).getByText("Opening…")).toHaveClass(
    "sr-only",
  );
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

it("prefetches only the intended navigation target after a short intent delay", () => {
  vi.useFakeTimers();
  render(
    <VitheloB2BNavigation
      content={vitheloB2BSite}
      theme="light-hero"
      variant="internal"
    />,
  );

  const oemLink = screen.getAllByRole("link", { name: "OEM / ODM" })[0];
  const aboutLink = screen.getAllByRole("link", { name: "About" })[0];

  fireEvent.pointerEnter(oemLink);
  act(() => vi.advanceTimersByTime(149));
  expect(linkProps.filter(({ href }) => href === "/oem-odm").at(-1)?.prefetch).toBe(false);
  fireEvent.pointerLeave(oemLink);
  act(() => vi.advanceTimersByTime(1));
  expect(linkProps.filter(({ href }) => href === "/oem-odm").at(-1)?.prefetch).toBe(false);

  fireEvent.focus(aboutLink);
  act(() => vi.advanceTimersByTime(150));
  expect(linkProps.filter(({ href }) => href === "/about").at(-1)?.prefetch).toBe(null);
  expect(linkProps.filter(({ href }) => href === "/oem-odm").at(-1)?.prefetch).toBe(false);
  fireEvent.blur(aboutLink);
  fireEvent.pointerEnter(aboutLink);
  act(() => vi.advanceTimersByTime(150));
  expect(linkProps.filter(({ href }) => href === "/about").at(-1)?.prefetch).toBe(null);
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
