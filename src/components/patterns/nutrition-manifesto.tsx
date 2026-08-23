import Link from "next/link";
import type { HomeContent } from "@/content/schema";

type NutritionManifestoProps = { categoryPaths: HomeContent["categoryPaths"] };

function NutritionManifesto({ categoryPaths }: NutritionManifestoProps) {
  return (
    <section aria-labelledby="nutrition-manifesto-title" className="section-space bg-[var(--color-ivory)]" data-motion-intent="RELATE" id="nutrition-manifesto">
      <div className="container-standard">
        <p className="text-[var(--font-size-label)] tracking-[var(--letter-spacing-label)] text-[var(--color-muted)] uppercase">Daily rhythm</p>
        <h2 className="mt-[var(--space-20)] max-w-4xl text-[length:var(--font-size-h2-mobile)] leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-display)] sm:text-[length:var(--font-size-h2)]" id="nutrition-manifesto-title">Nutrition for the rhythms that shape a life.</h2>
        <div className="mt-[var(--space-48)] grid border-t border-[var(--color-border)] lg:grid-cols-2">
          {categoryPaths.map((path, index) => (
            <Link aria-label={path.title} className={`group grid min-h-44 content-between gap-[var(--space-32)] py-[var(--space-24)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-focus)] ${index === 1 ? "border-t border-[var(--color-border)] lg:border-t-0 lg:border-l lg:pl-[var(--space-32)]" : "lg:pr-[var(--space-32)]"}`} href={path.href} key={path.id}>
              <h3 className="text-[length:var(--font-size-h3-mobile)] leading-[var(--line-height-tight)] sm:text-[length:var(--font-size-h3)]">{path.title}</h3>
              <div className="flex items-end justify-between gap-[var(--space-20)]"><p className="max-w-md text-[var(--color-muted)]">{path.summary}</p><span aria-hidden="true" className="text-xl transition-transform group-hover:translate-x-1">↗</span></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export { NutritionManifesto, type NutritionManifestoProps };
