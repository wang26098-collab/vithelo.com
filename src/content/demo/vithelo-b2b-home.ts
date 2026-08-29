import { VitheloB2BHomeContentSchema } from "@/content/schema";

export const vitheloB2BHome = VitheloB2BHomeContentSchema.parse({
  dataStatus: "DEMO_ONLY",
  sectionOrder: [
    "hero",
    "proof",
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
    eyebrow: "GUMMY-FIRST NUTRITION OEM / ODM",
    title: "Your nutrition product, from first brief to finished batch.",
    copy:
      "VITHELO develops and manufactures gummies and seven other oral formats, with formula, sampling, packaging and production managed in one system.",
    primaryAction: { label: "Start a Project", href: "/contact" },
    secondaryAction: {
      label: "Explore Formats",
      href: "/products",
    },
    media: {
      status: "REQUIRED_REAL_ASSET",
      label: "Hero image with left copy space and unbranded or VITHELO gummy samples",
      width: 2560,
      height: 1120,
      format: "WebP",
    },
  },
  proof: [
    { label: "Manufacturing since", value: "2008" },
    { label: "Clients served", value: "5,000+" },
    { label: "Countries and markets", value: "50+" },
    { label: "Custom gummy projects from", value: "500", suffix: "bottles" },
  ],
  gummy: {
    kicker: "03 · Gummy Expertise",
    title: "Gummies give your brand room to be distinctive.",
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
        copy: "Ingredients, serving and audience considered together",
      },
      {
        title: "Shape System",
        copy: "Standard molds or a custom shape",
      },
      {
        title: "Taste & Texture",
        copy: "Pectin or gelatin, balanced for the formula",
      },
      {
        title: "Color & Flavor",
        copy: "A recognizable expression for your brand",
      },
      {
        title: "Packaging Fit",
        copy: "Bottles, pouches and practical pack sizes",
      },
      { title: "MOQ", copy: "Custom projects from 500 bottles" },
    ],
  },
  market: {
    kicker: "04 · Product Directions",
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
    kicker: "05 · Product Formats",
    title: "One factory. Eight product formats.",
    qualifier:
      "Flexible MOQ based on formula and packaging. Contact us for MOQ.",
    items: [
      { name: "Gummies", moq: "Custom projects from 500 bottles" },
      { name: "Hard Capsules", moq: "60,000-100,000 capsules" },
      { name: "Softgels", moq: "300,000 softgels" },
      { name: "Tablets", moq: "100,000 tablets" },
      { name: "Powders", moq: "100 kg" },
      { name: "Liquids", moq: "Contact us for MOQ" },
      { name: "Functional Gum", moq: "2 metric tons" },
      { name: "Oral Films", moq: "Contact us for MOQ" },
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
        value: "5,000+",
        note: "metric tons / year",
      },
      {
        label: "Hard Capsules",
        value: "54B+",
        note: "pieces / year · verify before launch",
      },
      {
        label: "Tablets",
        value: "36B+",
        note: "pieces / year · verify before launch",
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
    kicker: "09 · 6-Step Project Runway",
    title: "Six clear steps from brief to delivery.",
    steps: [
      {
        title: "Brief",
        copy: "Set the format, formula direction, pack and volume.",
      },
      {
        title: "Develop",
        copy: "Review the formula and production requirements.",
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
        copy: "Schedule and run the production batch.",
      },
      {
        title: "Deliver",
        copy: "Inspect, release and coordinate delivery.",
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
    kicker: "11 · Start a Project",
    title: "Tell us what you want to make.",
    copy:
      "Share the format, formula direction, packaging needs and expected volume. Our sales team will review the project and confirm the right production route and MOQ.",
    pendingMessage: "Contact details pending approval · NOT_CONFIGURED",
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
