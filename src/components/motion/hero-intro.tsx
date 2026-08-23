import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

type HeroIntroProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

function HeroIntro({ children, className, delay = 0 }: HeroIntroProps) {
  return (
    <div
      className={cn("nutrition-hero-intro", className)}
      data-motion-intent="ORIENT"
      data-motion-mode="animated"
      style={{ "--hero-intro-delay": `${delay}s` } as CSSProperties}
    >
      {children}
    </div>
  );
}

export { HeroIntro, type HeroIntroProps };
