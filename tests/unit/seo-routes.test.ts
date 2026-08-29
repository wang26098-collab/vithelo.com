import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { getSiteOrigin } from "@/lib/site-origin";

const originalSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

afterEach(() => {
  if (originalSiteUrl === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
  else process.env.NEXT_PUBLIC_SITE_URL = originalSiteUrl;
});

it("prevents indexing when the production origin is not configured", async () => {
  delete process.env.NEXT_PUBLIC_SITE_URL;

  expect(getSiteOrigin()).toBeNull();
  expect(robots()).toEqual({ rules: { userAgent: "*", disallow: "/" } });
  await expect(sitemap()).resolves.toEqual([]);
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
    "https://vithelo.example/insights",
    "https://vithelo.example/insights/choose-the-right-supplement-format",
    "https://vithelo.example/insights/prepare-for-an-oem-odm-project",
    "https://vithelo.example/insights/gummy-development-guide",
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
