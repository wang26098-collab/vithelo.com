"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";
import { VisualSwitcher, type VisualSwitcherItem } from "@/components/motion/visual-switcher";
import type { Technology } from "@/content/schema";

type TechnologyStoryProps = {
  technologies: Technology[];
};

function supportsMotionPreference() {
  return typeof window !== "undefined" && typeof window.matchMedia === "function";
}

function TechnologyStory({ technologies }: TechnologyStoryProps) {
  const interactiveReady = useSyncExternalStore(
    () => () => undefined,
    supportsMotionPreference,
    () => false,
  );
  const technology = technologies[0];
  const items: VisualSwitcherItem[] = [
    {
      id: "technology-record",
      label: "Technology record",
      content: (
        <p className="mt-2">
          {technology?.descriptor ?? "Approved technology information required"} Status: {technology?.dataStatus ?? "NOT_CONFIGURED"}.
        </p>
      ),
      visual: (
        <div className="relative min-h-80 overflow-hidden">
          <Image
            alt=""
            className="object-cover object-[58%_center]"
            fill
            sizes="50vw"
            src="/media/aesthetic-device-demo.png"
          />
        </div>
      ),
    },
    {
      id: "mechanism-boundary",
      label: "Mechanism boundary",
      content: (
        <p className="mt-2">
          Mechanism, settings, outputs, efficacy, and regulatory status are not configured.
        </p>
      ),
      visual: (
        <div className="relative min-h-80 overflow-hidden">
          <Image
            alt=""
            className="object-cover object-[72%_center]"
            fill
            sizes="50vw"
            src="/media/aesthetic-device-demo.png"
          />
        </div>
      ),
    },
  ];

  if (!interactiveReady) {
    return (
      <div className="grid gap-6 md:grid-cols-[1.25fr_0.75fr]">
        {items.map((item) => (
          <article className="border-t border-[var(--color-border)] pt-6" key={item.id}>
            <h3 className="text-xl">{item.label}</h3>
            <div className="text-[var(--color-muted)]">{item.content}</div>
          </article>
        ))}
      </div>
    );
  }

  return <VisualSwitcher intent="EXPLAIN" items={items} label="Technology information" />;
}

export { TechnologyStory, type TechnologyStoryProps };
