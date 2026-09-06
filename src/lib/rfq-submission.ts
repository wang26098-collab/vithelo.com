import type { RFQ } from "@/lib/rfq";
import { buildEmailInquiryUrl, buildWhatsAppInquiryUrl } from "@/lib/inquiry";

type SubmissionChannel = "email" | "whatsapp";
type SubmissionAdapter = { channel: SubmissionChannel; createUrl: (payload: RFQ) => string };

function createRfqSubmissionAdapters(config: { email: string; whatsapp: string }): SubmissionAdapter[] {
  return [
    { channel: "email", createUrl: (payload) => buildEmailInquiryUrl(config.email, { cooperationType: "OEM / ODM project", productWorld: payload.productOrDosageForm, market: payload.targetMarket || "Not provided", summary: payload.message || "Not provided" }) },
    { channel: "whatsapp", createUrl: (payload) => buildWhatsAppInquiryUrl(config.whatsapp, { cooperationType: "OEM / ODM project", productWorld: payload.productOrDosageForm, market: payload.targetMarket || "Not provided", summary: payload.message || "Not provided" }) },
  ];
}

export { createRfqSubmissionAdapters, type SubmissionAdapter, type SubmissionChannel };
