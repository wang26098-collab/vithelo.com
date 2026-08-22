"use client";

import { useState } from "react";
import { ArrowLeft } from "@phosphor-icons/react";
import { Button } from "@/components/core/button";
import { InquiryActionPair } from "@/components/core/inquiry-action-pair";
import { businessIntents, type BusinessIntentId } from "@/content/business-intents";

function ProjectIntake() {
  const [selectedIntent, setSelectedIntent] = useState<BusinessIntentId | null>(null);
  const [productWorld, setProductWorld] = useState("Nutrition");
  const [market, setMarket] = useState("");
  const [summary, setSummary] = useState("");
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

  const context = {
    cooperationType: selected.label,
    productWorld,
    market: market || "Not provided",
    summary: summary || "No project summary provided.",
  };

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
          <label className="block font-medium" htmlFor="project-product-world">
            Product world
          </label>
          <select
            className="mt-3 min-h-12 w-full rounded-[var(--radius-4)] border border-[var(--color-border)] bg-[var(--color-background)] px-4 text-[var(--color-foreground)]"
            id="project-product-world"
            name="productWorld"
            onChange={(event) => setProductWorld(event.target.value)}
            value={productWorld}
          >
            <option>Nutrition</option>
            <option>Aesthetic Technology</option>
            <option>Both product worlds</option>
          </select>
        </div>

        <div className="mt-7">
          <label className="block font-medium" htmlFor="project-market">
            Country or market
          </label>
          <input
            className="mt-3 min-h-12 w-full rounded-[var(--radius-4)] border border-[var(--color-border)] bg-[var(--color-background)] px-4 text-[var(--color-foreground)] placeholder:text-[var(--color-muted)]"
            id="project-market"
            name="market"
            onChange={(event) => setMarket(event.target.value)}
            placeholder="Enter country or market"
            type="text"
            value={market}
          />
        </div>

        <div className="mt-7">
          <label className="block font-medium" htmlFor="project-summary">
            Project summary
          </label>
          <p className="mt-2 text-sm text-[var(--color-muted)]">{selected.firstQuestion}</p>
          <textarea
            className="mt-3 min-h-36 w-full rounded-[var(--radius-4)] border border-[var(--color-border)] bg-[var(--color-background)] p-4 text-[var(--color-foreground)] placeholder:text-[var(--color-muted)]"
            id="project-summary"
            name="summary"
            onChange={(event) => setSummary(event.target.value)}
            placeholder="Describe the project context"
            value={summary}
          />
        </div>

        <InquiryActionPair className="mt-8" context={context} />
        <p className="mt-3 text-sm text-[var(--color-muted)]">
          DEMO_ONLY. No information is transmitted by this page.
        </p>
      </form>
    </div>
  );
}

export { ProjectIntake };
