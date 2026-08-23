import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NutritionPdp } from "@/components/patterns/nutrition-pdp";
import { localContentAdapter } from "@/lib/content";

type NutritionProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const products = await localContentAdapter.listProducts();

  return products
    .filter((product) => product.kind === "nutrition")
    .map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: NutritionProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await localContentAdapter.getProductBySlug(slug);

  return {
    title: product?.kind === "nutrition" ? `${product.name} | VITHELO` : "Nutrition | VITHELO",
    description: "Demonstration nutrition product record with explicit configuration boundaries.",
  };
}

export default async function NutritionProductPage({ params }: NutritionProductPageProps) {
  const { slug } = await params;
  const [product, formulas, ingredients, evidence] = await Promise.all([
    localContentAdapter.getProductBySlug(slug),
    localContentAdapter.listFormulas(),
    localContentAdapter.listIngredients(),
    localContentAdapter.listEvidence(),
  ]);

  if (!product || product.kind !== "nutrition") notFound();

  return (
    <NutritionPdp
      evidence={evidence}
      formulas={formulas}
      ingredients={ingredients}
      product={product}
    />
  );
}
