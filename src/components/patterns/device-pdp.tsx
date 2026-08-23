import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/core/button";
import { StickyResource } from "@/components/core/sticky-resource";
import { ProductCommerce } from "@/components/domain/product-commerce";
import { SafetyPanel } from "@/components/domain/safety-panel";
import { TechnologyStory } from "@/components/domain/technology-story";
import type { Product, Technology } from "@/content/schema";

type DeviceProduct = Extract<Product, { kind: "device" }>;

type DevicePdpProps = {
  product: DeviceProduct;
  technologies: Technology[];
};

function DevicePdp({ product, technologies }: DevicePdpProps) {
  const relatedTechnologies = technologies.filter((item) => product.technologyIds.includes(item.id));

  return (
    <main>
      <section className="container-standard grid gap-10 py-10 lg:grid-cols-[minmax(20rem,0.82fr)_minmax(0,1.18fr)] lg:items-center lg:py-16">
        <div>
          <ProductCommerce product={product} />
          <Button asChild className="mt-4" variant="secondary">
            <Link href={`/contact?world=aesthetic-technology&subject=${encodeURIComponent(product.name)}`}>
              Start a Project
            </Link>
          </Button>
        </div>
        <figure className="m-0">
          <div className="relative min-h-[30rem] overflow-hidden lg:min-h-[42rem]">
            <Image
              alt="Fictional demonstration device; approved product media and parameters are not configured"
              className="object-cover"
              fill
              loading="eager"
              sizes="(min-width: 1024px) 58vw, 100vw"
              src="/media/aesthetic-device-demo.png"
            />
          </div>
          <figcaption className="border-t border-[var(--color-border)] py-4 text-sm text-[var(--color-muted)]">
            Fictional form study. Approved device media remains NOT_CONFIGURED.
          </figcaption>
        </figure>
      </section>

      <div className="relative">
        <StickyResource className="lg:hidden" label="Device inquiry availability" priority="P1">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm">Inquiry is not configured</span>
            <Button asChild size="small" variant="secondary">
              <a href="#commerce">Review availability</a>
            </Button>
          </div>
        </StickyResource>

        <section className="section-space border-t border-[var(--color-border)]">
          <div className="container-standard grid gap-10 lg:grid-cols-[minmax(14rem,0.42fr)_minmax(0,1.58fr)] lg:gap-24">
            <h2 className="text-[length:var(--font-size-h2-mobile)] leading-tight sm:text-[length:var(--font-size-h2)]">
              What it does
            </h2>
            <div className="border-t border-[var(--color-border)] pt-7">
              <p className="max-w-3xl text-2xl leading-tight">
                Intended use, mechanism, treatment area, user type, and supported outcomes are not configured.
              </p>
              <p className="mt-5 max-w-2xl text-[var(--color-muted)]">
                This section preserves the decision structure without implying a device function.
              </p>
            </div>
          </div>
        </section>

        <section className="section-space bg-[var(--color-surface)]">
          <div className="container-standard">
            <h2 className="max-w-3xl text-[length:var(--font-size-h2-mobile)] leading-tight sm:text-[length:var(--font-size-h2)] lg:text-6xl">
              Technology should explain the system without manufacturing certainty.
            </h2>
            <div className="mt-14">
              <TechnologyStory technologies={relatedTechnologies} />
            </div>
          </div>
        </section>

        <section className="section-space">
          <div className="container-standard grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(17rem,0.75fr)] lg:gap-24">
            <div>
              <h2 className="text-[length:var(--font-size-h2-mobile)] leading-tight sm:text-[length:var(--font-size-h2)]">
                Engineering
              </h2>
              <p className="mt-6 max-w-2xl text-lg text-[var(--color-muted)]">
                Materials, controls, power, outputs, dimensions, tolerances, testing, and maintenance are not configured.
              </p>
            </div>
            <dl className="border-t border-[var(--color-border)]">
              <div className="py-6">
                <dt className="text-sm text-[var(--color-muted)]">Technical source</dt>
                <dd className="mt-2 font-medium">Not configured</dd>
              </div>
              <div className="border-t border-[var(--color-border)] py-6">
                <dt className="text-sm text-[var(--color-muted)]">Parameters</dt>
                <dd className="mt-2 font-medium">Not configured</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="container-standard section-space">
          <div className="grid gap-10 md:grid-cols-[minmax(18rem,0.72fr)_minmax(0,1.28fr)] md:items-center">
            <div className="relative min-h-[26rem] overflow-hidden md:min-h-[34rem]">
              <Image
                alt="Close material view of a fictional demonstration device interface"
                className="object-cover object-[66%_center]"
                fill
                loading="eager"
                sizes="(min-width: 768px) 42vw, 100vw"
                src="/media/aesthetic-device-demo.png"
              />
            </div>
            <div className="md:pl-10">
              <h2 className="text-[length:var(--font-size-h2-mobile)] leading-tight sm:text-[length:var(--font-size-h2)]">
                Human interface
              </h2>
              <p className="mt-6 max-w-xl text-lg text-[var(--color-muted)]">
                Controls, feedback, handling, contact surfaces, accessibility, and professional supervision are not configured.
              </p>
            </div>
          </div>
        </section>

        <section className="section-space border-t border-[var(--color-border)]">
          <div className="container-reading">
            <h2 className="text-[length:var(--font-size-h2-mobile)] leading-tight sm:text-[length:var(--font-size-h2)]">
              How to use
            </h2>
            <p className="mt-6 text-lg text-[var(--color-muted)]">
              Setup, operating sequence, duration, supervision, cleaning, storage, and aftercare are not configured. An approved manual is required before instructions can appear.
            </p>
          </div>
        </section>

        <section className="section-space bg-[var(--color-surface)]">
          <div className="container-standard grid gap-10 lg:grid-cols-[minmax(14rem,0.45fr)_minmax(0,1.55fr)] lg:gap-24">
            <h2 className="text-[length:var(--font-size-h2-mobile)] leading-tight sm:text-[length:var(--font-size-h2)]">
              Modes
            </h2>
            <div className="border-t border-[var(--color-border)] pt-7">
              <p className="text-2xl">Not configured</p>
              <p className="mt-4 max-w-2xl text-[var(--color-muted)]">
                No operating modes, levels, presets, or treatment programs are represented in this demonstration.
              </p>
            </div>
          </div>
        </section>
      </div>

      <SafetyPanel product={product} />

      <section className="section-space">
        <div className="container-standard grid gap-10 lg:grid-cols-[minmax(14rem,0.46fr)_minmax(0,1.54fr)] lg:gap-24">
          <h2 className="text-[length:var(--font-size-h2-mobile)] leading-tight sm:text-[length:var(--font-size-h2)]">
            Specifications and ownership
          </h2>
          <dl className="grid gap-x-10 sm:grid-cols-2">
            {[
              ["Specifications", "Not configured"],
              ["Included items", "Not configured"],
              ["Warranty", "Not configured"],
              ["Support policy", "Not configured"],
            ].map(([label, value]) => (
              <div className="border-t border-[var(--color-border)] py-6" key={label}>
                <dt className="text-sm text-[var(--color-muted)]">{label}</dt>
                <dd className="mt-2 font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-t border-[var(--color-border)] py-20 sm:py-28">
        <div className="container-standard grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(16rem,0.75fr)] lg:items-end">
          <div>
            <h2 className="max-w-3xl text-[length:var(--font-size-h2-mobile)] leading-tight sm:text-[length:var(--font-size-h2)]">
              Continue with project fit intact.
            </h2>
            <p className="mt-5 max-w-2xl text-[var(--color-muted)]">
              Return to the device collection or begin a professional project definition without assuming missing specifications.
            </p>
          </div>
          <div className="flex flex-wrap gap-6 lg:justify-self-end">
            <Link className="inline-flex min-h-11 items-center gap-2 font-medium underline-offset-4 hover:underline" href="/professional">
              Professional path <ArrowRight aria-hidden="true" />
            </Link>
            <Link className="inline-flex min-h-11 items-center gap-2 font-medium underline-offset-4 hover:underline" href="/aesthetic-technology">
              All devices <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export { DevicePdp, type DevicePdpProps };
