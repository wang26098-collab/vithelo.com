"use client";

import { useEffect } from "react";

const FORMAT_GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function clampFormatVelocity(delta: number) {
  return Math.max(-1, Math.min(1, delta / 48));
}

function buildDecodedLabel(label: string, revealed: number, frame: number) {
  return Array.from(label)
    .map((character, index) => {
      if (character === " " || index < revealed) return character;
      return FORMAT_GLYPHS[(index * 11 + frame * 7) % FORMAT_GLYPHS.length];
    })
    .join("");
}

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
        const label = project.querySelector<HTMLElement>("[data-format-label]");
        if (label?.dataset.formatLabel) label.textContent = label.dataset.formatLabel;
      });
      return;
    }

    section.dataset.formatMotion = "enhanced";
    const activeProjects = new Set<HTMLElement>();
    const decodeFrames = new Set<number>();
    let motionFrame = 0;
    let lastScrollY = window.scrollY;
    let velocity = 0;
    let velocityTarget = 0;

    const decodeLabel = (project: HTMLElement) => {
      if (project.dataset.formatDecoded === "true") return;
      const label = project.querySelector<HTMLElement>("[data-format-label]");
      const stableLabel = label?.dataset.formatLabel;
      if (!label || !stableLabel) return;
      project.dataset.formatDecoded = "true";
      const startedAt = performance.now();

      const updateLabel = (timestamp: number) => {
        const elapsed = Math.max(0, timestamp - startedAt);
        const progress = Math.min(1, elapsed / 560);
        const revealed = Math.floor(progress * stableLabel.length);
        label.textContent = buildDecodedLabel(
          stableLabel,
          revealed,
          Math.floor(elapsed / 32),
        );
        if (progress < 1) {
          const frame = requestAnimationFrame(updateLabel);
          decodeFrames.add(frame);
        } else {
          label.textContent = stableLabel;
        }
      };

      const frame = requestAnimationFrame(updateLabel);
      decodeFrames.add(frame);
    };

    const updateMotion = () => {
      velocity += (velocityTarget - velocity) * 0.18;
      velocityTarget *= 0.82;
      section.style.setProperty("--format-scroll-velocity", velocity.toFixed(4));
      section.style.setProperty(
        "--format-scroll-velocity-abs",
        Math.abs(velocity).toFixed(4),
      );

      activeProjects.forEach((project) => {
        const rect = project.getBoundingClientRect();
        const progress = Math.max(
          0,
          Math.min(1, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)),
        );
        project.style.setProperty("--format-view-progress", progress.toFixed(4));
      });

      if (Math.abs(velocity) > 0.002 || Math.abs(velocityTarget) > 0.002) {
        motionFrame = requestAnimationFrame(updateMotion);
      } else {
        velocity = 0;
        velocityTarget = 0;
        section.style.setProperty("--format-scroll-velocity", "0");
        section.style.setProperty("--format-scroll-velocity-abs", "0");
        motionFrame = 0;
      }
    };

    const queueMotionFrame = () => {
      if (!motionFrame) motionFrame = requestAnimationFrame(updateMotion);
    };

    const onScroll = () => {
      const nextScrollY = window.scrollY;
      velocityTarget = clampFormatVelocity(nextScrollY - lastScrollY);
      lastScrollY = nextScrollY;
      queueMotionFrame();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          if (target === intro) {
            if (entry.isIntersecting) section.dataset.formatIntroVisible = "true";
            return;
          }
          if (!target.matches("[data-format-project]")) return;
          if (entry.isIntersecting) {
            activeProjects.add(target);
            target.dataset.formatVisible = "true";
            decodeLabel(target);
            queueMotionFrame();
          } else {
            activeProjects.delete(target);
          }
        });
      },
      { rootMargin: "12% 0px 12%", threshold: 0.08 },
    );

    if (intro) observer.observe(intro);
    projects.forEach((project) => observer.observe(project));
    window.addEventListener("scroll", onScroll, { passive: true });

    const pointerCleanups: Array<() => void> = [];
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      projects.forEach((project) => {
        const media = project.querySelector<HTMLElement>("[data-format-media]");
        if (!media) return;
        const onPointerMove = (event: PointerEvent) => {
          const rect = media.getBoundingClientRect();
          const x = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2));
          const y = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2));
          project.style.setProperty("--format-pointer-x", x.toFixed(3));
          project.style.setProperty("--format-pointer-y", y.toFixed(3));
        };
        const onPointerLeave = () => {
          project.style.setProperty("--format-pointer-x", "0");
          project.style.setProperty("--format-pointer-y", "0");
        };
        media.addEventListener("pointermove", onPointerMove);
        media.addEventListener("pointerleave", onPointerLeave);
        pointerCleanups.push(() => {
          media.removeEventListener("pointermove", onPointerMove);
          media.removeEventListener("pointerleave", onPointerLeave);
        });
      });
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      pointerCleanups.forEach((cleanup) => cleanup());
      if (motionFrame) cancelAnimationFrame(motionFrame);
      decodeFrames.forEach((frame) => cancelAnimationFrame(frame));
    };
  }, []);

  return null;
}

export {
  VitheloFormatWallMotion,
  buildDecodedLabel,
  clampFormatVelocity,
};
