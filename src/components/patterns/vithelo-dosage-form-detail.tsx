"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import styles from "@/components/patterns/vithelo-b2b-pages.module.css";
import type { B2BProductsPage } from "@/content/schema";

const FALLBACK_FORMAT_IMAGE: Record<string, string> = {
  gummies: "/media/b2b/format-gummies.png",
  "hard-capsules": "/media/b2b/format-hard-capsules.png",
  tablets: "/media/b2b/format-tablets.png",
  softgels: "/media/b2b/format-softgels.png",
  powders: "/media/b2b/format-powders.png",
  liquids: "/media/b2b/format-liquids.png",
  "oral-films": "/media/b2b/format-oral-films.png",
  "functional-gum": "/media/b2b/format-functional-gum.png",
};

const THUMB_COUNT = 4;

type GalleryItem = { src: string; alt: string };

export function VitheloDosageFormDetail({
  format,
  product,
  products,
}: {
  format: B2BProductsPage["formats"][number];
  /** Explicit product (tests, special embeds). Wins over URL lookup when provided. */
  product?: B2BProductsPage["discovery"]["items"][number];
  /** All products belonging to this format. Used to resolve the `?product=` search param on the client. */
  products?: B2BProductsPage["discovery"]["items"];
}) {
  // Resolve the active product: explicit prop > ?product= URL param (client-only, no SSR dynamic).
  // Reading the URL here keeps the page route statically prerendered (CDN-friendly)
  // while still letting `/products?product=xxx` style deep links work without a server round-trip.
  const searchParams = useSearchParams();
  const productIdFromUrl = searchParams?.get("product") ?? null;
  const resolvedProduct =
    product ?? (products && productIdFromUrl
      ? products.find((item) => item.id === productIdFromUrl)
      : undefined);

  const [activeIndex, setActiveIndex] = useState(0);
  const [openPanel, setOpenPanel] = useState<string | null>("overview");

  const fallbackSrc = FALLBACK_FORMAT_IMAGE[format.id];
  const hasProductMedia = Boolean(resolvedProduct?.media);
  const items: GalleryItem[] = useMemo(
    () => buildGalleryItems(resolvedProduct, fallbackSrc),
    [resolvedProduct, fallbackSrc],
  );

  // Clamp active index in case the gallery length shrinks (e.g. product change).
  const safeIndex = Math.min(activeIndex, Math.max(items.length - 1, 0));
  const active = items[safeIndex] ?? {
    src: fallbackSrc ?? "",
    alt: `${format.name} format demonstration image`,
  };
  const showPlaceholderMedia = !fallbackSrc && !hasProductMedia;
  const detailSections = resolvedProduct?.detailSections ?? [
    {
      id: "overview" as const,
      title: "Functional features",
      paragraphs: [
        `${format.name} projects can align formula, sensory direction, format choice and packaging in one development brief. Production inputs remain DEMO_ONLY until verified.`,
      ],
    },
    {
      id: "customization" as const,
      title: "Customization options",
      items: format.customization,
    },
    {
      id: "packaging" as const,
      title: "Packaging direction",
      paragraphs: [
        `${format.packaging}. Production inputs remain DEMO_ONLY until verified.`,
      ],
    },
  ];

  const breadcrumb = useMemo(() => {
    if (!resolvedProduct) {
      return [
        { label: "Home", href: "/" },
        { label: "Products", href: "/products" },
        { label: format.name, href: undefined as string | undefined },
      ];
    }
    const sequenceMatch = /-(\d+)$/.exec(resolvedProduct.id);
    const sequenceLabel = sequenceMatch
      ? `Concept ${sequenceMatch[1].padStart(2, "0")}`
      : "Format detail";
    return [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: format.name, href: `/products/${format.id}` },
      { label: sequenceLabel, href: undefined },
      { label: resolvedProduct.title, href: undefined },
    ];
  }, [format.id, format.name, resolvedProduct]);

  const onPrev = () => setActiveIndex((index) => (index - 1 + items.length) % items.length);
  const onNext = () => setActiveIndex((index) => (index + 1) % items.length);

  return (
    <main
      className={styles.formatDetailPage}
      data-pdp-layout="gallery-info"
      data-pdp-layout-legacy="seed-reference"
    >
      <nav className={styles.formatCrumb} aria-label="Breadcrumb">
        {breadcrumb.map((item, index) => (
          <span key={`${item.label}-${index}`}>
            {item.href ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span aria-current={index === breadcrumb.length - 1 ? "page" : undefined}>
                {item.label}
              </span>
            )}
            {index < breadcrumb.length - 1 ? <span aria-hidden="true"> / </span> : null}
          </span>
        ))}
      </nav>

      <section className={styles.formatDetailTop}>
        <div className={styles.formatGallery}>
          {showPlaceholderMedia ? (
            <figure
              className={styles.formatHeroMedia}
              data-testid="format-gallery"
              data-gallery-view="MAIN"
              data-gallery-aspect="945/645"
              data-active-index={safeIndex}
            >
              <div
                className={styles.formatPlaceholderMedia}
                aria-label={`${format.name} format visual · awaiting approved asset`}
              >
                <strong>{format.name}</strong>
                <span>DEMO_ONLY · AWAITING APPROVED VISUAL</span>
              </div>
              <div className={styles.formatMediaOverlay}>
                <span>01 / {String(THUMB_COUNT).padStart(2, "0")}</span>
              </div>
              <figcaption>Approved format asset · DEMO_ONLY</figcaption>
            </figure>
          ) : (
            <figure
              className={styles.formatHeroMedia}
              data-testid="format-gallery"
              data-gallery-view="MAIN"
              data-gallery-aspect="945/645"
              data-active-index={safeIndex}
            >
              <Image
                key={active.src}
                src={active.src}
                alt={active.alt}
                fill
                sizes="(max-width: 760px) 100vw, 48vw"
                data-testid="format-gallery-image"
              />
              <button
                type="button"
                className={`${styles.formatGalleryArrow} ${styles.formatGalleryArrowPrev}`}
                aria-label="Previous product image"
                onClick={onPrev}
              >
                ‹
              </button>
              <button
                type="button"
                className={`${styles.formatGalleryArrow} ${styles.formatGalleryArrowNext}`}
                aria-label="Next product image"
                onClick={onNext}
              >
                ›
              </button>
              <div className={styles.formatMediaOverlay}>
                <span>
                  {String(safeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </span>
              </div>
              <figcaption>Approved format asset · DEMO_ONLY</figcaption>
            </figure>
          )}

          {items.length > 0 ? (
            <div className={styles.formatThumbs} aria-label="Product image">
              {items.slice(0, THUMB_COUNT).map((item, index) => (
                <button
                  key={`${item.src}-${index}`}
                  type="button"
                  aria-label={`View product image ${index + 1}`}
                  aria-pressed={index === safeIndex}
                  data-thumb-index={index}
                  className={index === safeIndex ? styles.formatThumbActive : undefined}
                  onClick={() => setActiveIndex(index)}
                >
                  <Image src={item.src} alt="" width={120} height={120} />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <article className={styles.formatDetailInfo}>
          <p className={styles.kicker}>DOSAGE FORM MANUFACTURING</p>
          <h1>
            {resolvedProduct?.title ?? (
              <>
                {format.name}
                <br />
                for your next line.
              </>
            )}
          </h1>
          <p className={styles.formatSubhead}>
            {resolvedProduct
              ? "A private-label concept reviewed end-to-end before inquiry."
              : `A ${format.name.toLowerCase()} manufacturing route for your next line.`}
          </p>
          <aside className={styles.formatDescriptionCallout}>
            <p>
              {resolvedProduct?.descriptor ??
                `${format.fit}. Align the intended experience, formula direction and packaging route before inquiry.`}
            </p>
          </aside>
          {resolvedProduct?.sourceBoundary ? (
            <p className={styles.formatSourceBoundary} role="note">
              Source-provided specifications · pending production verification.
            </p>
          ) : null}
          {resolvedProduct?.parameters && resolvedProduct.parameters.length > 0 ? (
            <dl className={styles.formatSpecs} data-testid="format-specs">
              {resolvedProduct.parameters.map((parameter) => (
                <div key={parameter.label}>
                  <dt>{parameter.label}</dt>
                  <dd>{parameter.value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <dl className={styles.formatSpecs} data-testid="format-specs">
              <div>
                <dt>Format</dt>
                <dd>{format.name}</dd>
              </div>
              <div>
                <dt>Project status</dt>
                <dd>Demo route</dd>
              </div>
              <div>
                <dt>Route</dt>
                <dd>Formula · shape · pack</dd>
              </div>
            </dl>
          )}
          <Link className={styles.formatQuoteAction} href="/contact">
            Get a free quote
          </Link>
        </article>
      </section>

      <section className={styles.formatDetailLower} aria-label="Format documentation">
        {detailSections.map((section) => (
          <div key={section.id}>
            <button
              className={styles.formatDisclosure}
              type="button"
              aria-expanded={openPanel === section.id}
              onClick={() =>
                setOpenPanel(openPanel === section.id ? null : section.id)
              }
            >
              <span>{section.title}</span>
              <span aria-hidden="true">
                {openPanel === section.id ? "−" : "+"}
              </span>
            </button>
            {openPanel === section.id ? (
              <div>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.items?.length ? (
                  <ul>
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ) : null}
          </div>
        ))}
      </section>
    </main>
  );
}

function buildGalleryItems(
  product: B2BProductsPage["discovery"]["items"][number] | undefined,
  fallbackSrc: string | undefined,
): GalleryItem[] {
  // Build the 1×4 thumbnail strip from real product media when available.
  // Preference: 1) default + hover, 2) gallery[0..2], 3) format fallback.
  const items: GalleryItem[] = [];
  if (product?.media?.default.src) {
    items.push({ src: product.media.default.src, alt: product.media.default.alt || "" });
  }
  if (product?.media?.hover.src) {
    items.push({ src: product.media.hover.src, alt: product.media.hover.alt || "" });
  }
  for (const slot of product?.gallery ?? []) {
    if (items.length >= THUMB_COUNT) break;
    if (!items.some((existing) => existing.src === slot.src)) {
      items.push({ src: slot.src, alt: slot.alt || "" });
    }
  }
  if (items.length === 0 && fallbackSrc) {
    return Array.from({ length: THUMB_COUNT }, (_, index) => ({
      src: fallbackSrc,
      alt: `Format placeholder · angle ${index + 1}`,
    }));
  }
  // Pad to THUMB_COUNT with repeated first item so the strip stays balanced.
  while (items.length > 0 && items.length < THUMB_COUNT) {
    items.push({ ...items[items.length % items.length] });
  }
  return items;
}
