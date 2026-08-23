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

it("emits public discovery routes only after a valid origin is configured", async () => {
  process.env.NEXT_PUBLIC_SITE_URL = "https://vithelo.example/";

  expect(getSiteOrigin()).toBe("https://vithelo.example");
  expect(robots()).toEqual({
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/account", "/cart", "/checkout", "/search"],
    },
    sitemap: "https://vithelo.example/sitemap.xml",
  });

  const entries = await sitemap();
  expect(entries.map((entry) => entry.url)).toEqual(
    expect.arrayContaining([
      "https://vithelo.example/",
      "https://vithelo.example/nutrition",
      "https://vithelo.example/nutrition/demo-daily-formula",
      "https://vithelo.example/professional",
      "https://vithelo.example/contact",
    ]),
  );
  expect(entries.map((entry) => entry.url)).not.toEqual(
    expect.arrayContaining(["https://vithelo.example/cart", "https://vithelo.example/checkout"]),
  );
});
