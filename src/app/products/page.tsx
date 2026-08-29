import type { Metadata } from "next";
import { VitheloB2BSiteFrame } from "@/components/core/vithelo-b2b-site-frame";
import { VitheloProductsPage } from "@/components/patterns/vithelo-products-page";
import { localContentAdapter } from "@/lib/content";

export const metadata: Metadata = {
  title: "Product Capabilities | VITHELO",
  description:
    "Gummy-first nutrition OEM and ODM capabilities across eight oral product formats.",
};

export default async function ProductsPage() {
  const [site, content] = await Promise.all([
    localContentAdapter.getB2BSiteContent(),
    localContentAdapter.getB2BProductsPage(),
  ]);

  return (
    <VitheloB2BSiteFrame content={site}>
      <VitheloProductsPage content={content} />
    </VitheloB2BSiteFrame>
  );
}
