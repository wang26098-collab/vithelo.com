import { demoEvidence } from "@/content/demo/evidence";
import { demoHome } from "@/content/demo/home";
import { demoProducts } from "@/content/demo/products";
import { demoProfessional } from "@/content/demo/professional";
import { vitheloB2BHome } from "@/content/demo/vithelo-b2b-home";
import {
  vitheloB2BContactPage,
  vitheloB2BInsightsPage,
  vitheloB2BOemOdmPage,
  vitheloB2BProductsPage,
  vitheloB2BSite,
} from "@/content/demo/vithelo-b2b-site";
import {
  B2BContactPageSchema,
  B2BInsightsPageSchema,
  B2BOemOdmPageSchema,
  B2BProductsPageSchema,
  B2BSiteContentSchema,
  CapabilitySchema,
  EvidenceSchema,
  FormulaSchema,
  HomeContentSchema,
  IngredientSchema,
  MarketConfigurationSchema,
  ProductSchema,
  TechnologySchema,
  VitheloB2BHomeContentSchema,
} from "@/content/schema";
import type { ContentAdapter } from "@/lib/adapters/content-adapter";

const products = demoProducts.items.map((item) => ProductSchema.parse(item));
const homeContent = HomeContentSchema.parse(demoHome);
const b2bHome = VitheloB2BHomeContentSchema.parse(vitheloB2BHome);
const b2bSite = B2BSiteContentSchema.parse(vitheloB2BSite);
const b2bProductsPage = B2BProductsPageSchema.parse(vitheloB2BProductsPage);
const b2bOemOdmPage = B2BOemOdmPageSchema.parse(vitheloB2BOemOdmPage);
const b2bInsightsPage = B2BInsightsPageSchema.parse(vitheloB2BInsightsPage);
const b2bContactPage = B2BContactPageSchema.parse(vitheloB2BContactPage);
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
  async getB2BHomeContent() {
    return b2bHome;
  },
  async getB2BSiteContent() {
    return b2bSite;
  },
  async getB2BProductsPage() {
    return b2bProductsPage;
  },
  async getB2BOemOdmPage() {
    return b2bOemOdmPage;
  },
  async getB2BInsightsPage() {
    return b2bInsightsPage;
  },
  async listPublishedB2BInsights() {
    return b2bInsightsPage.articles.filter((article) => article.published);
  },
  async getB2BInsightBySlug(slug) {
    return (
      b2bInsightsPage.articles.find(
        (article) => article.published && article.slug === slug,
      ) ?? null
    );
  },
  async getB2BContactPage() {
    return b2bContactPage;
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
