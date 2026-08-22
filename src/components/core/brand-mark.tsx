import Link from "next/link";
import { siteConfig } from "@/content/site-config";

type BrandMarkProps = {
  showSignature?: boolean;
};

function BrandMark({ showSignature = false }: BrandMarkProps) {
  return (
    <Link
      aria-label="VITHELO home"
      className="inline-flex min-h-11 flex-col justify-center no-underline"
      href="/"
    >
      <span className="text-sm font-medium tracking-[0.28em] text-[var(--color-foreground)]">
        {siteConfig.brand.name}
      </span>
      {showSignature ? (
        <span className="mt-1 text-[0.625rem] tracking-[0.16em] text-[var(--color-muted)]">
          {siteConfig.brand.signature}
        </span>
      ) : null}
    </Link>
  );
}

export { BrandMark, type BrandMarkProps };
