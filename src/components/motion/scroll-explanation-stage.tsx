"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import type { ScienceStage } from "@/content/schema";
import { motionTransition } from "@/components/motion/reveal";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type ScrollExplanationStageProps = {
  intent: "EXPLAIN";
  stage: ScienceStage;
  visual: ReactNode;
};

function ScrollExplanationStage({ intent, stage, visual }: ScrollExplanationStageProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (reducedMotion) return;
    setActiveIndex(
      Math.min(stage.states.length - 1, Math.max(0, Math.floor(progress * stage.states.length))),
    );
  });

  return (
    <section
      className="grid min-h-auto gap-[var(--space-32)] lg:min-h-[190vh] lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]"
      data-motion-intent={intent}
      data-testid={reducedMotion ? "reduced-motion-static" : undefined}
      ref={sectionRef}
    >
      <div className="grid content-start gap-[var(--space-16)] lg:sticky lg:top-[var(--home-header-height)] lg:self-start">
        <p className="text-[var(--font-size-label)] tracking-[var(--letter-spacing-label)] text-[var(--color-muted)] uppercase">
          {stage.dataStatus}
        </p>
        <h2 className="text-[length:var(--font-size-h2-mobile)] leading-[var(--line-height-tight)]">
          {stage.title}
        </h2>
        <div className="min-h-64 overflow-hidden rounded-[var(--radius-cinematic)] border border-[var(--color-border)]">
          {visual}
        </div>
      </div>

      <div className="grid content-center gap-[var(--space-16)] py-[var(--space-32)] lg:py-[var(--space-96)]">
        {stage.states.map((state, index) => {
          const missingStatus =
            typeof state.status === "object" ? state.status : null;
          const statusLabel = missingStatus ? "NOT_CONFIGURED" : "DEMO_ONLY";
          const active = index === activeIndex;

          return (
            <motion.article
              animate={reducedMotion ? undefined : { opacity: active ? 1 : 0.65 }}
              className="border-l border-[var(--color-border)] pl-[var(--space-16)] data-[active=true]:border-[var(--color-graphite)]"
              data-active={active}
              data-state-label={state.label}
              data-testid="science-state"
              initial={false}
              key={state.label}
              transition={reducedMotion ? { duration: 0 } : motionTransition.standard}
            >
              <p className="text-[var(--font-size-label)] tracking-[var(--letter-spacing-label)] text-[var(--color-muted)] uppercase">
                {state.label}
              </p>
              <p className="mt-[var(--space-8)] text-[var(--font-size-body-lg)]">{state.summary}</p>
              <p className="mt-[var(--space-8)] text-[var(--font-size-body-sm)] text-[var(--color-muted)]">
                {statusLabel}
              </p>
              {missingStatus && missingStatus.message !== state.summary && (
                <p className="mt-[var(--space-4)] text-[var(--font-size-body-sm)] text-[var(--color-muted)]">
                  {missingStatus.message}
                </p>
              )}
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

export { ScrollExplanationStage, type ScrollExplanationStageProps };
