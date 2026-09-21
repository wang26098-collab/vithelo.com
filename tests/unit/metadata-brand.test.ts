import { metadata as contactMetadata } from "@/app/contact/page";
import { metadata as homeMetadata } from "@/app/page";
import { metadata as insightsMetadata } from "@/app/insights/page";
import { generateMetadata as generateInsightMetadata } from "@/app/insights/[slug]/page";
import { metadata as layoutMetadata } from "@/app/layout";
import { metadata as oemOdmMetadata } from "@/app/oem-odm/page";
import { metadata as productsMetadata } from "@/app/products/page";
import { vitheloB2BHome } from "@/content/demo/vithelo-b2b-home";
import { vitheloB2BSite } from "@/content/demo/vithelo-b2b-site";

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
      images: ["/media/vithelo-hero-composite.png"],
    }),
  );
  expect(layoutMetadata.twitter).toEqual({
    card: "summary_large_image",
    images: ["/media/vithelo-hero-composite.png"],
  });
});

it("does not publish an unverified factory-owned identity claim", () => {
  const publicCopy = JSON.stringify({
    identity: vitheloB2BSite.identity,
    hero: vitheloB2BHome.hero.copy,
  });

  expect(publicCopy.toLowerCase()).not.toContain("factory-owned");
  expect(publicCopy.toLowerCase()).not.toContain("export division");
});

it("gives every public route a self-referencing canonical", async () => {
  const insightMetadata = await generateInsightMetadata({
    params: Promise.resolve({ slug: "gummy-development-guide" }),
    searchParams: Promise.resolve({}),
  });

  expect(homeMetadata.alternates).toEqual({ canonical: "/" });
  expect(homeMetadata.openGraph).toEqual({
    url: "/",
    images: ["/media/vithelo-hero-composite.png"],
  });
  expect(productsMetadata.alternates).toEqual({ canonical: "/products" });
  expect(productsMetadata.openGraph).toEqual({
    url: "/products",
    images: ["/media/vithelo-hero-composite.png"],
  });
  expect(oemOdmMetadata.alternates).toEqual({ canonical: "/oem-odm" });
  expect(oemOdmMetadata.openGraph).toEqual({
    url: "/oem-odm",
    images: ["/media/vithelo-hero-composite.png"],
  });
  expect(insightsMetadata.alternates).toEqual({ canonical: "/insights" });
  expect(insightsMetadata.openGraph).toEqual({
    url: "/insights",
    images: ["/media/b2b/hero-loop-poster.jpg"],
  });
  expect(contactMetadata.alternates).toEqual({ canonical: "/contact" });
  expect(contactMetadata.openGraph).toEqual({
    url: "/contact",
    images: ["/media/vithelo-hero-composite.png"],
  });
  expect(insightMetadata.alternates).toEqual({
    canonical: "/insights/gummy-development-guide",
  });
  expect(insightMetadata.openGraph).toEqual({
    url: "/insights/gummy-development-guide",
    type: "article",
    publishedTime: "2026-08-27",
    modifiedTime: "2026-08-27",
    images: ["/media/vithelo-hero-composite.png"],
  });
});
