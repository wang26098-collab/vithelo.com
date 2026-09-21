"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { LinkPendingFeedback } from "@/components/core/link-pending-feedback";
import styles from "@/components/patterns/vithelo-b2b-pages.module.css";
import type { B2BProductsPage } from "@/content/schema";
import { selectFormatProducts } from "@/lib/product-discovery";

const FALLBACK_FORMAT_IMAGE: Record<string, string> = {
  gummies: "/media/b2b/format-gummies.webp",
  "hard-capsules": "/media/b2b/format-hard-capsules.webp",
  tablets: "/media/b2b/format-tablets.webp",
  softgels: "/media/b2b/format-softgels.webp",
  powders: "/media/b2b/format-powders.webp",
  liquids: "/media/b2b/format-liquids.webp",
  "oral-films": "/media/b2b/format-oral-films.webp",
  "functional-gum": "/media/b2b/format-functional-gum.webp",
};

export function VitheloProductsPage({ content }: { content: B2BProductsPage }) {
  const router = useRouter();
  const prefetchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prefetchedProducts = useRef(new Set<string>());
  const defaultFormat = content.discovery.formats[0];
  const [activeFormat, setActiveFormat] = useState(defaultFormat.slug);
  const activeFormatRecord =
    content.discovery.formats.find((item) => item.slug === activeFormat) ?? defaultFormat;
  const products = useMemo(
    () => selectFormatProducts(content.discovery.items, activeFormatRecord.slug),
    [activeFormatRecord.slug, content.discovery.items],
  );

  useEffect(
    () => () => {
      if (prefetchTimer.current) clearTimeout(prefetchTimer.current);
    },
    [],
  );

  const cancelProductPrefetch = () => {
    if (!prefetchTimer.current) return;
    clearTimeout(prefetchTimer.current);
    prefetchTimer.current = null;
  };

  const scheduleProductPrefetch = (
    item: B2BProductsPage["discovery"]["items"][number],
  ) => {
    const href = buildProductHref(item);
    cancelProductPrefetch();
    if (prefetchedProducts.current.has(href)) return;
    prefetchTimer.current = setTimeout(() => {
      router.prefetch(href);
      prefetchedProducts.current.add(href);
      prefetchTimer.current = null;
    }, 150);
  };

  // Show the last entry as a "submenu" item per the reference layout. The other
  // 7 entries are direct filter pills; the last is rendered with a chevron.
  const filterEntries = content.discovery.formats.map((item, index) => ({
    ...item,
    isSubmenu: index === content.discovery.formats.length - 1,
  }));

  return (
    <main
      className={`${styles.page} ${styles.productsPage}`}
      data-content-status={content.dataStatus}
      data-ui-stage="products-runway"
    >
      <section className={`${styles.hero} ${styles.productsHero}`} data-header-hero>
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>{content.hero.kicker}</p>
          <h1>Find the format for what comes next.</h1>
          <p className={styles.lede}>
            Compare eight dosage formats, then enter the route that fits your next nutrition line.
          </p>
        </div>
      </section>

      <section className={styles.discoveryLayout} aria-label="Product discovery">
        <aside className={styles.filterPanel} aria-label="Filter by product format">
          <header className={styles.filterPanelHeader}>
            <span className={styles.filterPanelDot} aria-hidden="true" />
            <h2 className={styles.filterPanelTitle}>Products</h2>
          </header>
          <div className={styles.filterList}>
            {filterEntries.map((item) => (
              <button
                aria-pressed={activeFormat === item.slug}
                className={styles.filterOption}
                data-submenu={item.isSubmenu ? "true" : undefined}
                key={item.slug}
                onClick={() => setActiveFormat(item.slug)}
                type="button"
              >
                <span className={styles.filterOptionIndicator} aria-hidden="true" />
                <span className={styles.filterOptionLabel}>{item.name}</span>
                {item.isSubmenu ? (
                  <span className={styles.filterOptionChevron} aria-hidden="true">
                    ›
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        </aside>

        <div className={styles.discoveryResults}>
          {products.length ? (
            <div
              className={styles.productGrid}
              data-testid="product-runway"
            >
              {products.map((item) => (
                <Link
                  aria-label={`${item.title} · Explore format`}
                  className={styles.productCard}
                  href={buildProductHref(item)}
                  key={item.id}
                  onBlur={cancelProductPrefetch}
                  onFocus={() => scheduleProductPrefetch(item)}
                  onPointerEnter={() => scheduleProductPrefetch(item)}
                  onPointerLeave={cancelProductPrefetch}
                  prefetch={false}
                >
                  <span className={styles.productCardMedia}>
                    <Image
                      alt={item.media?.default.alt ?? `${item.title} preview`}
                      className={styles.productCardImageDefault}
                      fill
                      sizes="(max-width: 760px) 100vw, (max-width: 1200px) 33vw, 30vw"
                      src={
                        item.media?.default.src ??
                        FALLBACK_FORMAT_IMAGE[item.formatSlug] ??
                        ""
                      }
                    />
                    <Image
                      alt=""
                      aria-hidden="true"
                      className={styles.productCardImageHover}
                      fill
                      sizes="(max-width: 760px) 100vw, (max-width: 1200px) 33vw, 30vw"
                      src={
                        item.media?.hover.src ??
                        FALLBACK_FORMAT_IMAGE[item.formatSlug] ??
                        ""
                      }
                    />
                  </span>
                  <span className={styles.productCardCopy}>
                    <strong data-testid="product-title">{item.title}</strong>
                    <span>{item.descriptor}</span>
                  </span>
                  <LinkPendingFeedback className={styles.productCardPending} />
                </Link>
              ))}
            </div>
          ) : (
            <div className={styles.discoveryEmpty} role="status">
              <h3>No products are available for this format.</h3>
              <p>Return to the default format to continue exploring.</p>
              <button type="button" onClick={() => setActiveFormat(defaultFormat.slug)}>
                Return to Gummies
              </button>
            </div>
          )}

          <div className={styles.discoveryCta}>
            <span>Have a specific product format in mind?</span>
            <Link href="/contact" prefetch={false}>Start an OEM / ODM inquiry →</Link>
          </div>
        </div>
      </section>

      <div className={styles.floatingSupport} aria-label="Direct support">
        <Link
          aria-label="Open contact form"
          className={`${styles.floatingButton} ${styles.floatingButtonPrimary}`}
          href="/contact"
          prefetch={false}
        >
          <span aria-hidden="true">✉</span>
        </Link>
        <Link
          aria-label="Talk to a specialist"
          className={`${styles.floatingButton} ${styles.floatingButtonSecondary}`}
          href="/contact"
          prefetch={false}
        >
          <span aria-hidden="true">☻</span>
        </Link>
      </div>
    </main>
  );
}

function buildProductHref(item: B2BProductsPage["discovery"]["items"][number]) {
  return `/products/${encodeURIComponent(item.id)}`;
}
