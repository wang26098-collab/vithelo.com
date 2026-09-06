import Link from "next/link";

type InformationPageProps = {
  eyebrow: string;
  title: string;
  directAnswer: string;
  sections: Array<{ title: string; items: string[] }>;
  relatedInsights?: Array<{ label: string; href: string }>;
};

const heroContent = {
  MANUFACTURING: {
    className: "manufacturingHero",
    image: "/media/home-membrane.png",
    title: "From dosage form to production route.",
    copy: "A practical manufacturing path connects your format, project requirements and production execution.",
    meta: "PRODUCTION PATH / DOSAGE FORMS / PROJECT FIT",
  },
  "QUALITY & R&D": {
    className: "qualityHero",
    image: "/media/nutrition-ritual.png",
    title: "Quality built around control and evidence.",
    copy: "Understand the checkpoints, records and verification questions that support a responsible nutrition project.",
    meta: "CONTROL / DOCUMENTATION / VERIFICATION",
  },
  "ABOUT VITHELO": {
    className: "aboutHero",
    image: "/media/b2b/gummies-pexels-14027295.jpg",
    title: "A manufacturing partner for nutrition brands.",
    copy: "VITHELO connects private-label, OEM and ODM briefs with practical format, development and production decisions.",
    meta: "B2B NUTRITION / PRIVATE LABEL / OEM · ODM",
  },
} as const;

export function VitheloInformationPage({ eyebrow, title, directAnswer, sections, relatedInsights = [] }: InformationPageProps) {
  const hero = heroContent[eyebrow as keyof typeof heroContent];
  return (
    <main className={`informationPage ${hero ? `informationPage--${hero.className}` : ""}`}>
      {hero ? (
        <section className="informationHero" data-header-hero>
          <div className="informationHero__copy">
            <p className="informationHero__eyebrow">{eyebrow}</p>
            <h1>{hero.title}</h1>
            <p className="informationHero__lede">{hero.copy}</p>
            <div className="informationHero__actions">
              <Link href="/products">Explore Dosage Forms</Link>
              <Link href="/contact">Start a Project</Link>
            </div>
            <p className="informationHero__meta">{hero.meta}</p>
          </div>
          <div className="informationHero__media" aria-hidden="true" style={{ backgroundImage: `url(${hero.image})` }} />
        </section>
      ) : null}
      <div className="informationPage__body container-standard">
        <header className="max-w-3xl border-b border-[var(--color-border)] pb-12">
          <p className="text-xs tracking-[0.2em] text-[var(--color-muted)]">{eyebrow}</p>
          <h2 className="mt-5 text-4xl tracking-tight sm:text-6xl">{title}</h2>
          <p className="mt-6 max-w-2xl text-lg text-[var(--color-muted)]">{directAnswer}</p>
        </header>
      <div className="mt-12 grid gap-10 sm:grid-cols-2">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-2xl tracking-tight">{section.title}</h2>
            <ul className="mt-5 space-y-3 text-[var(--color-muted)]">
              {section.items.map((item) => <li key={item}>— {item}</li>)}
            </ul>
          </section>
        ))}
      </div>
      {relatedInsights.length > 0 ? (
        <section className="mt-16 border-t border-[var(--color-border)] pt-8">
          <h2 className="text-2xl tracking-tight">Related buyer guides</h2>
          <div className="mt-5 flex flex-col gap-3">
            {relatedInsights.map((item) => <Link className="underline" href={item.href} key={item.href}>{item.label}</Link>)}
          </div>
        </section>
      ) : null}
      <div className="mt-16 flex flex-wrap gap-4 border-t border-[var(--color-border)] pt-8">
        <Link className="border border-[var(--color-ink)] bg-[var(--color-ink)] px-5 py-3 text-sm text-white" href="/contact">Start a Project</Link>
        <Link className="border border-[var(--color-border)] px-5 py-3 text-sm" href="/products">Explore Products</Link>
      </div>
      </div>
    </main>
  );
}
