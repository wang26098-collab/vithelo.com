"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type StickyPriority = "P1" | "P2" | "P3" | "P4";

const priorityClasses: Record<StickyPriority, string> = {
  P1: "z-[var(--z-p1)]",
  P2: "z-[var(--z-p2)]",
  P3: "z-[var(--z-p3)]",
  P4: "z-[var(--z-p4)]",
};

type StickyResourceProps = {
  children: ReactNode;
  priority?: StickyPriority;
  label?: string;
  className?: string;
};

function hasOpenDialog() {
  return (
    document.body.dataset.dialogOpen === "true" ||
    document.querySelector('[role="dialog"][aria-modal="true"]') !== null
  );
}

function StickyResource({
  children,
  priority = "P1",
  label = "Sticky resource",
  className,
}: StickyResourceProps) {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const syncDialogState = () => setPaused(hasOpenDialog());
    const observer = new MutationObserver(syncDialogState);

    syncDialogState();
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-dialog-open"],
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  return (
    <aside
      aria-hidden={paused || undefined}
      aria-label={label}
      className={cn(
        "sticky bottom-0 border-t border-[var(--color-border)] bg-[var(--color-background)] p-4 transition-opacity duration-[var(--motion-fast)] data-[paused=true]:pointer-events-none data-[paused=true]:opacity-0",
        priorityClasses[priority],
        className,
      )}
      data-paused={paused}
      data-priority={priority}
    >
      {children}
    </aside>
  );
}

export { StickyResource, type StickyPriority, type StickyResourceProps };
