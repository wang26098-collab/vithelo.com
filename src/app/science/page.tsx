import type { Metadata } from "next";
import { SciencePage } from "@/components/patterns/science-page";
import { localContentAdapter } from "@/lib/content";

export const metadata: Metadata = {
  title: "Science | A PRIME",
  description: "Demonstration science library with explicit source and evidence boundaries.",
};

export default async function ScienceRoute() {
  const evidence = await localContentAdapter.listEvidence();

  return <SciencePage evidence={evidence} />;
}
