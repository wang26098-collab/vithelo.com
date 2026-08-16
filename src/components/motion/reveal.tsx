"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/cn";

type MotionIntent = "ORIENT" | "RELATE" | "EXPLAIN" | "FOCUS" | "CONFIRM";

type RevealProps = {
  children: ReactNode;
  className?: string;
  intent: MotionIntent;
};

const revealDistance: Record<MotionIntent, number> = {
  ORIENT: 20,
  RELATE: 14,
  EXPLAIN: 10,
  FOCUS: 8,
  CONFIRM: 4,
};

const revealDuration: Record<MotionIntent, number> = {
  ORIENT: 0.5,
  RELATE: 0.5,
  EXPLAIN: 0.24,
  FOCUS: 0.24,
  CONFIRM: 0.15,
};

function Reveal({ children, className, intent }: RevealProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      data-motion-mode={reducedMotion ? "static" : "animated"}
      data-motion-intent={intent}
      data-testid={reducedMotion ? "reduced-motion-static" : undefined}
      initial={reducedMotion ? false : { opacity: 0, y: revealDistance[intent] }}
      key={reducedMotion ? "static" : "animated"}
      transition={{
        duration: reducedMotion ? 0 : revealDuration[intent],
        ease: [0.2, 0, 0, 1],
      }}
      viewport={{ amount: 0.2, once: true }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}

function MediaReveal({ children, className, intent }: RevealProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      data-motion-mode={reducedMotion ? "static" : "animated"}
      data-motion-intent={intent}
      data-testid={reducedMotion ? "reduced-motion-static" : undefined}
      initial={reducedMotion ? false : { clipPath: "inset(0 0 12% 0)", opacity: 0 }}
      key={reducedMotion ? "static" : "animated"}
      transition={{
        duration: reducedMotion ? 0 : revealDuration[intent],
        ease: [0.2, 0, 0, 1],
      }}
      viewport={{ amount: 0.2, once: true }}
      whileInView={
        reducedMotion ? undefined : { clipPath: "inset(0 0 0% 0)", opacity: 1 }
      }
    >
      {children}
    </motion.div>
  );
}

export { MediaReveal, Reveal, type MotionIntent, type RevealProps };
