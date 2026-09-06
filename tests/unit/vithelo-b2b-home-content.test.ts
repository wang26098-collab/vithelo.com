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
  expect(parsed.market.stories).toHaveLength(6);
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

it("defines the source-bounded capacity dashboard without invented trend claims", () => {
  const parsed = VitheloB2BHomeContentSchema.parse(vitheloB2BHome);

  expect(parsed.sectionOrder.slice(0, 4)).toEqual([
    "hero",
    "proof",
    "capacity-dashboard",
    "gummy-stage",
  ]);
  expect(parsed.capacity.title).toBe("Understand the scope before you brief the project.");
  expect(parsed.capacity.metrics).toHaveLength(4);
  expect(parsed.capacity.steps.map((step) => step.label)).toEqual([
    "Dosage formats",
    "Development routes",
    "Manufacturing scope",
    "Evidence status",
  ]);
  expect(parsed.capacity.sourceBoundary).toContain("not configured");
  expect(JSON.stringify(parsed.capacity)).not.toMatch(/audited|2020|2025|annual growth/i);
});

it("publishes a customer-facing manufacturing scene without invented trend claims", () => {
  expect(vitheloB2BHome.proof.title).toBe("Manufacturing, made visible.");
  expect(vitheloB2BHome.proof.items).toEqual([
    { label: "Environment", value: "Material-led work" },
    { label: "Process", value: "Format-aware thinking" },
    { label: "Packaging", value: "Project context" },
    { label: "Collaboration", value: "Built around the brief" },
  ]);
  expect(vitheloB2BHome.proof.summary).toBe("A working environment for nutrition products and project teams.");
  expect(vitheloB2BHome.proof.sourceBoundary).toContain("specific site and production claims");
  expect(JSON.stringify(vitheloB2BHome.proof)).not.toMatch(/audited|annual growth|2020|2025/i);
});

it("uses restrained international copy without direct American-market targeting", () => {
  const publicContent = JSON.stringify(vitheloB2BHome);

  expect(vitheloB2BHome.hero.title).toBe(
    "VITHELO — Nutrition OEM / ODM Manufacturer",
  );
  expect(vitheloB2BHome.gummy.title).toBe(
    "A flexible format for daily nutrition brands.",
  );
  expect(vitheloB2BHome.dosage.title).toBe(
    "One manufacturing system, eight product formats.",
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
