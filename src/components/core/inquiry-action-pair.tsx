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

  return (
    <div className={cn(className)}>
      <div className="flex flex-col gap-3 sm:flex-row">
        {email.status === "NOT_CONFIGURED" ? (
          <Button disabled size="large">
            <EnvelopeSimple aria-hidden="true" /> Email Inquiry
          </Button>
        ) : (
          <Button asChild size="large">
            <a href={buildEmailInquiryUrl(email.value, context)}>
              <EnvelopeSimple aria-hidden="true" /> Email Inquiry
            </a>
          </Button>
        )}
        {whatsapp.status === "NOT_CONFIGURED" ? (
          <Button disabled size="large" variant="secondary">
            <WhatsappLogo aria-hidden="true" /> WhatsApp
          </Button>
        ) : (
          <Button asChild size="large" variant="secondary">
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
        <div className="mt-3 text-sm text-[var(--color-muted)]">
          <p>{email.message}</p>
          <p>{whatsapp.message}</p>
        </div>
      ) : null}
    </div>
  );
}

export { InquiryActionPair, type InquiryActionPairProps };
