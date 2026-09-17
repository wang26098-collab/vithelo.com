import {
  B2BContactPageSchema,
  B2BInsightsPageSchema,
  B2BOemOdmPageSchema,
  B2BProductsPageSchema,
  B2BSiteContentSchema,
} from "@/content/schema";
import {
  generatedProductCatalog,
  mergeProductCatalog,
} from "@/content/catalog/product-catalog";

const pexelsLicense = "https://www.pexels.com/license/";

const discoveryFormatExamples = [
  ["gummies", "Gummies"], ["jelly", "Jelly"], ["hard-capsules", "Capsules"], ["tablets", "Tablets"], ["powders", "Powders"],
  ["softgels", "Softgels"], ["liquids", "Liquid Drops"], ["oral-films", "Oral Films"],
] as const;
const productMediaPairs = [
  ["beauty-gummies-default.png", "beauty-gummies-detail.png"],
  ["beauty-gummies-default.png", "beauty-gummies-hand.png"],
  ["beauty-gummies-default.png", "beauty-gummies-closeup.png"],
  ["beauty-gummies-default.png", "beauty-gummies-routine.png"],
  ["beauty-gummies-default.png", "beauty-gummies-motion.png"],
  ["beauty-gummies-default.png", "beauty-gummies-detail.png"],
  ["beauty-gummies-default.png", "beauty-gummies-hand.png"],
  ["beauty-gummies-default.png", "beauty-gummies-closeup.png"],
  ["beauty-gummies-default.png", "beauty-gummies-routine.png"],
  ["beauty-gummies-default.png", "beauty-gummies-motion.png"],
] as const;

const productRunwayMedia = (fileName: string, alt: string) => ({
  status: "DEMO_ONLY" as const,
  src: `/media/products/beauty-gummies/${fileName}`,
  alt,
  width: 1024,
  height: 1024,
});

// Pool of secondary product shots cycled across concepts so every detail page
// can show four additional angles (包裝 / 配方 / 场景 / 細節). DEMO_ONLY placeholders.
const SECONDARY_SHOTS = [
  "beauty-gummies-closeup.png",
  "beauty-gummies-routine.png",
  "beauty-gummies-hand.png",
  "beauty-gummies-motion.png",
  "beauty-gummies-detail.png",
] as const;

const discoveryMatrix = discoveryFormatExamples.flatMap(([formatSlug, formatName]) =>
  productMediaPairs.map(([defaultImage, hoverImage], index) => {
    const sequence = index + 1;
    const paddedSequence = String(sequence).padStart(2, "0");
    // Pick 4 secondary shots, skipping whichever images are already used as
    // default/hover for this concept so every tile feels distinct.
    const used = new Set([defaultImage, hoverImage]);
    const gallery = SECONDARY_SHOTS.filter((file) => !used.has(file)).slice(0, 4);
    return {
      id: `${formatSlug}-concept-${paddedSequence}`,
      formatSlug,
      formatName,
      sequence,
      title: `Plant-Based ${formatName} Concept ${paddedSequence} for Private Label Nutrition`,
      descriptor: `DEMO_ONLY ${formatName.toLowerCase()} product concept for private-label nutrition. Formula, flavor, packaging, and final specifications require approved project inputs before production.`,
      dataStatus: "DEMO_ONLY" as const,
      parameters: [
        { label: "Product type", value: `${formatName} dietary supplement · DEMO_ONLY` },
        { label: "Flavor", value: "DEMO_ONLY · Requires approved project inputs." },
        { label: "Formula", value: "DEMO_ONLY · Requires approved project inputs." },
        { label: "Net weight", value: "DEMO_ONLY · Requires approved project inputs." },
        { label: "Quantity", value: "DEMO_ONLY · Requires approved project inputs." },
        { label: "Packaging", value: "DEMO_ONLY · Requires approved project inputs." },
        { label: "Color", value: "DEMO_ONLY · Requires approved project inputs." },
        { label: "Storage", value: "Store in a cool, dry place" },
        { label: "Shelf life", value: "DEMO_ONLY · Requires approved project inputs." },
        { label: "Customization", value: "OEM / ODM" },
      ],
      ...(formatSlug === "gummies" ? { media: {
        default: productRunwayMedia(
          defaultImage,
          `Temporary VITHELO Beauty Gummies demo image for ${formatName} concept ${paddedSequence}`,
        ),
        hover: productRunwayMedia(hoverImage, ""),
      },
      gallery: gallery.map((file, galleryIndex) =>
        productRunwayMedia(
          file,
          `Secondary product shot ${galleryIndex + 1} for ${formatName} concept ${paddedSequence}`,
        ),
      ) } : {}),
    };
  }),
);

