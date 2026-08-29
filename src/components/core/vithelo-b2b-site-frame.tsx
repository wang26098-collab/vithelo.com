import Link from "next/link";
import type { ReactNode } from "react";
import styles from "@/components/core/vithelo-b2b-site-frame.module.css";
import type { B2BSiteContent } from "@/content/schema";

type VitheloB2BSiteFrameProps = {
  children: ReactNode;
  content: B2BSiteContent;
};

function NavigationLinks({
  items,
}: {
  items: B2BSiteContent["navigation"];
}) {
  return items.map((item) => (
    <Link href={item.href} key={item.href}>
      {item.label}
    </Link>
  ));
}

export function VitheloB2BSiteFrame({
  children,
  content,
}: VitheloB2BSiteFrameProps) {
  return (
    <div className={styles.site} data-content-status={content.dataStatus}>
      <div className={styles.disclosure}>{content.disclosure}</div>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link aria-label="VITHELO home" className={styles.brand} href="/">
            VITHELO
          </Link>
          <nav aria-label="Primary navigation" className={styles.desktopNav}>
            <NavigationLinks items={content.navigation} />
          </nav>
          <Link className={styles.quote} href={content.requestQuote.href}>
            {content.requestQuote.label}
          </Link>
          <details className={styles.mobileMenu}>
            <summary>Menu</summary>
            <nav aria-label="Mobile primary navigation">
              <NavigationLinks items={content.navigation} />
            </nav>
          </details>
        </div>
      </header>
      {children}
      <footer className={styles.footer}>
        <div>
          <strong>VITHELO</strong>
          <p>{content.identity}</p>
        </div>
        <nav aria-label="Footer navigation">
          <NavigationLinks items={content.footerLinks} />
        </nav>
        <small>{content.disclosure}</small>
      </footer>
    </div>
  );
}
