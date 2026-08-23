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

function ResponsiveHeroMedia({ mobileMedia }: { mobileMedia: Extract<HomeContent["hero"]["mobileMedia"], { status: "DEMO_ONLY" }> }) {
  const common = { alt: mobileMedia.alt, quality: 75, sizes: "100vw" } as const;
  const { props: { srcSet: desktop } } = getImageProps({
    ...common,
    height: 992,
    src: "/media/vithelo-home-screen-01-background.png",
    width: 1586,
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
      <img {...imageProps} alt={mobileMedia.alt} className="size-full object-cover object-center" fetchPriority="high" />
    </picture>
  );
}

function NutritionHomeHero({ hero }: NutritionHomeHeroProps) {
  return (
    <section aria-labelledby="nutrition-hero-title" className="relative isolate min-h-[100dvh] overflow-hidden bg-[var(--color-graphite)] text-white" data-content-status="DEMO_ONLY" data-motion-intent="ORIENT" data-static-design="screen-01-approved" id="nutrition-hero">
      <div className="absolute inset-0" data-testid="nutrition-hero-media-demo">
        {hero.mobileMedia.status === "DEMO_ONLY" ? (
          <div className="nutrition-hero-background absolute inset-0" data-motion-intent="ORIENT" data-testid="nutrition-hero-media-desktop-demo">
            <ResponsiveHeroMedia mobileMedia={hero.mobileMedia} />
          </div>
        ) : (
          <>
            <div className="nutrition-hero-background absolute inset-0 hidden md:block" data-motion-intent="ORIENT" data-testid="nutrition-hero-media-desktop-demo">
              <Image
                alt=""
                className="object-cover object-center"
                fill
                fetchPriority="high"
                sizes="100vw"
                src="/media/vithelo-home-screen-01-background.png"
              />
            </div>
            <HeroMedia media={hero.mobileMedia} viewport="mobile" />
          </>
        )}
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(12_12_11_/_0.36)_0%,transparent_48%)]" />

      <HeroIntro className="absolute inset-x-0 top-0 z-20 hidden items-center justify-between px-[clamp(2rem,2.5vw,3rem)] pt-[clamp(1.75rem,3.8vh,2.75rem)] lg:flex">
        <Link className="text-[clamp(1.5rem,2vw,2rem)] font-light tracking-[0.18em] no-underline transition-opacity hover:opacity-70 focus-visible:outline-white" href="/" aria-label="VITHELO home">VITHELO</Link>
        <nav aria-label="Hero navigation" className="flex items-center gap-[clamp(1.5rem,3.7vw,3.75rem)] text-[0.78rem] tracking-[0.12em] uppercase">
          <Link className="hero-nav-link" href="#nutrition-manifesto">Our approach</Link>
          <Link className="hero-nav-link" href="/nutrition#sleep-health">Sleep health</Link>
          <Link className="hero-nav-link" href="/nutrition#womens-health">Women’s health</Link>
          <Link className="hero-nav-link" href="/learn">Journal</Link>
          <Link className="hero-nav-link" href="/professional">About</Link>
        </nav>
      </HeroIntro>

      <div className="relative z-10 flex min-h-[100dvh] items-center px-[clamp(1.5rem,2.5vw,3rem)] pt-[clamp(5rem,8vw,8rem)] md:items-start md:pt-[31vh]" data-motion-intent="ORIENT" data-testid="nutrition-hero-live-content">
        <div className="w-full max-w-[48rem] md:w-[47vw]">
          <HeroIntro delay={0.1}>
            <h1 className="text-[clamp(4rem,6.9vw,7rem)] leading-[1.02] font-light tracking-[-0.055em]" data-demo-only-claim id="nutrition-hero-title">
              <span className="block">Sleep deeper.</span>
              <span className="block">Live in balance.</span>
            </h1>
          </HeroIntro>
          <HeroIntro className="mt-[clamp(1.25rem,2vw,2rem)]" delay={0.2}>
            <p className="max-w-[22rem] text-[clamp(1rem,1.25vw,1.25rem)] leading-[1.35] font-light text-white/90">Science-led nutrition for sleep health and women’s health, designed to fit real life.</p>
          </HeroIntro>
          <HeroIntro className="mt-[clamp(1.75rem,3vw,3rem)] flex flex-wrap gap-4" delay={0.3}>
            <Link className="hero-cta hero-cta-primary" href="#nutrition-manifesto">Our approach</Link>
            <Link className="hero-cta hero-cta-secondary" href="#nutrition-products">Explore our range</Link>
          </HeroIntro>
        </div>
      </div>

      <span className="absolute right-3 bottom-3 z-20 bg-black/55 px-2 py-1 text-[0.625rem] tracking-[0.12em] text-white/75 uppercase">DEMO_ONLY</span>
    </section>
  );
}

export { NutritionHomeHero, type NutritionHomeHeroProps };
