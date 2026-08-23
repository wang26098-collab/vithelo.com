import Image, { getImageProps } from "next/image";
import Link from "next/link";
import { HeroIntro } from "@/components/motion/hero-intro";
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
        <Image alt={media.alt} className="object-cover" fetchPriority="high" fill sizes="100vw" src={media.src} />
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

function ResponsiveHeroMedia({
  desktopMedia,
  mobileMedia,
}: {
  desktopMedia: Extract<HomeContent["hero"]["desktopMedia"], { status: "DEMO_ONLY" }>;
  mobileMedia: Extract<HomeContent["hero"]["mobileMedia"], { status: "DEMO_ONLY" }>;
}) {
  const common = { alt: desktopMedia.alt, quality: 75, sizes: "100vw" } as const;
  const { props: { srcSet: desktop } } = getImageProps({
    ...common,
    height: desktopMedia.height,
    src: desktopMedia.src,
    width: desktopMedia.width,
  });
  const { props: { srcSet: mobile, ...imageProps } } = getImageProps({
    ...common,
    height: mobileMedia.height,
    src: mobileMedia.src,
    width: mobileMedia.width,
  });

  return (
    <picture>
      <source data-testid="nutrition-hero-approved-art" media="(min-width: 768px)" srcSet={desktop} />
      <source media="(max-width: 767px)" srcSet={mobile} />
      <img {...imageProps} alt={mobileMedia.alt} className="nutrition-hero-art size-full object-cover object-center" fetchPriority="high" />
    </picture>
  );
}

function NutritionHomeHero({ hero }: NutritionHomeHeroProps) {
  return (
    <section aria-labelledby="nutrition-hero-title" className="relative isolate min-h-[100dvh] overflow-hidden bg-[var(--color-ivory)] text-[var(--color-graphite)]" data-content-status="DEMO_ONLY" data-motion-intent="ORIENT" data-static-design="screen-01-womens-gummy-approved" id="nutrition-hero">
      <div className="absolute inset-0" data-testid="nutrition-hero-media-demo">
        {hero.desktopMedia.status === "DEMO_ONLY" && hero.mobileMedia.status === "DEMO_ONLY" ? (
          <div className="nutrition-hero-background absolute inset-0" data-motion-intent="ORIENT" data-testid="nutrition-hero-media-desktop-demo">
            <ResponsiveHeroMedia desktopMedia={hero.desktopMedia} mobileMedia={hero.mobileMedia} />
          </div>
        ) : (
          <>
            <HeroMedia media={hero.desktopMedia} viewport="desktop" />
            <HeroMedia media={hero.mobileMedia} viewport="mobile" />
          </>
        )}
      </div>
      <div className="nutrition-hero-scrim absolute inset-0" />

      <HeroIntro className="absolute inset-x-0 top-0 z-20 hidden items-center justify-between px-[clamp(2rem,2.5vw,3rem)] pt-[clamp(1.75rem,3.8vh,2.75rem)] lg:flex">
        <Link className="text-[clamp(1.5rem,2vw,2rem)] font-light tracking-[0.18em] no-underline transition-opacity hover:opacity-70" href="/" aria-label="VITHELO home">VITHELO</Link>
        <nav aria-label="Hero navigation" className="flex items-center gap-[clamp(1.5rem,3.7vw,3.75rem)] text-[0.78rem] tracking-[0.12em] uppercase">
          <Link className="hero-nav-link" href="#nutrition-manifesto">Our approach</Link>
          <Link className="hero-nav-link" href="/nutrition#sleep-health">Sleep health</Link>
          <Link className="hero-nav-link" href="/nutrition#womens-health">Women’s health</Link>
          <Link className="hero-nav-link" href="/learn">Journal</Link>
          <Link className="hero-nav-link" href="/professional">About</Link>
        </nav>
      </HeroIntro>

      <div className="nutrition-hero-content relative z-10 flex min-h-[100dvh] items-center px-[clamp(1.25rem,4vw,4rem)]" data-motion-intent="ORIENT" data-testid="nutrition-hero-live-content">
        <div className="nutrition-hero-copy w-full max-w-[42rem]">
          <HeroIntro delay={0.1}>
            <h1 className="nutrition-hero-title text-[clamp(3rem,5.8vw,6rem)] leading-[0.98] font-light tracking-[-0.055em]" data-demo-only-claim id="nutrition-hero-title">{hero.headline}</h1>
          </HeroIntro>
          <HeroIntro className="mt-[clamp(1.25rem,2vw,2rem)]" delay={0.2}>
            <p className="nutrition-hero-supporting max-w-[34rem] text-[clamp(1rem,1.15vw,1.125rem)] leading-[1.5] font-light">{hero.supportingText}</p>
          </HeroIntro>
          <HeroIntro className="mt-[clamp(1.75rem,3vw,3rem)]" delay={0.3}>
            <Link className="hero-cta hero-cta-primary" href={hero.primaryAction.href}>{hero.primaryAction.label}</Link>
          </HeroIntro>
        </div>
      </div>

      <span className="absolute right-3 bottom-3 z-20 bg-[var(--color-graphite)] px-2 py-1 text-[0.625rem] tracking-[0.12em] text-[var(--color-ivory)] uppercase">DEMO_ONLY</span>
    </section>
  );
}

export { NutritionHomeHero, type NutritionHomeHeroProps };
