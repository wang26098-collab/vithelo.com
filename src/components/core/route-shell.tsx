"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

type RouteShellProps = {
  children: ReactNode;
  disclosure: ReactNode;
  header: ReactNode;
  mobileResource: ReactNode;
};

function RouteShell({
  children,
  disclosure,
  header,
  mobileResource,
}: RouteShellProps) {
  const pathname = usePathname();

  const isVitheloB2BRoute =
    pathname === "/" ||
    pathname === "/products" ||
    pathname === "/oem-odm" ||
    pathname === "/insights" ||
    pathname.startsWith("/insights/") ||
    pathname === "/contact";

  if (isVitheloB2BRoute) return children;

  return (
    <>
      {disclosure}
      {header}
      {children}
      {mobileResource}
    </>
  );
}

export { RouteShell, type RouteShellProps };
