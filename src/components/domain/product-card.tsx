import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { Product } from "@/content/schema";
import { cn } from "@/lib/cn";

type ProductCardProps = {
  className?: string;
  product: Product;
};

function ProductCard({ className, product }: ProductCardProps) {
  const worldLabel = product.kind === "nutrition" ? "Nutrition" : "Aesthetic technology";

  return (
    <article
      className={cn(
        "group border-t border-[var(--color-border)] py-8 sm:py-10",
        className,
      )}
    >
      <div className="grid gap-8 md:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] md:items-end">
        <div className="space-y-3">
          <p className="text-sm text-[var(--color-muted)]">{worldLabel}</p>
          <p className="text-xs font-medium tracking-[var(--letter-spacing-label)] text-[var(--color-optical-strong)] uppercase">
            {product.dataStatus}
          </p>
        </div>
        <div>
          <h3 className="max-w-xl text-[length:var(--font-size-h3-mobile)] leading-[var(--line-height-tight)] tracking-[-0.02em] sm:text-[length:var(--font-size-h3)]">
            {product.name}
          </h3>
          <p className="mt-4 max-w-xl text-[var(--color-muted)]">{product.descriptor}</p>
          <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link
              className="inline-flex min-h-11 items-center gap-2 font-medium text-[var(--color-foreground)] underline-offset-4 hover:underline"
              href={`/${product.kind === "nutrition" ? "nutrition" : "aesthetic-technology"}/${product.slug}`}
            >
              View demo product
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
            <span className="text-sm text-[var(--color-muted)]">
              {product.commerce.status}: {product.commerce.message}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export { ProductCard, type ProductCardProps };
