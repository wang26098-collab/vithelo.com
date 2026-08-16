import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type UtilityPageProps = {
  children: ReactNode;
  className?: string;
  description?: ReactNode;
  mode?: "task" | "transaction";
  title: string;
};

function UtilityPage({
  children,
  className,
  description,
  mode = "task",
  title,
}: UtilityPageProps) {
  return (
    <main className={cn("min-h-[70dvh]", className)} data-utility-mode={mode}>
      <header
        aria-label={mode === "transaction" ? "Transaction mode" : undefined}
        className="border-b border-[var(--color-border)] py-10 sm:py-14"
      >
        <div className="container-standard">
          <h1 className="text-[length:var(--font-size-h1-mobile)] leading-tight tracking-[var(--letter-spacing-display)] sm:text-[length:var(--font-size-h1)]">
            {title}
          </h1>
          {description ? (
            <div className="mt-5 max-w-2xl text-[var(--color-muted)]">{description}</div>
          ) : null}
        </div>
      </header>
      <div className="container-standard py-10 sm:py-14">{children}</div>
    </main>
  );
}

export { UtilityPage, type UtilityPageProps };
