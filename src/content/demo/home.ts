import { HomeContentSchema } from "@/content/schema";

export const demoHome = HomeContentSchema.parse({
  dataStatus: "DEMO_ONLY",
  hero: {
    headline: "Nutrition for the rhythms that shape a life.",
    supportingText:
      "A nutrition-led VITHELO demonstration requires approved product information.",
    primaryAction: "email",
    secondaryAction: "whatsapp",
    desktopMedia: {
      status: "DEMO_ONLY",
      src: "/media/vithelo-hero-composite.png",
      width: 1672,
      height: 941,
      alt: "Demonstration VITHELO nutrition composition",
    },
    mobileMedia: {
      status: "DEMO_ONLY",
      src: "/media/vithelo-hero-composite-mobile.png",
      width: 1122,
      height: 1402,
      alt: "Demonstration VITHELO nutrition composition for mobile",
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
