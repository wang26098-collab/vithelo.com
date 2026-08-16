import type { Metadata } from "next";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { StatePanel } from "@/components/core/state-panel";
import { UtilityPage } from "@/components/patterns/utility-page";

export const metadata: Metadata = {
  title: "Support | A PRIME",
  description: "Demonstration support task map with provider configuration unavailable.",
};

const supportTasks = [
  "Track Order",
  "Nutrition Help",
  "Device Support",
  "Returns",
  "Warranty",
  "Professional Support",
] as const;

export default function SupportPage() {
  return (
    <UtilityPage
      description="Choose the task first. Policies, records, and support providers remain unconfigured."
      title="Support"
    >
      <section aria-labelledby="support-tasks-heading">
        <h2 className="sr-only" id="support-tasks-heading">
          Support tasks
        </h2>
        <div className="grid gap-x-10 md:grid-cols-[1.16fr_0.84fr]">
          {supportTasks.map((task) => (
            <a
              className="group inline-flex min-h-14 items-center justify-between gap-4 border-t border-[var(--color-border)] py-5 text-lg font-medium underline-offset-4 hover:underline"
              href="#support-state"
              key={task}
            >
              {task}
              <ArrowRight aria-hidden="true" className="shrink-0" />
            </a>
          ))}
        </div>
      </section>

      <div className="mt-14" id="support-state">
        <StatePanel
          actionHref="/"
          actionLabel="Return to home"
          description="Order lookup, nutrition guidance, device service, returns, warranty, and professional support all require verified policies and provider connections."
          state="missing-configuration"
          title="Support provider not configured"
        />
      </div>
    </UtilityPage>
  );
}
