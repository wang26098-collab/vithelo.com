"use client";

import { useEffect } from "react";

function VitheloFormatWallMotion() {
  useEffect(() => {
    const section = document.getElementById("dosage-forms");
    if (!section) return;

    const intro = section.querySelector<HTMLElement>("[data-format-intro]");
    const projects = Array.from(
      section.querySelectorAll<HTMLElement>("[data-format-project]"),
    );
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion || typeof IntersectionObserver === "undefined") {
      section.dataset.formatMotion = "static";
      section.dataset.formatIntroVisible = "true";
      projects.forEach((project) => {
        project.dataset.formatVisible = "true";
      });
      return;
    }

    section.dataset.formatMotion = "enhanced";
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLElement;
          if (target === intro) {
            section.dataset.formatIntroVisible = "true";
          } else if (target.matches("[data-format-project]")) {
            target.dataset.formatVisible = "true";
          }
          observer.unobserve(target);
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.08 },
    );

    if (intro) observer.observe(intro);
    projects.forEach((project) => observer.observe(project));

    return () => observer.disconnect();
  }, []);

  return null;
}

export { VitheloFormatWallMotion };
