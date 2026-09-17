import {
  B2BContactPageSchema,
  B2BInsightArticleSchema,
  B2BInsightsPageSchema,
  B2BOemOdmPageSchema,
  B2BProductsPageSchema,
  B2BSiteContentSchema,
} from "@/content/schema";
import {
  vitheloB2BContactPage,
  vitheloB2BInsightsPage,
  vitheloB2BOemOdmPage,
  vitheloB2BProductsPage,
  vitheloB2BSite,
} from "@/content/demo/vithelo-b2b-site";

it("validates the compact B2B site records", () => {
  expect(B2BSiteContentSchema.parse(vitheloB2BSite).navigation).toEqual([
    { label: "Products", href: "/products" },
    { label: "OEM / ODM", href: "/oem-odm" },
    { label: "Manufacturing", href: "/manufacturing" },
    { label: "Insights", href: "/insights" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ]);
  expect(B2BProductsPageSchema.parse(vitheloB2BProductsPage).formats).toHaveLength(10);
  expect(B2BOemOdmPageSchema.parse(vitheloB2BOemOdmPage).steps).toHaveLength(6);
  expect(B2BInsightsPageSchema.parse(vitheloB2BInsightsPage).articles).toHaveLength(10);
  expect(B2BContactPageSchema.parse(vitheloB2BContactPage).status).toBe("NOT_CONFIGURED");
});

it("publishes eight format groups with ten demo products each", () => {
  const products = B2BProductsPageSchema.parse(vitheloB2BProductsPage);

  expect(products.discovery.formats.map(({ slug }) => slug)).toEqual([
    "gummies",
    "jelly",
    "hard-capsules",
    "tablets",
    "powders",
    "softgels",
    "liquids",
    "oral-films",
  ]);
  expect(products.discovery.items).toHaveLength(80);

  for (const format of products.discovery.formats) {
    expect(
      products.discovery.items.filter((item) => item.formatSlug === format.slug),
    ).toHaveLength(10);
  }

  expect(products.discovery).not.toHaveProperty("healthDirections");
  expect(products.discovery.items[0].media?.default.status).toBe("DEMO_ONLY");
  expect(products.discovery.items[0].media?.default.alt).not.toBe("");
  expect(products.discovery.items[0].media?.hover.status).toBe("DEMO_ONLY");
  expect(
    new Set(
      products.discovery.items.filter((item) => item.formatSlug === "gummies").map((item) => item.media?.default.src ?? ""),
    ),
  ).toEqual(new Set(["/media/products/beauty-gummies/beauty-gummies-default.png"]));
  expect(products.discovery.items.filter((item) => item.formatSlug !== "gummies").every((item) => !item.media)).toBe(true);
  expect(
    new Set(
      products.discovery.items.filter((item) => item.formatSlug === "gummies").map((item) => item.media?.hover.src ?? ""),
    ),
  ).toEqual(
    new Set([
      "/media/products/beauty-gummies/beauty-gummies-detail.png",
      "/media/products/beauty-gummies/beauty-gummies-hand.png",
      "/media/products/beauty-gummies/beauty-gummies-closeup.png",
      "/media/products/beauty-gummies/beauty-gummies-routine.png",
      "/media/products/beauty-gummies/beauty-gummies-motion.png",
    ]),
  );
});

it("keeps only approved MOQ values and global English positioning", () => {
  const products = B2BProductsPageSchema.parse(vitheloB2BProductsPage);
  expect(new Set(products.formats.map(({ moq }) => moq))).toEqual(
    new Set([
      "Flexible MOQ based on formula and packaging. Contact us for MOQ.",
      "DEMO_ONLY · MOQ requires approved project inputs.",
    ]),
  );
  expect(JSON.stringify(products.formats)).not.toMatch(/\d[\d,.]*(?:\s|-)*(?:bottles|capsules|softgels|tablets|kg|metric tons)/i);
  expect(JSON.stringify({ products, site: vitheloB2BSite })).not.toMatch(
    /(?:\bU\.S\.|\bUSA\b|\bUnited States\b|\bAmerican\b|\bAmerica\b)/i,
  );
});

it("publishes valid article records without configured media claims", () => {
  const insights = B2BInsightsPageSchema.parse(vitheloB2BInsightsPage);
  for (const article of insights.articles) {
    expect(B2BInsightArticleSchema.parse(article).published).toBe(true);
    expect(article.blocks.length).toBeGreaterThanOrEqual(4);
  }
});
