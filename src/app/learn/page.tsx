import type { Metadata } from "next";
import { LearnPage } from "@/components/patterns/learn-page";

export const metadata: Metadata = {
  title: "Health Knowledge | VITHELO",
  description: "Demonstration health knowledge routes with explicit information boundaries.",
};

export default function LearnRoute() {
  return <LearnPage />;
}
