import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "A PRIME",
  description: "Demonstration brand experience for nutrition and aesthetic technology.",
};

const directionContract = `THESIS: A unified human system connects internal nutrition and external aesthetic technology; it refuses the stitched shop and device catalog.
OWN-WORLD: Ivory, graphite, titanium, and restrained optical light; low-radius, low-shadow, precision-led components.
STORY: Visitors orient, distinguish two product worlds, inspect evidence and safety, and choose a consumer or professional path.
FIRST VIEWPORT: A PRIME leads a calm material field; the two worlds emerge at human scale, with a clear exploration action kept above the fold.
FORM: Scientific Material Humanism, approved code-led direction, seed aprime-v61-code-led.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md`;

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const insertDirectionContract = `document.body.insertBefore(document.createComment(${JSON.stringify(directionContract)}),document.body.firstChild);document.currentScript.remove();`;

  return (
    <html lang="en">
      <body>
        <script dangerouslySetInnerHTML={{ __html: insertDirectionContract }} />
        {children}
      </body>
    </html>
  );
}
