import type { Metadata } from "next";
import { VitheloB2BSiteFrame } from "@/components/core/vithelo-b2b-site-frame";
import { VitheloInsightsPage } from "@/components/patterns/vithelo-insights-page";
import { localContentAdapter } from "@/lib/content";

export const metadata: Metadata = {
  title: "Insights | VITHELO",
  description:
    "Practical guidance for nutrition product development, formats, packaging and manufacturing decisions.",
};

export default async function InsightsPage() {
  const [site, content] = await Promise.all([
    localContentAdapter.getB2BSiteContent(),
    localContentAdapter.getB2BInsightsPage(),
  ]);

  return (
    <VitheloB2BSiteFrame content={site}>
      <VitheloInsightsPage content={content} />
    </VitheloB2BSiteFrame>
  );
}
