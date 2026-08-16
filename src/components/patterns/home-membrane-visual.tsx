"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { MembraneReveal } from "@/components/motion/membrane-reveal";

type HomeMembraneVisualProps = {
  children: ReactNode;
  className: string;
};

function HomeMembraneVisual({ children, className }: HomeMembraneVisualProps) {
  const motionReady = useSyncExternalStore(
    () => () => undefined,
    () => typeof window.matchMedia === "function",
    () => false,
  );

  if (!motionReady) {
    return <div className={`relative isolate overflow-hidden ${className}`}>{children}</div>;
  }

  return (
    <MembraneReveal className={className} intent="ORIENT">
      {children}
    </MembraneReveal>
  );
}

export { HomeMembraneVisual, type HomeMembraneVisualProps };
