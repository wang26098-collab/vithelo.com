"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";
import { VisualSwitcher, type VisualSwitcherItem } from "@/components/motion/visual-switcher";
import type { Formula, Ingredient } from "@/content/schema";

type FormulaSnapshotProps = {
  formula?: Formula;
  ingredients: Ingredient[];
};

function supportsMotionPreference() {
  return typeof window !== "undefined" && typeof window.matchMedia === "function";
}

function FormulaSnapshot({ formula, ingredients }: FormulaSnapshotProps) {
  const interactiveReady = useSyncExternalStore(
    () => () => undefined,
    supportsMotionPreference,
    () => false,
  );
  const ingredient = ingredients[0];
  const items: VisualSwitcherItem[] = [
    {
      id: "formula-record",
      label: "Formula record",
      content: (
        <p className="mt-2">
          {formula?.descriptor ?? "Approved formula information required"} Status: {formula?.dataStatus ?? "NOT_CONFIGURED"}.
        </p>
      ),
      visual: (
        <div className="relative min-h-80 overflow-hidden">
          <Image
            alt=""
            className="object-cover object-[42%_center]"
            fill
            sizes="50vw"
            src="/media/nutrition-ritual.png"
          />
        </div>
      ),
    },
    {
      id: "ingredient-record",
      label: "Ingredient record",
      content: (
        <p className="mt-2">
          {ingredient?.descriptor ?? "Approved ingredient information required"} Status: {ingredient?.dataStatus ?? "NOT_CONFIGURED"}.
        </p>
      ),
      visual: (
        <div className="relative min-h-80 overflow-hidden">
          <Image
            alt=""
            className="object-cover object-[64%_center]"
            fill
            sizes="50vw"
            src="/media/nutrition-ritual.png"
          />
        </div>
      ),
    },
  ];

  if (!interactiveReady) {
    return (
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((item) => (
          <article className="border-t border-[var(--color-border)] pt-6" key={item.id}>
            <h3 className="text-xl">{item.label}</h3>
            <div className="text-[var(--color-muted)]">{item.content}</div>
          </article>
        ))}
      </div>
    );
  }

  return <VisualSwitcher intent="EXPLAIN" items={items} label="Formula information" />;
}

export { FormulaSnapshot, type FormulaSnapshotProps };
