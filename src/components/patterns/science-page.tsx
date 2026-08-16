import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/core/button";
import { EvidenceCard } from "@/components/domain/evidence-card";
import { demoEvidence } from "@/content/demo/evidence";
import { EvidenceSchema, type Evidence } from "@/content/schema";

const defaultEvidence = demoEvidence.items.map((item) => EvidenceSchema.parse(item));

type SciencePageProps = {
  evidence?: Evidence[];
};

function SciencePage({ evidence = defaultEvidence }: SciencePageProps) {
  return (
    <main>
      <section className="container-standard grid min-h-[calc(100dvh-7.5rem)] gap-10 py-10 md:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)] md:items-center lg:py-16">
        <div className="max-w-2xl">
          <h1 className="text-[length:var(--font-size-h1-mobile)] leading-[0.98] tracking-[var(--letter-spacing-display)] sm:text-[length:var(--font-size-h1)] lg:text-7xl">
            Follow the evidence. Keep its limits visible.
          </h1>
          <p className="mt-7 max-w-xl text-lg text-[var(--color-muted)]">
            A reading system for source context, relationships, and responsible statement boundaries.
          </p>
          <form className="mt-9 max-w-xl" role="search">
            <label className="block font-medium" htmlFor="science-search">
              Search the science library
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
                  id="science-search"
                  placeholder="Search not configured"
                  type="search"
                />
              </div>
              <Button aria-label="Search science" disabled size="large" type="submit">
                Search
              </Button>
            </div>
          </form>
        </div>
        <div className="relative min-h-[26rem] overflow-hidden border-l border-[var(--color-border)] md:min-h-[36rem]">
          <Image
            alt="Abstract ivory and titanium material field for the demonstration science library"
            className="object-cover object-[60%_center]"
            fill
            priority
            sizes="(min-width: 768px) 46vw, 100vw"
            src="/media/home-membrane.png"
          />
        </div>
      </section>

      <section className="section-space border-y border-[var(--color-border)]">
        <div className="container-reading">
          <h2 className="text-[length:var(--font-size-h2-mobile)] leading-tight sm:text-[length:var(--font-size-h2)]">
            Approach
          </h2>
          <p className="mt-6 text-xl leading-relaxed text-[var(--color-muted)]">
            Explain the question, identify the source, show the relationship, state the boundary,
            and preserve the limitation. A placeholder never becomes proof through presentation.
          </p>
          <dl className="mt-12">
            <div className="grid gap-3 border-t border-[var(--color-border)] py-6 sm:grid-cols-[9rem_1fr]">
              <dt className="font-medium">Orient</dt>
              <dd className="m-0 text-[var(--color-muted)]">Start with the question a reader is trying to resolve.</dd>
            </div>
            <div className="grid gap-3 border-t border-[var(--color-border)] py-6 sm:grid-cols-[9rem_1fr]">
              <dt className="font-medium">Inspect</dt>
              <dd className="m-0 text-[var(--color-muted)]">Keep source context and record relationships together.</dd>
            </div>
            <div className="grid gap-3 border-t border-[var(--color-border)] py-6 sm:grid-cols-[9rem_1fr]">
              <dt className="font-medium">Qualify</dt>
              <dd className="m-0 text-[var(--color-muted)]">Make statement boundaries and constraints equally discoverable.</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section-space bg-[var(--color-surface)]">
        <div className="container-standard grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.7fr)] lg:gap-24">
          <div>
            <h2 className="font-[family-name:var(--font-editorial)] text-[length:var(--font-size-h2-mobile)] leading-tight sm:text-[length:var(--font-size-h2)] lg:text-6xl">
              Nutrition science begins with formulation relationships.
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-[var(--color-muted)]">
              Product, formula, ingredient, evidence, and safety records remain separate until approved inputs connect them.
            </p>
          </div>
          <div className="border-t border-[var(--color-border)] pt-7">
            <p className="text-2xl">DEMO_ONLY</p>
            <p className="mt-4 text-[var(--color-muted)]">
              Approved nutrition sources, statements, and product relationships are not configured.
            </p>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-standard grid gap-12 lg:grid-cols-[minmax(15rem,0.5fr)_minmax(0,1.5fr)] lg:gap-24">
          <h2 className="text-[length:var(--font-size-h2-mobile)] leading-tight sm:text-[length:var(--font-size-h2)]">
            Aesthetic science requires engineering and human interface context.
          </h2>
          <div className="grid gap-x-10 sm:grid-cols-[0.8fr_1.2fr]">
            <div className="border-t border-[var(--color-border)] py-7">
              <h3 className="text-xl">Technology</h3>
              <p className="mt-3 text-[var(--color-muted)]">Mechanism and parameter sources are NOT_CONFIGURED.</p>
            </div>
            <div className="border-t border-[var(--color-border)] py-7">
              <h3 className="text-xl">Human interface</h3>
              <p className="mt-3 text-[var(--color-muted)]">Use, safety, and professional context require approved records.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space border-y border-[var(--color-border)]">
        <div className="container-standard">
          <h2 className="text-[length:var(--font-size-h2-mobile)] leading-tight sm:text-[length:var(--font-size-h2)]">
            Libraries
          </h2>
          <div className="mt-12 grid gap-x-12 md:grid-cols-2">
            <article className="border-t border-[var(--color-border)] py-7">
              <h3 className="text-2xl">Formula and ingredient records</h3>
              <p className="mt-4 max-w-xl text-[var(--color-muted)]">
                Structured locations for approved descriptions and product relationships. Current source status: NOT_CONFIGURED.
              </p>
            </article>
            <article className="border-t border-[var(--color-border)] py-7">
              <h3 className="text-2xl">Technology and evidence records</h3>
              <p className="mt-4 max-w-xl text-[var(--color-muted)]">
                Structured locations for engineering context and evidence boundaries. Current source status: NOT_CONFIGURED.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-standard">
          <h2 className="text-[length:var(--font-size-h2-mobile)] leading-tight sm:text-[length:var(--font-size-h2)]">
            Evidence
          </h2>
          <p className="mt-5 max-w-2xl text-[var(--color-muted)]">
            Open a record to inspect its full boundary. Disclosure does not change a placeholder into a claim.
          </p>
          <div className="mt-10">
            {evidence.map((record) => (
              <EvidenceCard evidence={record} key={record.id} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-[var(--color-surface)]">
        <div className="container-standard grid gap-10 lg:grid-cols-[minmax(14rem,0.45fr)_minmax(0,1.55fr)] lg:gap-24">
          <h2 className="text-[length:var(--font-size-h2-mobile)] leading-tight sm:text-[length:var(--font-size-h2)]">
            Quality and safety
          </h2>
          <div className="border-t border-[var(--color-border)] pt-7">
            <p className="text-2xl">Proof not configured</p>
            <p className="mt-5 max-w-2xl text-[var(--color-muted)]">
              Quality systems, testing sources, certifications, manufacturing proof, and safety documentation require verified input.
            </p>
            <Link className="mt-7 inline-flex min-h-11 items-center gap-2 font-medium underline-offset-4 hover:underline" href="/support">
              Continue to Support <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export { SciencePage, type SciencePageProps };
