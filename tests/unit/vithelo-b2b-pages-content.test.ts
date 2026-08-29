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
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/contact" },
  ]);
  expect(B2BProductsPageSchema.parse(vitheloB2BProductsPage).formats).toHaveLength(8);
  expect(B2BOemOdmPageSchema.parse(vitheloB2BOemOdmPage).steps).toHaveLength(6);
  expect(B2BInsightsPageSchema.parse(vitheloB2BInsightsPage).articles).toHaveLength(3);
  expect(B2BContactPageSchema.parse(vitheloB2BContactPage).status).toBe("NOT_CONFIGURED");
});

it("keeps only approved MOQ values and global English positioning", () => {
  const products = B2BProductsPageSchema.parse(vitheloB2BProductsPage);
  expect(products.formats.map(({ name, moq }) => [name, moq])).toEqual([
    ["Gummies", "Custom projects from 500 bottles"],
    ["Hard Capsules", "60,000-100,000 capsules"],
    ["Softgels", "300,000 softgels"],
    ["Tablets", "100,000 tablets"],
    ["Powders", "100 kg"],
    ["Liquids", "Contact us for MOQ"],
    ["Functional Gum", "2 metric tons"],
    ["Oral Films", "Contact us for MOQ"],
  ]);
  expect(JSON.stringify({ products, site: vitheloB2BSite })).not.toMatch(
    /(?:\bU\.S\.|\bUSA\b|\bUnited States\b|\bAmerican\b|\bAmerica\b)/i,
  );
});

it("publishes three valid article records without configured media claims", () => {
  const insights = B2BInsightsPageSchema.parse(vitheloB2BInsightsPage);
  for (const article of insights.articles) {
    expect(B2BInsightArticleSchema.parse(article).published).toBe(true);
    expect(article.blocks.length).toBeGreaterThanOrEqual(4);
  }
});
