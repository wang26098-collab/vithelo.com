import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { InquiryActionPair } from "@/components/core/inquiry-action-pair";
import { NutritionHomeHero } from "@/components/patterns/nutrition-home-hero";
import { NutritionHumanRhythms } from "@/components/patterns/nutrition-human-rhythms";
import { NutritionManifesto } from "@/components/patterns/nutrition-manifesto";
import { NutritionProductDiscovery } from "@/components/patterns/nutrition-product-discovery";
import { NutritionScienceStage } from "@/components/patterns/nutrition-science-stage";
import type { Evidence, HomeContent, NutritionProduct, Product } from "@/content/schema";

type HomePagePatternProps = {
  content: HomeContent;
  evidence: Evidence[];
  nutritionProducts: NutritionProduct[];
  products: Product[];
};

function HomePagePattern({ content, evidence, nutritionProducts }: HomePagePatternProps) {
  const evidenceRecord = evidence[0];

  return (
    <main>
      <NutritionHomeHero hero={content.hero} />
      <NutritionManifesto categoryPaths={content.categoryPaths} />
      <NutritionProductDiscovery products={nutritionProducts} />
      <NutritionScienceStage stage={content.scienceStages[0]} />
      <NutritionScienceStage stage={content.scienceStages[1]} />
      <NutritionHumanRhythms categoryPaths={content.categoryPaths} content={content.humanRhythms} />

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

      <section aria-labelledby="health-knowledge-title" className="section-space border-y border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="container-standard grid gap-[var(--space-32)] lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
          <div>
            <h2 className="text-[length:var(--font-size-h2-mobile)] leading-tight sm:text-[length:var(--font-size-h2)]" id="health-knowledge-title">Health Knowledge</h2>
            <p className="mt-[var(--space-20)] max-w-lg text-[var(--color-muted)]">Demonstration category routes remain available while approved educational content is configured.</p>
          </div>
          <div className="grid border-t border-[var(--color-border)]">
            {content.categoryPaths.map((path) => <Link className="flex min-h-11 items-center justify-between border-b border-[var(--color-border)] py-[var(--space-16)] text-lg font-medium underline-offset-4 hover:underline" href={path.href} key={path.id}>{path.title}<span aria-hidden="true">↗</span></Link>)}
            <Link className="flex min-h-11 items-center justify-between border-b border-[var(--color-border)] py-[var(--space-16)] text-lg font-medium underline-offset-4 hover:underline" href="/science">Science <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="professional-partnership-title" className="section-space">
        <div className="container-standard grid gap-[var(--space-32)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
          <div>
            <p className="text-[var(--font-size-label)] tracking-[var(--letter-spacing-label)] text-[var(--color-muted)] uppercase">B2B</p>
            <h2 className="mt-[var(--space-20)] text-[length:var(--font-size-h2-mobile)] leading-tight sm:text-[length:var(--font-size-h2)]" id="professional-partnership-title">{content.professionalInquiry.title}</h2>
          </div>
          <div>
            <p className="text-[var(--color-muted)]">{content.professionalInquiry.summary}</p>
            <Link className="mt-[var(--space-20)] inline-flex min-h-11 items-center gap-2 font-medium underline-offset-4 hover:underline" href={content.professionalInquiry.href}>Explore Professional Partnership <ArrowUpRight aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="final-inquiry-title" className="section-space border-t border-[var(--color-border)]">
        <div className="container-standard grid items-end gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.7fr)]">
          <div>
            <h2 className="max-w-4xl text-[length:var(--font-size-h2-mobile)] leading-tight sm:text-[length:var(--font-size-h2)] lg:text-6xl" id="final-inquiry-title">Tell us what you are building.</h2>
            <p className="mt-6 max-w-2xl text-lg text-[var(--color-muted)]">Nutrition partnership inquiry channels require approved destinations.</p>
          </div>
          <InquiryActionPair className="lg:justify-self-end" context={{ cooperationType: "Nutrition partnership", productWorld: "Nutrition", market: "Not provided", summary: "Please provide nutrition partnership context." }} />
        </div>
      </section>

      <nav aria-label="Support links" className="border-t border-[var(--color-border)] py-[var(--space-32)]">
        <div className="container-standard flex flex-wrap gap-x-[var(--space-24)] gap-y-[var(--space-12)] text-sm">
          <Link className="min-h-11 underline-offset-4 hover:underline" href="/support">Support</Link>
          <Link className="min-h-11 underline-offset-4 hover:underline" href="/science">Science</Link>
          <Link className="min-h-11 underline-offset-4 hover:underline" href="/professional">Professional Partnership</Link>
        </div>
      </nav>
    </main>
  );
}

export { HomePagePattern, type HomePagePatternProps };
