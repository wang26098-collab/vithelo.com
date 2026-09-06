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
    { label: "Quality", href: "/quality" },
    { label: "Insights", href: "/insights" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ]);
  expect(B2BProductsPageSchema.parse(vitheloB2BProductsPage).formats).toHaveLength(8);
  expect(B2BOemOdmPageSchema.parse(vitheloB2BOemOdmPage).steps).toHaveLength(6);
  expect(B2BInsightsPageSchema.parse(vitheloB2BInsightsPage).articles).toHaveLength(10);
  expect(B2BContactPageSchema.parse(vitheloB2BContactPage).status).toBe("NOT_CONFIGURED");
});

it("keeps only approved MOQ values and global English positioning", () => {
  const products = B2BProductsPageSchema.parse(vitheloB2BProductsPage);
  expect(new Set(products.formats.map(({ moq }) => moq))).toEqual(
    new Set(["Flexible MOQ based on formula and packaging. Contact us for MOQ."]),
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
