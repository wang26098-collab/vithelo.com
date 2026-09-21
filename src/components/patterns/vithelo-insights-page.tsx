import Image from "next/image";
import Link from "next/link";
import styles from "@/components/patterns/vithelo-insights-page.module.css";
import type { B2BInsightsPage } from "@/content/schema";

export function VitheloInsightsPage({
  content,
}: {
  content: B2BInsightsPage;
}) {
  const articles = content.articles.filter((article) => article.published);

  return (
    <main
      className={styles.page}
      data-content-status={content.dataStatus}
      data-layout="editorial-runway"
    >
      <section
        className={styles.hero}
        data-header-hero
        data-motion-intent="ORIENT"
        data-testid="insights-hero"
      >
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>{content.hero.kicker}</p>
          <h1>{content.hero.title}</h1>
          <p className={styles.heroLede}>{content.hero.copy}</p>
        </div>
      </section>

      <section className={styles.paper} data-testid="insights-paper">
        <div aria-label="Insight topics" className={styles.topicRail}>
          {content.categories.map((category) => (
            <span data-testid="insight-topic" key={category}>
              {category}
            </span>
          ))}
        </div>

        <header className={styles.intro} data-motion-intent="RELATE">
          <p className={styles.kicker}>{content.intro.kicker}</p>
          <div>
            <h2>{content.intro.title}</h2>
            <p>{content.intro.copy}</p>
          </div>
        </header>

        <div className={styles.runway}>
          {articles.map((article, index) => {
            const number = String(index + 1).padStart(2, "0");

            return (
              <article
                className={styles.story}
                data-insight-index={number}
                data-motion-intent="RELATE"
                data-testid="insight-story"
                key={article.slug}
              >
                <div className={styles.storyCopy}>
                  <p className={styles.storyMeta}>
                    <span>{number}</span>
                    <span>{article.category}</span>
                  </p>
                  <p className={styles.storyFormat}>
                    {article.contentFormat} · Updated {article.updatedAt}
                  </p>
                  <h2>{article.title}</h2>
                  <p className={styles.storySummary}>{article.summary}</p>
                  <Link
                    aria-label={article.title}
                    className={styles.storyLink}
                    href={`/insights/${article.slug}`}
                  >
                    Read insight <span aria-hidden="true">↗</span>
                  </Link>
                </div>

                <figure
                  className={styles.storyMedia}
                  data-media-status={article.media.status}
                >
                  <Image
                    alt={article.media.alt}
                    height={article.media.height}
                    sizes="(max-width: 760px) calc(100vw - 44px), (max-width: 1100px) 52vw, 58vw"
                    src={article.media.src}
                    width={article.media.width}
                  />
                  <span aria-hidden="true" className={styles.numberBadge}>
                    {number}
                  </span>
                </figure>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
