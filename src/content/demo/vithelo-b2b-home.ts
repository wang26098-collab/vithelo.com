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
    "brand-statement",
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
    heroVideo: {
      status: "DEMO_VIDEO",
      src: "/media/b2b/hero-loop.mp4",
      poster: "/media/b2b/hero-loop-poster.jpg",
      width: 1280,
      height: 720,
      durationSeconds: 11,
      alt: "Gummy bottling production line, sanitised internal reference",
      label: "Gummy bottling production line · DEMO_VIDEO",
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
    media: {
      status: "DEMO_ONLY",
      src: "/media/b2b/vithelo-project-entry-atmospheric-panorama.webp",
      label:
        "A warm, low-lit product-development workspace moving from formula documents through project definition to abstract sensory materials",
      width: 1536,
      height: 1024,
      format: "WebP",
    },
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
    kicker: "PRODUCT DEFINITION",
    title: "Four decisions. One coherent product.",
    copy:
      "Formula, dosage form, sensory direction and packaging are considered together—so the product brief begins as one connected system.",
    action: { label: "Explore OEM / ODM", href: "/oem-odm" },
    media: {
      status: "DEMO_ONLY",
      src: "/media/b2b/vithelo-formula-customization-atmospheric.webp",
      label:
        "A warm editorial formulation workspace with specification papers, mineral powder and amber material samples",
      width: 1536,
      height: 1024,
      format: "WebP",
    },
    formulaScene: {
      media: {
        status: "DEMO_ONLY",
        src: "/media/b2b/vithelo-formula-customization-atmospheric.webp",
        label:
          "A warm, low-lit formulation workspace with abstract specification papers, mineral powder and amber material samples",
        width: 1536,
        height: 1024,
        format: "WebP",
      },
      details: [
        {
          label: "INGREDIENT DIRECTION",
          copy: "What belongs in the brief",
        },
        {
          label: "SERVING BRIEF",
          copy: "How the concept should be framed",
        },
        {
          label: "FEASIBILITY REVIEW",
          copy: "How the direction fits production",
        },
      ],
    },
    nodes: [
      { title: "Formula", copy: "Define what belongs in the brief." },
      {
        title: "Dosage Form",
        copy: "Choose how the product is used.",
      },
      {
        title: "Sensory Direction",
        copy: "Shape taste, texture and experience.",
      },
      {
        title: "Packaging",
        copy: "Plan protection and presentation.",
      },
    ],
  },
  market: {
    stories: [
      {
        title: "Evening Wellness",
        copy: "Evening nutrition concepts shaped around format, flavor and everyday routines.",
        media: {
          status: "DEMO_ONLY",
          src: "/media/b2b/vithelo-evening-wellness-scene-v1.webp",
          label: "A quiet evening home scene with a VITHELO capsule concept bottle, water and two capsules",
          width: 1536,
          height: 1024,
          format: "WebP",
        },
      },
      {
        title: "Active Nutrition",
        copy: "Portable nutrition formats for movement, training, travel and everyday use.",
        media: {
          status: "DEMO_ONLY",
          src: "/media/b2b/vithelo-active-nutrition-scene-v1.webp",
          label: "An active travel-preparation scene with a VITHELO powder concept jar and two stick packs",
          width: 1536,
          height: 1024,
          format: "WebP",
        },
      },
      {
        title: "Women’s Wellness",
        copy: "Everyday nutrition concepts shaped around women’s routines and life stages.",
        media: {
          status: "DEMO_ONLY",
          src: "/media/b2b/vithelo-womens-wellness-scene-v1.webp",
          label: "A mature woman in a morning routine beside a VITHELO gummy concept bottle and red gummies",
          width: 1448,
          height: 1086,
          format: "WebP",
        },
      },
    ],
  },
  dosage: {
    kicker: "06 · PRODUCT FORMATS",
    title: "One brief. Eight ways to deliver it",
    qualifier:
      "Format selection depends on the formula direction, intended experience, packaging requirements and project review.",
    items: [
      {
        name: "Gummies",
        slug: "gummies",
        tags: ["Chewable", "Fruit", "Pouch"],
        description:
          "Chewable solid doses molded in batch-controlled rooms. Formed in multiple shapes, colors and flavor directions to match the brand brief.",
        media: { status: "FREE_COMMERCIAL_OR_REAL", src: "/media/b2b/format-gummies.webp", label: "VITHELO gummy product format", width: 1536, height: 1024, format: "WebP" },
      },
      {
        name: "Hard Capsules",
        slug: "hard-capsules",
        tags: ["Shell", "Powder", "Vegan"],
        description:
          "Two-piece capsule shells filled with dry, granular or powdered blends. Sized to standard capsule formats and color-coded per project brief.",
        media: { status: "FREE_COMMERCIAL_OR_REAL", src: "/media/b2b/format-hard-capsules.webp", label: "VITHELO hard capsule product format", width: 1536, height: 1024, format: "WebP" },
      },
      {
        name: "Softgels",
        slug: "softgels",
        tags: ["Sealed", "Liquid", "Shaped"],
        description:
          "Hermetically sealed soft gelatin shells encapsulating liquid or semi-solid blends in a single closed unit, available in oval, oblong and round shapes.",
        media: { status: "FREE_COMMERCIAL_OR_REAL", src: "/media/b2b/format-softgels.webp", label: "VITHELO softgel product format", width: 1536, height: 1024, format: "WebP" },
      },
      {
        name: "Tablets",
        slug: "tablets",
        tags: ["Solid", "Coated", "Stacked"],
        description:
          "Compressed solid doses formed under defined pressure and weight. Supplied as rounds, ovals, capsules or custom shapes with optional coating layers.",
        media: { status: "FREE_COMMERCIAL_OR_REAL", src: "/media/b2b/format-tablets.webp", label: "VITHELO tablet product format", width: 1536, height: 1024, format: "WebP" },
      },
      {
        name: "Powders",
        slug: "powders",
        tags: ["Dry", "Stick", "Blend"],
        description:
          "Dry bulk blends prepared in closed transfer lines. Packed in jars, sachets or stick packs and matched to the chosen mixing and filling approach.",
        media: { status: "FREE_COMMERCIAL_OR_REAL", src: "/media/b2b/format-powders.webp", label: "VITHELO powder product format", width: 1536, height: 1024, format: "WebP" },
      },
      {
        name: "Liquids",
        slug: "liquids",
        tags: ["Liquid", "Sachet", "Flavor"],
        description:
          "Liquid concentrates and suspensions prepared in closed filling systems. Packaged in bottles, vials or single-serve sachets per project brief.",
        media: { status: "FREE_COMMERCIAL_OR_REAL", src: "/media/b2b/format-liquids.webp", label: "VITHELO liquid product format", width: 1536, height: 1024, format: "WebP" },
      },
      {
        name: "Functional Gum",
        slug: "functional-gum",
        tags: ["Chewy", "Sugar-free", "Pocket"],
        description:
          "Sugar-free or sweetened gum bases blended with actives, then cut and coated as pieces, sticks or dragées to fit the desired chew profile.",
        media: { status: "FREE_COMMERCIAL_OR_REAL", src: "/media/b2b/format-functional-gum.webp", label: "VITHELO functional gum product format", width: 1536, height: 1024, format: "WebP" },
      },
      {
        name: "Oral Films",
        slug: "oral-films",
        tags: ["Thin", "Dissolvable", "Fast"],
        description:
          "Thin dissolvable strips formed on continuous coating lines, cut to single-dose dimensions and sealed in sachets for individual use.",
        media: { status: "FREE_COMMERCIAL_OR_REAL", src: "/media/b2b/format-oral-films.webp", label: "VITHELO oral film product format", width: 1536, height: 1024, format: "WebP" },
      },
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
  statement: {
    title:
      "From the fresh vitality of daybreak’s first light, to the quiet peace when all the world slips into night.",
    supportingText:
      "Every dawn and dusk of yours, warmth and companionship stay close beside you.",
    action: {
      label: "ABOUT VITHELO",
      href: "/about",
    },
    media: {
      status: "DEMO_ONLY",
      src: "/media/b2b/vithelo-daybreak-nightfall-v3.jpg",
      label:
        "A coastal scene moving from a soft dawn glow on the left across a calm sea into a quiet blue night on the right, with one warm illuminated window in a cliffside home and a faint crescent moon overhead",
      width: 1769,
      height: 889,
      format: "JPEG",
    },
  },
  contact: {
    kicker: "09 · START A PROJECT",
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
