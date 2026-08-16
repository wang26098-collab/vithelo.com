import type { Capability } from "@/content/schema";

type CapabilityCardProps = {
  capability: Capability;
};

function CapabilityCard({ capability }: CapabilityCardProps) {
  return (
    <article className="border-t border-[var(--color-border)] py-7">
      <div className="grid gap-4 sm:grid-cols-[minmax(10rem,0.52fr)_minmax(0,1.48fr)]">
        <div>
          <h3 className="text-xl">{capability.name}</h3>
          <p className="mt-2 text-sm font-medium text-[var(--color-optical-strong)]">
            {capability.dataStatus}
          </p>
        </div>
        <p className="max-w-xl text-[var(--color-muted)]">{capability.descriptor}</p>
      </div>
    </article>
  );
}

export { CapabilityCard, type CapabilityCardProps };
