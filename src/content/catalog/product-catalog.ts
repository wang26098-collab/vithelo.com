import { z } from "zod";
import generated from "@/content/catalog/products.generated.json";
import { ProductDiscoveryItemSchema } from "@/content/schema";

const GeneratedCatalogSchema = z.array(
  ProductDiscoveryItemSchema.extend({
    sourceBoundary: z.literal(
      "USER_PROVIDED_PENDING_PRODUCTION_VERIFICATION",
    ),
  }),
);

export type ProductCatalogItem = z.infer<typeof ProductDiscoveryItemSchema>;

export function parseProductCatalog(value: unknown): ProductCatalogItem[] {
  return GeneratedCatalogSchema.parse(value);
}

export function mergeProductCatalog(
  base: readonly ProductCatalogItem[],
  additions: readonly ProductCatalogItem[],
): ProductCatalogItem[] {
  const seen = new Map(base.map((item) => [item.id, item.formatSlug]));
  for (const item of additions) {
    const prior = seen.get(item.id);
    if (prior && prior !== item.formatSlug) {
      throw new Error(`Product format conflict: ${item.id}`);
    }
    if (prior) {
      throw new Error(`Duplicate product id: ${item.id}`);
    }
    seen.set(item.id, item.formatSlug);
  }
  return [...base, ...additions];
}

export const generatedProductCatalog = parseProductCatalog(generated);
