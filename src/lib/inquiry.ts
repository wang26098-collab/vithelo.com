export type InquiryContext = {
  cooperationType: string;
  productWorld: string;
  market: string;
  summary: string;
};

function buildInquiryMessage(context: InquiryContext) {
  return [
    `Cooperation type: ${context.cooperationType}`,
    `Product world: ${context.productWorld}`,
    `Market: ${context.market}`,
    `Project summary: ${context.summary}`,
  ].join("\n");
}

function buildEmailInquiryUrl(email: string, context: InquiryContext) {
  const subject = `VITHELO inquiry: ${context.cooperationType}`;

  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(buildInquiryMessage(context))}`;
}

function buildWhatsAppInquiryUrl(e164: string, context: InquiryContext) {
  return `https://wa.me/${e164}?text=${encodeURIComponent(buildInquiryMessage(context))}`;
}

export { buildEmailInquiryUrl, buildInquiryMessage, buildWhatsAppInquiryUrl };
