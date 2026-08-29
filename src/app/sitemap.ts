import type { MetadataRoute } from "next";
import { localContentAdapter } from "@/lib/content";
import { getSiteOrigin } from "@/lib/site-origin";

const publicRoutes = [
  "/",
  "/products",
  "/oem-odm",
  "/insights",
  "/contact",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteOrigin = getSiteOrigin();
  if (!siteOrigin) return [];

  const insights = await localContentAdapter.listPublishedB2BInsights();
  const insightRoutes = insights.map((article) => `/insights/${article.slug}`);

  const routes = [...publicRoutes.slice(0, 4), ...insightRoutes, "/contact"];

  return routes.map((route) => ({
    url: route === "/" ? `${siteOrigin}/` : `${siteOrigin}${route}`,
  }));
}
