"use client";

import { useEffect, useId, useRef, type CSSProperties, type ReactNode } from "react";
import styles from "./vithelo-inquiry-reveal.module.css";

type VitheloInquiryRevealProps = {
  children: ReactNode;
  image: string;
};

export function VitheloInquiryReveal({ children, image }: VitheloInquiryRevealProps) {
  const root = useRef<HTMLDivElement>(null);
  const mask = useRef<SVGSVGElement>(null);
  const maskId = useId();

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let anchorFrame = 0;
    let bypass = window.location.hash === "#contact";
    let focused = element.contains(document.activeElement);
    const clamp = (value: number) => Math.min(1, Math.max(0, value));

    const update = () => {
      frame = 0;
      const staticMode = preference.matches || bypass;
      element.dataset.revealMode = staticMode ? "static" : "scroll";
      const bounds = element.getBoundingClientRect();
      const stage = element.firstElementChild as HTMLElement;
      if (stage.clientWidth > 0) {
        mask.current?.setAttribute("viewBox", `0 0 1440 ${1440 * stage.offsetHeight / stage.clientWidth}`);
      }
      const distance = bounds.height - stage.offsetHeight;
      const progress = staticMode || focused ? 1 : clamp(-bounds.top / Math.max(1, distance));
      // Exponential scale makes crossing the letter feel continuous at every size.
      element.style.setProperty("--reveal-scale", String(Math.pow(22, progress)));
      element.style.setProperty("--reveal-mask-opacity", String(1 - clamp((progress - 0.42) / 0.21)));
      element.style.setProperty("--reveal-copy-opacity", String(clamp((progress - 0.5) / 0.22)));
      element.dataset.revealComplete = String(progress >= 0.72);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const revealForFocus = () => {
      focused = true;
      update();
    };
    const onHashChange = () => {
      if (window.location.hash !== "#contact") return;
      bypass = true;
      update();
      anchorFrame = window.requestAnimationFrame(() => element.scrollIntoView({ block: "start", behavior: "instant" }));
    };
    update();
    if (bypass) onHashChange();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", onHashChange);
    element.addEventListener("focusin", revealForFocus);
    preference.addEventListener("change", update);
    return () => {
      window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(anchorFrame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", onHashChange);
      element.removeEventListener("focusin", revealForFocus);
      preference.removeEventListener("change", update);
    };
  }, []);

  return (
    <div
      className={styles.reveal}
      data-inquiry-reveal
      data-motion-intent="FOCUS"
      ref={root}
      style={{ "--inquiry-scene": `url("${image}")` } as CSSProperties}
    >
      <div className={styles.stage}>
        <div aria-hidden="true" className={styles.scene} />
        <div className={styles.content}>{children}</div>
        <div aria-hidden="true" className={styles.cover}>
          <svg ref={mask} className={styles.mask} viewBox="0 0 1440 900" preserveAspectRatio="none">
            <defs>
              <mask id={maskId} x="0" y="0" width="100%" height="100%" maskUnits="userSpaceOnUse">
                <rect width="100%" height="100%" fill="white" />
                <text x="720" y="50%" dy=".33em" textAnchor="middle" textLength="1280" lengthAdjust="spacingAndGlyphs" fill="black">VITHELO</text>
              </mask>
            </defs>
            <rect width="100%" height="100%" fill="currentColor" mask={`url(#${maskId})`} />
          </svg>
        </div>
      </div>
    </div>
  );
}
