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
    kicker: "02 · Manufacturing Capability",
    title: "From Formula to Finished Product",
    copy:
      "A manufacturing partner for nutrition products, bringing development, multi-format production and delivery into one coordinated system.",
    action: {
      label: "Explore Our Factory",
      href: "/manufacturing",
    },
    media: {
      status: "FREE_COMMERCIAL_OR_REAL",
      src: "/media/b2b/sanitized-factory-production-line.jpg",
      label: "Clean indoor nutrition production line",
      width: 960,
      height: 1280,
      format: "JPEG",
    },
    metrics: [
      { value: "2008", label: "Established" },
      { value: "5,000+", label: "Customers served" },
      { value: "50+", label: "Countries & regions" },
      { value: "7", label: "Production categories" },
    ],
    capabilities: [
      {
        title: "R&D Support",
        copy: "Formula development and sample coordination",
      },
      {
        title: "Multi-format Production",
        copy: "Gummies, capsules, tablets, powders and liquids",
      },
      {
        title: "Quality Control",
        copy: "Process control, batch inspection and traceability",
      },
      {
        title: "OEM / ODM Delivery",
        copy: "Packaging coordination and production delivery",
      },
    ],
  },
  capacity: {
    kicker: "03 · FEATURED PRODUCTS",
    title: "Three directions. Built into flagship products.",
    copy:
      "A focused starting range for brands developing daily nutrition products across distinct consumer routines.",
    action: { label: "View All Products", href: "/products" },
    products: [
      {
        id: "sleep",
        title: "Sleep Health",
        copy: "Evening-format concepts shaped around a clear daily routine.",
        media: {
          status: "FREE_COMMERCIAL_OR_REAL",
          src: "/media/vithelo-product-card-sleep.png",
          label: "VITHELO Sleep Health bottle in a quiet evening setting",
          width: 443,
          height: 550,
          format: "PNG",
        },
        action: { label: "Discuss This Product", href: "/contact" },
      },
      {
        id: "active",
        title: "Active Nutrition",
        copy: "Portable product concepts for energy, hydration and recovery routines.",
        media: {
          status: "FREE_COMMERCIAL_OR_REAL",
          src: "/media/vithelo-product-card-active.png",
          label: "VITHELO Active Nutrition bottle in a training-inspired setting",
          width: 1127,
          height: 1396,
          format: "PNG",
        },
        action: { label: "Discuss This Product", href: "/contact" },
      },
      {
        id: "women",
        title: "Women’s Health",
        copy:
          "Daily nutrition concepts developed around a defined life-stage or wellness brief.",
        media: {
          status: "FREE_COMMERCIAL_OR_REAL",
          src: "/media/vithelo-product-card-womens.png",
          label: "VITHELO Women’s Health bottle in a soft sculptural setting",
          width: 571,
          height: 609,
          format: "PNG",
        },
        action: { label: "Discuss This Product", href: "/contact" },
      },
    ],
  },
  customization: {
    kicker: "04 · CUSTOMIZATION",
    title: "Tailored to Your Brand.",
    copy:
      "From formula and format to taste and packaging, VITHELO coordinates the key decisions behind a distinctive nutrition product.",
    primaryAction: { label: "Start Your Customization", href: "/contact" },
    secondaryAction: { label: "Explore Customization", href: "/oem-odm" },
    media: {
      status: "FREE_COMMERCIAL_OR_REAL",
      src: "/media/b2b/vithelo-customization-constellation.png",
      label: "VITHELO custom nutrition bottle with capsule, softgel, tablet, gummy and powder",
      width: 1536,
      height: 1024,
      format: "PNG",
    },
    nodes: [
      { title: "Formula", copy: "Ingredients · Serving · Product brief" },
      {
        title: "Dosage Form",
        copy: "Gummies · Capsules · Tablets · Powders · Liquids",
      },
      { title: "Flavor & Taste", copy: "Flavor · Sweetness · Texture · Color" },
      { title: "Packaging", copy: "Bottles · Pouches · Boxes · Labels" },
    ],
    benefits: [
      { title: "OEM / ODM", copy: "Flexible development routes" },
      { title: "Flexible MOQ", copy: "Based on formula and packaging" },
      {
        title: "Multi-format Production",
        copy: "One coordinated manufacturing system",
      },
      {
        title: "Packaging Coordination",
        copy: "From container to finished presentation",
      },
    ],
  },
  market: {
    kicker: "05 · Product Directions",
    title: "From routine to product brief.",
    stories: [
      {
        title: "Sleep, Stress & Mood",
        copy:
          "Begin with the evening routine, then define the format, flavor and packaging around the intended use case.",
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
        title: "Active Nutrition",
        copy:
          "Begin with where the product is used, then shape portability, format and packaging around that routine.",
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
        title: "Women’s Wellness",
        copy:
          "Begin with a defined life-stage or wellness use case, then translate it into a focused development brief.",
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
    kicker: "06 · Product Formats",
    title: "One system. Eight expressions.",
    qualifier:
      "Explore eight product formats through one coordinated manufacturing system. Flexible MOQ based on formula and packaging. Contact us for MOQ.",
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
