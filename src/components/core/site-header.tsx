import Link from "next/link";
import { MagnifyingGlass, ShoppingBag, UserCircle } from "@phosphor-icons/react/dist/ssr";
import { MegaMenu } from "@/components/core/mega-menu";
import { MobileMenu } from "@/components/core/mobile-menu";
import { secondaryNavigation, utilityNavigation } from "@/components/core/navigation";

const utilityIcons = {
  Search: MagnifyingGlass,
  Account: UserCircle,
  Cart: ShoppingBag,
} as const;

function SiteHeader() {
  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-background)]">
      <div className="container-standard flex min-h-16 items-center gap-6 py-2">
        <Link
          aria-label="A PRIME home"
          className="inline-flex min-h-11 shrink-0 items-center text-sm font-semibold tracking-[0.18em] text-[var(--color-foreground)] no-underline"
          href="/"
        >
          A PRIME
        </Link>

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

        <div className="ml-auto lg:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

export { SiteHeader };
