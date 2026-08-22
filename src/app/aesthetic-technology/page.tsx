import type { Metadata } from "next";
import { AestheticLanding } from "@/components/patterns/aesthetic-landing";
import { localContentAdapter } from "@/lib/content";

export const metadata: Metadata = {
  title: "Aesthetic Technology | VITHELO",
  description:
    "Demonstration aesthetic technology experience connecting engineering, safety, and professional context.",
};

export default async function AestheticTechnologyPage() {
  const [products, technologies] = await Promise.all([
    localContentAdapter.listProducts(),
    localContentAdapter.listTechnologies(),
  ]);

  return (
    <AestheticLanding
      products={products.filter((product) => product.kind === "device")}
      technologies={technologies}
    />
  );
}
