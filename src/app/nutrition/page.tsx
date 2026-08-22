import type { Metadata } from "next";
import { NutritionLanding } from "@/components/patterns/nutrition-landing";
import { localContentAdapter } from "@/lib/content";

export const metadata: Metadata = {
  title: "Nutrition | VITHELO",
  description: "Demonstration nutrition discovery experience with responsible data boundaries.",
};

export default async function NutritionPage() {
  const [products, formulas] = await Promise.all([
    localContentAdapter.listProducts(),
    localContentAdapter.listFormulas(),
  ]);

  return (
    <NutritionLanding
      formulas={formulas}
      products={products.filter((product) => product.kind === "nutrition")}
    />
  );
}
