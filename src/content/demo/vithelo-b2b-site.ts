import {
  B2BContactPageSchema,
  B2BInsightsPageSchema,
  B2BOemOdmPageSchema,
  B2BProductsPageSchema,
  B2BSiteContentSchema,
} from "@/content/schema";

const pexelsLicense = "https://www.pexels.com/license/";

export const vitheloB2BSite = B2BSiteContentSchema.parse({
  dataStatus: "DEMO_ONLY",
  identity: "Factory-owned overseas brand and export team",
  navigation: [
    { label: "Products", href: "/products" },
    { label: "OEM / ODM", href: "/oem-odm" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/contact" },
  ],
  requestQuote: { label: "Request Quote", href: "/contact" },
  footerLinks: [
    { label: "Products", href: "/products" },
    { label: "OEM / ODM", href: "/oem-odm" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/contact" },
  ],
  disclosure:
    "DEMO_ONLY · Contact details, certifications and production records require final verification before launch.",
});

export const vitheloB2BProductsPage = B2BProductsPageSchema.parse({
  dataStatus: "DEMO_ONLY",
  hero: {
    kicker: "PRODUCT CAPABILITIES",
    title: "Gummy-first. Built across eight product formats.",
    copy: "Choose the format, formula direction and pack that fit your project. VITHELO reviews manufacturing feasibility before confirming the route.",
  },
  gummy: {
    title: "A flexible format for a distinctive product.",
    copy: "Gummy projects can align formula, texture, shape, flavor, color and packaging in one development brief.",
    media: {
      status: "FREE_COMMERCIAL",
      src: "/media/b2b/gummies-pexels-14027295.jpg",
      alt: "Unbranded gummy supplements on a white surface",
      sourceUrl:
        "https://www.pexels.com/photo/close-up-shot-of-supplement-gummies-on-white-surface-14027295/",
      creator: "Supplements On Demand",
      licenseUrl: pexelsLicense,
      width: 2048,
      height: 2048,
    },
    dimensions: [
      { title: "Formula", copy: "Ingredient direction and serving context" },
      { title: "Base", copy: "Pectin or gelatin review" },
      { title: "Shape", copy: "Standard molds or custom development" },
      { title: "Taste", copy: "Flavor and texture alignment" },
      { title: "Color", copy: "Product and brand expression" },
      { title: "Pack", copy: "Bottle, pouch and count review" },
    ],
  },
  formats: [
    {
      id: "gummies",
      name: "Gummies",
      fit: "Consumer-friendly daily formats",
      customization: ["Formula", "Shape", "Flavor and color"],
      packaging: "Bottles and pouches",
      moq: "Custom projects from 500 bottles",
    },
    {
      id: "hard-capsules",
      name: "Hard Capsules",
      fit: "Straightforward powder delivery",
      customization: ["Capsule size", "Shell and color", "Fill direction"],
      packaging: "Bottles and bulk formats",
      moq: "60,000-100,000 capsules",
    },
    {
      id: "softgels",
      name: "Softgels",
      fit: "Oil-based and liquid fills",
      customization: ["Shell", "Color", "Fill direction"],
      packaging: "Bottles and bulk formats",
      moq: "300,000 softgels",
    },
    {
      id: "tablets",
      name: "Tablets",
      fit: "Compact and familiar serving formats",
      customization: ["Shape", "Size", "Coating direction"],
      packaging: "Bottles and bulk formats",
      moq: "100,000 tablets",
    },
    {
      id: "powders",
      name: "Powders",
      fit: "Flexible serving and flavor systems",
      customization: ["Formula", "Flavor", "Serving size"],
      packaging: "Tubs, pouches and stick packs",
      moq: "100 kg",
    },
    {
      id: "liquids",
      name: "Liquids",
      fit: "Measured oral liquid formats",
      customization: ["Formula", "Flavor", "Viscosity direction"],
      packaging: "Bottles, droppers and sachets",
      moq: "Contact us for MOQ",
    },
    {
      id: "functional-gum",
      name: "Functional Gum",
      fit: "Portable chew-based concepts",
      customization: ["Formula", "Flavor", "Piece format"],
      packaging: "Pouches, blisters and containers",
      moq: "2 metric tons",
    },
    {
      id: "oral-films",
      name: "Oral Films",
      fit: "Thin portable strip formats",
      customization: ["Formula direction", "Flavor", "Strip and sachet format"],
      packaging: "Individual sachets and cartons",
      moq: "Contact us for MOQ",
    },
  ],
  comparison: [
    {
      criterion: "Use experience",
      guidance: "Chew, swallow, mix, measure or dissolve",
    },
    {
      criterion: "Formula fit",
      guidance: "Review ingredient form, serving size and sensory limits",
    },
    {
      criterion: "Packaging fit",
      guidance: "Balance protection, count, transport and shelf presentation",
    },
    {
      criterion: "Production fit",
      guidance: "Confirm formula, pack and volume together before MOQ",
    },
  ],
  packaging: [
    {
      title: "Bottles",
      copy: "A practical route for gummies, capsules, softgels and tablets",
    },
    {
      title: "Pouches",
      copy: "Flexible packs for gummies, powders and functional gum",
    },
    { title: "Stick packs", copy: "Portioned powder and liquid directions" },
    {
      title: "Sachets",
      copy: "Individual oral film and selected liquid formats",
    },
  ],
  moqNote: "Flexible MOQ based on formula and packaging.",
  cta: {
    title: "Not sure which format fits your project?",
    copy: "Share the use case, formula direction, pack and volume. We will review the practical route.",
    href: "/contact",
  },
});

export const vitheloB2BOemOdmPage = B2BOemOdmPageSchema.parse({
  dataStatus: "DEMO_ONLY",
  hero: {
    kicker: "OEM / ODM",
    title: "From product brief to finished batch.",
    copy: "One project path connects formula review, sampling, packaging alignment, production and release.",
  },
  identity: {
    title: "A direct line to the manufacturing team.",
    copy: "VITHELO is the factory-owned overseas brand and export team, connecting international projects with development and production.",
  },
  steps: [
    {
      title: "01 · Requirement Review",
      copy: "Clarify format, formula direction, pack and expected volume.",
    },
    {
      title: "02 · Formula Development",
      copy: "Review the formula against product and manufacturing needs.",
    },
    {
      title: "03 · Sample Confirmation",
      copy: "Evaluate samples and agree on required adjustments.",
    },
    {
      title: "04 · Packaging Alignment",
      copy: "Match container, label and transport requirements.",
    },
    {
      title: "05 · Production",
      copy: "Move the confirmed project into the agreed production route.",
    },
    {
      title: "06 · Inspection & Delivery",
      copy: "Review finished-product records and project-specific delivery needs.",
    },
  ],
  customization: [
    {
      title: "Formula Direction",
      copy: "Ingredients, serving context and product objective",
    },
    {
      title: "Sensory Design",
      copy: "Flavor, color, shape and texture where applicable",
    },
    {
      title: "Dosage Format",
      copy: "Eight oral formats within one manufacturing system",
    },
    {
      title: "Packaging Alignment",
      copy: "Container, count, label and transport considerations",
    },
  ],
  production: [
    {
      title: "Project Review",
      copy: "Manufacturing fit is reviewed before the route is confirmed.",
    },
    {
      title: "Controlled Handoffs",
      copy: "Development, sample and packaging decisions move into production records.",
    },
    {
      title: "Multi-format Capability",
      copy: "Gummies lead the offer, supported by seven additional oral formats.",
    },
    {
      title: "Documented Release",
      copy: "Available documents depend on current factory records and project needs.",
    },
  ],
  quality: [
    {
      title: "Raw Material",
      copy: "Identity, specification and supplier documentation review",
    },
    {
      title: "In Process",
      copy: "Production checks defined by the confirmed process",
    },
    {
      title: "Finished Product",
      copy: "Finished-product review and batch documentation",
    },
    {
      title: "Third-party Testing",
      copy: "Configured only when the project and approved provider require it",
    },
  ],
  checklist: [
    "Target dosage format",
    "Formula direction",
    "Packaging format",
    "Estimated volume",
    "Target timing",
  ],
  faqs: [
    {
      title: "How is MOQ confirmed?",
      copy: "MOQ is reviewed with the formula and packaging. Use the published format figures as project starting points, not unconditional commitments.",
    },
    {
      title: "Can VITHELO support sampling?",
      copy: "Sampling belongs to the project path; the exact scope is confirmed after the requirement review.",
    },
    {
      title: "Can packaging be coordinated?",
      copy: "Packaging alignment can cover container, label and transport requirements within the confirmed project scope.",
    },
    {
      title: "Which documents are available?",
      copy: "Document availability depends on current factory records, the product and the destination requirements.",
    },
    {
      title: "What lead time should we plan for?",
      copy: "Timing is assessed after formula, pack, sample and production requirements are clear.",
    },
  ],
  cta: {
    title: "Bring us the brief, not a finished answer.",
    copy: "Share what is known. The first review will identify the decisions still needed.",
    href: "/contact",
  },
});

const articles = [
  {
    dataStatus: "DEMO_ONLY" as const,
    published: true,
    slug: "choose-the-right-supplement-format",
    category: "Dosage Formats",
    title: "How to Choose the Right Supplement Format",
    summary:
      "A practical comparison of use experience, formula fit, packaging and production volume.",
    byline: "VITHELO",
    updatedAt: "2026-08-27",
    contentFormat: "Buyer Guide",
    blocks: [
      {
        type: "text" as const,
        title: "Start with the way the product will be used",
        paragraphs: [
          "Format is not a cosmetic decision. It affects serving size, sensory experience, packaging and production feasibility.",
          "A useful brief connects the consumer routine with the formula and the commercial pack.",
        ],
      },
      {
        type: "table" as const,
        title: "Format decision map",
        columns: ["Question", "What it changes"],
        rows: [
          ["Chew, swallow, mix or measure?", "The shortlist of practical formats"],
          ["How large is the serving?", "Piece count, capsule count or powder volume"],
          ["Does taste matter?", "Flavor, sweetener and texture work"],
          ["How will it be packed?", "Protection, count and transport requirements"],
        ],
      },
      {
        type: "callout" as const,
        title: "MOQ follows the whole project",
        copy: "Formula and packaging can change the viable production route. Confirm them together.",
      },
      {
        type: "faq" as const,
        items: [
          {
            title: "Is gummy always the easiest choice?",
            copy: "No. Gummies offer a distinctive experience, but formula load, taste and texture must be reviewed.",
          },
          {
            title: "Can one formula move between formats?",
            copy: "The ingredient list may be a starting point, but each format requires its own feasibility review.",
          },
        ],
      },
      {
        type: "cta" as const,
        title: "Compare the eight VITHELO formats",
        copy: "Review capabilities and project starting MOQs before sending a brief.",
        href: "/contact" as const,
      },
    ],
  },
  {
    dataStatus: "DEMO_ONLY" as const,
    published: true,
    slug: "prepare-for-an-oem-odm-project",
    category: "Buyer Guides",
    title: "What to Prepare Before Starting an OEM / ODM Project",
    summary: "Five inputs that make the first manufacturing review clearer and faster.",
    byline: "VITHELO",
    updatedAt: "2026-08-27",
    contentFormat: "Project Checklist",
    blocks: [
      {
        type: "text" as const,
        title: "A useful brief can still be incomplete",
        paragraphs: [
          "You do not need a finished specification before the first conversation.",
          "You do need enough context for the factory to identify the right questions and production route.",
        ],
      },
      {
        type: "list" as const,
        title: "Bring these five inputs",
        items: [
          "Target dosage format",
          "Formula or ingredient direction",
          "Preferred packaging",
          "Estimated order volume",
          "Target timing and destination context",
        ],
      },
      {
        type: "callout" as const,
        title: "Separate fixed decisions from open decisions",
        copy: "Mark what is already approved and what still needs manufacturing guidance.",
      },
      {
        type: "faq" as const,
        items: [
          {
            title: "Do I need finished artwork?",
            copy: "No. Packaging direction is enough for the first review; artwork requirements can be aligned later.",
          },
          {
            title: "Do I need a final formula?",
            copy: "No. A formula direction can begin the feasibility discussion.",
          },
        ],
      },
      {
        type: "cta" as const,
        title: "Prepare your project brief",
        copy: "Use the contact structure to organize the first manufacturing review.",
        href: "/contact" as const,
      },
    ],
  },
  {
    dataStatus: "DEMO_ONLY" as const,
    published: true,
    slug: "gummy-development-guide",
    category: "Product Development",
    title: "Gummy Development: Formula, Texture, Shape and Packaging",
    summary:
      "The linked decisions behind a gummy that works for the formula, the production line and the brand.",
    byline: "VITHELO",
    updatedAt: "2026-08-27",
    contentFormat: "Development Guide",
    blocks: [
      {
        type: "media" as const,
        media: {
          status: "FREE_COMMERCIAL" as const,
          src: "/media/b2b/gummies-pexels-14027295.jpg",
          alt: "Unbranded gummy supplements on a white surface",
          sourceUrl:
            "https://www.pexels.com/photo/close-up-shot-of-supplement-gummies-on-white-surface-14027295/",
          creator: "Supplements On Demand",
          licenseUrl: pexelsLicense,
          width: 2048,
          height: 2048,
        },
      },
      {
        type: "text" as const,
        title: "Treat the gummy as one connected system",
        paragraphs: [
          "Formula load, base, sweetness, flavor, shape and pack affect one another.",
          "A change in one area can create a new decision elsewhere, so the project should be reviewed as a whole.",
        ],
      },
      {
        type: "list" as const,
        title: "The six linked decisions",
        items: [
          "Ingredient and serving direction",
          "Pectin or gelatin base",
          "Shape and piece size",
          "Flavor and sweetness",
          "Color direction",
          "Bottle, pouch and count",
        ],
      },
      {
        type: "callout" as const,
        title: "Start from the use case",
        copy: "A recognizable shape or flavor only works when the product still fits the formula and daily routine.",
      },
      {
        type: "cta" as const,
        title: "Start a gummy project",
        copy: "Share the formula direction, desired experience, pack and estimated volume.",
        href: "/contact" as const,
      },
    ],
  },
];

export const vitheloB2BInsightsPage = B2BInsightsPageSchema.parse({
  dataStatus: "DEMO_ONLY",
  hero: {
    kicker: "INSIGHTS",
    title: "Practical guidance for product decisions.",
    copy: "Buyer guides connect format, formula, packaging and manufacturing questions without turning unverified claims into proof.",
  },
  categories: [
    "Product Development",
    "Dosage Formats",
    "Packaging & Launch",
    "Manufacturing & Quality",
    "Buyer Guides",
  ],
  articles,
});

export const vitheloB2BContactPage = B2BContactPageSchema.parse({
  dataStatus: "DEMO_ONLY",
  status: "NOT_CONFIGURED",
  hero: {
    kicker: "START A PROJECT",
    title: "Tell us what you want to make.",
    copy: "Share the format, formula direction, packaging needs and expected volume. The manufacturing route and MOQ are reviewed together.",
  },
  fields: [
    "Name / Company",
    "Work Email",
    "Target Market",
    "Dosage Format",
    "Formula Direction",
    "Packaging Needs",
    "Estimated Volume",
    "Project Brief",
  ],
  formats: [
    "Gummies",
    "Hard Capsules",
    "Softgels",
    "Tablets",
    "Powders",
    "Liquids",
    "Functional Gum",
    "Oral Films",
  ],
  pendingMessage: "Email, WhatsApp and inquiry submission are not configured.",
});
