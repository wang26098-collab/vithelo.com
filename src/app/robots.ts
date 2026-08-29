import type { MetadataRoute } from "next";
import { getSiteOrigin } from "@/lib/site-origin";

export default function robots(): MetadataRoute.Robots {
  const siteOrigin = getSiteOrigin();

  if (!siteOrigin) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
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
    sitemap: `${siteOrigin}/sitemap.xml`,
  };
}
