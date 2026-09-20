import type { Metadata } from "next";
import { VitheloB2BSiteFrame } from "@/components/core/vithelo-b2b-site-frame";
import { VitheloOemOdmPage } from "@/components/patterns/vithelo-oem-odm-page";
import { localContentAdapter } from "@/lib/content";

export const metadata: Metadata = {
  title: "OEM / ODM | VITHELO",
  description:
    "Structured supplement OEM and ODM project development across formulation, dosage form, sampling, packaging, production coordination and quality review.",
  alternates: { canonical: "/oem-odm" },
  openGraph: {
    url: "/oem-odm",
    images: ["/media/vithelo-hero-composite.png"],
  },
};

export default async function OemOdmPage() {
  const [site, content] = await Promise.all([
    localContentAdapter.getB2BSiteContent(),
    localContentAdapter.getB2BOemOdmPage(),
  ]);

  return (
    <VitheloB2BSiteFrame content={site}>
      <VitheloOemOdmPage content={content} />
    </VitheloB2BSiteFrame>
  );
}
