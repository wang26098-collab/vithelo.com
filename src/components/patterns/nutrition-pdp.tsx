import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/core/button";
import { StickyResource } from "@/components/core/sticky-resource";
import { FormulaSnapshot } from "@/components/domain/formula-snapshot";
import { ProductCommerce } from "@/components/domain/product-commerce";
import { SafetyPanel } from "@/components/domain/safety-panel";
import {
  type Evidence,
  type Formula,
  type Ingredient,
  type Product,
} from "@/content/schema";

type NutritionProduct = Extract<Product, { kind: "nutrition" }>;

type NutritionPdpProps = {
  evidence: Evidence[];
  formulas: Formula[];
  ingredients: Ingredient[];
  product: NutritionProduct;
};

function NutritionPdp({ evidence, formulas, ingredients, product }: NutritionPdpProps) {
  const formula = formulas.find((item) => product.formulaIds.includes(item.id));
  const relatedIngredients = ingredients.filter((item) => product.ingredientIds.includes(item.id));
  const evidenceRecord = evidence.find((item) => item.relationshipIds.includes(product.id));

  return (
    <main>
      <section className="container-standard grid gap-10 py-10 md:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.95fr)] md:items-center lg:py-16">
        <figure className="m-0">
          <div className="relative min-h-[28rem] overflow-hidden md:min-h-[38rem]">
            <Image
              alt="Demonstration nutrition scene; approved product media is not configured"
              className="object-cover object-[44%_center]"
              fill
              loading="eager"
              sizes="(min-width: 768px) 54vw, 100vw"
              src="/media/nutrition-ritual.png"
            />
          </div>
          <figcaption className="border-t border-[var(--color-border)] py-4 text-sm text-[var(--color-muted)]">
            Demonstration image. Approved product media remains NOT_CONFIGURED.
          </figcaption>
        </figure>
        <div>
          <ProductCommerce product={product} />
          <Button asChild className="mt-4" variant="secondary">
            <Link href={`/contact?world=nutrition&subject=${encodeURIComponent(product.name)}`}>
              Start a Project
            </Link>
          </Button>
        </div>
      </section>

      <div className="relative">
        <StickyResource className="lg:hidden" label="Nutrition commerce availability" priority="P1">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm">Purchase is not configured</span>
            <Button asChild size="small" variant="secondary">
              <a href="#commerce">Review availability</a>
            </Button>
          </div>
        </StickyResource>

        <section className="section-space border-t border-[var(--color-border)]">
          <div className="container-standard grid gap-10 lg:grid-cols-[minmax(14rem,0.45fr)_minmax(0,1.55fr)] lg:gap-24">
            <h2 className="text-[length:var(--font-size-h2-mobile)] leading-tight sm:text-[length:var(--font-size-h2)]">
              At a glance
            </h2>
            <dl className="grid gap-x-10 sm:grid-cols-2">
              <div className="border-t border-[var(--color-border)] py-6">
                <dt className="text-sm text-[var(--color-muted)]">Product type</dt>
                <dd className="mt-2 font-medium">Demonstration nutrition product</dd>
              </div>
              <div className="border-t border-[var(--color-border)] py-6">
                <dt className="text-sm text-[var(--color-muted)]">Approved key facts</dt>
                <dd className="mt-2 font-medium">Not configured</dd>
              </div>
              <div className="border-t border-[var(--color-border)] py-6">
                <dt className="text-sm text-[var(--color-muted)]">Variant</dt>
                <dd className="mt-2 font-medium">Not configured</dd>
              </div>
              <div className="border-t border-[var(--color-border)] py-6">
                <dt className="text-sm text-[var(--color-muted)]">Market availability</dt>
                <dd className="mt-2 font-medium">Not configured</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="section-space bg-[var(--color-surface)]">
          <div className="container-standard">
            <h2 className="max-w-3xl font-[family-name:var(--font-editorial)] text-[length:var(--font-size-h2-mobile)] leading-tight sm:text-[length:var(--font-size-h2)] lg:text-6xl">
              Formula context stays connected to its source records.
            </h2>
            <div className="mt-14">
              <FormulaSnapshot formula={formula} ingredients={relatedIngredients} />
            </div>
          </div>
        </section>

        <section className="container-standard section-space">
          <div className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] md:items-end">
            <div className="relative min-h-[24rem] overflow-hidden md:min-h-[34rem]">
              <Image
                alt="Neutral demonstration setting for product form and human use context"
                className="object-cover object-[62%_center]"
                fill
                sizes="(min-width: 768px) 62vw, 100vw"
                src="/media/nutrition-ritual.png"
              />
            </div>
            <div className="border-t border-[var(--color-border)] pt-7 md:mb-10">
              <h2 className="text-[length:var(--font-size-h3-mobile)] leading-tight sm:text-[length:var(--font-size-h3)]">
                Form and human use
              </h2>
              <dl className="mt-7">
                <div className="border-t border-[var(--color-border)] py-5">
                  <dt className="text-sm text-[var(--color-muted)]">Product form</dt>
                  <dd className="mt-2 font-medium">Not configured</dd>
                </div>
                <div className="border-t border-[var(--color-border)] py-5">
                  <dt className="text-sm text-[var(--color-muted)]">Human use context</dt>
                  <dd className="mt-2 font-medium">Not configured</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section className="section-space border-t border-[var(--color-border)]">
          <div className="container-reading">
            <h2 className="text-[length:var(--font-size-h2-mobile)] leading-tight sm:text-[length:var(--font-size-h2)]">
              How to use
            </h2>
            <p className="mt-6 text-lg text-[var(--color-muted)]">
              Usage amount, timing, frequency, storage, and suitability are not configured.
              Approved instructions are required before use guidance can appear here.
            </p>
          </div>
        </section>

        <section className="section-space bg-[var(--color-surface)]">
          <div className="container-standard grid gap-10 lg:grid-cols-[minmax(14rem,0.48fr)_minmax(0,1.52fr)] lg:gap-24">
            <h2 className="text-[length:var(--font-size-h2-mobile)] leading-tight sm:text-[length:var(--font-size-h2)]">
              Evidence
            </h2>
            <div className="border-t border-[var(--color-border)] pt-7">
              <p className="text-sm font-medium text-[var(--color-optical-strong)]">
                {evidenceRecord?.dataStatus ?? "NOT_CONFIGURED"}
              </p>
              <p className="mt-4 text-2xl">{evidenceRecord?.title ?? "Evidence not configured"}</p>
              <p className="mt-4 max-w-2xl text-[var(--color-muted)]">
                {evidenceRecord?.supportedStatementBoundary ??
                  "No supported statement is configured for this product."}
              </p>
              <p className="mt-4 max-w-2xl text-sm text-[var(--color-muted)]">
                {evidenceRecord?.limitation ?? "Evidence limitations are not configured."}
              </p>
            </div>
          </div>
        </section>
      </div>

      <SafetyPanel heading="Quality and safety" product={product} />

      <section className="section-space">
        <div className="container-standard grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(16rem,0.75fr)] lg:items-end">
          <div>
            <h2 className="max-w-3xl text-[length:var(--font-size-h2-mobile)] leading-tight sm:text-[length:var(--font-size-h2)]">
              Continue with a verified information path.
            </h2>
            <p className="mt-5 max-w-2xl text-[var(--color-muted)]">
              Review the science model or return to the nutrition collection without treating
              placeholders as product facts.
            </p>
          </div>
          <div className="flex flex-wrap gap-6 lg:justify-self-end">
            <Link className="inline-flex min-h-11 items-center gap-2 font-medium underline-offset-4 hover:underline" href="/science">
              Review Science <ArrowRight aria-hidden="true" />
            </Link>
            <Link className="inline-flex min-h-11 items-center gap-2 font-medium underline-offset-4 hover:underline" href="/nutrition">
              All Nutrition <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export { NutritionPdp, type NutritionPdpProps };
