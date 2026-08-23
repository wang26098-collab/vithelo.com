import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DemoDisclosure } from "@/components/core/demo-disclosure";
import { MobileInquiryBar } from "@/components/core/mobile-inquiry-bar";
import { SiteHeader } from "@/components/core/site-header";
import { getSiteOrigin } from "@/lib/site-origin";
import "./globals.css";

const siteOrigin = getSiteOrigin();

export const metadata: Metadata = {
  title: "VITHELO | Nutrition",
  description: "Nutrition-led products with a secondary professional capability.",
  ...(siteOrigin
    ? {
        metadataBase: new URL(siteOrigin),
        alternates: { canonical: "/" },
        openGraph: {
          title: "VITHELO | Nutrition",
          description: "Nutrition-led products with a secondary professional capability.",
          siteName: "VITHELO",
          type: "website" as const,
          url: "/",
        },
        twitter: { card: "summary" as const },
      }
    : { robots: { index: false, follow: false } }),
};

const directionContract = `THESIS: VITHELO is nutrition-led, with a secondary professional capability; it refuses the stitched shop and device catalog.
OWN-WORLD: Ivory, graphite, titanium, and restrained optical light; low-radius, low-shadow, precision-led components.
STORY: Visitors orient through nutrition, inspect evidence and safety, and choose a product or professional inquiry path.
FIRST VIEWPORT: VITHELO leads a calm nutrition material field with product discovery above the fold.
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
