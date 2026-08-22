import { ProjectIntake } from "@/components/domain/project-intake";

export default function ContactPage() {
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
        <ProjectIntake />
      </div>
    </main>
  );
}
