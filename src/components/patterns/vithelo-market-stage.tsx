import Image from "next/image";
import type { CSSProperties } from "react";
import type { VitheloB2BHomeContent } from "@/content/schema";
import styles from "@/components/patterns/vithelo-b2b-home.module.css";

type VitheloMarketStageProps = {
  market: VitheloB2BHomeContent["market"];
};

function VitheloMarketStage({ market }: VitheloMarketStageProps) {
  return (
    <section
      aria-labelledby="solutions-title"
      className={`${styles.section} ${styles.marketStage}`}
      data-layout="sticky-product-switcher"
      data-motion-fallback="stacked"
      data-motion-intent="RELATE"
      data-narrative-role="need-to-brief"
      data-testid="market-stage"
      data-ui-stage="image-led-product-directions"
      id="solutions"
      style={
        {
          "--market-stage-height": `${market.stories.length * 100}svh`,
        } as CSSProperties
      }
    >
      <div className={styles.marketIntro} data-testid="market-intro">
        <p className={styles.kicker}>{market.kicker}</p>
        <h2 className={styles.title} id="solutions-title">
          {market.title}
        </h2>
      </div>

      <div className={styles.marketStickyStage}>
        <div className={styles.marketStories}>
          {market.stories.map((story, index) => {
            return (
              <article
                className={styles.marketStory}
                data-media-status={story.media.status}
                data-story={index + 1}
                data-testid="market-story"
                key={story.title}
              >
                <div
                  aria-label={`${story.media.label}; ${story.media.width} by ${story.media.height} ${story.media.format}`}
                  className={styles.marketStoryVisual}
                  data-testid="market-story-image"
                  role="img"
                >
                  <Image
                    alt=""
                    aria-hidden="true"
                    className={styles.marketStoryImage}
                    fill
                    sizes="(max-width: 760px) 92vw, 66vw"
                    src={story.media.src ?? "/media/b2b/gummies-pexels-14027295.jpg"}
                  />
                  <span aria-hidden="true" className={styles.marketStoryShade} />
                  <h3 className={styles.marketStoryTitle}>{story.title}</h3>
                  <span aria-hidden="true" className={styles.marketStoryMark}>
                    VITHELO
                  </span>
                </div>

                <div className={styles.marketStoryCaption}>
                  <span className={styles.marketStoryIndex}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p>{story.copy}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div aria-hidden="true" className={styles.marketScrollTrack}>
        {market.stories.map((story, index) => (
          <div
            className={styles.marketStep}
            data-index={index}
            data-testid="market-step"
            key={story.title}
          />
        ))}
      </div>
    </section>
  );
}

export { VitheloMarketStage, type VitheloMarketStageProps };
