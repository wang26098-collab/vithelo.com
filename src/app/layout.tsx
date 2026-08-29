import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DemoDisclosure } from "@/components/core/demo-disclosure";
import { MobileInquiryBar } from "@/components/core/mobile-inquiry-bar";
import { RouteShell } from "@/components/core/route-shell";
import { SiteHeader } from "@/components/core/site-header";
import { getSiteOrigin } from "@/lib/site-origin";
import "./globals.css";

const siteOrigin = getSiteOrigin();

export const metadata: Metadata = {
  title: "VITHELO | Nutrition OEM / ODM",
  description:
    "Gummy-first nutrition product development and manufacturing across eight oral formats.",
  openGraph: {
    title: "VITHELO | Nutrition OEM / ODM",
    description:
      "Gummy-first nutrition product development and manufacturing across eight oral formats.",
    siteName: "VITHELO",
    type: "website",
    url: "/",
  },
  ...(siteOrigin
    ? {
        metadataBase: new URL(siteOrigin),
        alternates: { canonical: "/" },
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
        <RouteShell
          disclosure={<DemoDisclosure />}
          header={<SiteHeader />}
          mobileResource={<MobileInquiryBar />}
        >
          {children}
        </RouteShell>
      </body>
    </html>
  );
}
