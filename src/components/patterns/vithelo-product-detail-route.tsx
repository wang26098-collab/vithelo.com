"use client";

import { useSearchParams } from "next/navigation";
import type { B2BProductsPage } from "@/content/schema";
import { VitheloDosageFormDetail } from "@/components/patterns/vithelo-dosage-form-detail";

type Product = B2BProductsPage["discovery"]["items"][number];
type Format = B2BProductsPage["formats"][number];

export function VitheloProductDetailRoute({
  format,
  products,
}: {
  format: Format;
  products: Product[];
}) {
  const searchParams = useSearchParams();
  const productId = searchParams.get("product");
  const product = products.find((item) => item.id === productId);

  return <VitheloDosageFormDetail format={format} product={product} />;
}
