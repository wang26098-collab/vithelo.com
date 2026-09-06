import { vitheloB2BInsightsPage } from "@/content/demo/vithelo-b2b-site";
import { B2BInsightsPageSchema } from "@/content/schema";

it("gives every published insight an evidence and commercial pathway", () => {
  const content = B2BInsightsPageSchema.parse(vitheloB2BInsightsPage);

  for (const article of content.articles.filter((item) => item.published)) {
    expect(article.author.name).toBe("VITHELO Editorial Team");
    expect(article.reviewDue).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(article.evidenceStatus).toMatch(/^C[01]_/);
    expect(article.commercialDestinations.primary.href).not.toBe(`/insights/${article.slug}`);
    expect(article.relatedSlugs).not.toContain(article.slug);
  }
});

it("keeps unverified company claims out of insight content", () => {
  const publicCopy = JSON.stringify(vitheloB2BInsightsPage).toLowerCase();
  const forbiddenClaims = [
    "gmp certified",
    "haccp certified",
    "halal certified",
    "iso certified",
    "fda approved",
    "our laboratory",
    "our 20 years",
    "millions of products",
  ];

  for (const claim of forbiddenClaims) expect(publicCopy).not.toContain(claim);
});
