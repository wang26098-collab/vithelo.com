import { demoEvidence } from "@/content/demo/evidence";
import { demoHome } from "@/content/demo/home";
import { demoProducts } from "@/content/demo/products";
import { demoProfessional } from "@/content/demo/professional";
import {
  CapabilitySchema,
  EvidenceSchema,
  FormulaSchema,
  HomeContentSchema,
  IngredientSchema,
  MarketConfigurationSchema,
  ProductSchema,
  TechnologySchema,
} from "@/content/schema";
import type { ContentAdapter } from "@/lib/adapters/content-adapter";

const products = demoProducts.items.map((item) => ProductSchema.parse(item));
const homeContent = HomeContentSchema.parse(demoHome);
const formulas = demoProducts.formulas.map((item) => FormulaSchema.parse(item));
const ingredients = demoProducts.ingredients.map((item) => IngredientSchema.parse(item));
const technologies = demoProducts.technologies.map((item) => TechnologySchema.parse(item));
const evidence = demoEvidence.items.map((item) => EvidenceSchema.parse(item));
const capabilities = demoProfessional.capabilities.map((item) =>
  CapabilitySchema.parse(item),
);
const marketConfiguration = MarketConfigurationSchema.parse(
  demoProfessional.marketConfiguration,
);

export const localContentAdapter: ContentAdapter = {
  async getHomeContent() {
    return homeContent;
  },
  async listProducts() {
    return products;
  },
  async getProductBySlug(slug) {
    return products.find((product) => product.slug === slug) ?? null;
  },
  async listFormulas() {
    return formulas;
  },
  async listIngredients() {
    return ingredients;
  },
  async listTechnologies() {
    return technologies;
  },
  async listEvidence() {
    return evidence;
  },
  async listCapabilities() {
    return capabilities;
  },
  async getMarketConfiguration() {
    return marketConfiguration;
  },
};
