import type { Metadata } from "next";
import { VitheloAboutPage } from "@/components/patterns/vithelo-about-page";
import { localContentAdapter } from "@/lib/content";

export const metadata: Metadata = {
  title: "About VITHELO | Nutrition OEM / ODM",
  description:
    "How VITHELO connects nutrition product definition, development, manufacturing review and project support.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const content = await localContentAdapter.getB2BAboutPage();
  return <VitheloAboutPage content={content} />;
}
