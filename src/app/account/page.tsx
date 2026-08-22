import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { StatePanel } from "@/components/core/state-panel";
import { UtilityPage } from "@/components/patterns/utility-page";

export const metadata: Metadata = {
  title: "Account | VITHELO",
  description: "Demonstration account task map with no configured identity provider.",
};

const accountAreas = [
  ["Orders", "Order history is not configured."],
  ["Saved", "Saved products and reading are not configured."],
  ["Addresses", "Address storage is not configured."],
  ["Support", "Support history is not configured."],
] as const;

export default function AccountPage() {
  const hasVerifiedOwnership = false;

  return (
    <UtilityPage
      description="Account identity, orders, ownership, and stored details remain unavailable until configured."
      title="Account"
    >
      <StatePanel
        actionHref="/support"
        actionLabel="Open Support"
        description="Sign in, registration, password recovery, and profile storage require an approved identity provider."
        state="missing-configuration"
        title="Account access not configured"
      />

      <section className="mt-14">
        <h2 className="text-2xl">Account areas</h2>
        <div className="mt-6 grid gap-x-10 md:grid-cols-[1.2fr_0.8fr]">
          {accountAreas.map(([title, description]) => (
            <article className="border-t border-[var(--color-border)] py-6" key={title}>
              <h3 className="text-xl">{title}</h3>
              <p className="mt-3 text-[var(--color-muted)]">{description}</p>
              {title === "Support" ? (
                <Link className="mt-4 inline-flex min-h-11 items-center gap-2 font-medium underline-offset-4 hover:underline" href="/support">
                  Open Support <ArrowRight aria-hidden="true" />
                </Link>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t border-[var(--color-border)] pt-8">
        <h2 className="text-2xl">Owned product areas</h2>
        {hasVerifiedOwnership ? (
          <p className="mt-4">Verified owned products would appear here.</p>
        ) : (
          <p className="mt-4 max-w-2xl text-[var(--color-muted)]">
            No verified ownership is available. Device registration, nutrition continuity, manuals, and ownership support are NOT_CONFIGURED.
          </p>
        )}
      </section>
    </UtilityPage>
  );
}
