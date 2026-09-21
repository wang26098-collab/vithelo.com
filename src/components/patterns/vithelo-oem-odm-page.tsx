import Image from "next/image";
import Link from "next/link";
import styles from "@/components/patterns/vithelo-oem-odm-page.module.css";
import type { B2BOemOdmPage } from "@/content/schema";

const sectionProps = (section: string) => ({
  "data-testid": "oem-section",
  "data-section": section,
});

type OemMediaData = B2BOemOdmPage["hero"]["media"];

function OemMedia({
  media,
  sizes,
  eager = false,
  unoptimized = false,
}: {
  media: OemMediaData;
  sizes: string;
  eager?: boolean;
  unoptimized?: boolean;
}) {
  return (
    <Image
      src={media.src}
      alt={media.alt}
      width={media.width}
      height={media.height}
      sizes={sizes}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      unoptimized={unoptimized}
    />
  );
}

export function VitheloOemOdmPage({
  content,
}: {
  content: B2BOemOdmPage;
}) {
  return (
    <main
      className={styles.page}
      data-content-status={content.dataStatus}
      data-ui-stage="oem-image-led-editorial"
    >
      <section
        {...sectionProps("hero")}
        data-header-hero
        className={styles.hero}
      >
        <div className={styles.heroMedia}>
          <OemMedia media={content.hero.media} sizes="100vw" eager />
        </div>
        <div className={styles.heroShade} aria-hidden="true" />
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>{content.hero.kicker}</p>
          <h1>{content.hero.title}</h1>
          <p>{content.hero.copy}</p>
          <Link href="/contact">Start a Project</Link>
        </div>
      </section>

      <section
        {...sectionProps("custom-formulation")}
        className={`${styles.section} ${styles.introduction}`}
      >
        <div className={styles.introCopy} data-testid="oem-introduction-copy">
          <p className={styles.linedKicker}>{content.introduction.eyebrow}</p>
          <h2>{content.introduction.title}</h2>
          <p>{content.introduction.copy}</p>
          <div className={styles.introActions}>
            {content.introduction.actions.map((action, index) => (
              <Link
                className={index === 0 ? styles.primaryAction : styles.secondaryAction}
                href={action.href}
                key={action.href}
              >
                {action.label}
              </Link>
            ))}
          </div>
          <div className={styles.introFormats} aria-label="Eight dosage formats">
            {content.formats.slice(0, 5).map((format) => (
              <Link
                aria-label={format.label}
                data-testid="intro-format-link"
                href={format.href}
                key={format.href}
              >
                <OemMedia media={format.media} sizes="52px" unoptimized />
              </Link>
            ))}
            <p>Eight dosage formats within one development field</p>
          </div>
        </div>
        <div className={styles.introMedia} data-testid="oem-introduction-media">
          <OemMedia media={content.introduction.media} sizes="(max-width: 900px) 100vw, 44vw" />
        </div>
      </section>

      <section
        {...sectionProps("development-capabilities")}
        className={`${styles.section} ${styles.development}`}
      >
        <header className={styles.sectionHeader}>
          <p className={styles.kicker}>DEVELOPMENT CAPABILITIES</p>
          <h2>Develop the product through visible review points.</h2>
        </header>
        <div className={styles.storySequence} data-testid="development-stories">
          {content.developmentStories.map((story) => (
            <article className={styles.story} key={story.title}>
              <div className={styles.storyCopy} data-testid="development-story-copy">
                <p className={styles.linedKicker}>{story.eyebrow}</p>
                <h3>{story.title}</h3>
                <p>{story.copy}</p>
              </div>
              <div className={styles.storyMedia} data-testid="development-story-media">
                <OemMedia media={story.media} sizes="(max-width: 900px) 100vw, 44vw" />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        {...sectionProps("formats")}
        className={`${styles.section} ${styles.formats}`}
      >
        <header className={styles.sectionHeader}>
          <p className={styles.kicker}>DOSAGE FORMS</p>
          <h2>Choose the format that fits the product idea.</h2>
        </header>
        <div className={styles.formatGallery} data-testid="format-gallery">
          {content.formats.map((format, index) => (
            <Link key={format.href} href={format.href}>
              <OemMedia
                media={format.media}
                sizes="(max-width: 620px) 50vw, (max-width: 1000px) 33vw, 25vw"
                unoptimized
              />
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{format.label}</strong>
            </Link>
          ))}
        </div>
      </section>

      <section
        {...sectionProps("commercial-planning")}
        className={`${styles.section} ${styles.commercial}`}
      >
        <header className={styles.sectionHeader}>
          <p className={styles.kicker}>COMMERCIAL PLANNING</p>
          <h2>MOQ and timing follow the product decisions.</h2>
        </header>
        <div className={styles.commercialStories} data-testid="commercial-variables">
          {content.commercialVariables.map((item) => (
            <article key={item.title}>
              <div className={styles.commercialMedia}>
                <OemMedia media={item.media} sizes="(max-width: 620px) 100vw, 50vw" />
              </div>
              <div className={styles.commercialCopy}>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <ul>
                  {item.factors.map((factor) => (
                    <li key={factor}>{factor}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        {...sectionProps("quality")}
        className={styles.quality}
      >
        <div className={styles.qualityMedia}>
          <OemMedia media={content.quality.media} sizes="(max-width: 720px) 100vw, 45vw" />
        </div>
        <div className={styles.qualityCopy}>
          <p className={styles.kicker}>QUALITY CONTROL</p>
          <h2>{content.quality.title}</h2>
          <p className={styles.qualityLead}>{content.quality.copy}</p>
          <div className={styles.qualityItems} data-testid="quality-path">
            {content.quality.items.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        {...sectionProps("project-path")}
        className={`${styles.section} ${styles.projectPath}`}
      >
        <header className={styles.sectionHeader}>
          <p className={styles.kicker}>PRIVATE LABEL PROCESS</p>
          <h2>Ten practical confirmations from brief to completion.</h2>
        </header>
        <div className={styles.stepFlow} data-testid="oem-steps">
          {content.steps.map((step, index) => (
            <article key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        {...sectionProps("packaging-introduction")}
        className={styles.packagingIntroduction}
      >
        <div className={styles.packagingMedia}>
          <OemMedia media={content.packagingIntroduction.media} sizes="100vw" />
        </div>
        <div className={styles.packagingCopy}>
          <p className={styles.kicker}>{content.packagingIntroduction.eyebrow}</p>
          <h2>{content.packagingIntroduction.title}</h2>
          <p>{content.packagingIntroduction.copy}</p>
        </div>
      </section>

      <section
        {...sectionProps("quote-preparation")}
        className={`${styles.section} ${styles.quotePreparation}`}
      >
        <header className={styles.sectionHeader}>
          <p className={styles.kicker}>QUOTE PREPARATION</p>
          <h2>Prepare the decisions that make the first review useful.</h2>
        </header>
        <div className={styles.quoteStories}>
          {content.quoteStories.map((item, index) => (
            <article key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
        <ul className={styles.checklist} aria-label="Information to prepare">
          {content.checklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section
        {...sectionProps("packaging-by-format")}
        className={`${styles.section} ${styles.packagingGroups}`}
      >
        <header className={styles.sectionHeader}>
          <p className={styles.kicker}>PACKAGING BY FORMAT</p>
          <h2>Match the presentation to the product route.</h2>
        </header>
        <div data-testid="packaging-groups">
          {content.packaging.map((item, index) => (
            <article key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        {...sectionProps("questions")}
        className={`${styles.section} ${styles.questions}`}
      >
        <header className={styles.sectionHeader}>
          <p className={styles.kicker}>PROJECT QUESTIONS</p>
          <h2>Clarify the variables before production.</h2>
        </header>
        <div className={styles.faq}>
          {content.faqs.map((item) => (
            <details key={item.title}>
              <summary>{item.title}</summary>
              <p>{item.copy}</p>
            </details>
          ))}
        </div>
      </section>

      <section
        {...sectionProps("inquiry")}
        className={styles.inquiry}
      >
        <div className={styles.inquiryMedia} aria-hidden="true">
          <Image
            src="/media/b2b/vithelo-project-entry-atmospheric-panorama.webp"
            alt=""
            width={1536}
            height={1024}
            sizes="100vw"
          />
        </div>
        <div className={styles.inquiryShade} aria-hidden="true" />
        <div className={styles.inquiryCopy}>
          <h2>{content.cta.title}</h2>
          <p>{content.cta.copy}</p>
          <Link href={content.cta.href}>Start a Project</Link>
          <nav aria-label="Related OEM and ODM guides">
            {content.relatedLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </main>
  );
}
