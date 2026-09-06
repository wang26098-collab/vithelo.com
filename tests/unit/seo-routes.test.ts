import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { getSiteOrigin } from "@/lib/site-origin";

const originalSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

afterEach(() => {
  if (originalSiteUrl === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
  else process.env.NEXT_PUBLIC_SITE_URL = originalSiteUrl;
});

it("uses the approved production origin when no override is configured", async () => {
  delete process.env.NEXT_PUBLIC_SITE_URL;

  expect(getSiteOrigin()).toBe("https://vithelo.com");
  expect(robots()).toEqual(
    expect.objectContaining({ sitemap: "https://vithelo.com/sitemap.xml" }),
  );
  await expect(sitemap()).resolves.toEqual(
    expect.arrayContaining([
      expect.objectContaining({ url: "https://vithelo.com/" }),
    ]),
  );
});

it("emits only the approved B2B discovery routes", async () => {
  process.env.NEXT_PUBLIC_SITE_URL = "https://vithelo.example/";

  expect(getSiteOrigin()).toBe("https://vithelo.example");
  expect(robots()).toEqual({
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/account",
        "/cart",
        "/checkout",
        "/search",
        "/nutrition",
        "/aesthetic-technology",
        "/science",
        "/professional",
        "/learn",
        "/support",
      ],
    },
    sitemap: "https://vithelo.example/sitemap.xml",
  });

  const entries = await sitemap();
  expect(entries.map((entry) => entry.url)).toEqual([
    "https://vithelo.example/",
    "https://vithelo.example/products",
    "https://vithelo.example/oem-odm",
    "https://vithelo.example/manufacturing",
    "https://vithelo.example/products/gummies",
    "https://vithelo.example/products/hard-capsules",
    "https://vithelo.example/products/softgels",
    "https://vithelo.example/products/tablets",
    "https://vithelo.example/products/powders",
    "https://vithelo.example/products/liquids",
    "https://vithelo.example/products/functional-gum",
    "https://vithelo.example/products/oral-films",
    "https://vithelo.example/insights/choose-the-right-supplement-format",
    "https://vithelo.example/insights/prepare-for-an-oem-odm-project",
    "https://vithelo.example/insights/gummy-development-guide",
    "https://vithelo.example/insights/how-to-evaluate-a-supplement-manufacturer",
    "https://vithelo.example/insights/private-label-vs-custom-formulation",
    "https://vithelo.example/insights/how-supplement-sampling-works",
    "https://vithelo.example/insights/gummies-vs-hard-capsules",
    "https://vithelo.example/insights/what-documents-buyers-should-ask-for",
    "https://vithelo.example/insights/what-information-to-include-in-an-rfq",
    "https://vithelo.example/insights/how-packaging-affects-moq-and-lead-time",
    "https://vithelo.example/quality",
    "https://vithelo.example/insights",
    "https://vithelo.example/about",
    "https://vithelo.example/contact",
  ]);

  const forbiddenFragments = [
    "/nutrition",
    "/aesthetic-technology",
    "/science",
    "/professional",
    "/cart",
    "/checkout",
    "/account",
    "/search",
  ];
  for (const fragment of forbiddenFragments) {
    expect(entries.some((entry) => entry.url.includes(fragment))).toBe(false);
  }
});
