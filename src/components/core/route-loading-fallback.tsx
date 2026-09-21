"use client";

import { useEffect, useState } from "react";

const ROUTE_LOADING_TIMEOUT_MS = 10_000;

function RouteLoadingFallback() {
  const [stalled, setStalled] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(
      () => setStalled(true),
      ROUTE_LOADING_TIMEOUT_MS,
    );

    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <main
      aria-live="polite"
      className="flex min-h-20 items-center justify-center border-b border-[var(--color-border)] px-[var(--container-gutter)] py-5"
      data-route-loading
      role={stalled ? "alert" : "status"}
    >
      <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-[var(--color-muted)]">
        <span>{stalled ? "The page is taking longer than expected." : "Loading the next page…"}</span>
        {stalled ? (
          <button
            className="min-h-11 border border-[var(--color-foreground)] px-4 text-xs font-medium tracking-[var(--letter-spacing-label)] text-[var(--color-foreground)] uppercase"
            onClick={() => window.location.reload()}
            type="button"
          >
            Reload page
          </button>
        ) : null}
      </div>
    </main>
  );
}

export { RouteLoadingFallback };
