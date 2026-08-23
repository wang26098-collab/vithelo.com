import type {
  Capability,
  Evidence,
  Formula,
  HomeContent,
  Ingredient,
  MarketConfiguration,
  Product,
  Technology,
} from "@/content/schema";

export interface ContentAdapter {
  getHomeContent(): Promise<HomeContent>;
  listProducts(): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | null>;
  listFormulas(): Promise<Formula[]>;
  listIngredients(): Promise<Ingredient[]>;
  listTechnologies(): Promise<Technology[]>;
  listEvidence(): Promise<Evidence[]>;
  listCapabilities(): Promise<Capability[]>;
  getMarketConfiguration(): Promise<MarketConfiguration>;
}
