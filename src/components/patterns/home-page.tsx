import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/core/button";
import { ProductCard } from "@/components/domain/product-card";
import { HomeMembraneVisual } from "@/components/patterns/home-membrane-visual";
import type { Evidence, Product } from "@/content/schema";

type HomePagePatternProps = {
  evidence: Evidence[];
  products: Product[];
};

const needPaths = [
  ["Daily continuity", "Explore a clear nutrition path without unsupported benefit language."],
  ["Material understanding", "Move from a product record to its formula or technology context."],
  ["Human interface", "Keep use, safety, and support close to every decision."],
  ["Professional fit", "Enter a project path built for capability and scope discovery."],
] as const;

function HomePagePattern({ evidence, products }: HomePagePatternProps) {
  const evidenceRecord = evidence[0];

  return (
    <main>
      <section className="container-standard grid min-h-[calc(100dvh-7.5rem)] gap-12 py-12 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-center lg:py-16">
        <div className="relative z-10 max-w-2xl">
          <p className="mb-7 text-sm font-semibold tracking-[0.18em] text-[var(--color-muted)]">
            A PRIME
          </p>
          <h1 className="text-[length:var(--font-size-h1-mobile)] leading-[0.98] tracking-[var(--letter-spacing-display)] sm:text-[length:var(--font-size-h1)] lg:text-[length:var(--font-size-display)]">
            Human.
            <br />
            Material.
            <br />
            Precision.
          </h1>
          <p className="mt-8 max-w-lg text-lg text-[var(--color-muted)]">
            One brand connects nutrition and aesthetic technology through clear materials,
            responsible information, and human scale.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="large">
              <Link href="#product-worlds">Explore the two worlds</Link>
            </Button>
            <Button asChild size="large" variant="secondary">
              <Link href="/science">Read the science approach</Link>
            </Button>
          </div>
        </div>

        <HomeMembraneVisual className="min-h-[26rem] border-l border-[var(--color-border)] lg:min-h-[38rem]">
          <Image
            alt="Abstract ivory and titanium membrane material created for this demonstration"
            className="object-cover"
            fill
            priority
            sizes="(min-width: 1024px) 54vw, 100vw"
            src="/media/home-membrane.png"
          />
          <div className="absolute inset-x-0 bottom-0 grid grid-cols-2 border-t border-white/35 bg-[color:color-mix(in_srgb,var(--color-graphite)_82%,transparent)] text-[var(--color-ivory)] backdrop-blur-sm">
            <span className="p-4 text-sm">
              Inner systems
              <span className="sr-only">. Demonstration content.</span>
            </span>
            <span className="border-l border-white/25 p-4 text-right text-sm">External interface</span>
          </div>
        </HomeMembraneVisual>
      </section>

      <section className="section-space border-t border-[var(--color-border)]" id="product-worlds">
        <div className="container-standard">
          <h2 className="max-w-3xl text-[length:var(--font-size-h2-mobile)] leading-[var(--line-height-tight)] tracking-[-0.025em] sm:text-[length:var(--font-size-h2)]">
            Two product worlds. One standard of clarity.
          </h2>
          <div className="mt-16 grid gap-16 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.65fr)] lg:gap-24">
            <article>
              <p className="font-[family-name:var(--font-editorial)] text-5xl leading-none sm:text-7xl">
                Nutrition
              </p>
              <p className="mt-6 max-w-xl text-lg text-[var(--color-muted)]">
                Product discovery grounded in routine, formulation context, and responsible
                boundaries.
              </p>
              <Link
                className="mt-8 inline-flex min-h-11 items-center gap-2 font-medium underline-offset-4 hover:underline"
                href="/nutrition"
              >
                Enter Nutrition <ArrowRight aria-hidden="true" />
              </Link>
            </article>
            <article className="border-l border-[var(--color-border)] pl-6 sm:pl-10">
              <p className="text-3xl leading-tight sm:text-5xl">Aesthetic Technology</p>
              <p className="mt-6 text-[var(--color-muted)]">
                Complete device context organized around engineering, interface, safety, and
                professional use.
              </p>
              <Link
                className="mt-8 inline-flex min-h-11 items-center gap-2 font-medium underline-offset-4 hover:underline"
                href="/aesthetic-technology"
              >
                Enter Aesthetic Technology <ArrowRight aria-hidden="true" />
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section-space bg-[var(--color-surface)]" id="by-need">
        <div className="container-standard">
          <h2 className="text-[length:var(--font-size-h2-mobile)] leading-tight sm:text-[length:var(--font-size-h2)]">
            Begin with what you need to understand.
          </h2>
          <div className="mt-14 grid gap-x-12 md:grid-cols-2">
            {needPaths.map(([title, copy]) => (
              <article className="border-t border-[var(--color-border)] py-8" key={title}>
                <h3 className="text-xl">{title}</h3>
                <p className="mt-3 max-w-lg text-[var(--color-muted)]">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-standard grid gap-12 lg:grid-cols-[minmax(16rem,0.62fr)_minmax(0,1.38fr)]">
          <h2 className="text-[length:var(--font-size-h2-mobile)] leading-tight sm:text-[length:var(--font-size-h2)]">
            The signature method
          </h2>
          <dl>
            <div className="grid gap-3 border-t border-[var(--color-border)] py-7 sm:grid-cols-[10rem_1fr]">
              <dt className="font-medium">Human</dt>
              <dd className="m-0 text-[var(--color-muted)]">Begin with the person, their task, and the information needed to act.</dd>
            </div>
            <div className="grid gap-3 border-t border-[var(--color-border)] py-7 sm:grid-cols-[10rem_1fr]">
              <dt className="font-medium">Material</dt>
              <dd className="m-0 text-[var(--color-muted)]">Connect every product record to its approved formula, technology, media, and source context.</dd>
            </div>
            <div className="grid gap-3 border-t border-[var(--color-border)] py-7 sm:grid-cols-[10rem_1fr]">
              <dt className="font-medium">Precision</dt>
              <dd className="m-0 text-[var(--color-muted)]">Make configuration gaps visible rather than turning placeholders into facts.</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section-space border-y border-[var(--color-border)]">
        <div className="container-standard">
          <h2 className="text-[length:var(--font-size-h2-mobile)] leading-tight sm:text-[length:var(--font-size-h2)]">
            Featured demo products
          </h2>
          <p className="mt-5 max-w-xl text-[var(--color-muted)]">
            Product records demonstrate information structure only. Media, price, claims, and
            policies are not configured.
          </p>
          <div className="mt-12">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="science-proof-heading" className="section-space">
          <div className="container-standard grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-24">
            <h2
              className="text-[length:var(--font-size-h2-mobile)] leading-tight sm:text-[length:var(--font-size-h2)]"
              id="science-proof-heading"
            >
              Science is a path through evidence, not a decorative archive.
            </h2>
            <div className="border-t border-[var(--color-border)] pt-7">
              <p className="text-xs font-medium tracking-[var(--letter-spacing-label)] text-[var(--color-optical-strong)] uppercase">
                {evidenceRecord?.dataStatus ?? "NOT_CONFIGURED"}
              </p>
              <p className="mt-4 text-xl">{evidenceRecord?.title ?? "Evidence not configured"}</p>
              <p className="mt-4 text-[var(--color-muted)]">
                {evidenceRecord?.supportedStatementBoundary ??
                  "No evidence statement is available."}
              </p>
              <Link
                className="mt-7 inline-flex min-h-11 items-center gap-2 font-medium underline-offset-4 hover:underline"
                href="/science"
              >
                Follow the evidence model <ArrowUpRight aria-hidden="true" />
              </Link>
            </div>
          </div>
      </section>

      <section className="border-t border-[var(--color-border)] py-20 sm:py-28">
        <div className="container-standard grid items-end gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(16rem,0.65fr)]">
          <div>
            <h2 className="max-w-4xl text-[length:var(--font-size-h2-mobile)] leading-tight sm:text-[length:var(--font-size-h2)] lg:text-6xl">
              Translate product intent into a responsible professional project.
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-[var(--color-muted)]">
              Capability, market, timeline, and evidence needs stay explicit from the first
              conversation.
            </p>
          </div>
          <Button asChild className="w-full sm:w-auto lg:justify-self-end" size="large">
            <Link href="/professional">Explore Professional</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}

export { HomePagePattern, type HomePagePatternProps };
