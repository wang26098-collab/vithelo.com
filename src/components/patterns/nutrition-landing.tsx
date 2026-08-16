import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/core/button";
import { ProductCard } from "@/components/domain/product-card";
import { demoProducts } from "@/content/demo/products";
import { FormulaSchema, ProductSchema, type Formula, type Product } from "@/content/schema";

const defaultNutritionProducts = demoProducts.items
  .map((item) => ProductSchema.parse(item))
  .filter((product) => product.kind === "nutrition");

const defaultFormulas = demoProducts.formulas.map((formula) => FormulaSchema.parse(formula));

type NutritionLandingProps = {
  formulas?: Formula[];
  products?: Product[];
};

const nutritionNeeds = [
  ["Routine", "A product path that starts with the rhythm of use."],
  ["Form", "A clear place for format and usage information when approved."],
  ["Formula", "A relationship between product, formula, and ingredient records."],
  ["Confidence", "Visible boundaries for evidence, safety, and configuration."],
] as const;

function NutritionLanding({
  formulas = defaultFormulas,
  products = defaultNutritionProducts,
}: NutritionLandingProps) {
  const formula = formulas[0];

  return (
    <main>
      <section className="container-standard grid min-h-[calc(100dvh-7.5rem)] gap-10 py-10 md:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] md:items-center lg:py-16">
        <div className="max-w-xl md:pr-6">
          <h1 className="font-[family-name:var(--font-editorial)] text-[length:var(--font-size-h1-mobile)] leading-[1.02] tracking-[-0.03em] sm:text-[length:var(--font-size-h1)] lg:text-7xl">
            Nutrition for the daily practice.
          </h1>
          <p className="mt-7 max-w-lg text-lg text-[var(--color-muted)]">
            Formulation precision begins with clear records, responsible boundaries, and a
            routine people can understand.
          </p>
          <Button asChild className="mt-9" size="large">
            <Link href="#nutrition-products">Explore demo nutrition</Link>
          </Button>
        </div>

        <div className="relative min-h-[28rem] overflow-hidden border-l border-[var(--color-border)] md:min-h-[36rem]">
          <Image
            alt="Demonstration nutrition ritual with soft glass and neutral material surfaces"
            className="object-cover"
            fill
            priority
            sizes="(min-width: 768px) 55vw, 100vw"
            src="/media/nutrition-ritual.png"
          />
        </div>
      </section>

      <section className="section-space border-y border-[var(--color-border)]">
        <div className="container-standard">
          <h2 className="max-w-2xl text-[length:var(--font-size-h2-mobile)] leading-tight sm:text-[length:var(--font-size-h2)]">
            Explore from a real decision point.
          </h2>
          <div className="mt-14 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1.1fr_0.8fr]">
            {nutritionNeeds.map(([title, copy]) => (
              <article className="border-t border-[var(--color-border)] py-6" key={title}>
                <h3 className="text-xl">{title}</h3>
                <p className="mt-3 text-sm text-[var(--color-muted)]">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space" id="nutrition-products">
        <div className="container-standard grid gap-12 lg:grid-cols-[minmax(15rem,0.48fr)_minmax(0,1.52fr)] lg:gap-20">
          <div>
            <h2 className="text-[length:var(--font-size-h2-mobile)] leading-tight sm:text-[length:var(--font-size-h2)]">
              Featured Nutrition
            </h2>
            <p className="mt-5 text-[var(--color-muted)]">
              Demonstration structure only. Product media, price, and approved facts are not
              configured.
            </p>
          </div>
          <div>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-[var(--color-surface)]">
        <div className="container-standard grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(17rem,0.8fr)] lg:gap-24">
          <div>
            <h2 className="font-[family-name:var(--font-editorial)] text-[length:var(--font-size-h2-mobile)] leading-tight sm:text-[length:var(--font-size-h2)] lg:text-6xl">
              A formula preview that preserves what is known.
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-[var(--color-muted)]">
              The relationship model keeps product, formula, ingredient, evidence, and safety
              information separate until each record is approved.
            </p>
          </div>
          <dl className="border-t border-[var(--color-border)]">
            <div className="py-6">
              <dt className="text-sm text-[var(--color-muted)]">Record status</dt>
              <dd className="mt-2 font-medium">{formula?.dataStatus ?? "NOT_CONFIGURED"}</dd>
            </div>
            <div className="border-t border-[var(--color-border)] py-6">
              <dt className="text-sm text-[var(--color-muted)]">Formula</dt>
              <dd className="mt-2 font-medium">{formula?.name ?? "Not configured"}</dd>
            </div>
            <div className="border-t border-[var(--color-border)] py-6">
              <dt className="text-sm text-[var(--color-muted)]">Information boundary</dt>
              <dd className="mt-2 text-[var(--color-muted)]">
                {formula?.descriptor ?? "Approved formula information required"}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="container-standard section-space">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)] md:items-end">
          <div className="relative min-h-[24rem] overflow-hidden md:min-h-[36rem]">
            <Image
              alt="Neutral demonstration scene for a human nutrition routine"
              className="object-cover object-[42%_center]"
              fill
              sizes="(min-width: 768px) 65vw, 100vw"
              src="/media/nutrition-ritual.png"
            />
          </div>
          <div className="border-t border-[var(--color-border)] pt-7 md:mb-12">
            <h2 className="text-[length:var(--font-size-h3-mobile)] leading-tight sm:text-[length:var(--font-size-h3)]">
              Designed around the person, not a promise.
            </h2>
            <p className="mt-5 text-[var(--color-muted)]">
              Human routine content stays descriptive until approved use and safety information
              is available.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--color-border)] py-20 sm:py-28">
        <div className="container-standard grid gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(16rem,0.75fr)] lg:items-end">
          <div>
            <h2 className="max-w-3xl text-[length:var(--font-size-h2-mobile)] leading-tight sm:text-[length:var(--font-size-h2)]">
              Quality begins with visible limits.
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-[var(--color-muted)]">
              Sources, claims, product specifications, and safety details remain NOT_CONFIGURED
              until verified inputs exist.
            </p>
          </div>
          <Link
            className="inline-flex min-h-11 items-center gap-2 font-medium underline-offset-4 hover:underline lg:justify-self-end"
            href="/science"
          >
            Continue to Science <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}

export { NutritionLanding, type NutritionLandingProps };
