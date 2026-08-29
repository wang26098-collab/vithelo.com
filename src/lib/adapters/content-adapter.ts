import type {
  B2BContactPage,
  B2BInsightArticle,
  B2BInsightsPage,
  B2BOemOdmPage,
  B2BProductsPage,
  B2BSiteContent,
  Capability,
  Evidence,
  Formula,
  HomeContent,
  Ingredient,
  MarketConfiguration,
  Product,
  Technology,
  VitheloB2BHomeContent,
} from "@/content/schema";

export interface ContentAdapter {
  getHomeContent(): Promise<HomeContent>;
  getB2BHomeContent(): Promise<VitheloB2BHomeContent>;
  getB2BSiteContent(): Promise<B2BSiteContent>;
  getB2BProductsPage(): Promise<B2BProductsPage>;
  getB2BOemOdmPage(): Promise<B2BOemOdmPage>;
  getB2BInsightsPage(): Promise<B2BInsightsPage>;
  listPublishedB2BInsights(): Promise<B2BInsightArticle[]>;
  getB2BInsightBySlug(slug: string): Promise<B2BInsightArticle | null>;
  getB2BContactPage(): Promise<B2BContactPage>;
  listProducts(): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | null>;
  listFormulas(): Promise<Formula[]>;
  listIngredients(): Promise<Ingredient[]>;
  listTechnologies(): Promise<Technology[]>;
  listEvidence(): Promise<Evidence[]>;
  listCapabilities(): Promise<Capability[]>;
  getMarketConfiguration(): Promise<MarketConfiguration>;
}
