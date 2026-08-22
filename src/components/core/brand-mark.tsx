import Link from "next/link";
import { siteConfig } from "@/content/site-config";

type BrandMarkProps = {
  showSignature?: boolean;
};

function BrandMark({ showSignature = false }: BrandMarkProps) {
  return (
    <Link
      aria-label="VITHELO home"
      className="inline-flex min-h-11 items-center gap-2.5 no-underline"
      href="/"
    >
      <svg
        aria-hidden="true"
        className="h-8 w-7 shrink-0 text-[var(--color-foreground)]"
        data-testid="vithelo-monogram"
        viewBox="0 0 56 64"
      >
        <path d="M4 3h10l16 34-6 11L4 3Z" fill="currentColor" />
        <path d="M42 3h10L32 48l-6-11L42 3Z" fill="currentColor" />
        <path d="m24 48 4-8 4 8-4 7-4-7Z" fill="currentColor" />
        <path d="m24 48 4 7 4-7 4 7-8 9-8-9 4-7Z" fill="currentColor" />
      </svg>
      <span className="flex flex-col justify-center">
        <span className="text-sm font-medium tracking-[0.28em] text-[var(--color-foreground)]">
          {siteConfig.brand.name}
        </span>
        {showSignature ? (
          <span className="mt-1 text-[0.625rem] tracking-[0.16em] text-[var(--color-muted)]">
            {siteConfig.brand.signature}
          </span>
        ) : null}
      </span>
    </Link>
  );
}

export { BrandMark, type BrandMarkProps };
