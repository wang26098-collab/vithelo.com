import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { NutritionProductFocusRail } from "@/components/domain/nutrition-product-focus-rail";
import type { NutritionProduct } from "@/content/schema";

type NutritionProductDiscoveryProps = { products: readonly NutritionProduct[] };

const productNavigation = [
  { href: "#nutrition-manifesto", label: "Our approach" },
  { href: "/nutrition#sleep-health", label: "Sleep health" },
  { href: "/nutrition#womens-health", label: "Women’s health" },
  { href: "/learn", label: "Journal" },
  { href: "/professional", label: "About" },
] as const;

function NutritionProductDiscovery({ products }: NutritionProductDiscoveryProps) {
  return (
    <section
      aria-labelledby="nutrition-products-title"
      className="relative isolate min-h-[100dvh] overflow-hidden bg-[#f4f2ed] text-[var(--color-graphite)]"
      data-content-status="DEMO_ONLY"
      data-motion-intent="FOCUS"
      data-static-design="screen-03-approved"
      id="nutrition-products"
    >
      <div className="absolute inset-x-0 top-0 z-20 hidden items-center justify-between px-[clamp(2rem,2.5vw,3rem)] pt-[clamp(1.75rem,3.8vh,2.75rem)] lg:flex">
        <Link aria-label="VITHELO home" className="text-[clamp(1.5rem,2vw,2rem)] font-light tracking-[0.18em] no-underline transition-opacity hover:opacity-60" href="/">VITHELO</Link>
        <nav aria-label="Product discovery navigation" className="flex items-center gap-[clamp(1.5rem,3.7vw,3.75rem)] text-[0.78rem] tracking-[0.12em] uppercase">
          {productNavigation.map((item) => <Link className="hero-nav-link" href={item.href} key={item.label}>{item.label}</Link>)}
        </nav>
      </div>

      <div className="nutrition-products-content relative z-10 flex min-h-[100dvh] flex-col px-[clamp(1.5rem,2.5vw,3rem)] pt-[clamp(7.5rem,15vh,10rem)] pb-[clamp(2rem,4vh,3rem)] lg:pt-[clamp(8.75rem,17vh,11rem)]">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end sm:gap-8">
          <h2 className="text-[clamp(4rem,6.9vw,7rem)] leading-[1.02] font-light tracking-[-0.055em]" id="nutrition-products-title">
            <span className="block">Find your</span>
            <span className="block">daily formula.</span>
          </h2>

          <Link aria-label="View all products" className="product-gallery-link group mb-[clamp(0.5rem,2vh,1.5rem)] inline-flex" href="/nutrition">
            <span>View all products</span>
            <ArrowRight aria-hidden="true" className="transition-transform duration-[var(--motion-standard)] ease-[var(--ease-standard)] group-hover:translate-x-1" weight="thin" />
          </Link>
        </div>

        <div className="mt-[clamp(2.25rem,5vh,4.5rem)] min-h-0 flex-1">
          <NutritionProductFocusRail products={products} />
        </div>

      </div>

      <span className="absolute right-3 bottom-3 z-30 bg-white/70 px-2 py-1 text-[0.625rem] tracking-[0.12em] text-black/60 uppercase">DEMO_ONLY</span>
    </section>
  );
}

export { NutritionProductDiscovery, type NutritionProductDiscoveryProps };
