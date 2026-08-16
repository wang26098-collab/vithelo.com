"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { MotionIntent } from "@/components/motion/reveal";
import { cn } from "@/lib/cn";

type MembraneRevealProps = {
  children: ReactNode;
  className?: string;
  intent: MotionIntent;
};

function MembraneReveal({ children, className, intent }: MembraneRevealProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className={cn("relative isolate overflow-hidden", className)}
      data-motion-intent={intent}
      data-testid={reducedMotion ? "reduced-motion-static" : undefined}
    >
      {children}
      {!reducedMotion && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 origin-right bg-[var(--color-optical)]"
          initial={{ scaleX: 1 }}
          transition={{ duration: 0.9, ease: [0.2, 0, 0, 1] }}
          viewport={{ amount: 0.35, once: true }}
          whileInView={{ scaleX: 0 }}
        />
      )}
    </div>
  );
}

export { MembraneReveal, type MembraneRevealProps };
