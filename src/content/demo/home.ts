import { HomeContentSchema } from "@/content/schema";

export const demoHome = HomeContentSchema.parse({
  dataStatus: "DEMO_ONLY",
  hero: {
    headline: "WOMEN’S NUTRITION, SHAPED WITH PRECISION.",
    supportingText:
      "A flagship gummy platform for differentiated formulas, brand programs and professional partnerships.",
    primaryAction: {
      label: "START A PROJECT",
      href: "/contact?world=nutrition&subject=Women%E2%80%99s%20gummy%20partnership",
    },
    desktopMedia: {
      status: "DEMO_ONLY",
      src: "/media/vithelo-womens-gummy-hero-desktop.png",
      width: 1536,
      height: 1024,
      alt: "Demo VITHELO women’s gummy bottle with transparent red bear gummies and an adult woman in soft natural light",
    },
    mobileMedia: {
      status: "DEMO_ONLY",
      src: "/media/vithelo-womens-gummy-hero-mobile.png",
      width: 1024,
      height: 1536,
      alt: "Mobile demo composition of a VITHELO women’s gummy bottle, transparent red bear gummies, and an adult woman",
    },
  },
  categoryPaths: [
    {
      id: "sleep-health",
      title: "Sleep Health",
      summary: "Approved category information is required.",
      href: "/nutrition#sleep-health",
    },
    {
      id: "womens-health",
      title: "Women’s Health",
      summary: "Approved category information is required.",
      href: "/nutrition#womens-health",
    },
  ],
  scienceStages: [
    {
      id: "capsule-stage",
      dataStatus: "DEMO_ONLY",
      form: "capsule",
      title: "Capsule form study",
      media: {
        status: "NOT_CONFIGURED",
        alt: "Capsule form media requires approved product assets",
        message: "Capsule form media requires approved product assets.",
      },
      states: [
        {
          label: "FORM",
          summary: "Capsule form details require approved product input.",
          status: "DEMO_ONLY",
        },
        {
          label: "MATERIAL",
          summary: "Material details require approved product input.",
          status: "DEMO_ONLY",
        },
        {
          label: "USE",
          summary: "Use details require approved product input.",
          status: "DEMO_ONLY",
        },
        {
          label: "SAFETY",
          summary: "Safety details require approved product input.",
          status: {
            status: "NOT_CONFIGURED",
            message: "Safety details require approved product input.",
          },
        },
      ],
    },
    {
      id: "gummy-stage",
      dataStatus: "DEMO_ONLY",
      form: "gummy",
      title: "Gummy form study",
      media: {
        status: "NOT_CONFIGURED",
        alt: "Gummy form media requires approved product assets",
        message: "Gummy form media requires approved product assets.",
      },
      states: [
        {
          label: "FORM",
          summary: "Gummy form details require approved product input.",
          status: "DEMO_ONLY",
        },
        {
          label: "MATERIAL",
          summary: "Material details require approved product input.",
          status: "DEMO_ONLY",
        },
        {
          label: "USE",
          summary: "Use details require approved product input.",
          status: "DEMO_ONLY",
        },
        {
          label: "SAFETY",
          summary: "Safety details require approved product input.",
          status: {
            status: "NOT_CONFIGURED",
            message: "Safety details require approved product input.",
          },
        },
      ],
    },
  ],
  humanRhythms: {
    title: "Human rhythms",
    summary: "Human media requires approved adult participant input.",
    media: {
      status: "NOT_CONFIGURED",
      alt: "Adult human-rhythm media requires approved assets",
      message: "Adult human-rhythm media requires approved assets.",
    },
  },
  professionalInquiry: {
    title: "Professional partnership",
    summary: "Professional inquiry channels require approved destinations.",
    href: "/professional",
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
      summary: "Device and professional-use inputs require approval.",
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
