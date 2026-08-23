import { NutritionProductFocusRail } from "@/components/domain/nutrition-product-focus-rail";
import type { NutritionProduct } from "@/content/schema";

type NutritionProductDiscoveryProps = { products: readonly NutritionProduct[] };

function NutritionProductDiscovery({ products }: NutritionProductDiscoveryProps) {
  return (
    <section aria-labelledby="nutrition-products-title" className="section-space overflow-hidden bg-[var(--color-ivory-deep)]" data-motion-intent="FOCUS" id="nutrition-products">
      <div className="container-standard">
        <div className="max-w-2xl">
          <p className="text-[var(--font-size-label)] tracking-[var(--letter-spacing-label)] text-[var(--color-muted)] uppercase">Product discovery</p>
          <h2 className="mt-[var(--space-20)] text-[length:var(--font-size-h2-mobile)] leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-display)] sm:text-[length:var(--font-size-h2)]" id="nutrition-products-title">Find your daily formula.</h2>
          <p className="mt-[var(--space-20)] text-[var(--color-muted)]">Demonstration products are organised by daily context and form. Approved product details remain required.</p>
        </div>
        <div className="mt-[var(--space-40)]"><NutritionProductFocusRail products={products} /></div>
      </div>
    </section>
  );
}

export { NutritionProductDiscovery, type NutritionProductDiscoveryProps };
