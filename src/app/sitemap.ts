import type { MetadataRoute } from "next";
import { localContentAdapter } from "@/lib/content";
import { vitheloB2BProductsPage } from "@/content/demo/vithelo-b2b-site";
import { getSiteOrigin } from "@/lib/site-origin";

const publicRoutes = [
  "/",
  "/products",
  "/oem-odm",
  "/manufacturing",
  "/insights",
  "/about",
  "/contact",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteOrigin = getSiteOrigin();
  if (!siteOrigin) return [];

  const insights = await localContentAdapter.listPublishedB2BInsights();
  const insightRoutes = insights.map((article) => `/insights/${article.slug}`);
  const dosageRoutes = vitheloB2BProductsPage.formats.map((format) => `/products/${format.id}`);

  const routes = [...publicRoutes.slice(0, 4), ...dosageRoutes, ...insightRoutes, ...publicRoutes.slice(4)];

  return routes.map((route) => ({
    url: route === "/" ? `${siteOrigin}/` : `${siteOrigin}${route}`,
  }));
}
