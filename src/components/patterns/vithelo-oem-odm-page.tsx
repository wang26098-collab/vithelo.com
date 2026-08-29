import Link from "next/link";
import styles from "@/components/patterns/vithelo-b2b-pages.module.css";
import type { B2BOemOdmPage } from "@/content/schema";

export function VitheloOemOdmPage({
  content,
}: {
  content: B2BOemOdmPage;
}) {
  return (
    <main className={styles.page} data-content-status={content.dataStatus}>
      <section className={styles.hero}>
        <p className={styles.kicker}>{content.hero.kicker}</p>
        <h1>{content.hero.title}</h1>
        <p className={styles.lede}>{content.hero.copy}</p>
      </section>

      <section className={styles.section}>
        <p className={styles.kicker}>DIRECT MANUFACTURING RELATIONSHIP</p>
        <h2>{content.identity.title}</h2>
        <p className={styles.lede}>{content.identity.copy}</p>
      </section>

      <section className={styles.section}>
        <p className={styles.kicker}>PROJECT PATH</p>
        <h2>Six clear steps from brief to delivery.</h2>
        <div className={styles.stepLedger} data-testid="oem-steps">
          {content.steps.map((step) => (
            <article key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <p className={styles.kicker}>CUSTOM DEVELOPMENT</p>
        <h2>Align the decisions that have to work together.</h2>
        <div className={styles.detailLedger}>
          {content.customization.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <p className={styles.kicker}>PRODUCTION SYSTEM</p>
        <h2>A manufacturing route built from confirmed inputs.</h2>
        <div className={styles.detailLedger}>
          {content.production.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <p className={styles.kicker}>QUALITY PATH</p>
        <h2>Quality is recorded through the project.</h2>
        <div className={styles.simpleTable} data-testid="quality-path">
          {content.quality.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <p className={styles.kicker}>PROJECT PREPARATION</p>
        <h2>Five inputs make the first review useful.</h2>
        <ol className={styles.checklist}>
          {content.checklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>

      <section className={styles.section}>
        <p className={styles.kicker}>BUYER QUESTIONS</p>
        <h2>What to clarify before production.</h2>
        <div className={styles.faq}>
          {content.faqs.map((item) => (
            <details key={item.title}>
              <summary>{item.title}</summary>
              <p>{item.copy}</p>
            </details>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <h2>{content.cta.title}</h2>
        <p>{content.cta.copy}</p>
        <Link href={content.cta.href}>Start a Project</Link>
      </section>
    </main>
  );
}
