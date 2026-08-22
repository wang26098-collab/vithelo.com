import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DemoDisclosure } from "@/components/core/demo-disclosure";
import { MobileInquiryBar } from "@/components/core/mobile-inquiry-bar";
import { SiteHeader } from "@/components/core/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: "VITHELO",
  description: "Nutrition and aesthetic technology for product and professional partners.",
};

const directionContract = `THESIS: VITHELO connects nutrition and aesthetic technology for product and professional partners; it refuses the stitched shop and device catalog.
OWN-WORLD: Ivory, graphite, titanium, and restrained optical light; low-radius, low-shadow, precision-led components.
STORY: Visitors orient, distinguish two product worlds, inspect evidence and safety, and choose a product or professional inquiry path.
FIRST VIEWPORT: VITHELO leads a calm material field with Email Inquiry and WhatsApp visible above the fold.
FORM: Swiss precision and Scientific Material Humanism for a B2B-first brand experience.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md`;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const insertDirectionContract = `document.body.insertBefore(document.createComment(${JSON.stringify(directionContract)}),document.body.firstChild);`;

  return (
    <html lang="en">
      <body>
        <script dangerouslySetInnerHTML={{ __html: insertDirectionContract }} />
        <DemoDisclosure />
        <SiteHeader />
        {children}
        <MobileInquiryBar />
      </body>
    </html>
  );
}
