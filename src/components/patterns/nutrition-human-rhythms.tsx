"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/core/button";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { HomeContent } from "@/content/schema";

type NutritionHumanRhythmsProps = {
  categoryPaths: HomeContent["categoryPaths"];
  content: HomeContent["humanRhythms"];
};

function NutritionHumanRhythms({ categoryPaths, content }: NutritionHumanRhythmsProps) {
  const reducedMotion = useReducedMotion();
  const [isPaused, setIsPaused] = useState(false);
  const controlLabel = isPaused ? "Play health rhythm media" : "Pause health rhythm media";

  return (
    <section aria-labelledby="human-rhythms-title" className="section-space bg-[var(--color-ivory-deep)]" data-motion-intent="RELATE" data-testid={reducedMotion ? "reduced-motion-static" : undefined} id="human-rhythms">
      <div className="container-standard grid gap-[var(--space-40)] lg:grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)] lg:items-end">
        <div>
          <p className="text-[var(--font-size-label)] tracking-[var(--letter-spacing-label)] text-[var(--color-muted)] uppercase">Human rhythms</p>
          <h2 className="mt-[var(--space-20)] max-w-xl text-[length:var(--font-size-h2-mobile)] leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-display)] sm:text-[length:var(--font-size-h2)]" id="human-rhythms-title">Your health moves with your rhythms.</h2>
          <p className="mt-[var(--space-20)] max-w-lg text-[var(--color-muted)]">{content.summary}</p>
          <div className="mt-[var(--space-32)] grid border-t border-[var(--color-border)]">
            {categoryPaths.map((path) => <Link className="flex min-h-11 items-center justify-between border-b border-[var(--color-border)] py-[var(--space-12)] font-medium underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-focus)]" href={path.href} key={path.id}>{path.title}<span aria-hidden="true">↗</span></Link>)}
          </div>
        </div>
        <div className="relative min-h-[24rem] overflow-hidden rounded-[var(--radius-cinematic)] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-human-mauve)_38%,var(--color-ivory))]">
          {content.media.status === "DEMO_ONLY" ? <Image alt={content.media.alt} className="object-cover" fill sizes="(min-width: 1024px) 55vw, 100vw" src={content.media.src} /> : <div aria-label={content.media.alt} className="absolute inset-0 grid place-items-center bg-[linear-gradient(135deg,color-mix(in_srgb,var(--color-human-mauve)_52%,var(--color-ivory)),var(--color-graphite))] p-[var(--space-32)] text-center text-[var(--color-ivory)]" role="img"><p className="max-w-xs">{content.media.message}</p></div>}
          {!reducedMotion && <Button aria-label={controlLabel} aria-pressed={isPaused} className="absolute bottom-[var(--space-16)] right-[var(--space-16)] bg-[color-mix(in_srgb,var(--color-ivory)_90%,transparent)]" onClick={() => setIsPaused((paused) => !paused)} size="icon" variant="secondary"><span aria-hidden="true">{isPaused ? "▶" : "Ⅱ"}</span></Button>}
        </div>
      </div>
    </section>
  );
}

export { NutritionHumanRhythms, type NutritionHumanRhythmsProps };