export const vitheloB2BSite = B2BSiteContentSchema.parse({
  dataStatus: "DEMO_ONLY",
  identity: "Nutrition OEM / ODM manufacturing partner",
  navigation: [
    { label: "Products", href: "/products" },
    { label: "OEM / ODM", href: "/oem-odm" },
    { label: "Manufacturing", href: "/manufacturing" },
    { label: "Insights", href: "/insights" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  requestQuote: { label: "Start a Project", href: "/contact" },
  footerLinks: [
    { label: "Products", href: "/products" },
    { label: "OEM / ODM", href: "/oem-odm" },
    { label: "Manufacturing", href: "/manufacturing" },
    { label: "Insights", href: "/insights" },
    { label: "About", href: "/about" },
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
      moq: "Flexible MOQ based on formula and packaging. Contact us for MOQ.",
    },
    {
      id: "hard-capsules",
      name: "Hard Capsules",
      fit: "Straightforward powder delivery",
      customization: ["Capsule size", "Shell and color", "Fill direction"],
      packaging: "Bottles and bulk formats",
      moq: "Flexible MOQ based on formula and packaging. Contact us for MOQ.",
    },
    {
      id: "softgels",
      name: "Softgels",
      fit: "Oil-based and liquid fills",
      customization: ["Shell", "Color", "Fill direction"],
      packaging: "Bottles and bulk formats",
      moq: "Flexible MOQ based on formula and packaging. Contact us for MOQ.",
    },
    {
      id: "tablets",
      name: "Tablets",
      fit: "Compact and familiar serving formats",
      customization: ["Shape", "Size", "Coating direction"],
      packaging: "Bottles and bulk formats",
      moq: "Flexible MOQ based on formula and packaging. Contact us for MOQ.",
    },
    {
      id: "powders",
      name: "Powders",
      fit: "Flexible serving and flavor systems",
      customization: ["Formula", "Flavor", "Serving size"],
      packaging: "Tubs, pouches and stick packs",
      moq: "Flexible MOQ based on formula and packaging. Contact us for MOQ.",
    },
    {
      id: "liquids",
      name: "Liquids",
      fit: "Measured oral liquid formats",
      customization: ["Formula", "Flavor", "Viscosity direction"],
      packaging: "Bottles, droppers and sachets",
      moq: "Flexible MOQ based on formula and packaging. Contact us for MOQ.",
    },
    {
      id: "functional-gum",
      name: "Functional Gum",
      fit: "Portable chew-based concepts",
      customization: ["Formula", "Flavor", "Piece format"],
      packaging: "Pouches, blisters and containers",
      moq: "Flexible MOQ based on formula and packaging. Contact us for MOQ.",
    },
    {
      id: "oral-films",
      name: "Oral Films",
      fit: "Thin portable strip formats",
      customization: ["Formula direction", "Flavor", "Strip and sachet format"],
      packaging: "Individual sachets and cartons",
      moq: "Flexible MOQ based on formula and packaging. Contact us for MOQ.",
    },
    {
      id: "jelly",
      name: "Jelly",
      fit: "Demonstration format route requiring approved production inputs",
      customization: ["Formula direction", "Texture", "Pack direction"],
      packaging: "Packaging direction to be confirmed",
      moq: "DEMO_ONLY · MOQ requires approved project inputs.",
    },
    {
      id: "sachets",
      name: "Sachets",
      fit: "Portable single-serve format",
      customization: ["Formula direction", "Flavor", "Pack format"],
      packaging: "Individual sachets and cartons",
      moq: "DEMO_ONLY · MOQ requires approved project inputs.",
    },
  ],
  discovery: {
    formats: [
      { slug: "gummies", name: "Gummies" },
      { slug: "jelly", name: "Jelly" },
      { slug: "hard-capsules", name: "Capsules" },
      { slug: "tablets", name: "Tablets" },
      { slug: "powders", name: "Powders" },
      { slug: "softgels", name: "Softgels" },
      { slug: "liquids", name: "Liquid Drops" },
      { slug: "oral-films", name: "Oral Films" },
    ],
    items: mergeProductCatalog(discoveryMatrix, generatedProductCatalog),
  },
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
    copy: "VITHELO connects international nutrition projects with development and production support.",
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
    author: {
      name: "VITHELO Editorial Team" as const,
      role: "Manufacturing Knowledge Editor" as const,
    },
    publishedAt: "2026-08-27",
    updatedAt: "2026-08-27",
    reviewDue: "2027-02-27",
    evidenceStatus: "C0_EDITORIAL_REVIEWED" as const,
    contentFormat: "Buyer Guide",
    commercialDestinations: {
      primary: { label: "Explore all dosage forms", href: "/products" },
      secondary: { label: "Review the OEM / ODM process", href: "/oem-odm" },
    },
    relatedSlugs: ["gummy-development-guide", "prepare-for-an-oem-odm-project"],
    sources: [],
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
        copy: "Review format fit and packaging direction before preparing a project brief.",
        label: "Explore all dosage forms",
        href: "/products" as const,
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
    author: {
      name: "VITHELO Editorial Team" as const,
      role: "Manufacturing Knowledge Editor" as const,
    },
    publishedAt: "2026-08-27",
    updatedAt: "2026-08-27",
    reviewDue: "2027-02-27",
    evidenceStatus: "C0_EDITORIAL_REVIEWED" as const,
    contentFormat: "Project Checklist",
    commercialDestinations: {
      primary: { label: "Review the OEM / ODM process", href: "/oem-odm" },
      secondary: { label: "Prepare your project brief", href: "/contact" },
    },
    relatedSlugs: ["choose-the-right-supplement-format", "how-to-evaluate-a-supplement-manufacturer"],
    sources: [],
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
        label: "Start a Project",
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
    author: {
      name: "VITHELO Editorial Team" as const,
      role: "Manufacturing Knowledge Editor" as const,
    },
    publishedAt: "2026-08-27",
    updatedAt: "2026-08-27",
    reviewDue: "2027-02-27",
    evidenceStatus: "C0_EDITORIAL_REVIEWED" as const,
    contentFormat: "Development Guide",
    commercialDestinations: {
      primary: { label: "Explore gummy manufacturing", href: "/products/gummies" },
      secondary: { label: "Review the OEM / ODM process", href: "/oem-odm" },
    },
    relatedSlugs: ["choose-the-right-supplement-format", "prepare-for-an-oem-odm-project"],
    sources: [],
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
        title: "Consider the gummy as one connected system",
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
        label: "Explore gummy manufacturing",
        href: "/products/gummies" as const,
      },
    ],
  },
  {
    dataStatus: "DEMO_ONLY" as const,
    published: true,
    slug: "how-to-evaluate-a-supplement-manufacturer",
    category: "Buyer Guides",
    title: "How to Evaluate a Supplement Manufacturer",
    summary:
      "Evaluate a supplement manufacturer by matching the proposed product route to documented controls, relevant records and clear commercial assumptions, not by counting badges on a sales page.",
    author: {
      name: "VITHELO Editorial Team" as const,
      role: "Manufacturing Knowledge Editor" as const,
    },
    publishedAt: "2026-09-04",
    updatedAt: "2026-09-04",
    reviewDue: "2026-12-04",
    evidenceStatus: "C1_SOURCED" as const,
    contentFormat: "Supplier Evaluation Guide",
    commercialDestinations: {
      primary: { label: "Review manufacturing", href: "/manufacturing" },
      secondary: { label: "Review quality", href: "/quality" },
    },
    relatedSlugs: ["prepare-for-an-oem-odm-project", "choose-the-right-supplement-format"],
    sources: [
      {
        title: "FDA: Dietary Supplement CGMP Small Entity Compliance Guide",
        url: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/small-entity-compliance-guide-current-good-manufacturing-practice-manufacturing-packaging-labeling",
      },
      {
        title: "FDA: Current Good Manufacturing Practices for Food and Dietary Supplements",
        url: "https://www.fda.gov/food/guidance-regulation-food-and-dietary-supplements/current-good-manufacturing-practices-cgmps-food-and-dietary-supplements",
      },
    ],
    blocks: [
      {
        type: "text" as const,
        title: "Executive answer",
        paragraphs: [
          "A useful manufacturer evaluation connects your exact dosage form, formula direction, packaging and target market to the controls and records that apply to that route. Ask for evidence in context: who issued it, which legal entity and site it covers, what product or activity is in scope, and whether it is current.",
        ],
      },
      {
        type: "list" as const,
        title: "Start with six evaluation questions",
        items: [
          "Does the manufacturer review formula, dosage form and packaging as one production route?",
          "Which specifications must be agreed before sampling and before scale-up?",
          "Which raw-material, in-process and finished-product records apply to this project?",
          "How are master records, batch records and changes controlled for the intended market?",
          "Which entity, facility, activity and dates are covered by each certificate or audit document?",
          "Which commercial assumptions remain open, including pack configuration, order volume and timing?",
        ],
      },
      {
        type: "table" as const,
        title: "Evidence review map",
        columns: ["Area", "What to verify", "Why it matters"],
        rows: [
          ["Product fit", "Format, formula load, serving and pack route", "A general capability list does not confirm project feasibility"],
          ["Process control", "Current procedures and records relevant to the route", "Controls should be traceable to the product being discussed"],
          ["Quality documents", "Document name, issuer, subject, scope and validity", "A logo alone cannot establish applicability"],
          ["Change control", "How sample decisions transfer into production specifications", "Uncontrolled changes create scale-up risk"],
          ["Commercial route", "Volume, packaging, destination and open assumptions", "MOQ and timing depend on the complete route"],
        ],
      },
      {
        type: "text" as const,
        title: "Manufacturing perspective",
        paragraphs: [
          "Supplier due diligence should follow the proposed product, not a generic factory checklist. For dietary-supplement projects subject to FDA 21 CFR Part 111, the guidance discusses written master manufacturing records for each unique formulation and batch size, as well as controls that support batch history. Requirements differ by product and destination, so buyers should confirm the applicable regulatory route with qualified advisers.",
          "This article describes an evaluation method. It does not claim that VITHELO holds a particular certification, operates a particular facility or can supply every document listed for every project.",
        ],
      },
      {
        type: "faq" as const,
        items: [
          {
            title: "Is a certification logo enough to qualify a manufacturer?",
            copy: "No. Check the named entity, facility or activity, scope, issuer, issue and expiry dates, and whether the document applies to the proposed product route.",
          },
          {
            title: "Should buyers ask for every possible quality document?",
            copy: "Ask for documents relevant to the product, market and agreed route. A focused request is easier to evaluate than an unstructured folder of unrelated files.",
          },
          {
            title: "Can a manufacturer confirm MOQ before reviewing packaging?",
            copy: "A preliminary range may be discussed, but formula, dosage form, pack components and production assumptions can all affect the viable order route. VITHELO-specific MOQ figures are not published until verified for a project.",
          },
        ],
      },
      {
        type: "cta" as const,
        title: "Review the manufacturing route",
        copy: "Use the public manufacturing and quality pages to prepare the questions that apply to your brief.",
        label: "Review manufacturing",
        href: "/manufacturing" as const,
      },
    ],
  },
  {
    dataStatus: "DEMO_ONLY" as const,
    published: true,
    slug: "private-label-vs-custom-formulation",
    category: "Product Development",
    title: "Private Label vs Custom Formulation: Which Route Fits Your Project?",
    summary:
      "Private label usually fits projects that can work from an existing product direction, while custom formulation fits projects that need a distinct formula brief. The right route depends on how fixed the concept is, which decisions need validation and how much development uncertainty the buyer can manage.",
    author: {
      name: "VITHELO Editorial Team" as const,
      role: "Manufacturing Knowledge Editor" as const,
    },
    publishedAt: "2026-09-04",
    updatedAt: "2026-09-04",
    reviewDue: "2027-03-04",
    evidenceStatus: "C0_EDITORIAL_REVIEWED" as const,
    contentFormat: "Development Route Comparison",
    commercialDestinations: {
      primary: { label: "Explore OEM / ODM", href: "/oem-odm" },
      secondary: { label: "Explore dosage forms", href: "/products" },
    },
    relatedSlugs: ["prepare-for-an-oem-odm-project", "how-supplement-sampling-works"],
    sources: [],
    blocks: [
      {
        type: "text" as const,
        title: "Executive answer",
        paragraphs: [
          "Choose private label when the project can accept an existing product direction and the main work is fit, format and packaging alignment. Choose custom formulation when the formula brief itself must be developed around specific requirements. If serving, ingredient compatibility or dosage form feasibility is still unclear, begin with a manufacturing review before naming the route.",
        ],
      },
      {
        type: "table" as const,
        title: "Private label and custom formulation decision map",
        columns: ["Decision variable", "Private label route", "Custom formulation route"],
        rows: [
          ["Project maturity", "The concept can work from an existing product direction", "The formula direction is part of the product differentiation"],
          ["Development flexibility", "Selection and fit decisions are more important than rebuilding the formula", "Ingredient, serving and sensory decisions require development work"],
          ["Sampling purpose", "Confirm product and packaging fit for the intended brief", "Test whether the proposed formula and experience work together"],
          ["Commercial uncertainty", "Still depends on format, pack and order assumptions", "Includes added uncertainty from formula feasibility and revisions"],
          ["Buyer preparation", "Define the acceptable product direction and brand requirements", "Define objectives, fixed constraints and areas open to manufacturer input"],
        ],
      },
      {
        type: "list" as const,
        title: "Private label is usually the stronger starting point when",
        items: [
          "The buyer can evaluate an existing product direction against the intended market and brand position",
          "Formula uniqueness is less important than format, pack and launch fit",
          "The team can state which product attributes are acceptable and which are not",
          "The manufacturer can review the proposed route without redesigning the complete formula brief",
        ],
      },
      {
        type: "list" as const,
        title: "Custom formulation is usually the stronger starting point when",
        items: [
          "The formula direction is central to the product concept",
          "Serving, ingredient compatibility, taste or texture needs development review",
          "The team can separate fixed requirements from preferences that remain flexible",
          "The buyer accepts that feasibility findings may change the original brief",
        ],
      },
      {
        type: "text" as const,
        title: "Manufacturing perspective",
        paragraphs: [
          "The route name does not settle the production route. Dosage form, formula direction, serving, packaging and expected volume still need to be reviewed together. A private-label idea can become complex when the pack or market requirements change, while a focused custom brief can be easier to assess than a vague request for a unique product.",
          "VITHELO does not publish a stock-formula count, fixed MOQ, sample duration or production timeline. Those conditions require a confirmed project review.",
        ],
      },
      {
        type: "list" as const,
        title: "Prepare these decisions for a feasibility review",
        items: [
          "Target dosage form and intended use experience",
          "Formula requirements that are fixed and those that are flexible",
          "Preferred packaging and count direction",
          "Target market context and commercial assumptions",
          "What must make the product distinct from available alternatives",
        ],
      },
      {
        type: "cta" as const,
        title: "Choose a development route from the brief",
        copy: "Review the OEM / ODM path, then share the decisions that are fixed and the questions that remain open.",
        label: "Explore OEM / ODM",
        href: "/oem-odm" as const,
      },
    ],
  },
  {
    dataStatus: "DEMO_ONLY" as const,
    published: true,
    slug: "how-supplement-sampling-works",
    category: "Product Development",
    title: "How Supplement Sampling Typically Works",
    summary:
      "Supplement sampling is a development validation stage. It checks whether defined formula, dosage form and sensory targets can work together before scale-up, while recording which decisions are approved, which remain open and which may change the production route.",
    author: {
      name: "VITHELO Editorial Team" as const,
      role: "Manufacturing Knowledge Editor" as const,
    },
    publishedAt: "2026-09-04",
    updatedAt: "2026-09-04",
    reviewDue: "2027-03-04",
    evidenceStatus: "C0_EDITORIAL_REVIEWED" as const,
    contentFormat: "Sampling Process Guide",
    commercialDestinations: {
      primary: { label: "Review the OEM / ODM process", href: "/oem-odm" },
      secondary: { label: "Prepare your project", href: "/contact" },
    },
    relatedSlugs: ["prepare-for-an-oem-odm-project", "private-label-vs-custom-formulation"],
    sources: [],
    blocks: [
      {
        type: "text" as const,
        title: "Executive answer",
        paragraphs: [
          "A supplement sample is not only a taste check. It is a controlled development reference used to evaluate defined formula, format and sensory targets. Before sampling, the team should record what is fixed and flexible. After review, approvals and requested changes should be documented before scale-up assumptions are confirmed.",
        ],
      },
      {
        type: "list" as const,
        title: "1. Define the sampling brief",
        items: [
          "Dosage form and intended serving direction",
          "Formula or ingredient direction",
          "Sensory targets such as taste, texture, appearance or mix experience where relevant",
          "Packaging direction that may constrain size, count or handling",
          "Target market context and decisions that require separate review",
        ],
      },
      {
        type: "callout" as const,
        title: "Record fixed and flexible inputs",
        copy: "A useful sample brief distinguishes requirements that cannot change from preferences that can move if feasibility, sensory performance or packaging fit requires adjustment.",
      },
      {
        type: "text" as const,
        title: "2. Build and review the first development reference",
        paragraphs: [
          "The first sample tests the current brief, not every future production condition. Review it against the agreed questions: Does the format suit the serving? Are the sensory targets directionally correct? Does the piece, capsule or portion align with the intended pack? Which observations require a formula or process decision?",
        ],
      },
      {
        type: "table" as const,
        title: "What a sample can and cannot confirm",
        columns: ["Sampling can help validate", "Sampling does not automatically confirm"],
        rows: [
          ["Direction of taste, texture, appearance or use experience", "Final commercial production timing"],
          ["Whether the current brief needs adjustment", "A fixed MOQ or packaging availability"],
          ["A reference for approved product attributes", "That every scale-up parameter is already closed"],
          ["Which decisions must be documented next", "Market compliance without the applicable review"],
        ],
      },
      {
        type: "list" as const,
        title: "3. Close the record before scale-up",
        items: [
          "Record the sample version and the attributes reviewed",
          "Separate approved decisions from requested changes",
          "Confirm which changes affect formula, format, packaging or commercial assumptions",
          "Resolve the specifications needed for the next manufacturing review",
          "Keep open items visible instead of treating silence as approval",
        ],
      },
      {
        type: "text" as const,
        title: "Manufacturing perspective",
        paragraphs: [
          "Scale-up is a separate manufacturing decision. A sample can provide an approved development reference, but production settings, material availability, pack components and finished specifications still need to be aligned. Changes made after sample approval should be assessed for their effect on the whole route.",
          "VITHELO does not publish fixed sample timing, fees, revision counts, courier policies or laboratory procedures. These details are confirmed only within an approved project scope.",
        ],
      },
      {
        type: "cta" as const,
        title: "Prepare the next sampling decision",
        copy: "Use the OEM / ODM path to organize the brief, then share the format, formula direction, pack and open questions.",
        label: "Review the OEM / ODM process",
        href: "/oem-odm" as const,
      },
    ],
  },
  {
    dataStatus: "DEMO_ONLY" as const,
    published: true,
    slug: "gummies-vs-hard-capsules",
    category: "Dosage Formats",
    title: "Gummies vs Hard Capsules for Private-Label Projects",
    summary:
      "Choose gummies when a chewable, flavor-led experience is central to the concept and the project can support sensory development. Choose hard capsules when swallowing a measured fill suits the formula and brand experience. Formula load, serving, packaging and differentiation should be reviewed before either route is confirmed.",
    author: {
      name: "VITHELO Editorial Team" as const,
      role: "Manufacturing Knowledge Editor" as const,
    },
    publishedAt: "2026-09-04",
    updatedAt: "2026-09-04",
    reviewDue: "2027-03-04",
    evidenceStatus: "C0_EDITORIAL_REVIEWED" as const,
    contentFormat: "Dosage Form Comparison",
    commercialDestinations: {
      primary: { label: "Explore gummy manufacturing", href: "/products/gummies" },
      secondary: { label: "Explore hard capsule manufacturing", href: "/products/hard-capsules" },
    },
    relatedSlugs: ["choose-the-right-supplement-format", "gummy-development-guide"],
    sources: [],
    blocks: [
      {
        type: "text" as const,
        title: "Executive answer",
        paragraphs: [
          "Gummies fit concepts where chew, flavor, texture and visual identity are part of the product experience. Hard capsules fit concepts where a swallowed format and measured fill better match the brief. Neither is universally simpler: the formula load, serving, sensory work, packaging and commercial route determine project fit.",
        ],
      },
      {
        type: "table" as const,
        title: "Gummies and hard capsules side by side",
        columns: ["Decision variable", "Gummies", "Hard capsules"],
        rows: [
          ["Consumer experience", "Chewed; flavor and texture are visible parts of use", "Swallowed; shell and fill support a more neutral sensory route"],
          ["Formula and serving", "Ingredient load must work with the gummy base, piece size and serving count", "Fill volume, material properties, capsule size and serving count must align"],
          ["Taste considerations", "Taste masking, sweetness, flavor and texture require active review", "The shell reduces direct taste exposure, but odor and fill behavior may still matter"],
          ["Appearance", "Shape, color and surface finish can contribute to differentiation", "Shell size, color and presentation can support identification and brand direction"],
          ["Packaging", "Protection, count, piece behavior and pack format are reviewed together", "Count, capsule protection and pack format must suit the fill and market route"],
          ["Development complexity", "Sensory and physical attributes interact with the formula", "Fill feasibility and capsule size interact with the formula and serving"],
        ],
      },
      {
        type: "list" as const,
        title: "A gummy route is more likely to fit when",
        items: [
          "The chewable experience is central to the product concept",
          "Flavor, texture, shape or color supports meaningful differentiation",
          "The formula direction can be assessed within the intended piece and serving",
          "The buyer is prepared to define sensory targets and review trade-offs",
        ],
      },
      {
        type: "list" as const,
        title: "A hard capsule route is more likely to fit when",
        items: [
          "A swallowed format fits the intended consumer routine",
          "The project does not depend on a flavored or chewable experience",
          "The fill, capsule size and serving count can be aligned",
          "A simpler visual product format supports the brand and packaging direction",
        ],
      },
      {
        type: "text" as const,
        title: "Manufacturing perspective",
        paragraphs: [
          "Do not transfer the same formula brief between gummies and hard capsules without review. Each format creates different questions about material behavior, available load, serving, sensory exposure and packaging. A manufacturer should assess the complete route rather than selecting a format from appearance alone.",
          "This comparison explains general development trade-offs. It does not claim a specific VITHELO capacity, MOQ, lead time or confirmed feasibility for either format.",
        ],
      },
      {
        type: "list" as const,
        title: "Bring these inputs to the format review",
        items: [
          "Formula or ingredient direction and intended serving",
          "Preferred use experience: chew or swallow",
          "Sensory requirements and acceptable trade-offs",
          "Packaging and count direction",
          "Expected volume and target market context",
        ],
      },
      {
        type: "cta" as const,
        title: "Compare the two manufacturing routes",
        copy: "Review the gummy and hard capsule commercial pages, then bring the formula, serving and pack assumptions into an OEM / ODM discussion.",
        label: "Explore gummy manufacturing",
        href: "/products/gummies" as const,
      },
    ],
  },
  {
    dataStatus: "DEMO_ONLY" as const,
    published: true,
    slug: "what-documents-buyers-should-ask-for",
    category: "Manufacturing & Quality",
    title: "What Documents Should Supplement Buyers Ask For?",
    summary:
      "Ask for documents that match the proposed product, manufacturing site and destination market. Review the named subject, scope, issuer, dates and product applicability rather than treating a certificate name or logo as sufficient evidence.",
    author: { name: "VITHELO Editorial Team" as const, role: "Manufacturing Knowledge Editor" as const },
    publishedAt: "2026-09-04",
    updatedAt: "2026-09-04",
    reviewDue: "2026-12-04",
    evidenceStatus: "C1_SOURCED" as const,
    contentFormat: "Document Due Diligence Guide",
    commercialDestinations: {
      primary: { label: "Review quality", href: "/quality" },
      secondary: { label: "Review manufacturing", href: "/manufacturing" },
    },
    relatedSlugs: ["how-to-evaluate-a-supplement-manufacturer"],
    sources: [
      {
        title: "FDA: Dietary Supplement CGMP Small Entity Compliance Guide",
        url: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/small-entity-compliance-guide-current-good-manufacturing-practice-manufacturing-packaging-labeling",
      },
      {
        title: "FDA: Dietary Supplement Labeling Guide",
        url: "https://www.fda.gov/food/dietary-supplements-guidance-documents-regulatory-information/dietary-supplement-labeling-guide",
      },
    ],
    blocks: [
      {
        type: "text" as const,
        title: "Executive answer",
        paragraphs: [
          "A document request should follow the exact product route. Buyers commonly need to review business identity, quality-system records, certificates, specifications, test-related records, ingredient documentation, label information and batch records. The relevant set depends on the product, site, market and stage of the project; this is not a claim that every supplier holds every document.",
        ],
      },
      {
        type: "table" as const,
        title: "Document categories and what they can show",
        columns: ["Category", "Review purpose", "Key limitation"],
        rows: [
          ["Identity records", "Connect the contracting or manufacturing party to a legal identity", "A company record does not prove manufacturing scope"],
          ["Quality-system documents", "Explain applicable procedures, responsibilities and controls", "A general manual may not establish product-specific execution"],
          ["Certificates", "Show an issuer's statement for a named subject and scope", "The name alone does not establish current project applicability"],
          ["Specifications and COA records", "Define requirements or report results for an identified material or batch", "Check version, batch identity, methods and acceptance context"],
          ["Ingredient and raw-material records", "Support identity, specification and supplier review", "Relevance depends on the actual formula and market"],
          ["Label and market documents", "Support review of the intended presentation and destination", "Requirements vary by market and product"],
          ["Batch and production records", "Connect an agreed process to a specific production history", "Availability and content depend on the applicable route"],
        ],
      },
      {
        type: "list" as const,
        title: "Check these fields before accepting a document",
        items: [
          "Document name, reference number and current version",
          "Legal entity, manufacturing site or activity named as the subject",
          "Issuer or issuing body and a way to validate the record",
          "Standard, scope and any exclusions or annexes",
          "Issue date, expiry date and current status",
          "Relevant dosage form, product, activity and destination market",
          "Relationship between the document and the supplier proposing the project",
        ],
      },
      {
        type: "text" as const,
        title: "Certification scope and validity",
        paragraphs: [
          "Review certification as a scoped record, not a transferable badge. Confirm the named subject, which site or activity was assessed, the standard and scope, the issuer, and whether the record is current. A certificate for a different entity, location, activity or expired period may not support the proposed project.",
          "FDA dietary supplement requirements are a regulatory framework, not a manufacturer certification designation. For projects subject to FDA requirements, use current FDA materials to understand the applicable CGMP and labeling context, then obtain qualified regulatory advice for the specific product.",
        ],
      },
      {
        type: "list" as const,
        title: "Incomplete evidence and comparison red flags",
        items: [
          "A logo or certificate title without the complete document",
          "A subject name that cannot be connected to the proposed manufacturer or site",
          "Missing scope pages, annexes, dates or issuer details",
          "A product specification without version control or product identity",
          "A test record without a clear sample or batch reference",
          "Different suppliers compared using different document criteria",
        ],
      },
      {
        type: "text" as const,
        title: "Manufacturing perspective",
        paragraphs: [
          "Record document name, subject, site, scope, dates, product relevance, market relevance and open questions in the same supplier-comparison sheet. This keeps evidence review connected to the formula, dosage form, packaging and production route instead of reducing due diligence to badge counting.",
          "This guide describes buyer due diligence. It does not state that VITHELO holds or can provide every document discussed here; VITHELO-specific certification and document claims remain unverified for public use.",
        ],
      },
      {
        type: "cta" as const,
        title: "Connect the evidence request to your project",
        copy: "Review the quality and manufacturing pages, then identify which records are relevant to your product and destination.",
        label: "Review quality",
        href: "/quality" as const,
      },
    ],
  },
  {
    dataStatus: "DEMO_ONLY" as const,
    published: true,
    slug: "what-information-to-include-in-an-rfq",
    category: "Buyer Guides",
    title: "What Information Should You Include in a Supplement RFQ?",
    summary:
      "A useful supplement RFQ identifies the product scope, dosage form, formula direction, target market, estimated quantity, packaging direction and open commercial questions. It can still be useful when some technical decisions remain open, provided those unknowns are clearly marked.",
    author: { name: "VITHELO Editorial Team" as const, role: "Manufacturing Knowledge Editor" as const },
    publishedAt: "2026-09-04",
    updatedAt: "2026-09-04",
    reviewDue: "2027-03-04",
    evidenceStatus: "C0_EDITORIAL_REVIEWED" as const,
    contentFormat: "RFQ Preparation Guide",
    commercialDestinations: {
      primary: { label: "Prepare your project", href: "/contact" },
      secondary: { label: "Review OEM / ODM", href: "/oem-odm" },
    },
    relatedSlugs: ["prepare-for-an-oem-odm-project", "private-label-vs-custom-formulation"],
    sources: [],
    blocks: [
      {
        type: "text" as const,
        title: "Executive answer",
        paragraphs: [
          "For an initial RFQ review, provide enough context to define the route: company and contact details, product or dosage form, formula direction, target market, estimated quantity, packaging direction and the questions you need answered. Mark undecided items as open rather than delaying contact until every specification is final.",
        ],
      },
      {
        type: "table" as const,
        title: "Essential, helpful and later-stage RFQ inputs",
        columns: ["Input stage", "Information", "How it helps"],
        rows: [
          ["Essential for first review", "Contact, product concept, dosage form or options, market and quantity context", "Defines who is buying and the broad manufacturing route"],
          ["Helpful for first review", "Formula or ingredients, serving direction, packaging, sample needs and references", "Reveals feasibility questions and sourcing dependencies"],
          ["Can remain open", "Final flavor, artwork, exact component, final specification and launch details", "Lets the manufacturer identify decisions without assuming they are approved"],
          ["Commercial questions", "MOQ basis, development scope, documentation, timing dependencies and quotation assumptions", "Clarifies what the buyer expects the response to address"],
        ],
      },
      {
        type: "list" as const,
        title: "A structured RFQ can include",
        items: [
          "Company name, contact name and work email",
          "Target market and any known label or regulatory context",
          "Preferred dosage form or the formats being compared",
          "Formula, ingredient or product direction and intended serving",
          "Estimated order quantity or a planning range",
          "Packaging format, pack count and any existing component references",
          "Sampling requirement and the decisions the sample should help resolve",
          "Commercial questions and required document categories",
          "Attachments such as a product brief, formula draft, packaging reference or artwork status",
        ],
      },
      {
        type: "text" as const,
        title: "Why a price-only request is hard to assess",
        paragraphs: [
          "A request such as 'send me your price' leaves the quoted unit, formula, format, pack and volume undefined. A better first message gives a usable scope and lists open assumptions. The manufacturer can then identify what must be clarified before feasibility or commercial terms can be assessed.",
          "This guide is narrower than the OEM / ODM preparation guide. The preparation guide helps shape the broad project brief; this page organizes the information used for a formal quotation request.",
        ],
      },
      {
        type: "list" as const,
        title: "Before sending, label each assumption",
        items: [
          "Confirmed: already approved internally",
          "Preferred: the current direction but open to alternatives",
          "To be proposed: the supplier should recommend options",
          "Unknown: a dependency or question still needs investigation",
        ],
      },
      {
        type: "text" as const,
        title: "Manufacturing perspective",
        paragraphs: [
          "A useful RFQ lets formula, format, quantity, packaging and market be reviewed together. It does not require a finished technical dossier. Clear unknowns are more actionable than invented precision, because they show where development, sourcing or regulatory review may still be required.",
          "VITHELO does not publish fixed quotation response times, sampling periods, MOQ figures or production lead times. Email and WhatsApp are the current contact routes; the on-site brief form is not configured for submission.",
        ],
      },
      {
        type: "cta" as const,
        title: "Continue to the project brief",
        copy: "Bring the confirmed inputs, preferred directions and open questions into the current contact route.",
        label: "Prepare your project",
        href: "/contact" as const,
      },
    ],
  },
  {
    dataStatus: "DEMO_ONLY" as const,
    published: true,
    slug: "how-packaging-affects-moq-and-lead-time",
    category: "Packaging & Launch",
    title: "How Packaging Affects Supplement MOQ and Lead Time",
    summary:
      "Packaging can change MOQ and project timing because the product run, packaging components and packing operation may each have different constraints. The applicable minimum is shaped by the most restrictive dependency, while timing changes with sourcing, printing, tooling, approval and production sequencing.",
    author: { name: "VITHELO Editorial Team" as const, role: "Manufacturing Knowledge Editor" as const },
    publishedAt: "2026-09-04",
    updatedAt: "2026-09-04",
    reviewDue: "2027-03-04",
    evidenceStatus: "C0_EDITORIAL_REVIEWED" as const,
    contentFormat: "Commercial Variables Guide",
    commercialDestinations: {
      primary: { label: "Explore product formats", href: "/products" },
      secondary: { label: "Review OEM / ODM", href: "/oem-odm" },
    },
    relatedSlugs: ["prepare-for-an-oem-odm-project", "what-information-to-include-in-an-rfq"],
    sources: [],
    blocks: [
      {
        type: "text" as const,
        title: "Executive answer",
        paragraphs: [
          "Packaging affects MOQ and lead time by adding component, printing, tooling, approval and packing dependencies to the product route. A project may face a product-run minimum, a packaging-component minimum and an operating constraint; the highest applicable constraint can shape the viable order. Exact conditions remain project-specific.",
        ],
      },
      {
        type: "table" as const,
        title: "Three constraints that buyers should separate",
        columns: ["Constraint", "What it relates to", "Buyer question"],
        rows: [
          ["Product MOQ", "Formula, dosage form, batch setup and intended production run", "What product quantity can be made under the proposed route?"],
          ["Packaging component MOQ", "Bottle, cap, pouch, label, carton, sachet or other sourced component", "What quantity must be purchased or printed for each component?"],
          ["Production and packing constraint", "Line setup, pack count, changeover and sequencing", "How does the selected pack operate with the product run?"],
        ],
      },
      {
        type: "table" as const,
        title: "Packaging choices and possible dependencies",
        columns: ["Packaging direction", "Possible dependency", "Review before quotation"],
        rows: [
          ["Stock bottle or closure", "Availability, size, material and compatibility", "Confirm the current component specification and pack count"],
          ["Custom bottle, closure or shape", "Tooling, supplier minimum, samples and approval", "Separate tool and component assumptions from the product run"],
          ["Applied label", "Label material, print quantity, artwork and application", "Confirm dimensions, finishes, versions and approval status"],
          ["Printed container, pouch or carton", "Print setup, material sourcing, color proof and component minimum", "Confirm print specification and ownership of artwork approval"],
          ["Sachet or stick pack", "Material structure, fill compatibility, print and packing setup", "Confirm serving, dimensions and the applicable operating route"],
          ["Multi-component pack", "Several suppliers, assembly steps and coordinated availability", "Map the longest or most restrictive dependency"],
        ],
      },
      {
        type: "text" as const,
        title: "Stock versus custom packaging",
        paragraphs: [
          "A stock component may reduce tooling or custom-print dependencies, but it still requires availability, specification and compatibility review. A custom component may add sourcing, samples, tooling, proofing or approval. This does not mean every custom project is slower; it means the schedule contains different dependencies that must be confirmed.",
        ],
      },
      {
        type: "list" as const,
        title: "What can change project timing",
        items: [
          "Formula development or sample approval before the production route is fixed",
          "Component sourcing and confirmation of current availability",
          "Tooling, physical samples or compatibility review for a custom component",
          "Artwork, print files, color proofing and label or market review",
          "Coordination of multiple components before packing can begin",
          "Production and packing sequence after product and components are ready",
        ],
      },
      {
        type: "list" as const,
        title: "Decide these points before requesting a quotation",
        items: [
          "Dosage form, serving direction and estimated product quantity",
          "Preferred pack type and acceptable stock alternatives",
          "Pack count, component sizes and case-pack assumptions",
          "Label versus direct print and current artwork status",
          "Custom tooling, shape or finish requirements",
          "Which decisions are confirmed and which require supplier options",
        ],
      },
      {
        type: "text" as const,
        title: "Manufacturing perspective",
        paragraphs: [
          "Ask for the product MOQ, each component MOQ, the quantity that will actually be used, and any leftover-component assumption as separate lines. For timing, ask which steps occur before manufacturing, which depend on packaging approval and which begin only after components are available.",
          "This article explains general variables. It does not publish a VITHELO MOQ, sampling time, lead time, packaging inventory or capability list; all project-specific terms require review.",
        ],
      },
      {
        type: "cta" as const,
        title: "Review format and packaging together",
        copy: "Explore the product formats, then include the preferred pack, quantity context and open dependencies in your project brief.",
        label: "Explore product formats",
        href: "/products" as const,
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
