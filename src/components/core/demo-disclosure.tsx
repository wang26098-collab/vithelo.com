import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type DemoDisclosureProps = {
  children?: ReactNode;
  className?: string;
};

function DemoDisclosure({ children, className }: DemoDisclosureProps) {
  return (
    <aside className={cn("demo-disclosure", className)} role="note">
      <div className="container-standard">
        {children ??
          "Demonstration content. Product facts, pricing, claims, and policies remain placeholders until verified."}
      </div>
    </aside>
  );
}

export { DemoDisclosure, type DemoDisclosureProps };
