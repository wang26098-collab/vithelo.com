"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { VitheloB2BSiteFrame } from "@/components/core/vithelo-b2b-site-frame";
import type { B2BSiteContent } from "@/content/schema";

type RouteShellProps = {
  children: ReactNode;
  disclosure: ReactNode;
  header: ReactNode;
  mobileResource: ReactNode;
  siteContent?: B2BSiteContent;
};

function RouteShell({
  children,
  disclosure,
  header,
  mobileResource,
  siteContent,
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

  const isLightHeroRoute =
    pathname.startsWith("/products/") ||
    pathname === "/manufacturing";

  if (isLightHeroRoute && siteContent) {
    return (
      <VitheloB2BSiteFrame key={pathname} content={siteContent} headerTheme="light-hero">
        {children}
      </VitheloB2BSiteFrame>
    );
  }

  if (pathname === "/about" && siteContent) {
    return (
      <VitheloB2BSiteFrame key={pathname} content={siteContent} headerTheme="dark-hero">
        {children}
      </VitheloB2BSiteFrame>
    );
  }

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
