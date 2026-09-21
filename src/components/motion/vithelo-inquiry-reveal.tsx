"use client";

import { useEffect, useId, useRef, type CSSProperties, type ReactNode } from "react";
import styles from "./vithelo-inquiry-reveal.module.css";

type VitheloInquiryRevealProps = {
  children?: ReactNode;
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
      // 让 mask 完全褪完（progress = 0.21）刚好落在 stage sticky 边界
      // bounds.top = 0（reveal 顶部到达视口顶）那一刻——
      // 这样下一屏内容（stage 后 sticky 容器）在 stage sticky 时
      // 紧贴 stage 底部一直在视口里，mask 褪完那一刻无缝接上，无停顿。
      // 解 0.79 * revealStart = 0.21 * distance 得 revealStart = 0.21/0.79 * distance。
      const revealStart = staticMode || focused ? 0 : (distance * 21) / 79;
      const progress = staticMode || focused
        ? 1
        : clamp(Math.max(0, revealStart - bounds.top) / Math.max(1, revealStart + distance));
      element.style.setProperty("--reveal-scale", String(Math.pow(22, progress)));
      element.style.setProperty("--reveal-mask-opacity", String(1 - clamp(progress / 0.21)));
      // copy 在 mask 完全褪完那一刻立即 = 1（无淡入过渡），
      // 配合 stage 后 sticky 容器在视口里紧贴 stage 底部，做到真正无缝衔接。
      element.style.setProperty("--reveal-copy-opacity", String(clamp((progress - 0.21) / 0.001)));
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
      {children ? <div className={styles.afterStage}>{children}</div> : null}
    </div>
  );
}
