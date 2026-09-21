"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { B2BProductsPage } from "@/content/schema";
import styles from "./vithelo-product-detail-story.module.css";

type Product = B2BProductsPage["discovery"]["items"][number];
type Format = B2BProductsPage["formats"][number];
type GalleryMedia = NonNullable<Product["media"]>["default"];

export function VitheloProductDetailStory({
  format,
  product,
}: {
  format: Format;
  product: Product & { pdpStory: NonNullable<Product["pdpStory"]> };
}) {
  const story = product.pdpStory;
  const gallery = [
    product.media?.default,
    product.media?.hover,
    ...(product.gallery ?? []),
  ].filter((item): item is GalleryMedia => Boolean(item));
  const [activeImage, setActiveImage] = useState(0);
  const [failedImageSrc, setFailedImageSrc] = useState<string | null>(null);
  const [failedPackagingImages, setFailedPackagingImages] = useState<number[]>(
    [],
  );
  const [failedNarrativeImages, setFailedNarrativeImages] = useState<string[]>(
    [],
  );
  const [openBriefPanel, setOpenBriefPanel] = useState("parameters");
  const [openFaq, setOpenFaq] = useState(0);
  const currentImage = gallery[activeImage];
  const showImage = currentImage && failedImageSrc !== currentImage.src;
  const capabilityMedia = product.gallery?.[0];
  const projectMedia = product.gallery?.[1];
  const markNarrativeImageFailed = (src: string) => {
    setFailedNarrativeImages((current) =>
      current.includes(src) ? current : [...current, src],
    );
  };
  const briefPanels = [
    {
      id: "parameters",
      title: "Project parameters",
      items:
        product.parameters?.map(
          ({ label, value }) => `${label} · ${value}`,
        ) ?? [],
    },
    {
      id: "customization",
      title: "Customization options",
      items: format.customization,
    },
    {
      id: "manufacturing",
      title: "Manufacturing review",
      items: story.manufacturingReviewItems,
    },
    ...(product.detailSections ?? [])
      .filter(
        ({ id }) =>
          id !== "overview" &&
          id !== "customization" &&
          id !== "packaging",
      )
      .map((section) => ({
        id: section.id,
        title: section.title,
        items: [...(section.paragraphs ?? []), ...(section.items ?? [])],
      })),
  ];

  return (
    <main className={styles.page} data-pdp-layout="vithelo-project-story">
      <section className={styles.hero} data-testid="pdp-story-hero">
        <div
          className={styles.heroMedia}
          data-testid="pdp-story-gallery"
          data-active-index={activeImage}
        >
          {showImage ? (
            <Image
              key={currentImage.src}
              fill
              preload
              src={currentImage.src}
              alt={currentImage.alt}
              sizes="(max-width: 760px) 100vw, 72vw"
              data-testid="pdp-story-image"
              onError={() => setFailedImageSrc(currentImage.src)}
            />
          ) : (
            <div
              className={styles.mediaPlaceholder}
              role="img"
              aria-label={`${format.name} visual awaiting approval`}
            >
              DEMO_ONLY · AWAITING APPROVED VISUAL
            </div>
          )}
          <p className={styles.mediaStatus}>DEMO_ONLY · PRODUCT VISUAL</p>
          {gallery.length > 1 ? (
            <div className={styles.galleryControls} aria-label="Product image">
              {gallery.slice(0, 4).map((image, index) => (
                <button
                  key={`${image.src}-${index}`}
                  type="button"
                  aria-label={`View product image ${index + 1}`}
                  aria-pressed={activeImage === index}
                  onClick={() => {
                    setActiveImage(index);
                    setFailedImageSrc(null);
                  }}
                >
                  <Image src={image.src} alt="" width={72} height={72} />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <article className={styles.brief}>
          <p className={styles.kicker}>{story.kicker}</p>
          <h1>{product.title}</h1>
          <p className={styles.briefNotice}>{story.commerceNotice}</p>
          <div className={styles.briefPanels}>
            {briefPanels.map((panel) => {
              const isOpen = openBriefPanel === panel.id;

              return (
                <div key={panel.id}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenBriefPanel(isOpen ? "" : panel.id)}
                  >
                    <span>{panel.title}</span>
                    <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen ? (
                    <ul>
                      {panel.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              );
            })}
          </div>
          <Link className={styles.primaryAction} href={story.inquiry.href}>
            Start a Project
          </Link>
        </article>
      </section>

      <section
        className={styles.capabilityScene}
        aria-labelledby="capability-title"
      >
        {capabilityMedia && !failedNarrativeImages.includes(capabilityMedia.src) ? (
          <Image
            fill
            src={capabilityMedia.src}
            alt={capabilityMedia.alt}
            sizes="100vw"
            onError={() => markNarrativeImageFailed(capabilityMedia.src)}
          />
        ) : (
          <div
            className={styles.sectionMediaPlaceholder}
            role="img"
            aria-label="DEMO_ONLY · Product definition visual awaiting approval"
          >
            DEMO_ONLY · AWAITING APPROVED VISUAL
          </div>
        )}
        <div className={styles.capabilityHeading}>
          <p className={styles.kicker}>PRODUCT DEFINITION</p>
          <h2 id="capability-title">{story.capabilityHeadline}</h2>
        </div>
        <div className={styles.capabilityGrid}>
          {story.capabilities.map((item) => (
            <article data-testid="pdp-capability-item" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.projectPath} aria-labelledby="project-title">
        <header>
          <h2 id="project-title">{story.projectHeadline}</h2>
          <p>{story.projectIntro}</p>
        </header>
        <div className={styles.projectBody}>
          <ol>
            {story.projectStages.map((stage) => (
              <li data-testid="pdp-project-stage" key={stage.label}>
                <small>{stage.label}</small>
                <h3>{stage.title}</h3>
                <p>{stage.copy}</p>
              </li>
            ))}
          </ol>
          <div className={styles.projectMedia}>
            {projectMedia && !failedNarrativeImages.includes(projectMedia.src) ? (
              <Image
                fill
                src={projectMedia.src}
                alt={projectMedia.alt}
                sizes="(max-width: 760px) 100vw, 48vw"
                onError={() => markNarrativeImageFailed(projectMedia.src)}
              />
            ) : (
              <div
                className={styles.sectionMediaPlaceholder}
                role="img"
                aria-label="DEMO_ONLY · Project path visual awaiting approval"
              >
                DEMO_ONLY · AWAITING APPROVED VISUAL
              </div>
            )}
          </div>
        </div>
      </section>

      <section
        className={styles.decisionSystem}
        aria-labelledby="decision-title"
      >
        <div>
          <p className={styles.kicker}>{story.decisionKicker}</p>
          <h2 id="decision-title">{story.decisionHeadline}</h2>
          <p>{story.decisionIntro}</p>
        </div>
        <div className={styles.decisionGrid}>
          {story.decisions.map((item, index) => (
            <article data-testid="pdp-decision" key={item.title}>
              <small>{String(index + 1).padStart(2, "0")}</small>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        className={styles.reviewMatrix}
        aria-labelledby="review-title"
      >
        <h2 id="review-title">{story.reviewHeadline}</h2>
        <div className={styles.reviewRows}>
          {story.reviewRows.map((row) => (
            <div data-testid="pdp-review-row" key={row.area}>
              <strong>{row.area}</strong>
              <span data-status={row.status}>
                {row.status === "SELECTED" ? "Selected" : "To confirm"}
              </span>
              <p>{row.guidance}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.packaging} aria-labelledby="packaging-title">
        <header>
          <p className={styles.kicker}>{story.packagingKicker}</p>
          <h2 id="packaging-title">{story.packagingHeadline}</h2>
        </header>
        <div className={styles.packagingGrid}>
          {story.packagingItems.map((item, index) => {
            const media = product.gallery?.[index];
            const showPackagingImage =
              media && !failedPackagingImages.includes(index);

            return (
              <article data-testid="pdp-packaging-item" key={item.title}>
                <div className={styles.packagingMedia}>
                  {showPackagingImage ? (
                    <Image
                      fill
                      src={media.src}
                      alt={media.alt}
                      sizes="(max-width: 900px) 100vw, 33vw"
                      onError={() =>
                        setFailedPackagingImages((current) =>
                          current.includes(index)
                            ? current
                            : [...current, index],
                        )
                      }
                    />
                  ) : (
                    <div
                      className={styles.packagingMediaPlaceholder}
                      role="img"
                      aria-label={`DEMO_ONLY · ${item.title} visual awaiting approval`}
                    >
                      DEMO_ONLY · AWAITING APPROVED VISUAL
                    </div>
                  )}
                </div>
                <div className={styles.packagingCopy}>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.quality} aria-labelledby="quality-title">
        <header>
          <p className={styles.kicker}>{story.qualityKicker}</p>
          <h2 id="quality-title">{story.qualityHeadline}</h2>
          <p>{story.qualityCopy}</p>
        </header>
        <div className={styles.qualityGrid}>
          {story.qualityItems.map((item, index) => (
            <article data-testid="pdp-quality-item" key={item.title}>
              <strong>{String(index + 1).padStart(2, "0")}</strong>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.faq} aria-labelledby="faq-title">
        <h2 id="faq-title">
          Questions?
          <br />
          Start with the project.
        </h2>
        <div className={styles.faqList}>
          {story.faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            const buttonId = `pdp-faq-button-${index}`;
            const panelId = `pdp-faq-panel-${index}`;

            return (
              <div key={faq.title}>
                <button
                  id={buttonId}
                  type="button"
                  aria-controls={panelId}
                  aria-expanded={isOpen}
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                >
                  <span>{faq.title}</span>
                  <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
                </button>
                <div
                  id={panelId}
                  className={styles.faqAnswer}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                >
                  <p>{faq.copy}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className={styles.inquiry} aria-labelledby="inquiry-title">
        <div>
          <p className={styles.kicker}>{story.inquiry.kicker}</p>
          <h2 id="inquiry-title">{story.inquiry.title}</h2>
        </div>
        <div className={styles.inquiryAction}>
          <p>{story.inquiry.copy}</p>
          <Link className={styles.primaryAction} href={story.inquiry.href}>
            {story.inquiry.label}
          </Link>
        </div>
        <footer>
          <span>{story.kicker}</span>
          <span role="note">{story.verificationNotice}</span>
        </footer>
      </section>
    </main>
  );
}
