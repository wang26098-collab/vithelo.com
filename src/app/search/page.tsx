import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/core/button";
import { UtilityPage } from "@/components/patterns/utility-page";
import { localContentAdapter } from "@/lib/content";

export const metadata: Metadata = {
  title: "Search | VITHELO",
  description: "Demonstration search entry with grouped task destinations.",
};

export default async function SearchPage() {
  const [products, ingredients, technologies, capabilities] = await Promise.all([
    localContentAdapter.listProducts(),
    localContentAdapter.listIngredients(),
    localContentAdapter.listTechnologies(),
    localContentAdapter.listCapabilities(),
  ]);

  return (
    <UtilityPage
      description="Search is not configured. Use the grouped destinations to continue a task."
      title="Search"
    >
      <form className="max-w-3xl" role="search">
        <label className="block font-medium" htmlFor="site-search">
          Search the demonstration site
        </label>
        <div className="mt-3 flex gap-3">
          <div className="relative min-w-0 flex-1">
            <MagnifyingGlass
              aria-hidden="true"
              className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-[var(--color-muted)]"
            />
            <input
              className="min-h-12 w-full rounded-[var(--radius-4)] border border-[var(--color-border)] bg-[var(--color-background)] pr-4 pl-12 text-[var(--color-foreground)] placeholder:text-[var(--color-muted)] disabled:opacity-65"
              disabled
              id="site-search"
              placeholder="Search provider not configured"
              type="search"
            />
          </div>
          <Button aria-label="Search site" disabled size="large" type="submit">
            Search
          </Button>
        </div>
      </form>

      <div className="mt-14 grid gap-x-12 lg:grid-cols-[1.25fr_0.75fr]">
        <section className="border-t border-[var(--color-border)] py-7">
          <h2 className="text-2xl">Product</h2>
          <div className="mt-4 grid gap-2">
            {products.map((product) => (
              <Link
                className="inline-flex min-h-11 items-center justify-between gap-4 py-2 font-medium underline-offset-4 hover:underline"
                href={`/${product.kind === "nutrition" ? "nutrition" : "aesthetic-technology"}/${product.slug}`}
                key={product.id}
              >
                {product.name} <ArrowRight aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>

        <section className="border-t border-[var(--color-border)] py-7">
          <h2 className="text-2xl">Ingredient and Technology</h2>
          <p className="mt-4 text-[var(--color-muted)]">
            {ingredients.length + technologies.length} DEMO_ONLY records. Approved detail pages are NOT_CONFIGURED.
          </p>
          <Link className="mt-5 inline-flex min-h-11 items-center gap-2 font-medium underline-offset-4 hover:underline" href="/science">
            Open Science <ArrowRight aria-hidden="true" />
          </Link>
        </section>

        <section className="border-t border-[var(--color-border)] py-7">
          <h2 className="text-2xl">Professional</h2>
          <p className="mt-4 text-[var(--color-muted)]">
            {capabilities.length} DEMO_ONLY capability records. Business proof remains NOT_CONFIGURED.
          </p>
          <Link className="mt-5 inline-flex min-h-11 items-center gap-2 font-medium underline-offset-4 hover:underline" href="/professional">
            Open Professional <ArrowRight aria-hidden="true" />
          </Link>
        </section>

        <section className="border-t border-[var(--color-border)] py-7">
          <h2 className="text-2xl">Support</h2>
          <p className="mt-4 text-[var(--color-muted)]">Find order, nutrition, device, returns, warranty, and professional help paths.</p>
          <Link className="mt-5 inline-flex min-h-11 items-center gap-2 font-medium underline-offset-4 hover:underline" href="/support">
            Open Support <ArrowRight aria-hidden="true" />
          </Link>
        </section>

        <section className="border-t border-[var(--color-border)] py-7 lg:col-span-2">
          <h2 className="text-2xl">Journal</h2>
          <p className="mt-4 text-[var(--color-muted)]">Journal search intent is preserved. Content and destination are NOT_CONFIGURED.</p>
        </section>
      </div>
    </UtilityPage>
  );
}
