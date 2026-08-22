import Link from "next/link";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { BrandMark } from "@/components/core/brand-mark";
import { Button } from "@/components/core/button";
import { MegaMenu } from "@/components/core/mega-menu";
import { MobileMenu } from "@/components/core/mobile-menu";
import { secondaryNavigation, utilityNavigation } from "@/components/core/navigation";

const utilityIcons = {
  Search: MagnifyingGlass,
} as const;

function SiteHeader() {
  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-background)]">
      <div className="container-standard flex min-h-16 items-center gap-6 py-2">
        <BrandMark />

        <div className="hidden min-w-0 flex-1 items-center justify-center lg:flex">
          <MegaMenu />
        </div>

        <nav aria-label="Secondary navigation" className="ml-auto hidden items-center gap-1 xl:flex">
          {secondaryNavigation.map((item) => (
            <Link
              className="inline-flex min-h-11 items-center px-2 text-sm text-[var(--color-muted)] no-underline hover:text-[var(--color-foreground)]"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <nav aria-label="Utility navigation" className="hidden items-center gap-1 lg:flex">
          {utilityNavigation.map((item) => {
            const Icon = utilityIcons[item.label];
            return (
              <Link
                aria-label={item.label}
                className="inline-flex size-11 items-center justify-center rounded-[var(--radius-4)] text-[var(--color-foreground)] hover:bg-[var(--color-surface)]"
                href={item.href}
                key={item.href}
              >
                <Icon aria-hidden="true" />
              </Link>
            );
          })}
        </nav>

        <Button asChild className="hidden xl:inline-flex" size="small">
          <Link href="/contact">Start a Project</Link>
        </Button>

        <div className="ml-auto lg:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

export { SiteHeader };
