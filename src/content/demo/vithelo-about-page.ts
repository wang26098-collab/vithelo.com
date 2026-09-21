import { B2BAboutPageSchema } from "@/content/schema";

const demoMedia = (
  src: string,
  alt: string,
  width: number,
  height: number,
) => ({ status: "DEMO_ONLY" as const, src, alt, width, height });

export const vitheloB2BAboutPage = B2BAboutPageSchema.parse({
  dataStatus: "DEMO_ONLY",
  hero: {
    kicker: "ABOUT VITHELO",
    title: "About VITHELO",
    copy: "VITHELO is a nutrition OEM / ODM manufacturing partner connecting product ideas with clearer development and production routes.",
    meta: "NUTRITION OEM / ODM · PRODUCT DEVELOPMENT · MANUFACTURING REVIEW",
    media: demoMedia(
      "/media/b2b/sanitized-factory-production-line.jpg",
      "Demonstration manufacturing line in a clean production environment",
      961,
      1280,
    ),
    primaryAction: {
      label: "Capabilities",
      href: "/manufacturing",
    },
    secondaryAction: { label: "Contact", href: "/contact" },
  },
  role: {
    kicker: "ABOUT US",
    title: "Purpose in every decision. Precision in every handoff.",
    copy: "We connect format, formula direction, sensory expectations, packaging and project inputs before a manufacturing route is confirmed.",
    media: demoMedia(
      "/media/b2b/vithelo-active-nutrition-scene-v1.webp",
      "Demonstration VITHELO nutrition pack in a cool-toned routine setting",
      1536,
      1024,
    ),
  },
  principles: [
    {
      title: "Context",
      copy: "Begin with the product goal, dosage form, intended pack and project setting.",
    },
    {
      title: "Precision",
      copy: "Define the inputs, open questions and review boundaries before confirmation.",
    },
    {
      title: "Continuity",
      copy: "Keep development, manufacturing and documentation decisions connected.",
    },
    {
      title: "Collaboration",
      copy: "Coordinate each discipline around one working project brief.",
    },
  ],
  capabilities: {
    kicker: "THE WORK BEHIND THE PRODUCT",
    title: "One project. Multiple disciplines. One clear route.",
    copy: "A useful manufacturing conversation keeps product definition, development, production review and documentation within the same project context.",
    media: demoMedia(
      "/media/b2b/hero-loop-poster.jpg",
      "Demonstration gummy bottling process on a production line",
      1280,
      720,
    ),
    items: [
      {
        title: "Product Definition",
        copy: "Align the format, formula direction, sensory target and packaging brief.",
      },
      {
        title: "Development Review",
        copy: "Discuss feasibility and sample priorities against confirmed inputs.",
      },
      {
        title: "Production Route",
        copy: "Review the manufacturing path once the relevant product decisions are available.",
      },
      {
        title: "Quality & Documents",
        copy: "Define applicable checks and document availability against the confirmed project.",
      },
    ],
  },
  formats: {
    kicker: "DOSAGE FORM RANGE",
    title: "Eight formats. One connected development conversation.",
    copy: "Compare the format that best fits the intended experience, formula direction and pack.",
    media: demoMedia(
      "/media/b2b/vithelo-customization-constellation.webp",
      "Demonstration VITHELO product system with several oral dosage forms",
      1536,
      1024,
    ),
    items: [
      { name: "Gummies", href: "/products/gummies" },
      { name: "Hard Capsules", href: "/products/hard-capsules" },
      { name: "Softgels", href: "/products/softgels" },
      { name: "Tablets", href: "/products/tablets" },
      { name: "Powders", href: "/products/powders" },
      { name: "Liquid Drops", href: "/products/liquids" },
      { name: "Functional Gum", href: "/products/functional-gum" },
      { name: "Oral Films", href: "/products/oral-films" },
    ],
  },
  collaboration: {
    kicker: "CONNECTED SUPPORT",
    title: "Keep the brief intact from first conversation to project review.",
    copy: "Commercial, development, production and quality discussions work best when they share the same approved inputs and open questions.",
    items: [
      {
        title: "Commercial Context",
        copy: "Capture the intended product, volume context and destination questions.",
      },
      {
        title: "Product Development",
        copy: "Translate the brief into format, formula and sample decisions.",
      },
      {
        title: "Production Review",
        copy: "Assess manufacturing fit after the relevant inputs are confirmed.",
      },
      {
        title: "Quality Documentation",
        copy: "Review applicable checks and records within the confirmed scope.",
      },
    ],
  },
  boundary: {
    kicker: "VERIFICATION BOUNDARY",
    title: "Documents before claims.",
    copy: "The public site does not treat unverified company or manufacturing information as proof.",
    items: [
      "Legal company entity requires final confirmation.",
      "Public company address requires final confirmation.",
      "Certification subject, scope and validity require approved records.",
      "Production capacity requires approved production data.",
      "Market coverage requires approved commercial data.",
    ],
  },
  cta: {
    kicker: "START A PROJECT",
    title: "Bring the product direction. We’ll review the route.",
    copy: "Share the dosage form, formula direction, intended pack and expected volume through the configured inquiry channels.",
    action: { label: "Start a Project", href: "/contact" },
  },
});
