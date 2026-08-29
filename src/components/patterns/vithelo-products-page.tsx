import Image from "next/image";
import Link from "next/link";
import styles from "@/components/patterns/vithelo-b2b-pages.module.css";
import type { B2BProductsPage } from "@/content/schema";

export function VitheloProductsPage({
  content,
}: {
  content: B2BProductsPage;
}) {
  const media = content.gummy.media;

  return (
    <main className={styles.page} data-content-status={content.dataStatus}>
      <section className={styles.hero}>
        <p className={styles.kicker}>{content.hero.kicker}</p>
        <h1>{content.hero.title}</h1>
        <p className={styles.lede}>{content.hero.copy}</p>
      </section>

      <section className={styles.splitSection}>
        <div>
          <p className={styles.kicker}>GUMMY PLATFORM</p>
          <h2>{content.gummy.title}</h2>
          <p>{content.gummy.copy}</p>
        </div>
        {media.status === "FREE_COMMERCIAL" ? (
          <figure className={styles.media}>
            <Image
              alt={media.alt}
              fill
              loading="eager"
              sizes="(max-width: 760px) 100vw, 50vw"
              src={media.src}
            />
            <figcaption>
              Product-form illustration · free commercial stock
            </figcaption>
          </figure>
        ) : null}
        <div className={styles.detailLedger}>
          {content.gummy.dimensions.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <p className={styles.kicker}>EIGHT FORMATS</p>
        <h2>One manufacturing system, eight product formats.</h2>
        <div
          className={styles.formatLedger}
          data-layout="showcase-directory"
          data-testid="format-ledger"
        >
          {content.formats.map((format, index) => (
            <article id={format.id} key={format.id}>
              <div className={styles.formatIdentity}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{format.name}</h3>
                <p>{format.fit}</p>
              </div>
              <div aria-hidden="true" className={styles.formatSignal} data-format={index + 1} />
              <div className={styles.formatDetails}>
                <ul>
                  {format.customization.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p>{format.packaging}</p>
              </div>
              <strong>{format.moq}</strong>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <p className={styles.kicker}>FORMAT DECISIONS</p>
        <h2>Choose by project fit, not appearance alone.</h2>
        <div className={styles.simpleTable}>
          {content.comparison.map((row) => (
            <article key={row.criterion}>
              <h3>{row.criterion}</h3>
              <p>{row.guidance}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <p className={styles.kicker}>PACKAGING</p>
        <h2>Align the pack with the product route.</h2>
        <div className={styles.detailLedger}>
          {content.packaging.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
        <p className={styles.moqNote}>{content.moqNote}</p>
      </section>

      <section className={styles.cta}>
        <h2>{content.cta.title}</h2>
        <p>{content.cta.copy}</p>
        <Link href={content.cta.href}>Start a Project</Link>
      </section>
    </main>
  );
}
