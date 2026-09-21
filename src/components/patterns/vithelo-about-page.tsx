import Image from "next/image";
import Link from "next/link";
import styles from "@/components/patterns/vithelo-about-page.module.css";
import type { B2BAboutPage } from "@/content/schema";

const sectionProps = (section: string) => ({
  "data-testid": "about-section",
  "data-section": section,
});

type AboutMedia = B2BAboutPage["hero"]["media"];

function AboutImage({
  media,
  sizes,
  eager = false,
}: {
  media: AboutMedia;
  sizes: string;
  eager?: boolean;
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
    />
  );
}

export function VitheloAboutPage({ content }: { content: B2BAboutPage }) {
  return (
    <main
      className={styles.page}
      data-content-status={content.dataStatus}
      data-ui-stage="about-architectural-ledger"
    >
      <section
        {...sectionProps("hero")}
        data-header-hero
        className={styles.hero}
      >
        <div className={styles.heroMedia}>
          <AboutImage media={content.hero.media} sizes="100vw" eager />
        </div>
        <div className={styles.heroShade} aria-hidden="true" />
        <div className={styles.heroCopy}>
          <h1>{content.hero.title}</h1>
          <p className={styles.heroLede}>{content.hero.copy}</p>
        </div>
      </section>

      <div className={styles.paperBody} data-testid="about-paper-body">
        <section {...sectionProps("role")} className={styles.role}>
          <div className={styles.roleCopy}>
            <p className={styles.kicker}>{content.role.kicker}</p>
            <h2 data-about-role-title>{content.role.title}</h2>
            <p>{content.role.copy}</p>
            <div className={styles.roleActions}>
              <Link href={content.hero.primaryAction.href}>
                {content.hero.primaryAction.label}
              </Link>
              <Link href={content.hero.secondaryAction.href}>
                {content.hero.secondaryAction.label}
              </Link>
            </div>
          </div>
          <figure className={styles.roleMedia}>
            <AboutImage
              media={content.role.media}
              sizes="(max-width: 720px) 100vw, 44vw"
            />
          </figure>
        </section>

        <section
          {...sectionProps("principles")}
          className={styles.principles}
          aria-labelledby="about-principles-title"
        >
          <p className={styles.kicker} id="about-principles-title">
            HOW WE WORK
          </p>
          <div className={styles.ledger}>
            {content.principles.map((item, index) => (
              <article key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h2>{item.title}</h2>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          {...sectionProps("capabilities")}
          className={styles.capabilities}
        >
          <div className={styles.capabilityIntro}>
            <p className={styles.kicker}>{content.capabilities.kicker}</p>
            <h2>{content.capabilities.title}</h2>
            <p>{content.capabilities.copy}</p>
          </div>
          <figure className={styles.capabilityMedia}>
            <AboutImage media={content.capabilities.media} sizes="100vw" />
          </figure>
          <div className={styles.capabilityList}>
            {content.capabilities.items.map((item, index) => (
              <article key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section {...sectionProps("formats")} className={styles.formats}>
          <figure className={styles.formatMedia}>
            <AboutImage media={content.formats.media} sizes="100vw" />
          </figure>
          <div className={styles.formatCopy}>
            <p className={styles.kicker}>{content.formats.kicker}</p>
            <h2>{content.formats.title}</h2>
            <p>{content.formats.copy}</p>
            <nav
              data-testid="about-formats"
              aria-label="Explore dosage formats"
            >
              {content.formats.items.map((item, index) => (
                <Link aria-label={item.name} href={item.href} key={item.href}>
                  <span aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <strong>{item.name}</strong>
                  <span aria-hidden="true">↗</span>
                </Link>
              ))}
            </nav>
          </div>
        </section>

        <section
          {...sectionProps("collaboration")}
          className={styles.collaboration}
        >
          <header>
            <p className={styles.kicker}>{content.collaboration.kicker}</p>
            <h2>{content.collaboration.title}</h2>
            <p>{content.collaboration.copy}</p>
          </header>
          <div className={styles.collaborationList}>
            {content.collaboration.items.map((item, index) => (
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

        <section {...sectionProps("closing")} className={styles.closing}>
          <div className={styles.boundary} data-testid="about-boundary">
            <div>
              <p className={styles.kicker}>{content.boundary.kicker}</p>
              <h2>{content.boundary.title}</h2>
              <p>{content.boundary.copy}</p>
            </div>
            <ul>
              {content.boundary.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className={styles.cta}>
            <p className={styles.kicker}>{content.cta.kicker}</p>
            <h2>{content.cta.title}</h2>
            <p>{content.cta.copy}</p>
            <Link href={content.cta.action.href}>
              {content.cta.action.label}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
