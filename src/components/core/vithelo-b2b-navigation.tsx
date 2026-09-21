"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LinkPendingFeedback } from "@/components/core/link-pending-feedback";
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
  const [intentHref, setIntentHref] = useState<string | null>(null);
  const [intentTimer, setIntentTimer] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
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

  useEffect(
    () => () => {
      if (intentTimer) clearTimeout(intentTimer);
    },
    [intentTimer],
  );

  const isActive = (href: string) => pathname === href || pathname?.startsWith(`${href}/`);

  const cancelIntentPrefetch = () => {
    if (intentTimer) {
      clearTimeout(intentTimer);
      setIntentTimer(null);
    }
  };

  const scheduleIntentPrefetch = (href: string) => {
    cancelIntentPrefetch();
    if (isActive(href) || intentHref === href) return;
    setIntentTimer(
      setTimeout(() => {
        setIntentHref(href);
        setIntentTimer(null);
      }, 150),
    );
  };

  const intentPrefetchProps = (href: string) => ({
    onPointerEnter: () => scheduleIntentPrefetch(href),
    onPointerLeave: cancelIntentPrefetch,
    onFocus: () => scheduleIntentPrefetch(href),
    onBlur: cancelIntentPrefetch,
  });

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
          <Link
            aria-label="VITHELO home"
            className={styles.brand}
            href="/"
            prefetch={intentHref === "/" ? null : false}
            {...intentPrefetchProps("/")}
          >
            VITHELO
            <LinkPendingFeedback className={styles.linkPendingFeedback} />
          </Link>
          <nav aria-label="Primary navigation" className={styles.desktopNav}>
            {browsingItems.map((item) => (
              <Link
                aria-current={isActive(item.href) ? "page" : undefined}
                href={item.href}
                key={item.href}
                prefetch={intentHref === item.href ? null : false}
                {...intentPrefetchProps(item.href)}
              >
                {item.label}
                <LinkPendingFeedback className={styles.linkPendingFeedback} />
              </Link>
            ))}
          </nav>
        </div>

        <nav
          aria-label="Inquiry navigation"
          className={`${styles.navigationGroup} ${styles.conversionGroup}`}
        >
          {contactItem ? (
            <Link
              aria-current={isActive(contactItem.href) ? "page" : undefined}
              className={styles.contactLink}
              href={contactItem.href}
              prefetch={intentHref === contactItem.href ? null : false}
              {...intentPrefetchProps(contactItem.href)}
            >
              {contactItem.label}
              <LinkPendingFeedback className={styles.linkPendingFeedback} />
            </Link>
          ) : null}
          <Link
            className={styles.quote}
            href={content.requestQuote.href}
            prefetch={intentHref === content.requestQuote.href ? null : false}
            {...intentPrefetchProps(content.requestQuote.href)}
          >
            {content.requestQuote.label}
            <LinkPendingFeedback className={styles.linkPendingFeedback} />
          </Link>
        </nav>

        <div
          className={`${styles.navigationGroup} ${styles.mobileGroup}`}
          data-mobile-navigation-group
        >
          <Link
            aria-label="VITHELO home"
            className={styles.brand}
            href="/"
            prefetch={intentHref === "/" ? null : false}
            {...intentPrefetchProps("/")}
          >
            VITHELO
            <LinkPendingFeedback className={styles.linkPendingFeedback} />
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
                <Link
                  aria-current={isActive(item.href) ? "page" : undefined}
                  href={item.href}
                  key={item.href}
                  prefetch={intentHref === item.href ? null : false}
                  {...intentPrefetchProps(item.href)}
                >
                  {item.label}
                  <LinkPendingFeedback className={styles.linkPendingFeedback} />
                </Link>
              ))}
            </nav>
          </details>
          <Link
            aria-label="Start a Project"
            className={styles.mobileQuote}
            href={content.requestQuote.href}
            prefetch={intentHref === content.requestQuote.href ? null : false}
            {...intentPrefetchProps(content.requestQuote.href)}
          >
            Start
            <LinkPendingFeedback className={styles.linkPendingFeedback} />
          </Link>
        </div>
      </div>
    </header>
  );
}
