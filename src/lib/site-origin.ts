const productionSiteOrigin = "https://vithelo.com";

function getSiteOrigin() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!configured) return productionSiteOrigin;

  try {
    const url = new URL(configured);
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return productionSiteOrigin;
    }
    return url.origin;
  } catch {
    return productionSiteOrigin;
  }
}

export { getSiteOrigin, productionSiteOrigin };
