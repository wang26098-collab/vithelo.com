"use client";

import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { Button } from "@/components/core/button";
import type { Evidence } from "@/content/schema";

type EvidenceCardProps = {
  evidence: Evidence;
};

function EvidenceCard({ evidence }: EvidenceCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="border-t border-[var(--color-border)] py-8 sm:py-10">
      <div className="grid gap-8 md:grid-cols-[minmax(10rem,0.4fr)_minmax(0,1.6fr)]">
        <p className="text-sm font-medium text-[var(--color-optical-strong)]">
          {evidence.dataStatus}
        </p>
        <div>
          <h3 className="text-[length:var(--font-size-h3-mobile)] leading-tight sm:text-[length:var(--font-size-h3)]">
            {evidence.title}
          </h3>
          <p className="mt-4 max-w-2xl text-[var(--color-muted)]">{evidence.summary}</p>
          <Button
            aria-controls={`${evidence.id}-context`}
            aria-expanded={expanded}
            className="mt-6"
            onClick={() => setExpanded((current) => !current)}
            variant="secondary"
          >
            {expanded ? "Close source context" : "View source context"}
            <CaretDown
              aria-hidden="true"
              className={`transition-transform duration-[var(--motion-fast)] ${expanded ? "rotate-180" : ""}`}
            />
          </Button>

          {expanded ? (
            <div
              className="mt-7 grid gap-4 border-l border-[var(--color-border)] pl-5 text-sm text-[var(--color-muted)]"
              id={`${evidence.id}-context`}
            >
              <p>Type: {evidence.type}</p>
              <p>
                Source placeholder: {evidence.source.status}. {evidence.source.message}
              </p>
              <p>Scope: {evidence.scope}</p>
              <p>Supported statement boundary: {evidence.supportedStatementBoundary}</p>
              <p>Limitations: {evidence.limitation}</p>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export { EvidenceCard, type EvidenceCardProps };
