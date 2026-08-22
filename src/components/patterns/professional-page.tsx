import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { CapabilityCard } from "@/components/domain/capability-card";
import { ProjectIntake } from "@/components/domain/project-intake";
import { businessIntents } from "@/content/business-intents";
import { demoProfessional } from "@/content/demo/professional";
import {
  CapabilitySchema,
  MarketConfigurationSchema,
  type Capability,
  type MarketConfiguration,
} from "@/content/schema";

const defaultCapabilities = demoProfessional.capabilities.map((item) => CapabilitySchema.parse(item));
const defaultMarketConfiguration = MarketConfigurationSchema.parse(demoProfessional.marketConfiguration);

type ProfessionalPageProps = {
  capabilities?: Capability[];
  marketConfiguration?: MarketConfiguration;
};

function ProfessionalPage({
  capabilities = defaultCapabilities,
  marketConfiguration = defaultMarketConfiguration,
}: ProfessionalPageProps) {
  return (
    <main>
      <section className="container-standard grid min-h-[calc(100dvh-7.5rem)] gap-10 py-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-center lg:py-16">
        <div className="max-w-2xl">
          <h1 className="text-[length:var(--font-size-h1-mobile)] leading-[0.98] tracking-[var(--letter-spacing-display)] sm:text-[length:var(--font-size-h1)] lg:text-7xl">
            Define the project before defining the promise.
          </h1>
          <p className="mt-7 max-w-xl text-lg text-[var(--color-muted)]">
            One professional path for product intent, capability fit, market context, and required proof.
          </p>
          <Link className="mt-9 inline-flex min-h-12 items-center gap-2 border border-[var(--color-graphite)] bg-[var(--color-graphite)] px-6 font-medium text-[var(--color-ivory)] no-underline" href="/contact">
            Start a Project <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className="relative min-h-[28rem] overflow-hidden border-l border-[var(--color-border)] lg:min-h-[40rem]">
          <Image
            alt="Abstract demonstration material field connecting nutrition and aesthetic technology"
            className="object-cover object-[53%_center]"
            fill
            priority
            sizes="(min-width: 1024px) 54vw, 100vw"
            src="/media/home-membrane.png"
          />
        </div>
      </section>

      <section className="section-space border-y border-[var(--color-border)]">
        <div className="container-standard">
          <h2 className="max-w-3xl text-[length:var(--font-size-h2-mobile)] leading-tight sm:text-[length:var(--font-size-h2)]">
            Four business intents. Four different starting questions.
          </h2>
          <div className="mt-12 grid gap-x-10 md:grid-cols-[1.2fr_0.8fr]">
            {businessIntents.map((intent) => (
              <article className="border-t border-[var(--color-border)] py-7" key={intent.id}>
                <h3 className="text-2xl">{intent.label}</h3>
                <p className="mt-3 max-w-xl text-[var(--color-muted)]">{intent.firstQuestion}</p>
                <Link className="mt-5 inline-flex min-h-11 items-center gap-2 font-medium underline-offset-4 hover:underline" href="#project-intake">
                  Choose this intent <ArrowRight aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space" id="capabilities">
        <div className="container-standard grid gap-12 lg:grid-cols-[minmax(14rem,0.42fr)_minmax(0,1.58fr)] lg:gap-24">
          <div>
            <h2 className="text-[length:var(--font-size-h2-mobile)] leading-tight sm:text-[length:var(--font-size-h2)]">
              Capabilities
            </h2>
            <p className="mt-5 text-[var(--color-muted)]">Only approved capability records belong here.</p>
          </div>
          <div>
            {capabilities.slice(0, 6).map((capability) => (
              <CapabilityCard capability={capability} key={capability.id} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-[var(--color-surface)]">
        <div className="container-standard">
          <h2 className="max-w-3xl text-[length:var(--font-size-h2-mobile)] leading-tight sm:text-[length:var(--font-size-h2)]">
            Product worlds for business remain distinct inside one system.
          </h2>
          <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1.34fr)_minmax(18rem,0.66fr)] lg:gap-24">
            <article>
              <h3 className="font-[family-name:var(--font-editorial)] text-5xl leading-none sm:text-6xl">Nutrition</h3>
              <p className="mt-6 max-w-2xl text-[var(--color-muted)]">
                Formula, ingredient, evidence, safety, market, and commerce inputs must be supplied and verified.
              </p>
            </article>
            <article className="border-l border-[var(--color-border)] pl-6 sm:pl-10">
              <h3 className="text-3xl leading-tight sm:text-4xl">Aesthetic Technology</h3>
              <p className="mt-6 text-[var(--color-muted)]">
                Technology, engineering, use, safety, support, and market inputs must be supplied and verified.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-standard">
          <h2 className="text-[length:var(--font-size-h2-mobile)] leading-tight sm:text-[length:var(--font-size-h2)]">
            Discover. Develop. Deliver.
          </h2>
          <div className="mt-14 grid gap-10 lg:grid-cols-[1.3fr_0.75fr_0.95fr]">
            <article className="border-t border-[var(--color-border)] py-7">
              <h3 className="text-3xl">Discover</h3>
              <p className="mt-4 text-[var(--color-muted)]">Clarify intent, audience, product world, market, evidence needs, and configuration gaps.</p>
            </article>
            <article className="border-t border-[var(--color-border)] py-7">
              <h3 className="text-2xl">Develop</h3>
              <p className="mt-4 text-[var(--color-muted)]">Define the approved scope, responsibilities, inputs, review path, and decision gates.</p>
            </article>
            <article className="border-t border-[var(--color-border)] py-7">
              <h3 className="text-2xl">Deliver</h3>
              <p className="mt-4 text-[var(--color-muted)]">Release only what has a verified source, owner, market context, and support path.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-space border-y border-[var(--color-border)]">
        <div className="container-standard grid gap-10 lg:grid-cols-[minmax(14rem,0.45fr)_minmax(0,1.55fr)] lg:gap-24">
          <h2 className="text-[length:var(--font-size-h2-mobile)] leading-tight sm:text-[length:var(--font-size-h2)]">
            Quality and manufacturing proof
          </h2>
          <div className="border-t border-[var(--color-border)] pt-7">
            <p className="text-2xl">Proof not configured</p>
            <p className="mt-5 max-w-2xl text-[var(--color-muted)]">
              Facilities, systems, standards, certifications, testing, traceability, capacity, timelines, and market eligibility require approved evidence.
            </p>
            <dl className="mt-8 grid gap-x-10 sm:grid-cols-2">
              <div className="border-t border-[var(--color-border)] py-5">
                <dt className="text-sm text-[var(--color-muted)]">Market configuration</dt>
                <dd className="mt-2 font-medium">{marketConfiguration.message}</dd>
              </div>
              <div className="border-t border-[var(--color-border)] py-5">
                <dt className="text-sm text-[var(--color-muted)]">Data status</dt>
                <dd className="mt-2 font-medium">{marketConfiguration.dataStatus}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="container-standard section-space" id="project-intake">
        <ProjectIntake />
      </section>
    </main>
  );
}

export { ProfessionalPage, type ProfessionalPageProps };
