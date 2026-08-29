import type { Metadata } from "next";
import { VitheloB2BSiteFrame } from "@/components/core/vithelo-b2b-site-frame";
import { VitheloB2BHome } from "@/components/patterns/vithelo-b2b-home";
import { localContentAdapter } from "@/lib/content";

export const metadata: Metadata = {
  title: "VITHELO | Nutrition OEM ODM Manufacturing Partner",
  description:
    "Gummy-first nutrition OEM and ODM manufacturing across gummies, capsules, tablets, powders, liquids, functional gum and oral films.",
};

export default async function HomePage() {
  const [site, content] = await Promise.all([
    localContentAdapter.getB2BSiteContent(),
    localContentAdapter.getB2BHomeContent(),
  ]);

  return (
    <VitheloB2BSiteFrame content={site}>
      <VitheloB2BHome content={content} />
    </VitheloB2BSiteFrame>
  );
}
