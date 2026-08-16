"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ScaleShift } from "@/components/motion/scale-shift";
import type { MotionIntent } from "@/components/motion/reveal";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/cn";

type VisualSwitcherItem = {
  content: ReactNode;
  id: string;
  label: string;
  visual?: ReactNode;
};

type VisualSwitcherProps = {
  className?: string;
  intent: MotionIntent;
  items: readonly VisualSwitcherItem[];
  label: string;
};

function VisualSwitcher({ className, intent, items, label }: VisualSwitcherProps) {
  const id = useId();
  const reducedMotion = useReducedMotion();
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeItem = items.find((item) => item.id === activeId) ?? items[0];

  function selectByIndex(index: number) {
    const item = items[index];
    if (!item) return;
    setActiveId(item.id);
    tabRefs.current[index]?.focus();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setActiveId(items[index]?.id ?? activeId);
      return;
    }

    const nextIndex =
      event.key === "ArrowRight"
        ? (index + 1) % items.length
        : event.key === "ArrowLeft"
          ? (index - 1 + items.length) % items.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? items.length - 1
              : null;

    if (nextIndex !== null) {
      event.preventDefault();
      selectByIndex(nextIndex);
    }
  }

  if (items.length === 0) return null;

  return (
    <section
      aria-label={label}
      className={cn("grid gap-[var(--space-32)] lg:grid-cols-2", className)}
      data-motion-intent={intent}
      data-testid={reducedMotion ? "reduced-motion-static" : undefined}
    >
      <div>
        <div
          aria-label={`${label} views`}
          className="flex flex-wrap gap-[var(--space-8)]"
          role="tablist"
        >
          {items.map((item, index) => {
            const selected = item.id === activeItem?.id;
            return (
              <button
                aria-controls={`${id}-visual`}
                aria-selected={selected}
                className="min-h-11 border-b border-[var(--color-border)] px-[var(--space-12)] py-[var(--space-8)] text-[var(--font-size-label)] uppercase tracking-[var(--letter-spacing-label)] aria-selected:border-[var(--color-graphite)] aria-selected:text-[var(--color-foreground)]"
                id={`${id}-${item.id}-tab`}
                key={item.id}
                onClick={() => setActiveId(item.id)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                role="tab"
                tabIndex={selected ? 0 : -1}
                type="button"
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="mt-[var(--space-24)] grid gap-[var(--space-20)]">
          {items.map((item) => {
            const selected = item.id === activeItem?.id;
            return (
              <article
                aria-labelledby={`${id}-${item.id}-tab`}
                className="border-l border-[var(--color-border)] pl-[var(--space-16)] opacity-65 data-[active=true]:border-[var(--color-graphite)] data-[active=true]:opacity-100"
                data-active={selected}
                data-testid="switcher-fact"
                id={`${id}-${item.id}-fact`}
                key={item.id}
              >
                <h3 className="text-[var(--font-size-body-lg)]">{item.label}</h3>
                <div className="text-[var(--color-muted)]">{item.content}</div>
              </article>
            );
          })}
        </div>
      </div>

      {activeItem?.visual && (
        <div
          aria-labelledby={`${id}-${activeItem.id}-tab`}
          className="min-h-48"
          data-testid="switcher-visual"
          id={`${id}-visual`}
          role="tabpanel"
        >
          <div aria-hidden="true">
          {reducedMotion ? (
            activeItem.visual
          ) : (
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.24, ease: [0.2, 0, 0, 1] }}
              >
                <ScaleShift active intent={intent}>
                  {activeItem.visual}
                </ScaleShift>
              </motion.div>
            </AnimatePresence>
          )}
          </div>
        </div>
      )}
    </section>
  );
}

export {
  VisualSwitcher,
  type VisualSwitcherItem,
  type VisualSwitcherProps,
};
