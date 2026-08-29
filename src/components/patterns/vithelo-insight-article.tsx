import Image from "next/image";
import Link from "next/link";
import styles from "@/components/patterns/vithelo-b2b-pages.module.css";
import type { B2BInsightArticle } from "@/content/schema";

type InsightBlock = B2BInsightArticle["blocks"][number];

function renderBlock(block: InsightBlock, contactHref: string, index: number) {
  switch (block.type) {
    case "text":
      return (
        <section key={`${block.type}-${index}`}>
          <h2>{block.title}</h2>
          {block.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
      );
    case "list":
      return (
        <section key={`${block.type}-${index}`}>
          <h2>{block.title}</h2>
          <ul>
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      );
    case "table":
      return (
        <div className={styles.articleTable} key={`${block.type}-${index}`}>
          <table>
            <caption>{block.title}</caption>
            <thead>
              <tr>
                {block.columns.map((column) => (
                  <th key={column} scope="col">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, rowIndex) => (
                <tr key={`${block.title}-${rowIndex}`}>
                  {row.map((cell, cellIndex) =>
                    cellIndex === 0 ? (
                      <th key={cell} scope="row">
                        {cell}
                      </th>
                    ) : (
                      <td key={`${cell}-${cellIndex}`}>{cell}</td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "callout":
      return (
        <aside className={styles.articleCallout} key={`${block.type}-${index}`}>
          <h2>{block.title}</h2>
          <p>{block.copy}</p>
        </aside>
      );
    case "cta":
      return (
        <aside className={styles.articleCallout} key={`${block.type}-${index}`}>
          <h2>{block.title}</h2>
          <p>{block.copy}</p>
          <Link href={contactHref}>Start a Project</Link>
        </aside>
      );
    case "media":
      return block.media.status === "FREE_COMMERCIAL" ? (
        <figure className={styles.media} key={`${block.type}-${index}`}>
          <Image
            alt={block.media.alt}
            fill
            loading="eager"
            sizes="(max-width: 760px) 100vw, 760px"
            src={block.media.src}
          />
          <figcaption>
            Product-form illustration · free commercial stock
          </figcaption>
        </figure>
      ) : null;
    case "faq":
      return (
        <section key={`${block.type}-${index}`}>
          <h2>Buyer questions</h2>
          <div className={styles.faq}>
            {block.items.map((item) => (
              <details key={item.title}>
                <summary>{item.title}</summary>
                <p>{item.copy}</p>
              </details>
            ))}
          </div>
        </section>
      );
    case "video":
    case "download":
      return null;
  }
}

export function VitheloInsightArticle({
  article,
  relatedArticles,
}: {
  article: B2BInsightArticle;
  relatedArticles: B2BInsightArticle[];
}) {
  const contactHref = `/contact?subject=${encodeURIComponent(article.title)}`;

  return (
    <main className={styles.page} data-content-status={article.dataStatus}>
      <article className={styles.articleBody}>
        <header>
          <p className={styles.kicker}>{article.category}</p>
          <h1>{article.title}</h1>
          <p className={styles.lede}>{article.summary}</p>
          <p className={styles.articleMeta}>
            {article.byline} · {article.contentFormat} · Updated {article.updatedAt} ·
            DEMO_ONLY
          </p>
        </header>
        {article.blocks.map((block, index) =>
          renderBlock(block, contactHref, index),
        )}
      </article>

      <section className={styles.relatedArticles}>
        <p className={styles.kicker}>RELATED INSIGHTS</p>
        {relatedArticles.map((item) => (
          <Link href={`/insights/${item.slug}`} key={item.slug}>
            {item.title}
          </Link>
        ))}
      </section>

      <section className={styles.cta}>
        <h2>Turn the next decision into a practical brief.</h2>
        <p>Share the format, formula direction, pack and expected volume.</p>
        <Link href={contactHref}>Start a Project</Link>
      </section>
    </main>
  );
}
