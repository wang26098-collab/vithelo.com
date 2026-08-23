import type { Metadata } from "next";
import { HomePagePattern } from "@/components/patterns/home-page";
import type { NutritionProduct } from "@/content/schema";
import { localContentAdapter } from "@/lib/content";

export const metadata: Metadata = {
  title: "Nutrition for Human Rhythms | VITHELO",
  description: "VITHELO nutrition discovery with explicit product, evidence, and safety boundaries.",
};

export default async function HomePage() {
  const [content, evidence, products] = await Promise.all([
    localContentAdapter.getHomeContent(),
    localContentAdapter.listEvidence(),
    localContentAdapter.listProducts(),
  ]);
  const nutritionProducts = products.filter(
    (product): product is NutritionProduct => product.kind === "nutrition",
  );

  return <HomePagePattern content={content} evidence={evidence} nutritionProducts={nutritionProducts} products={products} />;
}
