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
  position?: "fixed" | "sticky";
};

function hasOpenDialog() {
  return (
    document.body.dataset.dialogOpen === "true" ||
    document.body.dataset.consentOpen === "true" ||
    document.body.dataset.stickyOverlayOpen === "true" ||
    document.querySelector('[role="dialog"][aria-modal="true"]') !== null
  );
}

function hasFocusedFormControl() {
  const activeElement = document.activeElement;
  return (
    activeElement instanceof HTMLInputElement ||
    activeElement instanceof HTMLTextAreaElement ||
    activeElement instanceof HTMLSelectElement ||
    (activeElement instanceof HTMLElement && activeElement.isContentEditable)
  );
}

function StickyResource({
  children,
  priority = "P1",
  label = "Sticky resource",
  className,
  position = "sticky",
}: StickyResourceProps) {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const syncPausedState = () => setPaused(hasOpenDialog() || hasFocusedFormControl());
    const observer = new MutationObserver(syncPausedState);

    syncPausedState();
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-consent-open", "data-dialog-open", "data-sticky-overlay-open"],
      childList: true,
      subtree: true,
    });
    document.addEventListener("focusin", syncPausedState);
    const syncAfterFocusChange = () => queueMicrotask(syncPausedState);
    document.addEventListener("focusout", syncAfterFocusChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("focusin", syncPausedState);
      document.removeEventListener("focusout", syncAfterFocusChange);
    };
  }, []);

  return (
    <aside
      aria-hidden={paused || undefined}
      aria-label={label}
      className={cn(
        "min-h-[5.8125rem] border-t border-[var(--color-border)] bg-[var(--color-background)] p-4 transition-opacity duration-[var(--motion-fast)] data-[paused=true]:pointer-events-none data-[paused=true]:opacity-0 sm:min-h-[4.8125rem]",
        position === "fixed"
          ? "fixed inset-x-0 bottom-0"
          : "sticky top-[calc(100dvh-5.8125rem)] sm:top-[calc(100dvh-4.8125rem)]",
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
