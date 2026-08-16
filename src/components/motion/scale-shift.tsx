"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { MotionIntent } from "@/components/motion/reveal";

type ScaleShiftProps = {
  active: boolean;
  children: ReactNode;
  className?: string;
  intent: MotionIntent;
};

function ScaleShift({ active, children, className, intent }: ScaleShiftProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      animate={{ scale: reducedMotion ? 1 : active ? 1.025 : 1 }}
      className={className}
      data-active={active}
      data-motion-intent={intent}
      data-testid={reducedMotion ? "reduced-motion-static" : undefined}
      transition={{ duration: reducedMotion ? 0 : 0.24, ease: [0.2, 0, 0, 1] }}
    >
      {children}
    </motion.div>
  );
}

export { ScaleShift, type ScaleShiftProps };
