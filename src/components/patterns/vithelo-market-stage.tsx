"use client";

import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { VitheloB2BHomeContent } from "@/content/schema";
import { decideMarketStageAction } from "@/components/patterns/vithelo-market-stage-logic";
import styles from "@/components/patterns/vithelo-b2b-home.module.css";

type VitheloMarketStageProps = {
  market: VitheloB2BHomeContent["market"];
};

const DESKTOP_QUERY = "(min-width: 761px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function VitheloMarketStage({ market }: VitheloMarketStageProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const stageRef = useRef<HTMLElement>(null);
  const activeIndexRef = useRef(0);
  const lockedRef = useRef(false);
  const unlockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showStory = useCallback(
    (requestedIndex: number) => {
      const nextIndex = Math.max(0, Math.min(market.stories.length - 1, requestedIndex));
      activeIndexRef.current = nextIndex;
      setActiveIndex(nextIndex);

      if (!reducedMotion) {
        lockedRef.current = true;
        if (unlockTimerRef.current) clearTimeout(unlockTimerRef.current);
        unlockTimerRef.current = setTimeout(() => {
          lockedRef.current = false;
        }, 520);
      }
    },
    [market.stories.length, reducedMotion],
  );

  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const motion = window.matchMedia(REDUCED_MOTION_QUERY);
    const updateDesktop = () => setIsDesktop(desktop.matches);
    const updateMotion = () => setReducedMotion(motion.matches);

    updateDesktop();
    updateMotion();
    desktop.addEventListener("change", updateDesktop);
    motion.addEventListener("change", updateMotion);

    return () => {
      desktop.removeEventListener("change", updateDesktop);
      motion.removeEventListener("change", updateMotion);
    };
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const handleWheel = (event: WheelEvent) => {
      if (!isDesktop || reducedMotion || lockedRef.current || Math.abs(event.deltaY) < 4) return;

      const rect = stage.getBoundingClientRect();
      const action = decideMarketStageAction({
        index: activeIndexRef.current,
        count: market.stories.length,
        direction: event.deltaY > 0 ? 1 : -1,
        pointerRatio: (event.clientX - rect.left) / rect.width,
      });

      if (action.type === "release") return;
      event.preventDefault();
      showStory(action.index);
    };

    stage.addEventListener("wheel", handleWheel, { passive: false });
    return () => stage.removeEventListener("wheel", handleWheel);
  }, [isDesktop, market.stories.length, reducedMotion, showStory]);

  useEffect(
    () => () => {
      if (unlockTimerRef.current) clearTimeout(unlockTimerRef.current);
    },
    [],
  );

  return (
    <section
      aria-labelledby="solutions-title"
      className={`${styles.section} ${styles.marketStage}`}
      data-layout="image-background-panels"
      data-reduced-motion={reducedMotion}
      data-testid="market-stage"
      id="solutions"
      onKeyDown={(event) => {
        if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
          event.preventDefault();
          showStory(activeIndexRef.current - 1);
        }
        if (event.key === "ArrowDown" || event.key === "ArrowRight") {
          event.preventDefault();
          showStory(activeIndexRef.current + 1);
        }
        if (event.key === "Escape") stageRef.current?.blur();
      }}
      ref={stageRef}
      tabIndex={-1}
    >
      <p className={styles.kicker}>{market.kicker}</p>
      <h2 className={styles.title} id="solutions-title">
        {market.title}
      </h2>

      <div className={styles.marketStories}>
        {market.stories.map((story, index) => {
          const active = index === activeIndex;
          return (
            <article
              aria-hidden={isDesktop && !reducedMotion && !active ? "true" : undefined}
              className={styles.marketStory}
              data-active={active}
              data-media-status={story.media.status}
              data-story={index + 1}
              data-testid="market-story"
              key={story.title}
              style={
                story.media.src
                  ? {
                      "--market-story-image": `url(${story.media.src})`,
                    } as CSSProperties
                  : undefined
              }
            >
              <div className={styles.marketStoryCopy}>
                <span className={styles.index}>
                  {String(index + 1).padStart(2, "0")} / {String(market.stories.length).padStart(2, "0")}
                </span>
                <h3>{story.title}</h3>
                <p className={styles.copy}>{story.copy}</p>
              </div>
              <span
                aria-label={`${story.media.label}; ${story.media.width} by ${story.media.height} ${story.media.format}`}
                className={styles.marketAssetNote}
                data-media-status={story.media.status}
                role="img"
              >
                {story.media.label} · {story.media.width} × {story.media.height}
              </span>
            </article>
          );
        })}
      </div>

      <div className={styles.marketControls}>
        <button
          aria-label="Previous market direction"
          disabled={activeIndex === 0}
          onClick={() => showStory(activeIndexRef.current - 1)}
          type="button"
        >
          ←
        </button>
        <span aria-live="polite" className={styles.marketProgress}>
          {String(activeIndex + 1).padStart(2, "0")} / {String(market.stories.length).padStart(2, "0")}
        </span>
        <button
          aria-label="Next market direction"
          disabled={activeIndex === market.stories.length - 1}
          onClick={() => showStory(activeIndexRef.current + 1)}
          type="button"
        >
          →
        </button>
      </div>
    </section>
  );
}

export { VitheloMarketStage, type VitheloMarketStageProps };
