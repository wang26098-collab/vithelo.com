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

const motionTransition = {
  fast: { duration: 0.15, ease: [0.2, 0, 0, 1] as const },
  standard: { duration: 0.24, ease: [0.2, 0, 0, 1] as const },
  narrative: { duration: 0.5, ease: [0.2, 0, 0, 1] as const },
} as const;

const revealDistance: Record<MotionIntent, number> = {
  ORIENT: 20,
  RELATE: 14,
  EXPLAIN: 10,
  FOCUS: 8,
  CONFIRM: 4,
};

const revealDuration: Record<MotionIntent, number> = {
  ORIENT: motionTransition.narrative.duration,
  RELATE: motionTransition.narrative.duration,
  EXPLAIN: motionTransition.standard.duration,
  FOCUS: motionTransition.standard.duration,
  CONFIRM: motionTransition.fast.duration,
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
        ease: motionTransition.standard.ease,
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
        ease: motionTransition.standard.ease,
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

export {
  MediaReveal,
  Reveal,
  motionTransition,
  type MotionIntent,
  type RevealProps,
};
