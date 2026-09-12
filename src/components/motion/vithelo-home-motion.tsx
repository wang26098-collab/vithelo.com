"use client";

import { useEffect } from "react";

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
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.motionState = "visible";
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12%", threshold: 0.12 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}

export { VitheloHomeMotion };
