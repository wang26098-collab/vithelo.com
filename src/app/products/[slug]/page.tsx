import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { vitheloB2BProductsPage } from "@/content/demo/vithelo-b2b-site";
import { VitheloDosageFormDetail } from "@/components/patterns/vithelo-dosage-form-detail";

export function generateStaticParams() {
  return vitheloB2BProductsPage.formats.map(({ id }) => ({ slug: id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const format = vitheloB2BProductsPage.formats.find((item) => item.id === slug);
  if (!format) return {};
  return {
    title: `${format.name} Manufacturing | VITHELO`,
    description: `${format.name} manufacturing for private-label nutrition projects, with formula, packaging and production fit reviewed together.`,
    alternates: { canonical: `/products/${format.id}` },
  };
}

export default async function DosageFormPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ product?: string }> }) {
  const { slug } = await params;
  const { product: productId } = await searchParams;
  const format = vitheloB2BProductsPage.formats.find((item) => item.id === slug);
  if (!format) notFound();
  const product = vitheloB2BProductsPage.discovery.items.find((item) => item.id === productId && item.formatSlug === format.id);
  const isInDiscovery = vitheloB2BProductsPage.discovery.formats.some(({ slug }) => slug === format.id);
  if (isInDiscovery) return <VitheloDosageFormDetail format={format} product={product} />;
  return (
    <main className="container-standard pt-28 pb-12 sm:pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "/" }, { "@type": "ListItem", position: 2, name: "Products", item: "/products" }, { "@type": "ListItem", position: 3, name: format.name, item: `/products/${format.id}` }] }) }} />
      <nav aria-label="Breadcrumb" className="text-sm text-[var(--color-muted)]">
        <Link href="/">Home</Link><span aria-hidden="true"> / </span><Link href="/products">Products</Link><span aria-hidden="true"> / </span><span>{format.name}</span>
      </nav>
      <header className="mt-10 max-w-3xl border-b border-[var(--color-border)] pb-12">
        <p className="text-xs tracking-[0.2em] text-[var(--color-muted)]">DOSAGE FORM MANUFACTURING</p>
        <h1 className="mt-4 max-w-4xl text-4xl tracking-tight sm:text-6xl">{product?.title ?? `${format.name} for private-label nutrition.`}</h1>
        <p className="mt-6 max-w-3xl text-lg text-[var(--color-muted)]">{product?.descriptor ?? `${format.fit}. VITHELO reviews formula, format and packaging together before confirming a production route.`}</p>
      </header>
      {product && product.parameters && product.parameters.length > 0 ? <section className="mt-10 max-w-3xl border-t border-[var(--color-border)] pt-8"><p className="text-xs tracking-[0.2em] text-[var(--color-muted)]">PRODUCT PARAMETERS · DEMO_ONLY</p><dl className="mt-4 grid gap-3 sm:grid-cols-2">{product.parameters.map((parameter) => <div className="border-b border-[var(--color-border)] pb-3" key={parameter.label}><dt className="text-sm text-[var(--color-muted)]">{parameter.label}</dt><dd className="mt-1 text-base">{parameter.value}</dd></div>)}</dl></section> : null}
      <div className="mt-12 grid gap-10 sm:grid-cols-2">
        <section><h2 className="text-2xl">Customization options</h2><ul className="mt-4 space-y-2 text-[var(--color-muted)]">{format.customization.map((item) => <li key={item}>— {item}</li>)}</ul></section>
        <section><h2 className="text-2xl">Packaging direction</h2><p className="mt-4 text-[var(--color-muted)]">{format.packaging}</p><p className="mt-4 text-sm text-[var(--color-muted)]">{format.moq}</p></section>
        <section><h2 className="text-2xl">Manufacturing &amp; quality</h2><p className="mt-4 text-[var(--color-muted)]">Manufacturing fit, raw-material review, in-process checks and finished-product documentation are discussed within the confirmed project scope.</p><div className="mt-4"><Link className="underline" href="/manufacturing">Explore Manufacturing</Link></div></section>
        <section><h2 className="text-2xl">Related project path</h2><p className="mt-4 text-[var(--color-muted)]">Bring the format, formula direction, pack and expected volume into an OEM / ODM review.</p><Link className="mt-4 inline-block underline" href="/oem-odm">See OEM / ODM process</Link></section>
      </div>
      <section className="mt-16 border-t border-[var(--color-border)] pt-8">
        <h2 className="text-2xl">Related buyer guidance</h2>
        <div className="mt-4 flex flex-col gap-3">
          <Link className="underline" href="/insights/choose-the-right-supplement-format">How to Choose the Right Supplement Format</Link>
          {format.id === "gummies" ? <Link className="underline" href="/insights/gummy-development-guide">Gummy Development: Formula, Texture, Shape and Packaging</Link> : null}
          {format.id === "gummies" || format.id === "hard-capsules" ? <Link className="underline" href="/insights/gummies-vs-hard-capsules">Gummies vs Hard Capsules for Private-Label Projects</Link> : null}
        </div>
      </section>
      <div className="mt-16 border-t border-[var(--color-border)] pt-8"><Link className="border border-[var(--color-ink)] bg-[var(--color-ink)] px-5 py-3 text-sm text-white" href="/contact">Start a Project</Link></div>
    </main>
  );
}
