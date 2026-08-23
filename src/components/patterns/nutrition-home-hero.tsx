import Image from "next/image";
import Link from "next/link";
import type { HomeContent } from "@/content/schema";

type NutritionHomeHeroProps = { hero: HomeContent["hero"] };

function HeroMedia({
  media,
  viewport,
}: {
  media: HomeContent["hero"]["desktopMedia"];
  viewport: "desktop" | "mobile";
}) {
  const viewportClassName = viewport === "desktop" ? "hidden md:block" : "md:hidden";

  if (media.status === "DEMO_ONLY") {
    return (
      <div className={`absolute inset-0 ${viewportClassName}`} data-testid={`nutrition-hero-media-${viewport}-demo`}>
        <Image alt={media.alt} className="object-cover" fill priority sizes="100vw" src={media.src} />
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 grid place-items-center bg-[var(--color-graphite)] p-[var(--space-24)] text-center ${viewportClassName}`} data-testid={`nutrition-hero-media-${viewport}-fallback`}>
      <div>
        <p>{media.alt}</p>
        <p className="mt-[var(--space-8)] text-[var(--font-size-body-sm)] text-[color:color-mix(in_srgb,var(--color-ivory)_72%,transparent)]">{media.message}</p>
      </div>
    </div>
  );
}

function NutritionHomeHero({ hero }: NutritionHomeHeroProps) {
  return (
    <section aria-labelledby="nutrition-hero-title" className="relative isolate flex min-h-[calc(100dvh-var(--home-header-height))] items-end overflow-hidden bg-[var(--color-graphite)] text-[var(--color-ivory)]" data-motion-intent="ORIENT" id="nutrition-hero">
      <div className="absolute inset-0" data-testid="nutrition-hero-media-demo">
        <HeroMedia media={hero.desktopMedia} viewport="desktop" />
        <HeroMedia media={hero.mobileMedia} viewport="mobile" />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,color-mix(in_srgb,var(--color-graphite)_78%,transparent),color-mix(in_srgb,var(--color-graphite)_10%,transparent))]" />
      <div className="container-standard relative z-10 w-full pb-[var(--space-40)] pt-[calc(var(--home-header-height)+var(--space-40))] sm:pb-[var(--space-64)]">
        <div className="max-w-2xl">
          <p className="text-[var(--font-size-label)] tracking-[var(--letter-spacing-label)] text-[color:color-mix(in_srgb,var(--color-ivory)_80%,transparent)] uppercase">VITHELO · Nutrition</p>
          <p className="mt-[var(--space-20)] text-[var(--font-size-label)] tracking-[var(--letter-spacing-label)] text-[color:color-mix(in_srgb,var(--color-ivory)_72%,transparent)] uppercase">{hero.desktopMedia.status}</p>
          <h1 className="mt-[var(--space-20)] text-[length:var(--font-size-h1-mobile)] leading-[0.98] tracking-[var(--letter-spacing-display)] sm:text-[length:var(--font-size-h1)] lg:text-[length:var(--font-size-display)]" id="nutrition-hero-title">{hero.headline}</h1>
          <p className="mt-[var(--space-20)] max-w-xl text-lg text-[color:color-mix(in_srgb,var(--color-ivory)_84%,transparent)]">{hero.supportingText}</p>
          <div className="mt-[var(--space-32)] flex flex-wrap items-center gap-[var(--space-20)]">
            <Link className="inline-flex min-h-11 items-center border border-[color:color-mix(in_srgb,var(--color-ivory)_72%,transparent)] px-[var(--space-20)] text-sm font-medium transition-colors hover:bg-[var(--color-ivory)] hover:text-[var(--color-graphite)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-ivory)]" href="#nutrition-manifesto">Explore nutrition</Link>
            <Link className="inline-flex min-h-11 items-center text-sm text-[color:color-mix(in_srgb,var(--color-ivory)_80%,transparent)] underline underline-offset-4 transition-colors hover:text-[var(--color-ivory)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-ivory)]" href="/professional">Professional partnership</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export { NutritionHomeHero, type NutritionHomeHeroProps };
