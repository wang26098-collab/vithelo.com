import type { Metadata } from "next";
import { ProfessionalPage } from "@/components/patterns/professional-page";
import { localContentAdapter } from "@/lib/content";

export const metadata: Metadata = {
  title: "Professional | VITHELO",
  description: "Demonstration professional project path with explicit capability boundaries.",
};

export default async function ProfessionalRoute() {
  const [capabilities, marketConfiguration] = await Promise.all([
    localContentAdapter.listCapabilities(),
    localContentAdapter.getMarketConfiguration(),
  ]);

  return (
    <ProfessionalPage
      capabilities={capabilities}
      marketConfiguration={marketConfiguration}
    />
  );
}
