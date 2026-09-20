import Link from "next/link";
import styles from "@/components/patterns/vithelo-b2b-pages.module.css";
import type { B2BOemOdmPage } from "@/content/schema";

const sectionProps = (section: string) => ({
  "data-testid": "oem-section",
  "data-section": section,
});

export function VitheloOemOdmPage({
  content,
}: {
  content: B2BOemOdmPage;
}) {
  return (
    <main
      className={`${styles.page} ${styles.oemPage}`}
      data-content-status={content.dataStatus}
      data-ui-stage="oem-capability-ledger"
    >
      <section
        {...sectionProps("hero")}
        data-header-hero
        className={`${styles.hero} ${styles.oemHero}`}
      >
        <p className={styles.kicker}>{content.hero.kicker}</p>
        <h1>{content.hero.title}</h1>
        <p className={styles.lede}>{content.hero.copy}</p>
      </section>

      <section
        {...sectionProps("capabilities")}
        className={`${styles.section} ${styles.oemCapabilitySection}`}
      >
        <p className={styles.kicker}>DEVELOPMENT CAPABILITIES</p>
        <h2>One project system. Seven connected decisions.</h2>
        <div className={styles.oemCapabilityMap} data-testid="capability-map">
          {content.capabilities.map((item, index) => (
            <article key={item.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        {...sectionProps("formats")}
        className={`${styles.section} ${styles.oemFormatsSection}`}
      >
        <p className={styles.kicker}>DOSAGE FORMS</p>
        <h2>Eight formats within one review path.</h2>
        <div className={styles.oemFormatField} data-testid="format-field">
          {content.formats.map((format, index) => (
            <Link key={format.href} href={format.href}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{format.label}</strong>
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section
        {...sectionProps("project-path")}
        className={`${styles.section} ${styles.oemProjectSection}`}
      >
        <p className={styles.kicker}>PROJECT PATH</p>
        <h2>Six confirmations from direction to delivery.</h2>
        <div className={styles.oemStepLedger} data-testid="oem-steps">
          {content.steps.map((step) => (
            <article key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        {...sectionProps("commercial-variables")}
        className={`${styles.section} ${styles.oemVariablesSection}`}
      >
        <p className={styles.kicker}>COMMERCIAL VARIABLES</p>
        <h2>MOQ and timing follow the confirmed project.</h2>
        <div
          className={styles.oemVariableGrid}
          data-testid="commercial-variables"
        >
          {content.commercialVariables.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <ul>
                {item.factors.map((factor) => (
                  <li key={factor}>{factor}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section
        {...sectionProps("packaging")}
        className={`${styles.section} ${styles.oemPackagingSection}`}
      >
        <p className={styles.kicker}>PACKAGING ALIGNMENT</p>
        <h2>Plan the pack with the product.</h2>
        <div className={styles.oemPackagingGrid} data-testid="packaging-groups">
          {content.packaging.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        {...sectionProps("quality")}
        className={`${styles.section} ${styles.oemQualitySection}`}
      >
        <p className={styles.kicker}>QUALITY & DOCUMENTATION</p>
        <h2>Define the relevant checks before production.</h2>
        <div className={styles.oemQualityLedger} data-testid="quality-path">
          {content.quality.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        {...sectionProps("quote-preparation")}
        className={`${styles.section} ${styles.oemPrepSection}`}
      >
        <p className={styles.kicker}>QUOTE PREPARATION</p>
        <h2>Six inputs make the first review useful.</h2>
        <ol className={styles.oemChecklist}>
          {content.checklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>

      <section
        {...sectionProps("questions")}
        className={`${styles.section} ${styles.oemQuestionsSection}`}
      >
        <p className={styles.kicker}>PROJECT QUESTIONS</p>
        <h2>Clarify the variables before production.</h2>
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
        className={`${styles.cta} ${styles.oemCta}`}
      >
        <h2>{content.cta.title}</h2>
        <p>{content.cta.copy}</p>
        <Link className={styles.oemPrimaryCta} href={content.cta.href}>
          Start a Project
        </Link>
        <nav
          className={styles.oemRelatedLinks}
          aria-label="Related OEM and ODM guides"
        >
          {content.relatedLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </section>
    </main>
  );
}
