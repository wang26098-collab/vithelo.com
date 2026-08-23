import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

const categoryLinks = [
  { href: "/nutrition#sleep-health", label: "Sleep Health" },
  { href: "/nutrition#womens-health", label: "Women’s Health" },
] as const;

function LearnPage() {
  return (
    <main>
      <section className="container-standard min-h-[calc(100dvh-7.5rem)] py-16 sm:py-24">
        <p className="text-sm font-medium tracking-[var(--letter-spacing-label)] text-[var(--color-muted)] uppercase">
          DEMO_ONLY
        </p>
        <h1 className="mt-5 max-w-3xl text-[length:var(--font-size-h1-mobile)] leading-[1.02] tracking-[-0.03em] sm:text-[length:var(--font-size-h1)]">
          Health Knowledge
        </h1>
        <p className="mt-7 max-w-2xl text-lg text-[var(--color-muted)]">
          Educational content is demonstration content only. Health guidance, sources, and
          verified product information are not configured.
        </p>

        <section aria-labelledby="knowledge-paths" className="mt-16">
          <h2 className="text-[length:var(--font-size-h3-mobile)] sm:text-[length:var(--font-size-h3)]" id="knowledge-paths">
            Explore product categories
          </h2>
          <div className="mt-6 grid border-t border-[var(--color-border)] md:grid-cols-2">
            {categoryLinks.map((category) => (
              <Link
                className="inline-flex min-h-11 items-center justify-between gap-4 border-b border-[var(--color-border)] py-5 text-lg font-medium underline-offset-4 hover:underline md:first:border-r md:first:pr-8 md:last:pl-8"
                href={category.href}
                key={category.href}
              >
                {category.label}
                <ArrowRight aria-hidden="true" className="shrink-0" />
              </Link>
            ))}
          </div>
        </section>

        <section aria-labelledby="knowledge-recovery" className="mt-16 border-t border-[var(--color-border)] pt-7">
          <h2 className="text-[length:var(--font-size-h3-mobile)] sm:text-[length:var(--font-size-h3)]" id="knowledge-recovery">
            Continue with verified boundaries
          </h2>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            <Link className="inline-flex min-h-11 items-center gap-2 font-medium underline-offset-4 hover:underline" href="/science">
              Science <ArrowRight aria-hidden="true" />
            </Link>
            <Link className="inline-flex min-h-11 items-center gap-2 font-medium underline-offset-4 hover:underline" href="/support">
              Support <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}

export { LearnPage };
