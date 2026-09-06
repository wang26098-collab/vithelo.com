import { VitheloB2BHomeContentSchema } from "@/content/schema";

export const vitheloB2BHome = VitheloB2BHomeContentSchema.parse({
  dataStatus: "DEMO_ONLY",
  sectionOrder: [
    "hero",
    "proof",
    "capacity-dashboard",
    "gummy-stage",
    "solutions",
    "dosage-forms",
    "custom-development",
    "manufacturing",
    "quality",
    "project-runway",
    "company-fit",
    "contact",
  ],
  hero: {
    eyebrow: "NUTRITION OEM / ODM MANUFACTURING",
    title: "VITHELO — Nutrition OEM / ODM Manufacturer",
    copy:
      "A manufacturing partner for nutrition brands exploring private-label and OEM / ODM products across formats, formulas and packaging.",
    primaryAction: { label: "Start a Project", href: "/contact" },
    secondaryAction: {
      label: "Explore Formats",
      href: "/products",
    },
    media: {
      status: "FREE_COMMERCIAL_OR_REAL",
      label: "Premium supplement manufacturing atmosphere with copy-safe negative space",
      width: 2560,
      height: 1400,
      format: "WebP",
    },
  },
  proof: {
    kicker: "03 · Manufacturing environment",
    title: "Manufacturing, made visible.",
    copy:
      "A closer view of the environment, materials and coordinated work behind a nutrition product.",
    summary: "A working environment for nutrition products and project teams.",
    sourceBoundary:
      "Scene-led brand expression; specific site and production claims remain subject to the approved evidence boundary.",
    media: {
      status: "FREE_COMMERCIAL_OR_REAL",
      src: "/media/b2b/gummies-pexels-14027295.jpg",
      label: "Material and product handling scene",
      width: 2400,
      height: 1600,
      format: "WebP",
    },
    items: [
      { label: "Environment", value: "Material-led work" },
      { label: "Process", value: "Format-aware thinking" },
      { label: "Packaging", value: "Project context" },
      { label: "Collaboration", value: "Built around the brief" },
    ],
  },
  capacity: {
    kicker: "03 · Capability boundary",
    title: "Understand the scope before you brief the project.",
    sourceBoundary:
      "Specific capacity, site, employee, client, market and export claims remain not configured pending verification.",
    metrics: [
      { label: "Dosage formats", value: 8, prefix: "", suffix: "" },
      { label: "Softgels / year", value: 50, prefix: "", suffix: "B" },
      { label: "Gummies / year", value: 5000, prefix: "", suffix: "+ t" },
      { label: "Tablets / year", value: 36, prefix: "", suffix: "B" },
    ],
    steps: [
      { label: "Dosage formats", copy: "Format coverage is reviewed against the actual product brief." },
      { label: "Development routes", copy: "Concept, formula and sampling routes depend on the project." },
      { label: "Manufacturing scope", copy: "Production applicability is confirmed for the selected format and site." },
      { label: "Evidence status", copy: "Public claims remain pending until the evidence is approved." },
    ],
  },
  gummy: {
    kicker: "04 · Gummy Expertise",
    title: "A flexible format for daily nutrition brands.",
    media: {
      status: "FREE_COMMERCIAL_OR_REAL",
      label: "Real gummy macro asset",
      width: 2400,
      height: 1400,
      format: "WebP",
    },
    features: [
      {
        title: "Formula Direction",
        copy: "Ingredients, serving and use case planned together",
      },
      {
        title: "Shape System",
        copy: "Standard molds or a custom shape route",
      },
      {
        title: "Taste & Texture",
        copy: "Pectin or gelatin, balanced for the formula",
      },
      {
        title: "Color & Flavor",
        copy: "A recognizable expression for the brand",
      },
      {
        title: "Packaging Fit",
        copy: "Bottles, pouches and practical pack sizes",
      },
      { title: "MOQ", copy: "Flexible by formula and packaging" },
    ],
  },
  market: {
    kicker: "05 · Product Directions",
    title: "Products shaped around real consumer routines.",
    stories: [
      {
        title: "Women’s Wellness",
        copy:
          "Daily nutrition, life-stage support and beauty routines, developed around a clear use case.",
        media: {
          status: "FREE_COMMERCIAL_OR_REAL",
          src: "/media/b2b/gummies-pexels-14027295.jpg",
          label: "Lifestyle asset",
          width: 2000,
          height: 1500,
          format: "WebP",
        },
      },
      {
        title: "Sleep, Stress & Mood",
        copy:
          "Gummies, capsules and powders designed for evening routines and everyday support.",
        media: {
          status: "FREE_COMMERCIAL_OR_REAL",
          src: "/media/b2b/gummies-pexels-14027295.jpg",
          label: "Night routine asset",
          width: 2000,
          height: 1500,
          format: "WebP",
        },
      },
      {
        title: "Beauty From Within",
        copy:
          "Collagen, antioxidants and supporting nutrients in formats made for daily use.",
        media: {
          status: "FREE_COMMERCIAL_OR_REAL",
          src: "/media/b2b/gummies-pexels-14027295.jpg",
          label: "Beauty nutrition asset",
          width: 2000,
          height: 1500,
          format: "WebP",
        },
      },
      {
        title: "Gut & Digestive Health",
        copy:
          "Prebiotics, fiber and digestive ingredients matched with practical serving formats.",
        media: {
          status: "FREE_COMMERCIAL_OR_REAL",
          src: "/media/b2b/gummies-pexels-14027295.jpg",
          label: "Ingredient asset",
          width: 2000,
          height: 1500,
          format: "WebP",
        },
      },
      {
        title: "Daily Essentials",
        copy:
          "Straightforward vitamin and mineral products for everyday nutrition.",
        media: {
          status: "FREE_COMMERCIAL_OR_REAL",
          src: "/media/b2b/gummies-pexels-14027295.jpg",
          label: "Daily ritual asset",
          width: 2000,
          height: 1500,
          format: "WebP",
        },
      },
      {
        title: "Active Nutrition",
        copy:
          "Energy, hydration and recovery products in portable formats.",
        media: {
          status: "FREE_COMMERCIAL_OR_REAL",
          src: "/media/b2b/gummies-pexels-14027295.jpg",
          label: "Active lifestyle asset",
          width: 2000,
          height: 1500,
          format: "WebP",
        },
      },
    ],
  },
  dosage: {
    kicker: "06 · Product Formats",
    title: "One manufacturing system, eight product formats.",
    qualifier:
      "Flexible MOQ based on formula and packaging. Contact us for MOQ.",
    items: [
      { name: "Gummies", moq: "Flexible MOQ based on formula and packaging. Contact us for MOQ." },
      { name: "Hard Capsules", moq: "Flexible MOQ based on formula and packaging. Contact us for MOQ." },
      { name: "Softgels", moq: "Flexible MOQ based on formula and packaging. Contact us for MOQ." },
      { name: "Tablets", moq: "Flexible MOQ based on formula and packaging. Contact us for MOQ." },
      { name: "Powders", moq: "Flexible MOQ based on formula and packaging. Contact us for MOQ." },
      { name: "Liquids", moq: "Flexible MOQ based on formula and packaging. Contact us for MOQ." },
      { name: "Functional Gum", moq: "Flexible MOQ based on formula and packaging. Contact us for MOQ." },
      { name: "Oral Films", moq: "Flexible MOQ based on formula and packaging. Contact us for MOQ." },
    ],
  },
  development: {
    kicker: "06 · Custom Development",
    title: "A formula has to work on paper and on the line.",
    coreTitle: "Formula × Form × Pack",
    coreCopy: "OEM / ODM Development Core",
    notes: [
      {
        title: "Formula Strategy",
        copy: "Ingredients, serving size and target use",
      },
      {
        title: "Sensory Design",
        copy: "Flavor, color, shape, and texture",
      },
      {
        title: "Packaging Fit",
        copy: "Container, label, shelf and transport needs",
      },
      {
        title: "Project Review",
        copy: "MOQ, timing, and manufacturing feasibility",
      },
    ],
  },
  manufacturing: {
    kicker: "07 · Manufacturing Proof",
    title: "Development and production under one manufacturing system.",
    media: {
      status: "REQUIRED_REAL_ASSET",
      label: "Real clean-production panorama",
      width: 2400,
      height: 1350,
      format: "WebP",
    },
    metrics: [
      {
        label: "Gummies",
        value: "Core format",
        note: "Formula, sensory and packaging review",
      },
      {
        label: "Hard Capsules",
        value: "Available",
        note: "Project-specific production review",
      },
      {
        label: "Tablets",
        value: "Available",
        note: "Project-specific production review",
      },
      {
        label: "Other Lines",
        value: "Multi-form",
        note: "liquid, powder, softgel",
      },
    ],
  },
  quality: {
    kicker: "08 · Quality & Compliance",
    title: "Quality recorded at every stage.",
    recordTitle: "From incoming material to finished-product release",
    caveat:
      "Certification scope, testing and export documents depend on current factory records and the requirements of each project.",
    rows: [
      {
        title: "01 · Raw Material",
        copy: "Identity, specification, and supplier documentation",
        state: "Verification",
      },
      {
        title: "02 · In Process",
        copy: "Critical production and process controls",
        state: "Production",
      },
      {
        title: "03 · Finished Product",
        copy: "Finished-product review and batch documentation",
        state: "Release",
      },
      {
        title: "04 · Export Support",
        copy: "Documentation configured by market and project",
        state: "Project-specific",
      },
    ],
  },
  runway: {
    kicker: "07 · OEM / ODM Project Runway",
    title: "Six clear steps from brief to delivery.",
    steps: [
      {
        title: "Brief",
        copy: "Set the format, formula direction, pack and volume.",
      },
      {
        title: "Develop",
        copy: "Review formula, sensory direction and production requirements.",
      },
      {
        title: "Sample",
        copy: "Evaluate the sample and agree on adjustments.",
      },
      {
        title: "Pack",
        copy: "Confirm packaging specifications and artwork.",
      },
      {
        title: "Make",
        copy: "Schedule production with the agreed in-process controls.",
      },
      {
        title: "Deliver",
        copy: "Review finished-product records, release and coordinate delivery.",
      },
    ],
  },
  channels: {
    kicker: "10 · Built for Your Channel",
    title: "Built for brands, sellers and retail teams.",
    paths: [
      {
        label: "PATH A",
        title: "Nutrition Brands",
        copy:
          "Formula development, format selection and packaging built around your product brief.",
      },
      {
        label: "PATH B",
        title: "Cross-Border Sellers",
        copy:
          "Practical launch planning, packaging support and coordinated multi-SKU production.",
      },
      {
        label: "PATH C",
        title: "Retail & Supermarket",
        copy:
          "Stable supply planning, clear specifications and delivery support for larger retail programs.",
      },
    ],
  },
  contact: {
    status: "NOT_CONFIGURED",
    kicker: "08 · Start a Project",
    title: "Tell us what you want to make.",
    copy:
      "Share the format, formula direction, packaging needs and expected volume. Our sales team will review the project and confirm the right production route and MOQ.",
    pendingMessage: "Contact details pending approval · NOT_CONFIGURED",
    scene: {
      src: "/media/b2b/gummies-pexels-14027295.jpg",
      status: "DEMO_ONLY",
    },
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
  },
});
