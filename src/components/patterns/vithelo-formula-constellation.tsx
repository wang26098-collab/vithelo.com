"use client";

import type { VitheloB2BHomeContent } from "@/content/schema";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "@/components/patterns/vithelo-b2b-home.module.css";

type CustomizationContent = VitheloB2BHomeContent["customization"];

type VitheloFormulaConstellationProps = {
  customization: CustomizationContent;
};

export function VitheloFormulaConstellation({
  customization,
}: VitheloFormulaConstellationProps) {
  const [activeSource, setActiveSource] = useState<
    "mouse" | "keyboard" | "touch" | null
  >(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const formulaButtonRef = useRef<HTMLButtonElement>(null);
  const lastInputRef = useRef("keyboard");
  const isFormulaActive = activeSource !== null;
  const state = isFormulaActive ? "formula" : "overview";

  useEffect(() => {
    function handleKeyDown() {
      lastInputRef.current = "keyboard";
    }

    function handlePointerDown(event: PointerEvent) {
      lastInputRef.current = event.pointerType;
      if (!formulaButtonRef.current?.contains(event.target as Node)) {
        setActiveSource(null);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  useEffect(() => {
    if (!isFormulaActive) return;

    const root = rootRef.current;
    if (!root || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        setActiveSource(null);
      }
    });
    observer.observe(root);
    return () => observer.disconnect();
  }, [isFormulaActive]);

  return (
    <div
      className={styles.customizationConstellation}
      data-customization-state={state}
      data-testid="customization-constellation"
      ref={rootRef}
    >
      <div
        className={styles.customizationMediaFrame}
        data-testid="customization-media-frame"
      >
        <figure
          aria-hidden={isFormulaActive}
          className={`${styles.customizationVisual} ${styles.customizationOverviewScene}`}
          data-media-status={customization.media.status}
          data-motion-role="media"
          data-testid="customization-visual"
        >
          <Image
            alt={customization.media.label}
            fill
            sizes="(max-width: 760px) 100vw, 492px"
            src={customization.media.src}
          />
        </figure>
        <figure
          aria-hidden={!isFormulaActive}
          className={`${styles.customizationVisual} ${styles.customizationFormulaScene}`}
          data-media-status={customization.formulaScene.media.status}
          data-testid="formula-scene"
        >
          <Image
            alt={customization.formulaScene.media.label}
            fill
            sizes="(max-width: 760px) 100vw, 492px"
            src={customization.formulaScene.media.src}
          />
        </figure>
        <div
          aria-hidden={!isFormulaActive}
          className={styles.formulaDetails}
          data-testid="formula-details"
          id="formula-customization-details"
        >
          {customization.formulaScene.details.map((detail) => (
            <article key={detail.label}>
              <h4>{detail.label}</h4>
              <p>{detail.copy}</p>
            </article>
          ))}
        </div>
      </div>
      <div
        className={styles.customizationDecisionGrid}
        data-testid="customization-decision-grid"
      >
        {customization.nodes.map((node, index) => {
          const content = (
            <div>
              <h3>{node.title}</h3>
              <p>{node.copy}</p>
            </div>
          );

          if (index === 0) {
            return (
              <button
                aria-controls="formula-customization-details"
                aria-pressed={isFormulaActive}
                className={`${styles.customizationNode} ${styles.formulaNode}`}
                data-motion-role="relation-item"
                data-node-index="1"
                data-testid="customization-node"
                key={node.title}
                onBlur={() => {
                  setActiveSource((current) =>
                    current === "keyboard" ? null : current,
                  );
                }}
                onClick={() => {
                  if (
                    lastInputRef.current === "touch" ||
                    lastInputRef.current === "pen"
                  ) {
                    setActiveSource((current) =>
                      current === "touch" ? null : "touch",
                    );
                  }
                }}
                onFocus={() => {
                  if (lastInputRef.current === "keyboard") {
                    setActiveSource("keyboard");
                  }
                }}
                onKeyDown={(event) => {
                  if (event.key === "Escape") setActiveSource(null);
                  if (event.key === "Enter" || event.key === " ") {
                    setActiveSource("keyboard");
                  }
                }}
                onPointerEnter={(event) => {
                  if (event.pointerType === "mouse") setActiveSource("mouse");
                }}
                onPointerLeave={(event) => {
                  if (event.pointerType === "mouse") {
                    setActiveSource((current) =>
                      current === "mouse" ? null : current,
                    );
                  }
                }}
                ref={formulaButtonRef}
                type="button"
              >
                {content}
              </button>
            );
          }

          return (
            <article
              className={styles.customizationNode}
              data-motion-role="relation-item"
              data-node-index={index + 1}
              data-testid="customization-node"
              key={node.title}
            >
              {content}
            </article>
          );
        })}
      </div>
    </div>
  );
}
