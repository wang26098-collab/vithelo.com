import { VitheloB2BHomeContentSchema } from "@/content/schema";

export const vitheloB2BHome = VitheloB2BHomeContentSchema.parse({
  dataStatus: "DEMO_ONLY",
  sectionOrder: [
    "hero",
    "proof",
    "capacity-boundary",
    "gummy-stage",
    "solutions",
    "dosage-forms",
    "project-runway",
    "contact",
  ],
  hero: {
    eyebrow: "NUTRITION OEM / ODM MANUFACTURING",
    title: "VITHELO — Nutrition OEM / ODM Manufacturer",
    copy:
      "A manufacturing partner for nutrition brands exploring private-label and OEM / ODM products across formats, formulas and packaging.",
    primaryAction: { label: "Start a Project", href: "/contact" },
    secondaryAction: { label: "Explore Formats", href: "/products" },
    media: {
      status: "FREE_COMMERCIAL_OR_REAL",
      label: "Premium supplement manufacturing atmosphere with copy-safe negative space",
      width: 2560,
      height: 1400,
      format: "WebP",
    },
  },
  proof: {
    kicker: "02 · MANUFACTURING SYSTEM",
    title: "Built to connect development with production.",
    copy:
      "VITHELO brings the core workstreams of a nutrition project into one manufacturing conversation — from product definition and production planning to quality documentation and finished presentation.",
    action: { label: "Explore Manufacturing", href: "/manufacturing" },
    media: {
      status: "FREE_COMMERCIAL_OR_REAL",
      src: "/media/b2b/sanitized-factory-production-line.jpg",
      label: "Clean indoor nutrition production line",
      width: 960,
      height: 1280,
      format: "JPEG",
    },
    workstreams: [
      {
        title: "Product Development",
        copy: "Translate a commercial idea into clear development requirements.",
      },
      {
        title: "Manufacturing Planning",
        copy: "Align the product brief with an appropriate production route.",
      },
      {
        title: "Quality Documentation",
        copy: "Review records and requirements around the needs of the project.",
      },
      {
        title: "Packaging Coordination",
        copy: "Connect the product with its container, label and finished presentation.",
      },
    ],
  },
  entryRoutes: {
    kicker: "03 · WAYS TO START",
    title: "Start from where your product is today.",
    copy:
      "Not every project begins at the same point. The right route depends on what has already been decided — and what still needs to be shaped.",
    action: { label: "Find Your Starting Route", href: "/oem-odm" },
    routes: [
      {
        title: "Private Label",
        copy: "For projects beginning with an established product direction and a defined brand presentation.",
      },
      {
        title: "Adapt & Differentiate",
        copy: "For projects refining selected parts of the formula direction, sensory experience, format or pack.",
      },
      {
        title: "Custom Development",
        copy: "For projects beginning with an audience, a use case and a commercial brief.",
      },
    ],
  },
  customization: {
    kicker: "04 · PRODUCT DEFINITION",
    title: "Four decisions shape one finished product.",
    copy:
      "A product becomes distinctive when formula, delivery experience, sensory direction and packaging are developed as one connected brief.",
    action: { label: "Explore OEM / ODM", href: "/oem-odm" },
    media: {
      status: "FREE_COMMERCIAL_OR_REAL",
      src: "/media/b2b/vithelo-customization-constellation.png",
      label: "VITHELO custom nutrition bottle with capsule, softgel, tablet, gummy and powder",
      width: 1536,
      height: 1024,
      format: "PNG",
    },
    nodes: [
      { title: "Formula", copy: "What should the product brief contain?" },
      {
        title: "Dosage Form",
        copy: "How should the product be experienced and used?",
      },
      {
        title: "Sensory Direction",
        copy: "What should taste, texture, color and use feel like?",
      },
      {
        title: "Packaging",
        copy: "How should the product be protected, presented and recognised?",
      },
    ],
  },
  market: {
    kicker: "05 · PRODUCT DIRECTION",
    title: "Begin with the routine, not the ingredient list.",
    intro:
      "A stronger brief begins with a clear moment of use, a defined audience and the role the product should play in everyday life.",
    stories: [
      {
        title: "Evening Routines",
        copy: "Define the moment, frequency and desired product experience before deciding how the concept should be delivered.",
        media: {
          status: "FREE_COMMERCIAL_OR_REAL",
          src: "/media/nutrition-ritual.png",
          label: "Hand reaching for a glass of water in a quiet daily routine",
          width: 1536,
          height: 1024,
          format: "PNG",
        },
      },
      {
        title: "Active Routines",
        copy: "Consider where the product is carried, prepared and used before shaping portability and presentation.",
        media: {
          status: "FREE_COMMERCIAL_OR_REAL",
          src: "/media/home-membrane.png",
          label: "Abstract flowing material suggesting an active product direction",
          width: 1536,
          height: 1024,
          format: "PNG",
        },
      },
      {
        title: "Life-stage Routines",
        copy: "Start with a clearly defined audience and use context, then turn that understanding into a focused development brief.",
        media: {
          status: "FREE_COMMERCIAL_OR_REAL",
          src: "/media/vithelo-womens-gummy-hero-desktop.png",
          label: "Woman beside a VITHELO gummy concept in a bright daily setting",
          width: 1536,
          height: 1024,
          format: "PNG",
        },
      },
    ],
  },
  dosage: {
    kicker: "06 · PRODUCT FORMATS",
    title: "One brief. Eight ways to deliver it.",
    qualifier:
      "Format selection depends on the formula direction, intended experience, packaging requirements and project review.",
    items: [
      { name: "Gummies", slug: "gummies", media: { status: "FREE_COMMERCIAL_OR_REAL", src: "/media/b2b/format-gummies.png", label: "VITHELO gummy product format", width: 1536, height: 1024, format: "PNG" } },
      { name: "Hard Capsules", slug: "hard-capsules", media: { status: "FREE_COMMERCIAL_OR_REAL", src: "/media/b2b/format-hard-capsules.png", label: "VITHELO hard capsule product format", width: 1536, height: 1024, format: "PNG" } },
      { name: "Softgels", slug: "softgels", media: { status: "FREE_COMMERCIAL_OR_REAL", src: "/media/b2b/format-softgels.png", label: "VITHELO softgel product format", width: 1536, height: 1024, format: "PNG" } },
      { name: "Tablets", slug: "tablets", media: { status: "FREE_COMMERCIAL_OR_REAL", src: "/media/b2b/format-tablets.png", label: "VITHELO tablet product format", width: 1536, height: 1024, format: "PNG" } },
      { name: "Powders", slug: "powders", media: { status: "FREE_COMMERCIAL_OR_REAL", src: "/media/b2b/format-powders.png", label: "VITHELO powder product format", width: 1536, height: 1024, format: "PNG" } },
      { name: "Liquids", slug: "liquids", media: { status: "FREE_COMMERCIAL_OR_REAL", src: "/media/b2b/format-liquids.png", label: "VITHELO liquid product format", width: 1536, height: 1024, format: "PNG" } },
      { name: "Functional Gum", slug: "functional-gum", media: { status: "FREE_COMMERCIAL_OR_REAL", src: "/media/b2b/format-functional-gum.png", label: "VITHELO functional gum product format", width: 1536, height: 1024, format: "PNG" } },
      { name: "Oral Films", slug: "oral-films", media: { status: "FREE_COMMERCIAL_OR_REAL", src: "/media/b2b/format-oral-films.png", label: "VITHELO oral film product format", width: 1536, height: 1024, format: "PNG" } },
    ],
  },
  runway: {
    kicker: "07 · PROJECT PATH",
    title: "A clear path from first brief to finished-project review.",
    copy:
      "Each stage resolves a different set of decisions. Requirements remain project-specific until they are reviewed and confirmed.",
    action: { label: "See the OEM / ODM Process", href: "/oem-odm" },
    steps: [
      { title: "Align", copy: "Clarify the product direction, intended market, preferred format and expected volume." },
      { title: "Develop", copy: "Translate the brief into formula, sensory and manufacturing requirements." },
      { title: "Sample", copy: "Review the sample and identify the adjustments still required." },
      { title: "Confirm", copy: "Confirm the agreed product and packaging specifications." },
      { title: "Produce", copy: "Move the approved project into its coordinated production stage." },
      { title: "Review & Release", copy: "Review the required finished-product records and coordinate the next delivery step." },
    ],
  },
  contact: {
    kicker: "08 · START A PROJECT",
    title: "Turn your idea into a useful first conversation.",
    copy:
      "Share what you already know. Product direction, preferred format, customization priorities and expected volume are enough to begin — details can remain open.",
    prompts: [
      "Product direction",
      "Preferred format",
      "Customization priorities",
      "Expected volume and target market",
    ],
    formats: [
      "Gummies",
      "Hard Capsules",
      "Softgels",
      "Tablets",
      "Powders",
      "Functional Gum",
      "Liquids",
      "Oral Films",
    ],
    scene: {
      src: "/media/b2b/gummies-pexels-14027295.jpg",
      status: "DEMO_ONLY",
    },
  },
});
