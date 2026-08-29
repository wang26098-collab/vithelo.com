import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { vitheloB2BHome } from "@/content/demo/vithelo-b2b-home";
import { VitheloB2BHomeContentSchema } from "@/content/schema";

const approvedSectionOrder = [
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
];

it("validates the approved English eleven-section homepage record", () => {
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
  for (const value of [
    "500 bottles",
    "60,000-100,000",
    "300,000",
    "100,000",
    "100 kg",
    "2 metric tons",
  ]) {
    expect(content).toContain(value);
  }
});

it("uses restrained international copy without direct American-market targeting", () => {
  const publicContent = JSON.stringify(vitheloB2BHome);

  expect(vitheloB2BHome.hero.title).toBe(
    "Your nutrition product, from first brief to finished batch.",
  );
  expect(vitheloB2BHome.gummy.title).toBe(
    "Gummies give your brand room to be distinctive.",
  );
  expect(vitheloB2BHome.dosage.title).toBe("One factory. Eight product formats.");
  expect(vitheloB2BHome.contact.title).toBe("Tell us what you want to make.");
  expect(publicContent).not.toMatch(
    /(?:\bU\.S\.|\bUSA\b|\bUnited States\b|\bAmerican\b|\bAmerica\b)/i,
  );
});

it("does not mutate the approved standalone preview", () => {
  const html = readFileSync(
    resolve("vithelo-homepage-work/VITHELO_Homepage_FullPreview_V1.html"),
  );

  expect(createHash("sha256").update(html).digest("hex").toUpperCase()).toBe(
    "CBFACFC55211E266AC72D0E2AEE03AAED84A61A38934480446866906DF6C1649",
  );
});
