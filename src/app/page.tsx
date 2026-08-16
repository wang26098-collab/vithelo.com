import { HomePagePattern } from "@/components/patterns/home-page";
import { demoEvidence } from "@/content/demo/evidence";
import { demoProducts } from "@/content/demo/products";
import { EvidenceSchema, ProductSchema } from "@/content/schema";

const products = demoProducts.items.map((product) => ProductSchema.parse(product));
const evidence = demoEvidence.items.map((record) => EvidenceSchema.parse(record));

export default function HomePage() {
  return <HomePagePattern evidence={evidence} products={products} />;
}
