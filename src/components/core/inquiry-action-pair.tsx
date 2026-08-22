import { EnvelopeSimple, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/core/button";
import { siteConfig } from "@/content/site-config";
import {
  buildEmailInquiryUrl,
  buildWhatsAppInquiryUrl,
  type InquiryContext,
} from "@/lib/inquiry";
import { cn } from "@/lib/cn";

const emptyContext: InquiryContext = {
  cooperationType: "General business inquiry",
  productWorld: "Not selected",
  market: "Not provided",
  summary: "Please provide project context.",
};

type InquiryActionPairProps = {
  context?: InquiryContext;
  className?: string;
  showConfigurationMessages?: boolean;
};

function InquiryActionPair({
  context = emptyContext,
  className,
  showConfigurationMessages = true,
}: InquiryActionPairProps) {
  const email = siteConfig.contact.email;
  const whatsapp = siteConfig.contact.whatsapp;
  const compact = !showConfigurationMessages;

  return (
    <div className={cn(className)}>
      <div className={cn("flex gap-3", compact ? "flex-row" : "flex-col sm:flex-row")}>
        {email.status === "NOT_CONFIGURED" ? (
          <Button className={compact ? "flex-1 px-3" : undefined} disabled size="large">
            <EnvelopeSimple aria-hidden="true" /> Email Inquiry
          </Button>
        ) : (
          <Button asChild className={compact ? "flex-1 px-3" : undefined} size="large">
            <a href={buildEmailInquiryUrl(email.value, context)}>
              <EnvelopeSimple aria-hidden="true" /> Email Inquiry
            </a>
          </Button>
        )}
        {whatsapp.status === "NOT_CONFIGURED" ? (
          <Button className={compact ? "flex-1 px-3" : undefined} disabled size="large" variant="secondary">
            <WhatsappLogo aria-hidden="true" /> WhatsApp
          </Button>
        ) : (
          <Button asChild className={compact ? "flex-1 px-3" : undefined} size="large" variant="secondary">
            <a
              href={buildWhatsAppInquiryUrl(whatsapp.e164, context)}
              rel="noreferrer"
              target="_blank"
            >
              <WhatsappLogo aria-hidden="true" /> WhatsApp
            </a>
          </Button>
        )}
      </div>
      {showConfigurationMessages ? (
        <div className="mt-3 space-y-1 text-sm text-[var(--color-muted)]">
          <p><span className="font-mono text-[var(--color-foreground)]">NOT_CONFIGURED</span> · {email.message}</p>
          <p><span className="font-mono text-[var(--color-foreground)]">NOT_CONFIGURED</span> · {whatsapp.message}</p>
        </div>
      ) : email.status === "NOT_CONFIGURED" || whatsapp.status === "NOT_CONFIGURED" ? (
        <p className="mt-2 text-center text-xs text-[var(--color-muted)]">
          <span className="font-mono text-[var(--color-foreground)]">NOT_CONFIGURED</span> · Contact channels pending approval.
        </p>
      ) : null}
    </div>
  );
}

export { InquiryActionPair, type InquiryActionPairProps };
