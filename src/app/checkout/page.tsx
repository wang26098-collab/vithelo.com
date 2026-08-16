import type { Metadata } from "next";
import { Button } from "@/components/core/button";
import { StatePanel } from "@/components/core/state-panel";
import { UtilityPage } from "@/components/patterns/utility-page";

export const metadata: Metadata = {
  title: "Checkout | A PRIME",
  description: "Demonstration checkout with payment configuration unavailable.",
};

export default function CheckoutPage() {
  return (
    <UtilityPage
      description="Transaction mode. Review configuration before any checkout action."
      mode="transaction"
      title="Checkout"
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)] lg:gap-20">
        <StatePanel
          description="Contact, delivery, tax, payment, consent, and order submission require an approved commerce configuration."
          state="missing-configuration"
          title="Payment not configured"
        />
        <div>
          <h2 className="text-2xl">Transaction status</h2>
          <dl className="mt-6 border-t border-[var(--color-border)]">
            {[
              ["Cart", "Not configured"],
              ["Contact", "Not configured"],
              ["Delivery", "Not configured"],
              ["Payment", "Not configured"],
            ].map(([label, value]) => (
              <div className="flex justify-between gap-4 border-b border-[var(--color-border)] py-5" key={label}>
                <dt className="text-[var(--color-muted)]">{label}</dt>
                <dd className="font-medium">{value}</dd>
              </div>
            ))}
          </dl>
          <Button className="mt-7 w-full" disabled size="large">
            Continue checkout
          </Button>
          <p className="mt-3 text-sm text-[var(--color-muted)]">
            DEMO_ONLY. No payment or order is created.
          </p>
        </div>
      </div>
    </UtilityPage>
  );
}
