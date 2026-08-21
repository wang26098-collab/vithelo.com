import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/core/button";
import { ProductCard } from "@/components/domain/product-card";
import { demoProducts } from "@/content/demo/products";
import {
  ProductSchema,
  TechnologySchema,
  type Product,
  type Technology,
} from "@/content/schema";

const defaultDeviceProducts = demoProducts.items
  .map((item) => ProductSchema.parse(item))
  .filter((product) => product.kind === "device");

const defaultTechnologies = demoProducts.technologies.map((technology) =>
  TechnologySchema.parse(technology),
);

type AestheticLandingProps = {
  products?: Product[];
  technologies?: Technology[];
};

function AestheticLanding({
  products = defaultDeviceProducts,
  technologies = defaultTechnologies,
}: AestheticLandingProps) {
  const technology = technologies[0];

  return (
    <main>
      <section className="container-standard grid min-h-[calc(100dvh-7.5rem)] gap-10 py-10 lg:grid-cols-[minmax(0,0.76fr)_minmax(0,1.24fr)] lg:items-center lg:py-16">
        <div className="max-w-xl">
          <h1 className="text-[length:var(--font-size-h1-mobile)] leading-[0.98] tracking-[var(--letter-spacing-display)] sm:text-[length:var(--font-size-h1)] lg:text-7xl">
            A complete device belongs in a complete system.
          </h1>
          <p className="mt-7 max-w-lg text-lg text-[var(--color-muted)]">
            Engineering, use context, safety, and professional support stay connected from first
            view to decision.
          </p>
          <Button asChild className="mt-9" size="large">
            <Link href="#devices">Explore demo devices</Link>
          </Button>
        </div>

        <div className="relative min-h-[30rem] overflow-hidden border-l border-[var(--color-border)] lg:min-h-[40rem]">
          <Image
            alt="Fictional demonstration aesthetic device in a titanium material environment"
            className="object-cover"
            fill
            loading="eager"
            priority
            sizes="(min-width: 1024px) 62vw, 100vw"
            src="/media/aesthetic-device-demo.png"
          />
          <div className="absolute right-0 bottom-0 left-[18%] border-t border-white/30 bg-[color:color-mix(in_srgb,var(--color-graphite)_86%,transparent)] p-5 text-[var(--color-ivory)] backdrop-blur-sm">
            <p className="text-xs tracking-[var(--letter-spacing-label)] uppercase">DEMO_ONLY</p>
            <p className="mt-2 text-sm">Fictional form study. No device parameters are implied.</p>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--color-border)] py-10 sm:py-14">
        <div className="container-standard grid gap-8 md:grid-cols-[0.65fr_1.35fr] md:items-start">
          <h2 className="text-2xl leading-tight">Applications begin with context.</h2>
          <div className="grid gap-x-12 sm:grid-cols-2">
            <p className="border-t border-[var(--color-border)] py-5 text-[var(--color-muted)]">
              Consumer discovery keeps the product record, intended use, safety, and support path
              together.
            </p>
            <p className="border-t border-[var(--color-border)] py-5 text-[var(--color-muted)]">
              Professional discovery adds capability, project scope, and market configuration
              without inventing technical facts.
            </p>
          </div>
        </div>
      </section>

      <section className="section-space" id="devices">
        <div className="container-standard grid gap-12 lg:grid-cols-[minmax(15rem,0.45fr)_minmax(0,1.55fr)] lg:gap-24">
          <div>
            <h2 className="text-[length:var(--font-size-h2-mobile)] leading-tight sm:text-[length:var(--font-size-h2)]">
              Devices
            </h2>
            <p className="mt-5 text-[var(--color-muted)]">
              Demo product records make missing commercial and safety configuration explicit.
            </p>
          </div>
          <div>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-[var(--color-surface)]">
        <div className="container-standard">
          <h2 className="max-w-4xl text-[length:var(--font-size-h2-mobile)] leading-tight sm:text-[length:var(--font-size-h2)] lg:text-6xl">
            Engineering is legible when every relationship has a place.
          </h2>
          <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.6fr)]">
            <div className="grid gap-6 border-t border-[var(--color-border)] pt-7 sm:grid-cols-[0.65fr_1.35fr]">
              <p className="text-sm text-[var(--color-muted)]">Technology record</p>
              <div>
                <p className="text-xl">{technology?.name ?? "Not configured"}</p>
                <p className="mt-3 text-[var(--color-muted)]">
                  {technology?.descriptor ?? "Approved technology information required"}
                </p>
              </div>
            </div>
            <div className="border-l border-[var(--color-border)] pl-6 sm:pl-10">
              <p className="text-xs font-medium tracking-[var(--letter-spacing-label)] text-[var(--color-optical-strong)] uppercase">
                {technology?.dataStatus ?? "NOT_CONFIGURED"}
              </p>
              <p className="mt-5 text-[var(--color-muted)]">
                Mechanism, parameters, efficacy, and regulatory status require verified input.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="skin-interface-heading"
        className="container-standard section-space grid gap-10 md:grid-cols-[minmax(18rem,0.72fr)_minmax(0,1.28fr)] md:items-center"
      >
          <div className="relative min-h-[26rem] overflow-hidden md:min-h-[34rem]">
            <Image
              alt="Close material view of a fictional demo device and human-scale contact surface"
              className="object-cover object-[63%_center]"
              fill
              sizes="(min-width: 768px) 42vw, 100vw"
              src="/media/aesthetic-device-demo.png"
            />
          </div>
          <div className="md:pl-10">
            <h2
              className="text-[length:var(--font-size-h2-mobile)] leading-tight sm:text-[length:var(--font-size-h2)]"
              id="skin-interface-heading"
            >
              The skin interface remains a human responsibility.
            </h2>
            <p className="mt-6 max-w-xl text-lg text-[var(--color-muted)]">
              Instructions, contraindications, warnings, cleaning, support, and escalation cannot
              be hidden for visual neatness. They are NOT_CONFIGURED in this demonstration.
            </p>
          </div>
      </section>

      <section className="border-t border-[var(--color-border)] py-20 sm:py-28">
        <div className="container-standard grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:items-end">
          <div>
            <h2 className="max-w-3xl text-[length:var(--font-size-h2-mobile)] leading-tight sm:text-[length:var(--font-size-h2)]">
              Safety and professional fit share one entry point.
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-[var(--color-muted)]">
              Continue when you are ready to define capability, intended market, project scope,
              and required source material.
            </p>
          </div>
          <Link
            className="inline-flex min-h-11 items-center gap-2 font-medium underline-offset-4 hover:underline lg:justify-self-end"
            href="/professional"
          >
            Continue to Professional <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}

export { AestheticLanding, type AestheticLandingProps };
