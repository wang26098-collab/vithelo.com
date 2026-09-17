import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { vitheloB2BHome } from "@/content/demo/vithelo-b2b-home";
import { VitheloB2BHomeContentSchema } from "@/content/schema";

const approvedSectionOrder = [
  "hero",
  "proof",
  "capacity-boundary",
  "gummy-stage",
  "solutions",
  "dosage-forms",
  "project-runway",
  "brand-statement",
  "contact",
];

it("validates the nine-section procurement narrative record", () => {
  const parsed = VitheloB2BHomeContentSchema.parse(vitheloB2BHome);

  expect(parsed.sectionOrder).toEqual(approvedSectionOrder);
  expect(parsed.market.stories).toHaveLength(3);
  expect(parsed.dosage.items).toHaveLength(8);
  expect(parsed.runway.steps).toHaveLength(6);
  expect(parsed.contact.prompts).toEqual([
    "Product direction",
    "Preferred format",
    "Customization priorities",
    "Expected volume and target market",
  ]);
  expect(parsed.hero.primaryAction).toEqual({
    label: "Start a Project",
    href: "/contact",
  });
  expect(parsed.hero.secondaryAction).toEqual({
    label: "Explore Formats",
    href: "/products",
  });
  expect(JSON.stringify(parsed)).not.toMatch(/[\u3400-\u9fff]/);
});

it("keeps unsupported manufacturing claims out of the homepage", () => {
  expect(JSON.stringify(vitheloB2BHome)).not.toMatch(
    /2008|5,000\+|50\+|Flexible MOQ|Contact us for MOQ|GMP|HACCP|Halal|ISO|FDA/i,
  );
});

it("defines the manufacturing system as four project workstreams", () => {
  expect(vitheloB2BHome.proof.title).toBe(
    "Built to connect development with production.",
  );
  expect(vitheloB2BHome.proof.workstreams.map((item) => item.title)).toEqual([
    "Product Development",
    "Manufacturing Planning",
    "Quality Documentation",
    "Packaging Coordination",
  ]);
  expect(vitheloB2BHome.proof.action).toEqual({
    label: "Explore Manufacturing",
    href: "/manufacturing",
  });
  expect(vitheloB2BHome.proof.media.src).toBe(
    "/media/b2b/sanitized-factory-production-line.jpg",
  );
});

it("defines three project entry routes without repeating product directions", () => {
  const parsed = VitheloB2BHomeContentSchema.parse(vitheloB2BHome);

  expect(parsed.entryRoutes.kicker).toBe("03 · WAYS TO START");
  expect(parsed.entryRoutes.routes.map((route) => route.title)).toEqual([
    "Private Label",
    "Adapt & Differentiate",
    "Custom Development",
  ]);
  expect(parsed.entryRoutes.action).toEqual({
    label: "Find Your Starting Route",
    href: "/oem-odm",
  });
  expect(JSON.stringify(parsed.entryRoutes)).not.toMatch(
    /Sleep Health|Active Nutrition|Women’s Health|Shop Now|price|MOQ|Seed/i,
  );
});

it("defines four connected product decisions", () => {
  const parsed = VitheloB2BHomeContentSchema.parse(vitheloB2BHome);

  expect(parsed.customization.kicker).toBe("04 · PRODUCT DEFINITION");
  expect(parsed.customization.title).toBe(
    "Four decisions shape one finished product.",
  );
  expect(parsed.customization.nodes.map((node) => node.title)).toEqual([
    "Formula",
    "Dosage Form",
    "Sensory Direction",
    "Packaging",
  ]);
  expect(parsed.customization.action).toEqual({
    label: "Explore OEM / ODM",
    href: "/oem-odm",
  });
  expect(parsed.customization.media.src).toBe(
    "/media/b2b/vithelo-customization-constellation.png",
  );
});

it("keeps three product directions without the removed dark intro content", () => {
  const parsed = VitheloB2BHomeContentSchema.parse(vitheloB2BHome);

  expect(parsed.market.stories.map((story) => story.title)).toEqual([
    "Evening Routines",
    "Active Routines",
    "Life-stage Routines",
  ]);
  expect(parsed.market).not.toHaveProperty("kicker");
  expect(parsed.market).not.toHaveProperty("title");
  expect(parsed.market).not.toHaveProperty("intro");
  expect(parsed.dosage.kicker).toBe("06 · PRODUCT FORMATS");
  expect(parsed.runway.kicker).toBe("07 · PROJECT PATH");
  expect(parsed.statement).toEqual({
    title:
      "From the fresh vitality of daybreak’s first light, to the quiet peace when all the world slips into night.",
    supportingText:
      "Every dawn and dusk of yours, warmth and companionship stay close beside you.",
    media: {
      status: "DEMO_ONLY",
      src: "/media/b2b/vithelo-daybreak-nightfall.png",
      label:
        "A continuous scene moving from soft daybreak into a quiet blue night with one warm illuminated window",
      width: 1536,
      height: 1024,
      format: "PNG",
    },
  });
  expect(parsed.contact.kicker).toBe("09 · START A PROJECT");
  expect(parsed.dosage.title).toBe("One brief. Eight ways to deliver it.");
  expect(parsed.dosage.items.map((item) => item.slug)).toEqual([
    "gummies",
    "hard-capsules",
    "softgels",
    "tablets",
    "powders",
    "liquids",
    "functional-gum",
    "oral-films",
  ]);
  expect(new Set(parsed.dosage.items.map((item) => item.media.src)).size).toBe(8);
});

it("defines one six-stage project path", () => {
  expect(vitheloB2BHome.runway.steps.map((step) => step.title)).toEqual([
    "Align",
    "Develop",
    "Sample",
    "Confirm",
    "Produce",
    "Review & Release",
  ]);
  expect(vitheloB2BHome.runway.action).toEqual({
    label: "See the OEM / ODM Process",
    href: "/oem-odm",
  });
});

it("uses restrained international copy without direct American-market targeting", () => {
  const publicContent = JSON.stringify(vitheloB2BHome);

  expect(vitheloB2BHome.hero.title).toBe(
    "VITHELO — Nutrition OEM / ODM Manufacturer",
  );
  expect(vitheloB2BHome.contact.title).toBe(
    "Turn your idea into a useful first conversation.",
  );
  expect(publicContent).not.toMatch(
    /(?:\bU\.S\.|\bUSA\b|\bUnited States\b|\bAmerican\b|\bAmerica\b)/i,
  );
});

it("does not mutate the approved standalone preview", () => {
  const html = readFileSync(
    resolve(
      "docs/archive/legacy-homepage-preview/VITHELO_Homepage_FullPreview_V1.html",
    ),
  );

  expect(createHash("sha256").update(html).digest("hex").toUpperCase()).toBe(
    "CBFACFC55211E266AC72D0E2AEE03AAED84A61A38934480446866906DF6C1649",
  );
});
