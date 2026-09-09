"use client";

import { useEffect } from "react";

function animateProofMetrics(proof: HTMLElement) {
  const metrics = Array.from(
    proof.querySelectorAll<HTMLElement>("[data-testid='manufacturing-metric'] strong"),
  );
  const animations = metrics.map((metric) => {
    const target = metric.textContent ?? "";
    const match = target.match(/^(.*?)([\d,.]+)(.*)$/);
    if (!match) return null;

    const prefix = match[1];
    const value = Number(match[2].replaceAll(",", ""));
    const suffix = match[3];
    const startedAt = performance.now();
    const duration = 1200;
    let frame = 0;

    const render = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(value * eased).toLocaleString("en-US");
      metric.textContent = `${prefix}${current}${suffix}`;
      if (progress < 1) frame = requestAnimationFrame(render);
    };

    metric.textContent = `${prefix}0${suffix}`;
    frame = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frame);
  });

  return () => animations.forEach((cancel) => cancel?.());
}

function VitheloHomeMotion() {
  useEffect(() => {
    const homepage = document.querySelector<HTMLElement>("[data-vithelo-home]");
    if (!homepage) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion || typeof IntersectionObserver === "undefined") {
      homepage.dataset.motionMode = "static";
      return;
    }

    homepage.dataset.motionMode = "enhanced";
    homepage.dataset.motionEnabled = "true";
    const sections = Array.from(
      homepage.querySelectorAll<HTMLElement>("[data-motion-intent]"),
    );
    const cancelAnimations: Array<() => void> = [];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.motionState = "visible";
          if ((entry.target as HTMLElement).id === "proof") {
            cancelAnimations.push(animateProofMetrics(entry.target as HTMLElement));
          }
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12%", threshold: 0.12 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
      cancelAnimations.forEach((cancel) => cancel());
    };
  }, []);

  return null;
}

export { VitheloHomeMotion };
