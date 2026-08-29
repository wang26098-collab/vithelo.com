import { metadata as contactMetadata } from "@/app/contact/page";
import { metadata as homeMetadata } from "@/app/page";
import { metadata as insightsMetadata } from "@/app/insights/page";
import { generateMetadata as generateInsightMetadata } from "@/app/insights/[slug]/page";
import { metadata as layoutMetadata } from "@/app/layout";
import { metadata as oemOdmMetadata } from "@/app/oem-odm/page";
import { metadata as productsMetadata } from "@/app/products/page";

const staticMetadata = [
  layoutMetadata,
  contactMetadata,
  homeMetadata,
  insightsMetadata,
  oemOdmMetadata,
  productsMetadata,
];

it("keeps every public route title in the VITHELO brand", async () => {
  const insightMetadata = await generateInsightMetadata({
    params: Promise.resolve({ slug: "gummy-development-guide" }),
    searchParams: Promise.resolve({}),
  });

  for (const metadata of [...staticMetadata, insightMetadata]) {
    expect(metadata.title).toEqual(expect.stringContaining("VITHELO"));
    expect(metadata.title).not.toEqual(expect.stringContaining("A PRIME"));
  }
});

it("uses the approved international OEM and ODM site metadata", () => {
  expect(layoutMetadata.title).toBe("VITHELO | Nutrition OEM / ODM");
  expect(layoutMetadata.description).toBe(
    "Gummy-first nutrition product development and manufacturing across eight oral formats.",
  );
  expect(layoutMetadata.openGraph).toEqual(
    expect.objectContaining({
      title: "VITHELO | Nutrition OEM / ODM",
      description:
        "Gummy-first nutrition product development and manufacturing across eight oral formats.",
      siteName: "VITHELO",
      type: "website",
      url: "/",
    }),
  );
});
