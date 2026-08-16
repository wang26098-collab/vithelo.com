import type { Product } from "@/content/schema";

type SafetyPanelProps = {
  heading?: string;
  product: Product;
};

function SafetyPanel({ heading = "Safety", product }: SafetyPanelProps) {
  return (
    <section className="section-space border-y border-[var(--color-border)]" id="safety">
      <div className="container-standard grid gap-10 lg:grid-cols-[minmax(15rem,0.55fr)_minmax(0,1.45fr)] lg:gap-24">
        <div>
          <h2 className="text-[length:var(--font-size-h2-mobile)] leading-tight sm:text-[length:var(--font-size-h2)]">
            {heading}
          </h2>
          <p className="mt-4 text-sm font-medium text-[var(--color-optical-strong)]">
            {product.safety.dataStatus}
          </p>
        </div>
        <div className="border-t border-[var(--color-border)] pt-7">
          <p className="text-2xl leading-tight">{product.safety.message}</p>
          <p className="mt-5 max-w-2xl text-[var(--color-muted)]">
            Quality and safety source materials, instructions, warnings, contraindications,
            cleaning, storage, and escalation guidance are not configured. This demonstration is
            not a source of safety direction.
          </p>
          <dl className="mt-9 grid gap-x-8 sm:grid-cols-2">
            <div className="border-t border-[var(--color-border)] py-5">
              <dt className="text-sm text-[var(--color-muted)]">Safety source</dt>
              <dd className="mt-2 font-medium">Not configured</dd>
            </div>
            <div className="border-t border-[var(--color-border)] py-5">
              <dt className="text-sm text-[var(--color-muted)]">Market policy</dt>
              <dd className="mt-2 font-medium">Not configured</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

export { SafetyPanel, type SafetyPanelProps };
