import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { vitheloB2BHome } from "@/content/demo/vithelo-b2b-home";
import { VitheloB2BHomeContentSchema } from "@/content/schema";

const approvedSectionOrder = [
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
];

it("validates the approved English homepage record", () => {
  const parsed = VitheloB2BHomeContentSchema.parse(vitheloB2BHome);

  expect(parsed.sectionOrder).toEqual(approvedSectionOrder);
  expect(parsed.market.stories).toHaveLength(3);
  expect(parsed.dosage.items).toHaveLength(8);
  expect(parsed.dosage.items.slice(-3).map((item) => item.name)).toEqual([
    "Liquids",
    "Functional Gum",
    "Oral Films",
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
  expect(parsed.contact.status).toBe("NOT_CONFIGURED");
});

it("keeps the approved MOQ qualifications", () => {
  const content = JSON.stringify(vitheloB2BHome);

  expect(content).toContain("Flexible MOQ based on formula and packaging.");
  expect(content).toContain("Contact us for MOQ");
  expect(content).not.toMatch(/\d[\d,.]*(?:\s|-)*(?:bottles|capsules|softgels|tablets|kg|metric tons)/i);
});

it("keeps only the approved sleep, active and women product directions", () => {
  expect(vitheloB2BHome.market.title).toBe("From routine to product brief.");
  expect(vitheloB2BHome.market.stories.map((story) => story.title)).toEqual([
    "Sleep, Stress & Mood",
    "Active Nutrition",
    "Women’s Wellness",
  ]);
  expect(vitheloB2BHome.market.stories.map((story) => story.media.src)).toEqual([
    "/media/nutrition-ritual.png",
    "/media/home-membrane.png",
    "/media/vithelo-womens-gummy-hero-desktop.png",
  ]);
  expect(vitheloB2BHome.market.stories.map((story) => story.media.src)).not.toEqual(
    vitheloB2BHome.capacity.products.map((product) => product.media.src),
  );
});

it("defines the approved featured product runway", () => {
  const parsed = VitheloB2BHomeContentSchema.parse(vitheloB2BHome);

  expect(parsed.capacity.kicker).toBe("03 · FEATURED PRODUCTS");
  expect(parsed.capacity.action).toEqual({
    label: "View All Products",
    href: "/products",
  });
  expect(parsed.capacity.products.map((product) => product.title)).toEqual([
    "Sleep Health",
    "Active Nutrition",
    "Women’s Health",
  ]);
  expect(parsed.capacity.products.map((product) => product.media.src)).toEqual([
    "/media/vithelo-product-card-sleep.png",
    "/media/vithelo-product-card-active.png",
    "/media/vithelo-product-card-womens.png",
  ]);
  expect(
    parsed.capacity.products.every((product) => product.action.href === "/contact"),
  ).toBe(true);
  expect(JSON.stringify(parsed.capacity)).not.toMatch(/Shop Now|price|MOQ|Seed/i);
});

it("publishes the approved PDF-backed manufacturing proof record", () => {
  expect(vitheloB2BHome.proof.title).toBe("From Formula to Finished Product");
  expect(vitheloB2BHome.proof.metrics).toEqual([
    { value: "2008", label: "Established" },
    { value: "5,000+", label: "Customers served" },
    { value: "50+", label: "Countries & regions" },
    { value: "7", label: "Production categories" },
  ]);
  expect(vitheloB2BHome.proof.capabilities).toHaveLength(4);
  expect(vitheloB2BHome.proof.action).toEqual({
    label: "Explore Our Factory",
    href: "/manufacturing",
  });
  expect(vitheloB2BHome.proof.media.src).toBe(
    "/media/b2b/sanitized-factory-production-line.jpg",
  );
  expect(JSON.stringify(vitheloB2BHome.proof)).not.toMatch(
    /森酷|Sencool|GMP|HACCP|Halal|ISO|FDA|annual growth|2020|2025/i,
  );
});

it("defines the approved customization constellation", () => {
  const parsed = VitheloB2BHomeContentSchema.parse(vitheloB2BHome);

  expect(parsed.customization.kicker).toBe("04 · CUSTOMIZATION");
  expect(parsed.customization.title).toBe("Tailored to Your Brand.");
  expect(parsed.customization.nodes.map((node) => node.title)).toEqual([
    "Formula",
    "Dosage Form",
    "Flavor & Taste",
    "Packaging",
  ]);
  expect(parsed.customization.benefits.map((benefit) => benefit.title)).toEqual([
    "OEM / ODM",
    "Flexible MOQ",
    "Multi-format Production",
    "Packaging Coordination",
  ]);
  expect(parsed.customization.media.src).toBe(
    "/media/b2b/vithelo-customization-constellation.png",
  );
  expect(
    JSON.stringify([
      parsed.customization.nodes,
      parsed.customization.benefits,
      parsed.customization.media.label,
    ]),
  ).not.toMatch(
    /Fast Sampling|Confidential|certified|Shop Now/i,
  );
});

it("defines the approved featured format wall", () => {
  const parsed = VitheloB2BHomeContentSchema.parse(vitheloB2BHome);

  expect(parsed.dosage.title).toBe("One system. Eight expressions.");
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
  expect(parsed.dosage.items.every((item) => item.media.width > 0)).toBe(true);
  expect(parsed.dosage.items.every((item) => item.media.height > 0)).toBe(true);
  expect(JSON.stringify(parsed.dosage)).not.toMatch(
    /price|fast sampling|confidential|certified|GMP|HACCP|FDA|ISO/i,
  );
});

it("uses restrained international copy without direct American-market targeting", () => {
  const publicContent = JSON.stringify(vitheloB2BHome);

  expect(vitheloB2BHome.hero.title).toBe(
    "VITHELO — Nutrition OEM / ODM Manufacturer",
  );
  expect(vitheloB2BHome.customization.title).toBe("Tailored to Your Brand.");
  expect(vitheloB2BHome.dosage.title).toBe(
    "One system. Eight expressions.",
  );
  expect(vitheloB2BHome.contact.title).toBe("Tell us what you want to make.");
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
