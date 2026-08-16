import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { StatePanel } from "@/components/core/state-panel";
import { UtilityPage } from "@/components/patterns/utility-page";
import { localContentAdapter } from "@/lib/content";

export const metadata: Metadata = {
  title: "Cart | A PRIME",
  description: "Demonstration cart with explicit transaction configuration states.",
};

export default async function CartPage() {
  const products = await localContentAdapter.listProducts();
  const relatedProduct = products.find((product) => product.kind === "nutrition");

  return (
    <UtilityPage
      description="Transaction clarity: no items, totals, shipping, tax, or payment data are configured."
      mode="transaction"
      title="Cart"
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)] lg:gap-20">
        <StatePanel
          actionHref="/nutrition"
          actionLabel="Browse Nutrition"
          description="Cart actions remain unavailable until a commerce provider is configured."
          state="empty"
          title="Your cart is empty"
        />
        <dl className="border-t border-[var(--color-border)]">
          <div className="flex justify-between gap-4 py-5">
            <dt className="text-[var(--color-muted)]">Items</dt>
            <dd className="font-medium">0</dd>
          </div>
          <div className="flex justify-between gap-4 border-t border-[var(--color-border)] py-5">
            <dt className="text-[var(--color-muted)]">Subtotal</dt>
            <dd className="font-medium">Not configured</dd>
          </div>
          <div className="flex justify-between gap-4 border-t border-[var(--color-border)] py-5">
            <dt className="text-[var(--color-muted)]">Shipping and tax</dt>
            <dd className="font-medium">Not configured</dd>
          </div>
        </dl>
      </div>

      {relatedProduct ? (
        <section className="mt-16 border-t border-[var(--color-border)] pt-8">
          <h2 className="text-2xl">One related demo item</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-[minmax(12rem,0.45fr)_minmax(0,1.55fr)] md:items-center">
            <p className="font-medium">{relatedProduct.name}</p>
            <div className="md:justify-self-end">
              <Link className="inline-flex min-h-11 items-center gap-2 font-medium underline-offset-4 hover:underline" href={`/nutrition/${relatedProduct.slug}`}>
                Review product state <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      ) : null}
    </UtilityPage>
  );
}
