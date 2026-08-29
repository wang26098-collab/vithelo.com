import Link from "next/link";
import styles from "@/components/patterns/vithelo-b2b-pages.module.css";
import type { B2BInsightsPage } from "@/content/schema";

export function VitheloInsightsPage({
  content,
}: {
  content: B2BInsightsPage;
}) {
  return (
    <main className={styles.page} data-content-status={content.dataStatus}>
      <section className={styles.hero}>
        <p className={styles.kicker}>{content.hero.kicker}</p>
        <h1>{content.hero.title}</h1>
        <p className={styles.lede}>{content.hero.copy}</p>
      </section>
      <section className={styles.section}>
        <p className={styles.kicker}>KNOWLEDGE AREAS</p>
        <div className={styles.categoryIndex}>
          {content.categories.map((category) => (
            <span key={category}>{category}</span>
          ))}
        </div>
        <div className={styles.articleIndex}>
          {content.articles
            .filter((article) => article.published)
            .map((article) => (
              <article key={article.slug}>
                <div>
                  <span>{article.category}</span>
                  <small>
                    {article.contentFormat} · Updated {article.updatedAt}
                  </small>
                </div>
                <div>
                  <h2>
                    <Link href={`/insights/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h2>
                  <p>{article.summary}</p>
                </div>
              </article>
            ))}
        </div>
      </section>
    </main>
  );
}
