import type { MetadataRoute } from "next";
import { localContentAdapter } from "@/lib/content";
import { getSiteOrigin } from "@/lib/site-origin";

const publicRoutes = [
  "/",
  "/nutrition",
  "/aesthetic-technology",
  "/science",
  "/learn",
  "/professional",
  "/contact",
  "/support",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteOrigin = getSiteOrigin();
  if (!siteOrigin) return [];

  const products = await localContentAdapter.listProducts();
  const productRoutes = products.map((product) =>
    product.kind === "nutrition"
      ? `/nutrition/${product.slug}`
      : `/aesthetic-technology/${product.slug}`,
  );

  return [...publicRoutes, ...productRoutes].map((route) => ({
    url: route === "/" ? `${siteOrigin}/` : `${siteOrigin}${route}`,
  }));
}
