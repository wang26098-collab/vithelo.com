"use client";

import { useState } from "react";
import { ArrowLeft } from "@phosphor-icons/react";
import { Button } from "@/components/core/button";
import { businessIntents, type BusinessIntentId } from "@/content/business-intents";

function ProjectIntake() {
  const [selectedIntent, setSelectedIntent] = useState<BusinessIntentId | null>(null);
  const selected = businessIntents.find((intent) => intent.id === selectedIntent);

  if (!selected) {
    return (
      <div>
        <h2 className="max-w-3xl text-[length:var(--font-size-h2-mobile)] leading-tight sm:text-[length:var(--font-size-h2)]">
          Start with the business intent.
        </h2>
        <p className="mt-5 max-w-2xl text-[var(--color-muted)]">
          Each path asks a different first question. No request is sent in this demonstration.
        </p>
        <div className="mt-10 grid gap-x-8 md:grid-cols-[1.18fr_0.82fr]">
          {businessIntents.map((intent) => (
            <button
              className="min-h-14 border-t border-[var(--color-border)] py-5 text-left text-lg font-medium transition-colors duration-[var(--motion-fast)] hover:text-[var(--color-optical-strong)]"
              key={intent.id}
              onClick={() => setSelectedIntent(intent.id)}
              type="button"
            >
              {intent.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div aria-live="polite">
      <Button onClick={() => setSelectedIntent(null)} variant="text">
        <ArrowLeft aria-hidden="true" /> Change intent
      </Button>
      <h2 className="mt-8 text-[length:var(--font-size-h2-mobile)] leading-tight sm:text-[length:var(--font-size-h2)]">
        Project basics
      </h2>
      <p className="mt-4 text-lg text-[var(--color-muted)]">Selected intent: {selected.label}</p>

      <form className="mt-9 max-w-3xl" onSubmit={(event) => event.preventDefault()}>
        <div>
          <label className="block font-medium" htmlFor="project-context">
            {selected.firstQuestion}
          </label>
          <textarea
            className="mt-3 min-h-36 w-full rounded-[var(--radius-4)] border border-[var(--color-border)] bg-[var(--color-background)] p-4 text-[var(--color-foreground)] placeholder:text-[var(--color-muted)]"
            id="project-context"
            name="projectContext"
            placeholder="Enter demonstration project context"
          />
        </div>
        <div className="mt-7 grid gap-6 sm:grid-cols-2">
          <div>
            <label className="block font-medium" htmlFor="project-market">
              Intended market
            </label>
            <input
              className="mt-3 min-h-12 w-full rounded-[var(--radius-4)] border border-[var(--color-border)] bg-[var(--color-background)] px-4 text-[var(--color-foreground)] placeholder:text-[var(--color-muted)]"
              id="project-market"
              name="market"
              placeholder="Not configured"
              type="text"
            />
          </div>
          <div>
            <label className="block font-medium" htmlFor="project-timeline">
              Timeline context
            </label>
            <input
              className="mt-3 min-h-12 w-full rounded-[var(--radius-4)] border border-[var(--color-border)] bg-[var(--color-background)] px-4 text-[var(--color-foreground)] placeholder:text-[var(--color-muted)]"
              id="project-timeline"
              name="timeline"
              placeholder="Not configured"
              type="text"
            />
          </div>
        </div>
        <Button className="mt-8" disabled size="large" type="submit">
          Submit project
        </Button>
        <p className="mt-3 text-sm text-[var(--color-muted)]">
          DEMO_ONLY. Project submission is not configured and no information is sent.
        </p>
      </form>
    </div>
  );
}

export { ProjectIntake };
