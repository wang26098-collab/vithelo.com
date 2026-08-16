import type { ReactNode } from "react";
import { Button } from "@/components/core/button";
import { cn } from "@/lib/cn";

type StatePanelState =
  | "loading"
  | "empty"
  | "error"
  | "loaded"
  | "success"
  | "disabled"
  | "missing-configuration";

type StatePanelProps = {
  state: StatePanelState;
  title: string;
  description?: ReactNode;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
};

function StatePanel({
  state,
  title,
  description,
  actionHref,
  actionLabel,
  className,
}: StatePanelProps) {
  const role = state === "error" ? "alert" : "status";

  return (
    <section
      aria-live={state === "error" ? "assertive" : "polite"}
      className={cn(
        "flex min-h-48 flex-col items-start justify-center gap-4 border-y border-[var(--color-border)] py-8",
        className,
      )}
      data-state={state}
      role={role}
    >
      <p className="m-0 text-xs tracking-[var(--letter-spacing-label)] text-[var(--color-muted)] uppercase">
        {state.replaceAll("-", " ")}
      </p>
      <h2 className="m-0 text-[var(--font-size-title-sm)] leading-[var(--line-height-tight)]">
        {title}
      </h2>
      {description ? <div className="max-w-prose text-[var(--color-muted)]">{description}</div> : null}
      {actionHref && actionLabel ? (
        <Button asChild variant="secondary">
          <a href={actionHref}>{actionLabel}</a>
        </Button>
      ) : null}
    </section>
  );
}

export { StatePanel, type StatePanelProps, type StatePanelState };
