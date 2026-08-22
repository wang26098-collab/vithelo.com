import { ProjectIntake } from "@/components/domain/project-intake";

type ContactPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const query = await searchParams;
  const world = firstValue(query.world);
  const subject = firstValue(query.subject)?.trim().slice(0, 160);
  const path = firstValue(query.path);
  const initialProductWorld =
    world === "aesthetic-technology" || path === "professional-partners"
      ? "Aesthetic Technology"
      : world === "nutrition"
        ? "Nutrition"
        : "Both product worlds";
  const initialSummary =
    subject ||
    (path === "product-partners"
      ? "Product partner inquiry"
      : path === "professional-partners"
        ? "Professional partner inquiry"
        : "");

  return (
    <main className="container-standard section-space">
      <div className="max-w-3xl">
        <h1 className="text-[length:var(--font-size-h1-mobile)] leading-tight sm:text-[length:var(--font-size-h1)]">
          Start a Project
        </h1>
        <p className="mt-5 text-lg text-[var(--color-muted)]">
          Choose the business context first, then continue through email or WhatsApp.
        </p>
      </div>
      <div className="mt-16 border-t border-[var(--color-border)] pt-12">
        <ProjectIntake
          initialProductWorld={initialProductWorld}
          initialSummary={initialSummary}
        />
      </div>
    </main>
  );
}
