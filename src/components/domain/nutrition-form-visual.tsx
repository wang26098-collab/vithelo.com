import Image from "next/image";
import type { Media, NutritionForm } from "@/content/schema";

type NutritionFormVisualProps = {
  form: NutritionForm;
  media: Media;
};

function NutritionFormVisual({ form, media }: NutritionFormVisualProps) {
  if (media.status === "DEMO_ONLY") {
    return <Image alt={media.alt} className="size-full object-contain p-[var(--space-24)]" height={media.height} sizes="(min-width: 1024px) 45vw, 100vw" src={media.src} width={media.width} />;
  }

  return (
    <div aria-label={media.alt} className="relative grid min-h-64 place-items-center overflow-hidden bg-[linear-gradient(145deg,color-mix(in_srgb,var(--color-titanium-light)_68%,transparent),color-mix(in_srgb,var(--color-ivory)_90%,transparent))]" data-testid="form-media-fallback" role="img">
      {form === "capsule" ? (
        <div aria-hidden="true" className="relative h-36 w-20 -rotate-25 overflow-hidden rounded-full border border-[color-mix(in_srgb,var(--color-titanium)_65%,transparent)] bg-[var(--color-graphite)] shadow-[var(--shadow-overlay)]">
          <span className="absolute inset-x-0 top-0 h-1/2 bg-[var(--color-titanium-light)]" />
          <span className="absolute inset-x-0 top-1/2 h-px bg-[color-mix(in_srgb,var(--color-ivory)_75%,transparent)]" />
        </div>
      ) : (
        <div aria-hidden="true" className="relative h-32 w-24 rounded-[42%_42%_38%_38%/35%_35%_52%_52%] border border-[color-mix(in_srgb,var(--color-ruby-material)_72%,transparent)] bg-[color-mix(in_srgb,var(--color-ruby-material)_55%,transparent)] shadow-[0_20px_48px_color-mix(in_srgb,var(--color-ruby-material)_30%,transparent)]">
          <span className="absolute -top-5 left-2 h-10 w-10 rounded-full bg-[color-mix(in_srgb,var(--color-ruby-material)_58%,transparent)]" />
          <span className="absolute -top-5 right-2 h-10 w-10 rounded-full bg-[color-mix(in_srgb,var(--color-ruby-material)_58%,transparent)]" />
          <span className="absolute left-1/2 top-11 size-2 -translate-x-1/2 rounded-full bg-[color-mix(in_srgb,var(--color-ivory)_78%,transparent)]" />
        </div>
      )}
      <p className="absolute inset-x-0 bottom-[var(--space-16)] px-[var(--space-20)] text-center text-[var(--font-size-body-sm)] text-[var(--color-muted)]">{media.message}</p>
    </div>
  );
}

export { NutritionFormVisual, type NutritionFormVisualProps };
