import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/core/button";
import { InquiryActionPair } from "@/components/core/inquiry-action-pair";
import { ProductCard } from "@/components/domain/product-card";
import { HomeMembraneVisual } from "@/components/patterns/home-membrane-visual";
import { siteConfig } from "@/content/site-config";
import type { Evidence, HomeContent, Product } from "@/content/schema";

type HomePagePatternProps = {
  content: HomeContent;
  evidence: Evidence[];
  products: Product[];
};

function HomePagePattern({ content, evidence, products }: HomePagePatternProps) {
  const evidenceRecord = evidence[0];
  const commonImageProps = { alt: content.hero.desktopMedia.alt, sizes: "100vw" };
  const {
    props: { srcSet: desktopHeroSrcSet },
  } = getImageProps({
    ...commonImageProps,
    fetchPriority: "high",
    height: 941,
    sizes: "(min-width: 1024px) 58vw, 100vw",
    src: "/media/vithelo-hero-composite.png",
    width: 1672,
  });
  const {
    props: { alt: mobileHeroAlt, srcSet: mobileHeroSrcSet, ...mobileHeroProps },
  } = getImageProps({
    ...commonImageProps,
    fetchPriority: "high",
    height: 1402,
    src: "/media/vithelo-hero-composite-mobile.png",
    width: 1122,
  });

  return (
    <main>
      <section
        aria-labelledby="home-hero-title"
        className="container-standard grid min-h-[calc(100dvh-7.5rem)] gap-10 py-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:items-center lg:py-12"
        data-inquiry-hero
      >
        <div className="relative z-10 max-w-2xl">
          <p className="mb-7 text-sm font-medium tracking-[0.22em] text-[var(--color-muted)]">
            {siteConfig.brand.name}
          </p>
          <span className="sr-only">Demonstration content. Not production product information.</span>
          <h1
            className="text-[length:var(--font-size-h1-mobile)] leading-[0.98] tracking-[var(--letter-spacing-display)] sm:text-[length:var(--font-size-h1)] lg:text-[length:var(--font-size-display)]"
            id="home-hero-title"
          >
            {content.hero.headline}
          </h1>
          <p className="mt-7 max-w-lg text-lg text-[var(--color-muted)]">
            {content.hero.supportingText}
          </p>
          <InquiryActionPair className="mt-9" />
        </div>

        <HomeMembraneVisual className="min-h-[27rem] border-l border-[var(--color-border)] lg:min-h-[40rem]">
          <picture className="absolute inset-0" data-testid="hero-art-direction">
            <source media="(min-width: 768px)" srcSet={desktopHeroSrcSet} />
            <source media="(max-width: 767px)" srcSet={mobileHeroSrcSet} />
            <img {...mobileHeroProps} alt={mobileHeroAlt} className="h-full w-full object-cover" />
          </picture>
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-6 border-t border-white/30 bg-[color:color-mix(in_srgb,var(--color-graphite)_84%,transparent)] p-4 text-sm text-[var(--color-ivory)] backdrop-blur-sm">
            <span>Nutrition and Aesthetic Technology</span>
            <span>{content.dataStatus}</span>
          </div>
        </HomeMembraneVisual>
      </section>

      <section aria-labelledby="partner-paths-title" className="section-space border-y border-[var(--color-border)]">
        <div className="container-standard">
          <h2
            className="max-w-3xl text-[length:var(--font-size-h2-mobile)] leading-tight sm:text-[length:var(--font-size-h2)]"
            id="partner-paths-title"
          >
            Choose the right starting point.
          </h2>
          <div className="mt-14 grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
            {content.partnerPaths.map((path, index) => (
              <article
                className={index === 1 ? "border-t border-[var(--color-border)] py-10 lg:border-l lg:border-t-0 lg:py-0 lg:pl-12" : "pb-10 lg:pb-0 lg:pr-16"}
                key={path.id}
              >
                <h3 className="text-3xl leading-tight sm:text-4xl">{path.title}</h3>
                <p className="mt-5 max-w-xl text-lg text-[var(--color-muted)]">{path.summary}</p>
                <p className="mt-5 text-sm text-[var(--color-muted)]">
                  Preferred channel: {path.preferredChannel === "email" ? "Email Inquiry" : "WhatsApp"}
                </p>
                <Link
                  className="mt-7 inline-flex min-h-11 items-center gap-2 font-medium underline-offset-4 hover:underline"
                  href={`/contact?path=${path.id}`}
                >
                  Start a Project <ArrowRight aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="product-worlds-title" className="section-space" id="product-worlds">
        <div className="container-standard">
          <h2
            className="max-w-4xl text-[length:var(--font-size-h2-mobile)] leading-tight sm:text-[length:var(--font-size-h2)]"
            id="product-worlds-title"
          >
            Two product worlds. One VITHELO standard.
          </h2>
          <div className="mt-14 grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:gap-12">
            <article className="grid overflow-hidden border border-[var(--color-border)] md:grid-cols-[0.9fr_1.1fr]">
              <div className="p-8 sm:p-10">
                <h3 className="text-4xl leading-none sm:text-5xl">Nutrition</h3>
                <p className="mt-6 text-[var(--color-muted)]">
                  Product discovery organized around formulation context, daily use, evidence, and safety.
                </p>
                <Link className="mt-8 inline-flex min-h-11 items-center gap-2 font-medium underline-offset-4 hover:underline" href="/nutrition">
                  Explore Nutrition <ArrowRight aria-hidden="true" />
                </Link>
              </div>
              <div className="relative min-h-80">
                <Image alt="Demo nutrition product in a restrained daily setting" className="object-cover" fill sizes="(min-width: 768px) 32vw, 100vw" src="/media/nutrition-ritual.png" />
              </div>
            </article>
            <article className="flex flex-col border border-[var(--color-border)]">
              <div className="relative min-h-72">
                <Image alt="Demo aesthetic technology system in a controlled material setting" className="object-cover" fill sizes="(min-width: 1024px) 28vw, 100vw" src="/media/aesthetic-device-demo.png" />
              </div>
              <div className="p-8">
                <h3 className="text-3xl leading-tight">Aesthetic Technology</h3>
                <p className="mt-5 text-[var(--color-muted)]">
                  Systems organized around engineering, interface, safety, and professional context.
                </p>
                <Link className="mt-7 inline-flex min-h-11 items-center gap-2 font-medium underline-offset-4 hover:underline" href="/aesthetic-technology">
                  Explore Technology <ArrowRight aria-hidden="true" />
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section aria-labelledby="capabilities-title" className="section-space bg-[var(--color-surface)]">
        <div className="container-standard grid gap-12 lg:grid-cols-[minmax(16rem,0.55fr)_minmax(0,1.45fr)] lg:gap-24">
          <div>
            <h2
              className="text-[length:var(--font-size-h2-mobile)] leading-tight sm:text-[length:var(--font-size-h2)]"
              id="capabilities-title"
            >
              Capabilities for product and professional partners.
            </h2>
            <Button asChild className="mt-8" variant="secondary">
              <Link href="/professional#capabilities">Explore Capabilities</Link>
            </Button>
          </div>
          <div>
            {content.capabilities.map((capability) => (
              <article className="grid gap-3 border-t border-[var(--color-border)] py-7 sm:grid-cols-[minmax(12rem,0.72fr)_minmax(0,1.28fr)]" key={capability.id}>
                <h3 className="text-xl">{capability.title}</h3>
                <div>
                  <p className="text-[var(--color-muted)]">{capability.summary}</p>
                  <Link className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-medium underline-offset-4 hover:underline" href={`/contact?subject=${encodeURIComponent(capability.inquiryContext)}`}>
                    Start a Project <ArrowUpRight aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="science-material-human-title" className="section-space">
        <div className="container-standard grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-24">
          <div>
            <h2
              className="text-[length:var(--font-size-h2-mobile)] leading-tight sm:text-[length:var(--font-size-h2)]"
              id="science-material-human-title"
            >
              Precision starts with responsible information.
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-[var(--color-muted)]">
              Material, human use, supported statements, and limitations remain connected.
            </p>
          </div>
          <div className="border-t border-[var(--color-border)] pt-7">
            <p className="text-sm text-[var(--color-muted)]">{evidenceRecord?.dataStatus ?? "NOT_CONFIGURED"}</p>
            <p className="mt-4 text-2xl">{evidenceRecord?.title ?? "Evidence not configured"}</p>
            <p className="mt-4 text-[var(--color-muted)]">
              {evidenceRecord?.supportedStatementBoundary ?? "No evidence statement is available."}
            </p>
            <dl className="mt-6 grid gap-4 border-t border-[var(--color-border)] pt-5 text-sm">
              <div><dt className="font-medium">Source</dt><dd className="mt-1 text-[var(--color-muted)]">{evidenceRecord?.source.message ?? "Source not configured"}</dd></div>
              <div><dt className="font-medium">Scope</dt><dd className="mt-1 text-[var(--color-muted)]">{evidenceRecord?.scope ?? "Scope not configured"}</dd></div>
              <div><dt className="font-medium">Limitation</dt><dd className="mt-1 text-[var(--color-muted)]">{evidenceRecord?.limitation ?? "Limitation not configured"}</dd></div>
            </dl>
            <Link className="mt-7 inline-flex min-h-11 items-center gap-2 font-medium underline-offset-4 hover:underline" href="/science">
              Explore Science <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="consumer-support-title" className="section-space border-y border-[var(--color-border)]">
        <div className="container-standard">
          <h2
            className="text-[length:var(--font-size-h2-mobile)] leading-tight sm:text-[length:var(--font-size-h2)]"
            id="consumer-support-title"
          >
            Product understanding remains available.
          </h2>
          <p className="mt-5 max-w-2xl text-[var(--color-muted)]">
            Consumers and professional end users can inspect product context, use, safety, and evidence boundaries.
          </p>
          <div className="mt-12">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="final-inquiry-title" className="section-space">
        <div className="container-standard grid items-end gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.7fr)]">
          <div>
            <h2
              className="max-w-4xl text-[length:var(--font-size-h2-mobile)] leading-tight sm:text-[length:var(--font-size-h2)] lg:text-6xl"
              id="final-inquiry-title"
            >
              Tell us what you are building.
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-[var(--color-muted)]">
              Select the business context, then continue through the channel that fits the project.
            </p>
          </div>
          <InquiryActionPair className="lg:justify-self-end" />
        </div>
      </section>
    </main>
  );
}

export { HomePagePattern, type HomePagePatternProps };
