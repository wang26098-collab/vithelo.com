import { HomeContentSchema } from "@/content/schema";

export const demoHome = HomeContentSchema.parse({
  dataStatus: "DEMO_ONLY",
  hero: {
    headline: "Precision for what comes next.",
    supportingText:
      "Nutrition and aesthetic technology developed for brands, distributors, and professional partners.",
    primaryAction: "email",
    secondaryAction: "whatsapp",
    desktopMedia: {
      status: "NOT_CONFIGURED",
      alt: "VITHELO nutrition and aesthetic technology product-world composition",
    },
    mobileMedia: {
      status: "NOT_CONFIGURED",
      alt: "VITHELO product-world composition for mobile",
    },
  },
  partnerPaths: [
    {
      id: "product-partners",
      title: "For Product Partners",
      summary: "Product development, private label, OEM / ODM, and distribution context.",
      intentIds: ["develop", "private-label", "oem-odm", "distribution"],
      preferredChannel: "email",
    },
    {
      id: "professional-partners",
      title: "For Professional Partners",
      summary: "Aesthetic technology, clinic, studio, and professional system context.",
      intentIds: ["professional-systems", "device-distribution"],
      preferredChannel: "whatsapp",
    },
  ],
  capabilities: [
    {
      id: "product-development",
      title: "Product Development",
      summary: "Approved scope and product inputs required.",
      inquiryContext: "Product Development",
    },
    {
      id: "formulation-system",
      title: "Formulation / System Development",
      summary: "Approved formula or system inputs required.",
      inquiryContext: "Formulation / System Development",
    },
    {
      id: "private-label",
      title: "Private Label",
      summary: "Approved category and market inputs required.",
      inquiryContext: "Private Label",
    },
    {
      id: "professional-technology",
      title: "Professional Technology",
      summary: "Approved device and professional-use inputs required.",
      inquiryContext: "Professional Technology",
    },
    {
      id: "distribution-support",
      title: "Distribution Support",
      summary: "Approved portfolio and market inputs required.",
      inquiryContext: "Distribution Support",
    },
  ],
});
