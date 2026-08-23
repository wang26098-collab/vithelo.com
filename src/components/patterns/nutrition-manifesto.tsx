import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import type { HomeContent } from "@/content/schema";

type NutritionManifestoProps = { categoryPaths: HomeContent["categoryPaths"] };

const manifestoNavigation = [
  { href: "#nutrition-manifesto", label: "Our approach" },
  { href: "/nutrition#sleep-health", label: "Sleep health" },
  { href: "/nutrition#womens-health", label: "Women’s health" },
  { href: "/learn", label: "Journal" },
  { href: "/professional", label: "About" },
] as const;

function NutritionManifesto({ categoryPaths }: NutritionManifestoProps) {
  return (
    <section
      aria-labelledby="nutrition-manifesto-title"
      className="relative isolate min-h-[100dvh] overflow-hidden bg-[#f4f2ed] text-[var(--color-graphite)]"
      data-content-status="DEMO_ONLY"
      data-motion-intent="RELATE"
      data-static-design="screen-02-approved"
      id="nutrition-manifesto"
    >
      <Image
        alt=""
        className="nutrition-manifesto-media object-cover object-center"
        data-testid="nutrition-manifesto-background"
        fill
        sizes="100vw"
        src="/media/vithelo-home-screen-02-background.png"
      />

      <div className="absolute inset-x-0 top-0 z-20 hidden items-center justify-between px-[clamp(2rem,2.5vw,3rem)] pt-[clamp(1.75rem,3.8vh,2.75rem)] text-[var(--color-graphite)] lg:flex">
        <Link aria-label="VITHELO home" className="text-[clamp(1.5rem,2vw,2rem)] font-light tracking-[0.18em] no-underline transition-opacity hover:opacity-60" href="/">VITHELO</Link>
        <nav aria-label="Manifesto navigation" className="flex items-center gap-[clamp(1.5rem,3.7vw,3.75rem)] text-[0.78rem] tracking-[0.12em] uppercase">
          {manifestoNavigation.map((item) => <Link className="hero-nav-link" href={item.href} key={item.label}>{item.label}</Link>)}
        </nav>
      </div>

      <div className="nutrition-manifesto-content relative z-10 flex min-h-[100dvh] items-start px-[clamp(1.5rem,3vw,3rem)] pt-[clamp(10rem,27vh,17rem)]" data-motion-intent="RELATE" data-testid="nutrition-manifesto-live-content">
        <div className="w-full max-w-[44rem] md:w-[46vw]">
          <h2 className="text-[clamp(4rem,6.9vw,7rem)] leading-[1.03] font-light tracking-[-0.055em]" id="nutrition-manifesto-title">
            <span className="block">Nutrition for</span>
            <span className="block">the rhythms</span>
            <span className="block">that shape</span>
            <span className="block">a life.</span>
          </h2>

          <div className="mt-[clamp(3rem,6vh,5.5rem)] grid max-w-[40rem] gap-6 sm:grid-cols-2 sm:gap-12">
            {categoryPaths.map((path) => (
              <Link aria-label={path.title} className="manifesto-category-link group" href={path.href} key={path.id}>
                <span>{path.title}</span>
                <ArrowRight aria-hidden="true" className="transition-transform duration-[var(--motion-standard)] ease-[var(--ease-standard)] group-hover:translate-x-1" weight="thin" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <span className="absolute right-3 bottom-3 z-20 bg-white/65 px-2 py-1 text-[0.625rem] tracking-[0.12em] text-black/60 uppercase">DEMO_ONLY</span>
    </section>
  );
}

export { NutritionManifesto, type NutritionManifestoProps };
