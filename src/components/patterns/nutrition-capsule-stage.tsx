"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { ScienceStage } from "@/content/schema";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type NutritionCapsuleStageProps = { stage: ScienceStage };

const capsuleNavigation = [
  { href: "#nutrition-manifesto", label: "Our approach" },
  { href: "/nutrition#sleep-health", label: "Sleep health" },
  { href: "/nutrition#womens-health", label: "Women’s health" },
  { href: "/learn", label: "Journal" },
  { href: "/professional", label: "About" },
] as const;

const displayLabels = ["OUTER FORM", "INNER FORM", "USE CONTEXT", "SAFETY BOUNDARY"] as const;

function NutritionCapsuleStage({ stage }: NutritionCapsuleStageProps) {
  const storyRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let animationFrame = 0;

    const updateIndex = () => {
      animationFrame = 0;
      const story = storyRef.current;
      if (!story) return;

      const rect = story.getBoundingClientRect();
      const scrollRange = Math.max(1, story.offsetHeight - window.innerHeight);
      const progress = Math.min(0.999, Math.max(0, -rect.top / scrollRange));
      const nextIndex = Math.min(stage.states.length - 1, Math.floor(progress * stage.states.length));
      setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
    };

    const scheduleUpdate = () => {
      if (animationFrame) return;
      animationFrame = window.requestAnimationFrame(updateIndex);
    };

    updateIndex();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [stage.states.length]);

  return (
    <section
      className="capsule-story relative bg-[#77736e] text-[var(--color-graphite)]"
      data-content-status="DEMO_ONLY"
      data-static-design="screen-04-approved"
      id="capsule-science"
      ref={storyRef}
    >
      <div
        className="capsule-story-frame relative isolate min-h-[100dvh] overflow-hidden lg:sticky lg:top-0"
        data-motion-intent="EXPLAIN"
        data-testid={reducedMotion ? "capsule-science-static" : "capsule-science-live-content"}
      >
        <div aria-hidden="true" className="capsule-material capsule-material-left" />
        <div aria-hidden="true" className="capsule-material capsule-material-right" />
        <div aria-hidden="true" className="capsule-material capsule-material-light" />

        <div className="absolute inset-x-0 top-0 z-30 hidden items-center justify-between px-[clamp(2rem,2.5vw,3rem)] pt-[clamp(1.75rem,3.8vh,2.75rem)] text-white lg:flex">
          <Link aria-label="VITHELO home" className="text-[clamp(1.5rem,2vw,2rem)] font-light tracking-[0.18em] no-underline transition-opacity hover:opacity-65" href="/">VITHELO</Link>
          <nav aria-label="Capsule science navigation" className="flex items-center gap-[clamp(1.5rem,3.7vw,3.75rem)] text-[0.78rem] tracking-[0.12em] uppercase">
            {capsuleNavigation.map((item) => <Link className="hero-nav-link" href={item.href} key={item.label}>{item.label}</Link>)}
          </nav>
        </div>

        <div className="relative z-10 flex min-h-[100dvh] items-center px-[clamp(1rem,3vw,3rem)] py-[clamp(5rem,10vh,8rem)]">
          <div className="capsule-glass-stage grid w-full items-center gap-10 px-[clamp(1.5rem,4vw,4.5rem)] py-[clamp(2.5rem,7vh,5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(15rem,0.62fr)_minmax(18rem,0.9fr)] lg:gap-6">
            <div>
              <p className="mb-6 text-[0.68rem] tracking-[0.2em] text-black/58 uppercase">Form study · DEMO_ONLY</p>
              <h2 className="max-w-[42rem] text-[clamp(3.75rem,6.2vw,6.75rem)] leading-[0.98] font-light tracking-[-0.055em]" id="capsule-science-title">
                <span className="block">Precision</span>
                <span className="block">inside every</span>
                <span className="block">capsule.</span>
              </h2>
            </div>

            <div aria-label="Demonstration capsule form visual" className="capsule-visual-stage" data-active-index={activeIndex} data-testid="capsule-visual" role="img">
              <div className="capsule-object">
                <span className="capsule-half capsule-half-top" />
                <span className="capsule-seam" />
                <span className="capsule-half capsule-half-bottom" />
                <span className="capsule-highlight" />
              </div>
            </div>

            <div className="capsule-state-list" aria-label="Capsule science states">
              {stage.states.map((state, index) => {
                const active = index === activeIndex;
                const missingStatus = typeof state.status === "object";

                return (
                  <article
                    className="capsule-state"
                    data-active={active}
                    data-state-label={state.label}
                    data-testid="capsule-science-state"
                    key={state.label}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-[0.68rem] tracking-[0.2em] uppercase">{displayLabels[index]}</p>
                      <span className="font-mono text-[0.62rem] text-black/48">0{index + 1}</span>
                    </div>
                    <p className="mt-3 max-w-[32rem] text-[clamp(0.92rem,1.15vw,1.12rem)] leading-[1.45] text-black/68">{state.summary}</p>
                    <p className="mt-3 text-[0.62rem] tracking-[0.14em] text-black/48 uppercase">{missingStatus ? "NOT_CONFIGURED" : "DEMO_ONLY"}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        <span className="absolute right-3 bottom-3 z-30 bg-black/55 px-2 py-1 text-[0.625rem] tracking-[0.12em] text-white/75 uppercase">DEMO_ONLY</span>
      </div>
    </section>
  );
}

export { NutritionCapsuleStage, type NutritionCapsuleStageProps };
