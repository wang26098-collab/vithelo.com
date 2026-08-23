import { demoEvidence } from "@/content/demo/evidence";
import { demoProducts } from "@/content/demo/products";
import { demoProfessional } from "@/content/demo/professional";
import {
  CapabilitySchema,
  EvidenceSchema,
  FormulaSchema,
  IngredientSchema,
  MarketConfigurationSchema,
  ProductSchema,
  SafetySchema,
  TechnologySchema,
} from "@/content/schema";
import { localCommerceAdapter } from "@/lib/adapters/commerce-adapter";
import { localContentAdapter } from "@/lib/content";

it("marks every product fixture and record as DEMO_ONLY", () => {
  expect(demoProducts.mode).toBe("DEMO_ONLY");

  for (const product of demoProducts.items) {
    expect(ProductSchema.parse(product).dataStatus).toBe("DEMO_ONLY");
  }
});

it("validates both product kinds and their relationships", () => {
  const products = demoProducts.items.map((product) => ProductSchema.parse(product));

  expect(products.map((product) => product.kind)).toEqual([
    "nutrition",
    "nutrition",
    "nutrition",
    "device",
  ]);
  expect(products.every((product) => product.relationshipIds.length > 0)).toBe(true);
  expect(FormulaSchema.parse(demoProducts.formulas[0]).dataStatus).toBe("DEMO_ONLY");
  expect(IngredientSchema.parse(demoProducts.ingredients[0]).dataStatus).toBe(
    "DEMO_ONLY",
  );
  expect(TechnologySchema.parse(demoProducts.technologies[0]).dataStatus).toBe(
    "DEMO_ONLY",
  );
});

it("requires a nutrition category and product form for nutrition products", () => {
  const nutritionProducts = demoProducts.items.flatMap((item) => {
    const product = ProductSchema.parse(item);

    return product.kind === "nutrition" ? [product] : [];
  });

  expect(
    nutritionProducts.map((product) => product.healthCategory),
  ).toEqual(["sleep-health", "womens-health", "daily-essential"]);
  expect(nutritionProducts.map((product) => product.form)).toEqual([
    "capsule",
    "gummy",
    "capsule",
  ]);
});

it("keeps safety visible when configuration is missing", () => {
  const nutrition = demoProducts.items.find((item) => item.kind === "nutrition");

  expect(SafetySchema.parse(nutrition?.safety).status).toBe("NOT_CONFIGURED");
  expect(nutrition?.safety.message).toBe(
    "Safety details require approved product input",
  );
});

it("validates evidence, professional capabilities, and market configuration", () => {
  expect(demoEvidence.mode).toBe("DEMO_ONLY");
  expect(demoProfessional.mode).toBe("DEMO_ONLY");
  expect(EvidenceSchema.parse(demoEvidence.items[0]).dataStatus).toBe("DEMO_ONLY");
  expect(CapabilitySchema.parse(demoProfessional.capabilities[0]).dataStatus).toBe(
    "DEMO_ONLY",
  );
  expect(
    MarketConfigurationSchema.parse(demoProfessional.marketConfiguration).status,
  ).toBe("NOT_CONFIGURED");
});

it("returns only validated fixtures through the local content adapter", async () => {
  const products = await localContentAdapter.listProducts();
  const product = await localContentAdapter.getProductBySlug("demo-daily-formula");
  const missingProduct = await localContentAdapter.getProductBySlug("missing-product");

  expect(products).toHaveLength(4);
  expect(products.map((item) => ProductSchema.parse(item).kind)).toEqual([
    "nutrition",
    "nutrition",
    "nutrition",
    "device",
  ]);
  expect(product?.dataStatus).toBe("DEMO_ONLY");
  expect(missingProduct).toBeNull();
  expect(await localContentAdapter.listEvidence()).toHaveLength(1);
  expect(await localContentAdapter.listCapabilities()).toHaveLength(2);
  expect((await localContentAdapter.getMarketConfiguration()).status).toBe(
    "NOT_CONFIGURED",
  );
});

it("returns explicit NOT_CONFIGURED commerce states", async () => {
  await expect(localCommerceAdapter.getPrice("demo-nutrition-01")).resolves.toEqual({
    status: "NOT_CONFIGURED",
    message: "Price not configured",
  });
  await expect(
    localCommerceAdapter.addToCart({ productId: "demo-nutrition-01", quantity: 1 }),
  ).resolves.toEqual({
    status: "NOT_CONFIGURED",
    message: "Cart not configured",
  });
});
