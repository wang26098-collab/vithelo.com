import Image from "next/image";
import type { VitheloB2BHomeContent } from "@/content/schema";
import styles from "@/components/patterns/vithelo-b2b-home.module.css";

type VitheloMarketStageProps = {
  market: VitheloB2BHomeContent["market"];
};

function VitheloMarketStage({ market }: VitheloMarketStageProps) {
  return (
    <section
      aria-label="Product directions"
      className={`${styles.section} ${styles.marketStage}`}
      data-layout="reference-scene-stack"
      data-motion-fallback="stacked"
      data-motion-intent="RELATE"
      data-narrative-role="routine-to-brief"
      data-testid="market-stage"
      id="solutions"
    >
      <div className={styles.marketSceneStack}>
        {market.stories.map((story, index) => (
          <article
            className={styles.marketScene}
            data-media-status={story.media.status}
            data-scene={index + 1}
            data-testid="market-scene"
            key={story.title}
          >
            <div
              aria-label={`${story.media.label}; ${story.media.width} by ${story.media.height} ${story.media.format}`}
              className={styles.marketSceneVisual}
              data-testid="market-scene-image"
              role="img"
            >
              <Image
                alt=""
                aria-hidden="true"
                className={styles.marketSceneImage}
                fill
                loading="eager"
                sizes="(max-width: 760px) 100vw, 96vw"
                src={story.media.src ?? "/media/b2b/gummies-pexels-14027295.jpg"}
              />
              <span aria-hidden="true" className={styles.marketSceneShade} />
            </div>

            <div className={styles.marketSceneCopy}>
              <span className={styles.marketSceneIndex}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{story.title}</h3>
              <p>{story.copy}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export { VitheloMarketStage, type VitheloMarketStageProps };
