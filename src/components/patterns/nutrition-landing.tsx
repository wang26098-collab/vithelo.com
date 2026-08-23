import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/core/button";
import { ProductCard } from "@/components/domain/product-card";
import { demoProducts } from "@/content/demo/products";
import {
  FormulaSchema,
  ProductSchema,
  type Formula,
  type NutritionHealthCategory,
  type NutritionProduct,
  type Product,
} from "@/content/schema";

const defaultNutritionProducts = demoProducts.items
  .map((item) => ProductSchema.parse(item))
  .filter((product): product is NutritionProduct => product.kind === "nutrition");

const defaultFormulas = demoProducts.formulas.map((formula) => FormulaSchema.parse(formula));

type NutritionLandingProps = {
  formulas?: Formula[];
  products?: Product[];
};

const categories: Array<{
  id: NutritionHealthCategory;
  title: string;
  summary: string;
}> = [
  {
    id: "sleep-health",
    title: "Sleep Health",
    summary: "Demonstration products are grouped by a validated category record.",
  },
  {
    id: "womens-health",
    title: "Women’s Health",
    summary: "Demonstration products are grouped by a validated category record.",
  },
  {
    id: "daily-essential",
    title: "Daily Essential",
    summary: "Demonstration products are grouped by a validated category record.",
  },
];

function CategoryProductDetails({ product }: { product: NutritionProduct }) {
  const media = product.media[0];

  return (
    <dl className="grid gap-3 border-t border-[var(--color-border)] py-5 text-sm sm:grid-cols-3">
      <div>
        <dt className="text-[var(--color-muted)]">Form</dt>
        <dd className="mt-1 font-medium capitalize">{product.form}</dd>
      </div>
      <div>
        <dt className="text-[var(--color-muted)]">Media</dt>
        <dd className="mt-1 font-medium">{media.status}</dd>
      </div>
      <div>
        <dt className="text-[var(--color-muted)]">Safety</dt>
        <dd className="mt-1 font-medium">{product.safety.status}</dd>
      </div>
      <div className="sm:col-span-3">
        <dt className="text-[var(--color-muted)]">Information boundary</dt>
        <dd className="mt-1 text-[var(--color-muted)]">
          {product.safety.message} Evidence records require approved source input.
        </dd>
      </div>
    </dl>
  );
}

function NutritionLanding({
  formulas = defaultFormulas,
  products = defaultNutritionProducts,
}: NutritionLandingProps) {
  const nutritionProducts = products.filter(
    (product): product is NutritionProduct => product.kind === "nutrition",
  );
  const formula = formulas[0];

  return (
    <main>
      <section className="container-standard grid min-h-[calc(100dvh-7.5rem)] gap-10 py-10 md:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] md:items-center lg:py-16">
        <div className="max-w-xl md:pr-6">
          <p className="text-sm font-medium tracking-[var(--letter-spacing-label)] text-[var(--color-muted)] uppercase">
            DEMO_ONLY nutrition discovery
          </p>
          <h1 className="mt-5 text-[length:var(--font-size-h1-mobile)] leading-[1.02] tracking-[-0.03em] sm:text-[length:var(--font-size-h1)] lg:text-7xl">
            Nutrition for the daily practice.
          </h1>
          <p className="mt-7 max-w-lg text-lg text-[var(--color-muted)]">
            Discovery begins with validated category, form, media, safety, and evidence-boundary
            records. Product details remain demonstrative until approved inputs exist.
          </p>
          <Button asChild className="mt-9" size="large">
            <Link href="#sleep-health">Explore Sleep Health</Link>
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

      <section className="section-space border-y border-[var(--color-border)]" id="nutrition-products">
        <div className="container-standard">
          <h2 className="max-w-2xl text-[length:var(--font-size-h2-mobile)] leading-tight sm:text-[length:var(--font-size-h2)]">
            Find a category, then inspect its limits.
          </h2>
          <p className="mt-5 max-w-2xl text-[var(--color-muted)]">
            Product, commerce, safety, and evidence information stay separate so a demonstration
            record is not mistaken for an approved health statement.
          </p>

          <div className="mt-14 space-y-16">
            {categories.map((category) => {
              const categoryProducts = nutritionProducts.filter(
                (product) => product.healthCategory === category.id,
              );

              return (
                <section aria-labelledby={`${category.id}-heading`} id={category.id} key={category.id}>
                  <div className="grid gap-4 border-t border-[var(--color-border)] pt-6 lg:grid-cols-[minmax(14rem,0.4fr)_minmax(0,1.6fr)]">
                    <div>
                      <h2
                        className="text-[length:var(--font-size-h3-mobile)] leading-tight sm:text-[length:var(--font-size-h3)]"
                        id={`${category.id}-heading`}
                      >
                        {category.title}
                      </h2>
                      <p className="mt-3 text-[var(--color-muted)]">{category.summary}</p>
                    </div>
                    <div>
                      {categoryProducts.map((product) => (
                        <div key={product.id}>
                          <ProductCard product={product} />
                          <CategoryProductDetails product={product} />
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-space bg-[var(--color-surface)]">
        <div className="container-standard grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(17rem,0.8fr)] lg:gap-24">
          <div>
            <h2 className="text-[length:var(--font-size-h2-mobile)] leading-tight sm:text-[length:var(--font-size-h2)]">
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
