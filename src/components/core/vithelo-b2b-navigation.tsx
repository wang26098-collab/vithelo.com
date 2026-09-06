"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "@/components/core/vithelo-b2b-site-frame.module.css";
import type { B2BSiteContent } from "@/content/schema";

type VitheloB2BNavigationProps = {
  content: B2BSiteContent;
  variant: "home" | "internal";
  theme: "dark-hero" | "light-hero" | "split-hero";
};

export function VitheloB2BNavigation({
  content,
  variant,
  theme,
}: VitheloB2BNavigationProps) {
  const pathname = usePathname();
  const menu = useRef<HTMLDetailsElement>(null);
  const [navigationState, setNavigationState] = useState<"top" | "scrolled">(
    "top",
  );

  useEffect(() => {
    if (menu.current) menu.current.open = false;
    const hero = document.getElementById("hero") ?? document.querySelector("[data-header-hero]");
    // Preserve the home's 8% hero threshold, including heroes taller than the viewport.
    const update = () => {
      const threshold = hero ? hero.getBoundingClientRect().height * 0.08 : 64;
      setNavigationState(window.scrollY > threshold ? "scrolled" : "top");
    };
    const frame = window.requestAnimationFrame(update);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  const isActive = (href: string) => pathname === href || pathname?.startsWith(`${href}/`);

  const browsingItems = content.navigation.filter(
    (item) => item.label !== "Contact",
  );
  const contactItem = content.navigation.find(
    (item) => item.label === "Contact",
  );

  return (
    <header
      className={styles.header}
      data-navigation-state={navigationState}
      data-navigation-variant={variant}
      data-header-theme={theme}
    >
      <div className={styles.headerInner}>
        <div className={`${styles.navigationGroup} ${styles.browseGroup}`}>
          <Link aria-label="VITHELO home" className={styles.brand} href="/">
            VITHELO
          </Link>
          <nav aria-label="Primary navigation" className={styles.desktopNav}>
            {browsingItems.map((item) => (
              <Link aria-current={isActive(item.href) ? "page" : undefined} href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <nav
          aria-label="Inquiry navigation"
          className={`${styles.navigationGroup} ${styles.conversionGroup}`}
        >
          {contactItem ? (
            <Link aria-current={isActive(contactItem.href) ? "page" : undefined} className={styles.contactLink} href={contactItem.href}>
              {contactItem.label}
            </Link>
          ) : null}
          <Link className={styles.quote} href={content.requestQuote.href}>
            {content.requestQuote.label}
          </Link>
        </nav>

        <div
          className={`${styles.navigationGroup} ${styles.mobileGroup}`}
          data-mobile-navigation-group
        >
          <Link aria-label="VITHELO home" className={styles.brand} href="/">
            VITHELO
          </Link>
          <details ref={menu} className={styles.mobileMenu}
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                event.currentTarget.open = false;
                event.currentTarget.querySelector("summary")?.focus();
              }
            }}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) event.currentTarget.open = false;
            }}>
            <summary>Menu</summary>
            <nav aria-label="Mobile primary navigation">
              {content.navigation.map((item) => (
                <Link aria-current={isActive(item.href) ? "page" : undefined} href={item.href} key={item.href}
                  onClick={() => { if (menu.current) menu.current.open = false; }}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </details>
          <Link
            aria-label="Start a Project"
            className={styles.mobileQuote}
            href={content.requestQuote.href}
          >
            Start
          </Link>
        </div>
      </div>
    </header>
  );
}
