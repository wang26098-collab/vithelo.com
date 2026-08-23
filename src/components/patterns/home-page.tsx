import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/core/button";
import { InquiryActionPair } from "@/components/core/inquiry-action-pair";
import { ProductCard } from "@/components/domain/product-card";
import { NutritionHomeHero } from "@/components/patterns/nutrition-home-hero";
import { NutritionManifesto } from "@/components/patterns/nutrition-manifesto";
import { NutritionProductDiscovery } from "@/components/patterns/nutrition-product-discovery";
import type { Evidence, HomeContent, NutritionProduct, Product } from "@/content/schema";

type HomePagePatternProps = {
  content: HomeContent;
  evidence: Evidence[];
  nutritionProducts: NutritionProduct[];
  products: Product[];
};

function HomePagePattern({ content, evidence, nutritionProducts, products }: HomePagePatternProps) {
  const evidenceRecord = evidence[0];

  return (
    <main>
      <NutritionHomeHero hero={content.hero} />
      <NutritionManifesto categoryPaths={content.categoryPaths} />
      <NutritionProductDiscovery products={nutritionProducts} />

      <section aria-labelledby="capabilities-title" className="section-space bg-[var(--color-surface)]">
        <div className="container-standard grid gap-12 lg:grid-cols-[minmax(16rem,0.55fr)_minmax(0,1.45fr)] lg:gap-24">
          <div>
            <h2 className="text-[length:var(--font-size-h2-mobile)] leading-tight sm:text-[length:var(--font-size-h2)]" id="capabilities-title">Capabilities for product and professional partners.</h2>
            <Button asChild className="mt-8" variant="secondary"><Link href="/professional#capabilities">Explore Capabilities</Link></Button>
          </div>
          <div>
            {content.capabilities.map((capability) => (
              <article className="grid gap-3 border-t border-[var(--color-border)] py-7 sm:grid-cols-[minmax(12rem,0.72fr)_minmax(0,1.28fr)]" key={capability.id}>
                <h3 className="text-xl">{capability.title}</h3>
                <div>
                  <p className="text-[var(--color-muted)]">{capability.summary}</p>
                  <Link className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-medium underline-offset-4 hover:underline" href={`/contact?subject=${encodeURIComponent(capability.inquiryContext)}`}>Start a Project <ArrowUpRight aria-hidden="true" /></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="science-material-human-title" className="section-space">
        <div className="container-standard grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-24">
          <div>
            <h2 className="text-[length:var(--font-size-h2-mobile)] leading-tight sm:text-[length:var(--font-size-h2)]" id="science-material-human-title">Precision starts with responsible information.</h2>
            <p className="mt-6 max-w-2xl text-lg text-[var(--color-muted)]">Material, human use, supported statements, and limitations remain connected.</p>
          </div>
          <div className="border-t border-[var(--color-border)] pt-7">
            <p className="text-sm text-[var(--color-muted)]">{evidenceRecord?.dataStatus ?? "NOT_CONFIGURED"}</p>
            <p className="mt-4 text-2xl">{evidenceRecord?.title ?? "Evidence not configured"}</p>
            <p className="mt-4 text-[var(--color-muted)]">{evidenceRecord?.supportedStatementBoundary ?? "No evidence statement is available."}</p>
            <dl className="mt-6 grid gap-4 border-t border-[var(--color-border)] pt-5 text-sm">
              <div><dt className="font-medium">Source</dt><dd className="mt-1 text-[var(--color-muted)]">{evidenceRecord?.source.message ?? "Source not configured"}</dd></div>
              <div><dt className="font-medium">Scope</dt><dd className="mt-1 text-[var(--color-muted)]">{evidenceRecord?.scope ?? "Scope not configured"}</dd></div>
              <div><dt className="font-medium">Limitation</dt><dd className="mt-1 text-[var(--color-muted)]">{evidenceRecord?.limitation ?? "Limitation not configured"}</dd></div>
            </dl>
            <Link className="mt-7 inline-flex min-h-11 items-center gap-2 font-medium underline-offset-4 hover:underline" href="/science">Explore Science <ArrowUpRight aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="consumer-support-title" className="section-space border-y border-[var(--color-border)]">
        <div className="container-standard">
          <h2 className="text-[length:var(--font-size-h2-mobile)] leading-tight sm:text-[length:var(--font-size-h2)]" id="consumer-support-title">Product understanding remains available.</h2>
          <p className="mt-5 max-w-2xl text-[var(--color-muted)]">Consumers and professional end users can inspect product context, use, safety, and evidence boundaries.</p>
          <div className="mt-12">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>
        </div>
      </section>

      <section aria-labelledby="final-inquiry-title" className="section-space">
        <div className="container-standard grid items-end gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.7fr)]">
          <div>
            <h2 className="max-w-4xl text-[length:var(--font-size-h2-mobile)] leading-tight sm:text-[length:var(--font-size-h2)] lg:text-6xl" id="final-inquiry-title">Tell us what you are building.</h2>
            <p className="mt-6 max-w-2xl text-lg text-[var(--color-muted)]">Select the business context, then continue through the channel that fits the project.</p>
          </div>
          <InquiryActionPair className="lg:justify-self-end" />
        </div>
      </section>
    </main>
  );
}

export { HomePagePattern, type HomePagePatternProps };
