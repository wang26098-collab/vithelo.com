import { Button } from "@/components/core/button";
import type { Product } from "@/content/schema";

type ProductCommerceProps = {
  product: Product;
};

function ProductCommerce({ product }: ProductCommerceProps) {
  const actionLabel = product.kind === "nutrition" ? "Add to cart" : "Start inquiry";

  return (
    <div className="max-w-xl" id="commerce">
      <p className="text-sm font-medium text-[var(--color-optical-strong)]">
        {product.dataStatus}
      </p>
      <h1 className="mt-5 text-[length:var(--font-size-h1-mobile)] leading-[0.98] tracking-[var(--letter-spacing-display)] sm:text-[length:var(--font-size-h1)] lg:text-6xl">
        {product.name}
      </h1>
      <p className="mt-6 text-lg text-[var(--color-muted)]">{product.descriptor}</p>

      <div className="mt-9 border-t border-[var(--color-border)] pt-7">
        <p className="text-sm text-[var(--color-muted)]">Commerce state</p>
        <p className="mt-2 text-2xl">{product.commerce.message}</p>
        <Button aria-describedby="commerce-unavailable" className="mt-7 w-full sm:w-auto" disabled size="large">
          {actionLabel}
        </Button>
        <p className="mt-3 max-w-md text-sm text-[var(--color-muted)]" id="commerce-unavailable">
          This action is disabled while commerce configuration is unavailable.
        </p>
      </div>

      <dl className="mt-9 grid gap-x-8 sm:grid-cols-3">
        {[
          ["Usage", "Not configured"],
          ["Warranty", "Not configured"],
          ["Policy", "Not configured"],
        ].map(([label, value]) => (
          <div className="border-t border-[var(--color-border)] py-5" key={label}>
            <dt className="text-sm text-[var(--color-muted)]">{label}</dt>
            <dd className="mt-2 font-medium">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export { ProductCommerce, type ProductCommerceProps };
