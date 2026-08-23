import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DevicePdp } from "@/components/patterns/device-pdp";
import { localContentAdapter } from "@/lib/content";

type DeviceProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const products = await localContentAdapter.listProducts();

  return products
    .filter((product) => product.kind === "device")
    .map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: DeviceProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await localContentAdapter.getProductBySlug(slug);

  return {
    title:
      product?.kind === "device" ? `${product.name} | VITHELO` : "Aesthetic Technology | VITHELO",
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
