import type { Metadata } from "next";
import { VitheloInformationPage } from "@/components/patterns/vithelo-information-page";

export const metadata: Metadata = { title: "About VITHELO", description: "About VITHELO, a nutrition OEM / ODM manufacturing partner for private-label projects.", alternates: { canonical: "/about" } };

export default function AboutPage() {
  return <VitheloInformationPage eyebrow="ABOUT VITHELO" title="The manufacturing partner behind nutrition projects." directAnswer="VITHELO is a B2B nutrition OEM / ODM manufacturing partner serving private-label supplement brands across eight oral formats." sections={[{ title: "What VITHELO does", items: ["Supports format, formula, sensory, packaging and production decisions.", "Connects an initial brief to a practical manufacturing route."] }, { title: "Who it serves", items: ["Private-label supplement brands and teams developing new nutrition products.", "Buyers who need clear format, quality and project-path discussions."] }, { title: "Verify the right details", items: ["Company entity, address, certifications, capacity and market coverage require final confirmation.", "Contact the team with the project context you already have."] }, { title: "Explore the system", items: ["Review Manufacturing and Quality before sending a project brief.", "Compare Products or follow the OEM / ODM process."] }]} />;
}
