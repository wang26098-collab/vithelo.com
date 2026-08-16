import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DevicePdp } from "@/components/patterns/device-pdp";
import { demoProducts } from "@/content/demo/products";
import { localContentAdapter } from "@/lib/content";

type DeviceProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return demoProducts.items
    .filter((product) => product.kind === "device")
    .map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: DeviceProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await localContentAdapter.getProductBySlug(slug);

  return {
    title:
      product?.kind === "device" ? `${product.name} | A PRIME` : "Aesthetic Technology | A PRIME",
    description: "Demonstration device record with explicit engineering and safety boundaries.",
  };
}

export default async function DeviceProductPage({ params }: DeviceProductPageProps) {
  const { slug } = await params;
  const [product, technologies] = await Promise.all([
    localContentAdapter.getProductBySlug(slug),
    localContentAdapter.listTechnologies(),
  ]);

  if (!product || product.kind !== "device") notFound();

  return <DevicePdp product={product} technologies={technologies} />;
}
