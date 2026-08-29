import { z } from "zod";

export const DataStatusSchema = z.literal("DEMO_ONLY");

const ConfiguredStatusSchema = z.object({
  status: z.literal("NOT_CONFIGURED"),
  message: z.string().min(1),
});

const DemoMediaSchema = z.object({
  status: z.literal("DEMO_ONLY"),
  src: z.string().regex(/^\/media\/[\w./-]+$/),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  alt: z.string().min(1),
});

const MissingMediaSchema = z.object({
  status: z.literal("NOT_CONFIGURED"),
  alt: z.string().min(1),
  message: z.string().min(1),
});

export const MediaSchema = z.discriminatedUnion("status", [
  DemoMediaSchema,
  MissingMediaSchema,
]);

export const CommerceSchema = ConfiguredStatusSchema;

export const SafetySchema = ConfiguredStatusSchema.extend({
  dataStatus: DataStatusSchema,
});

export const IngredientSchema = z.object({
  id: z.string().min(1),
  dataStatus: DataStatusSchema,
  name: z.string().min(1),
  descriptor: z.string().min(1),
});

export const FormulaSchema = z.object({
  id: z.string().min(1),
  dataStatus: DataStatusSchema,
  name: z.string().min(1),
  descriptor: z.string().min(1),
  ingredientIds: z.array(z.string().min(1)),
});

export const TechnologySchema = z.object({
  id: z.string().min(1),
  dataStatus: DataStatusSchema,
  name: z.string().min(1),
  descriptor: z.string().min(1),
});

export const EvidenceSchema = z.object({
  id: z.string().min(1),
  dataStatus: DataStatusSchema,
  type: z.literal("SOURCE_PLACEHOLDER"),
  title: z.string().min(1),
  summary: z.string().min(1),
  source: ConfiguredStatusSchema,
  scope: z.string().min(1),
  supportedStatementBoundary: z.string().min(1),
  limitation: z.string().min(1),
  relationshipIds: z.array(z.string().min(1)),
});

export const CapabilitySchema = z.object({
  id: z.string().min(1),
  dataStatus: DataStatusSchema,
  name: z.string().min(1),
  descriptor: z.string().min(1),
});

export const MarketConfigurationSchema = ConfiguredStatusSchema.extend({
  dataStatus: DataStatusSchema,
});

const MissingEmailConfigSchema = z.object({
  status: z.literal("NOT_CONFIGURED"),
  value: z.null(),
  message: z.string().min(1),
});

const ConfiguredEmailSchema = z.object({
  status: z.literal("CONFIGURED"),
  value: z.email(),
  message: z.string().min(1),
});

const MissingWhatsAppConfigSchema = z.object({
  status: z.literal("NOT_CONFIGURED"),
  e164: z.null(),
  message: z.string().min(1),
});

const ConfiguredWhatsAppSchema = z.object({
  status: z.literal("CONFIGURED"),
  e164: z.string().regex(/^\d{8,15}$/),
  message: z.string().min(1),
});

export const SiteConfigSchema = z.object({
  brand: z.object({
    name: z.literal("VITHELO"),
    signature: z.literal("PRECISION · SCIENCE · HUMAN"),
    designFormula: z.literal("HUMAN × MATERIAL × PRECISION"),
  }),
  contact: z.object({
    email: z.discriminatedUnion("status", [
      MissingEmailConfigSchema,
      ConfiguredEmailSchema,
    ]),
    whatsapp: z.discriminatedUnion("status", [
      MissingWhatsAppConfigSchema,
      ConfiguredWhatsAppSchema,
    ]),
  }),
});

export const NutritionHealthCategorySchema = z.enum([
  "sleep-health",
  "womens-health",
  "daily-essential",
]);

export const NutritionFormSchema = z.enum(["capsule", "gummy"]);

const ScienceStageStateSchema = z.object({
  label: z.enum(["FORM", "MATERIAL", "USE", "SAFETY"]),
  summary: z.string().min(1),
  status: z.union([DataStatusSchema, ConfiguredStatusSchema]),
});

const ScienceStageSchema = z.object({
  id: z.enum(["capsule-stage", "gummy-stage"]),
  dataStatus: DataStatusSchema,
  form: NutritionFormSchema,
  title: z.string().min(1),
  media: MediaSchema,
  states: z.array(ScienceStageStateSchema).length(4),
});

export const HomeContentSchema = z.object({
  dataStatus: DataStatusSchema,
  hero: z.object({
    headline: z.literal("WOMEN’S NUTRITION, SHAPED WITH PRECISION."),
    supportingText: z.literal(
      "A flagship gummy platform for differentiated formulas, brand programs and professional partnerships.",
    ),
    primaryAction: z.object({
      label: z.literal("START A PROJECT"),
      href: z.literal(
        "/contact?world=nutrition&subject=Women%E2%80%99s%20gummy%20partnership",
      ),
    }),
    desktopMedia: MediaSchema,
    mobileMedia: MediaSchema,
  }),
  categoryPaths: z
    .array(
      z.object({
        id: NutritionHealthCategorySchema,
        title: z.string().min(1),
        summary: z.string().min(1),
        href: z.string().regex(/^\/nutrition#(?:sleep-health|womens-health)$/),
      }),
    )
    .length(2),
  scienceStages: z.array(ScienceStageSchema).length(2),
  humanRhythms: z.object({
    title: z.string().min(1),
    summary: z.string().min(1),
    media: MediaSchema,
  }),
  professionalInquiry: z.object({
    title: z.string().min(1),
    summary: z.string().min(1),
    href: z.literal("/professional"),
  }),
  partnerPaths: z
    .array(
      z.object({
        id: z.enum(["product-partners", "professional-partners"]),
        title: z.string().min(1),
        summary: z.string().min(1),
        intentIds: z.array(z.string().min(1)).min(1),
        preferredChannel: z.enum(["email", "whatsapp"]),
      }),
    )
    .length(2),
  capabilities: z
    .array(
      z.object({
        id: z.string().min(1),
        title: z.string().min(1),
        summary: z.string().min(1),
        inquiryContext: z.string().min(1),
      }),
    )
    .length(5),
});

export const B2BHomeSectionIdSchema = z.enum([
  "hero",
  "proof",
  "gummy-stage",
  "solutions",
  "dosage-forms",
  "custom-development",
  "manufacturing",
  "quality",
  "project-runway",
  "company-fit",
  "contact",
]);

const B2BRequiredMediaSchema = z.object({
  status: z.enum(["REQUIRED_REAL_ASSET", "FREE_COMMERCIAL_OR_REAL"]),
  src: z.string().regex(/^\/media\/b2b\/[\w.-]+$/).optional(),
  label: z.string().min(1),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  format: z.enum(["WebP", "transparent WebP"]),
});

const B2BLabelCopySchema = z.object({
  title: z.string().min(1),
  copy: z.string().min(1),
});

export const VitheloB2BHomeContentSchema = z.object({
  dataStatus: DataStatusSchema,
  sectionOrder: z.array(B2BHomeSectionIdSchema).length(11),
  hero: z.object({
    eyebrow: z.string().min(1),
    title: z.string().min(1),
    copy: z.string().min(1),
    primaryAction: z.object({
      label: z.literal("Start a Project"),
      href: z.literal("/contact"),
    }),
    secondaryAction: z.object({
      label: z.literal("Explore Formats"),
      href: z.literal("/products"),
    }),
    media: B2BRequiredMediaSchema,
  }),
  proof: z
    .array(
      z.object({
        label: z.string().min(1),
        value: z.string().min(1),
        suffix: z.string().min(1).optional(),
      }),
    )
    .length(4),
  gummy: z.object({
    kicker: z.string().min(1),
    title: z.string().min(1),
    media: B2BRequiredMediaSchema,
    features: z.array(B2BLabelCopySchema).length(6),
  }),
  market: z.object({
    kicker: z.string().min(1),
    title: z.string().min(1),
    stories: z
      .array(
        B2BLabelCopySchema.extend({
          media: B2BRequiredMediaSchema,
        }),
      )
      .length(6),
  }),
  dosage: z.object({
    kicker: z.string().min(1),
    title: z.string().min(1),
    qualifier: z.string().min(1),
    items: z
      .array(
        z.object({
          name: z.string().min(1),
          moq: z.string().min(1),
        }),
      )
      .length(8),
  }),
  development: z.object({
    kicker: z.string().min(1),
    title: z.string().min(1),
    coreTitle: z.string().min(1),
    coreCopy: z.string().min(1),
    notes: z.array(B2BLabelCopySchema).length(4),
  }),
  manufacturing: z.object({
    kicker: z.string().min(1),
    title: z.string().min(1),
    media: B2BRequiredMediaSchema,
    metrics: z
      .array(
        z.object({
          label: z.string().min(1),
          value: z.string().min(1),
          note: z.string().min(1),
        }),
      )
      .length(4),
  }),
  quality: z.object({
    kicker: z.string().min(1),
    title: z.string().min(1),
    recordTitle: z.string().min(1),
    caveat: z.string().min(1),
    rows: z
      .array(
        B2BLabelCopySchema.extend({
          state: z.string().min(1),
        }),
      )
      .length(4),
  }),
  runway: z.object({
    kicker: z.string().min(1),
    title: z.string().min(1),
    steps: z.array(B2BLabelCopySchema).length(6),
  }),
  channels: z.object({
    kicker: z.string().min(1),
    title: z.string().min(1),
    paths: z
      .array(
        B2BLabelCopySchema.extend({
          label: z.string().min(1),
        }),
      )
      .length(3),
  }),
  contact: z.object({
    status: z.literal("NOT_CONFIGURED"),
    kicker: z.string().min(1),
    title: z.string().min(1),
    copy: z.string().min(1),
    pendingMessage: z.string().min(1),
    formats: z.array(z.string().min(1)).length(8),
  }),
});

const ProductBaseSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  dataStatus: DataStatusSchema,
  name: z.string().min(1),
  descriptor: z.string().min(1),
  media: z.array(MediaSchema).min(1),
  commerce: CommerceSchema,
  safety: SafetySchema,
  relationshipIds: z.array(z.string().min(1)).min(1),
});

export const NutritionProductSchema = ProductBaseSchema.extend({
  kind: z.literal("nutrition"),
  healthCategory: NutritionHealthCategorySchema,
  form: NutritionFormSchema,
  formulaIds: z.array(z.string().min(1)).min(1),
  ingredientIds: z.array(z.string().min(1)).min(1),
});

export const DeviceProductSchema = ProductBaseSchema.extend({
  kind: z.literal("device"),
  technologyIds: z.array(z.string().min(1)).min(1),
});

export const ProductSchema = z.discriminatedUnion("kind", [
  NutritionProductSchema,
  DeviceProductSchema,
]);

const B2BLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().regex(/^\/(?:[a-z][\w-]*)(?:\/[a-z][\w-]*)?(?:\?[^\s]+)?$|^\/$/),
});

const B2BTextItemSchema = z.object({
  title: z.string().min(1),
  copy: z.string().min(1),
});

const B2BFreeMediaSchema = z.object({
  status: z.literal("FREE_COMMERCIAL"),
  src: z.string().regex(/^\/media\/b2b\/[\w.-]+$/),
  alt: z.string().min(1),
  sourceUrl: z.url(),
  creator: z.string().min(1),
  licenseUrl: z.url(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});

const B2BMissingMediaSchema = z.object({
  status: z.literal("NOT_CONFIGURED"),
  alt: z.string().min(1),
  message: z.string().min(1),
});

export const B2BPageMediaSchema = z.discriminatedUnion("status", [
  B2BFreeMediaSchema,
  B2BMissingMediaSchema,
]);

export const B2BSiteContentSchema = z.object({
  dataStatus: DataStatusSchema,
  identity: z.string().min(1),
  navigation: z.array(B2BLinkSchema).length(4),
  requestQuote: B2BLinkSchema,
  footerLinks: z.array(B2BLinkSchema).length(4),
  disclosure: z.string().min(1),
});

const B2BHeroSchema = z.object({
  kicker: z.string().min(1),
  title: z.string().min(1),
  copy: z.string().min(1),
});

const DosageFormatCapabilitySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  fit: z.string().min(1),
  customization: z.array(z.string().min(1)).min(2),
  packaging: z.string().min(1),
  moq: z.string().min(1),
});

export const B2BProductsPageSchema = z.object({
  dataStatus: DataStatusSchema,
  hero: B2BHeroSchema,
  gummy: z.object({
    title: z.string().min(1),
    copy: z.string().min(1),
    media: B2BPageMediaSchema,
    dimensions: z.array(B2BTextItemSchema).length(6),
  }),
  formats: z.array(DosageFormatCapabilitySchema).length(8),
  comparison: z
    .array(z.object({ criterion: z.string(), guidance: z.string() }))
    .min(4),
  packaging: z.array(B2BTextItemSchema).min(4),
  moqNote: z.literal("Flexible MOQ based on formula and packaging."),
  cta: z.object({
    title: z.string(),
    copy: z.string(),
    href: z.literal("/contact"),
  }),
});

export const B2BOemOdmPageSchema = z.object({
  dataStatus: DataStatusSchema,
  hero: B2BHeroSchema,
  identity: B2BTextItemSchema,
  steps: z.array(B2BTextItemSchema).length(6),
  customization: z.array(B2BTextItemSchema).length(4),
  production: z.array(B2BTextItemSchema).length(4),
  quality: z.array(B2BTextItemSchema).length(4),
  checklist: z.array(z.string().min(1)).length(5),
  faqs: z.array(B2BTextItemSchema).min(5),
  cta: z.object({
    title: z.string(),
    copy: z.string(),
    href: z.literal("/contact"),
  }),
});

const InsightBlockSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("text"),
    title: z.string(),
    paragraphs: z.array(z.string()).min(1),
  }),
  z.object({
    type: z.literal("list"),
    title: z.string(),
    items: z.array(z.string()).min(2),
  }),
  z.object({
    type: z.literal("table"),
    title: z.string(),
    columns: z.array(z.string()).min(2),
    rows: z.array(z.array(z.string()).min(2)).min(2),
  }),
  z.object({ type: z.literal("callout"), title: z.string(), copy: z.string() }),
  z.object({
    type: z.literal("cta"),
    title: z.string(),
    copy: z.string(),
    href: z.literal("/contact"),
  }),
  z.object({ type: z.literal("media"), media: B2BPageMediaSchema }),
  z.object({
    type: z.literal("video"),
    status: z.literal("NOT_CONFIGURED"),
    message: z.string(),
  }),
  z.object({
    type: z.literal("download"),
    status: z.literal("NOT_CONFIGURED"),
    message: z.string(),
  }),
  z.object({
    type: z.literal("faq"),
    items: z.array(B2BTextItemSchema).min(2),
  }),
]);

export const B2BInsightArticleSchema = z.object({
  dataStatus: DataStatusSchema,
  published: z.boolean(),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  category: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  byline: z.string().min(1),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  contentFormat: z.string().min(1),
  blocks: z.array(InsightBlockSchema).min(4),
});

export const B2BInsightsPageSchema = z.object({
  dataStatus: DataStatusSchema,
  hero: B2BHeroSchema,
  categories: z.array(z.string().min(1)).length(5),
  articles: z.array(B2BInsightArticleSchema).length(3),
});

export const B2BContactPageSchema = z.object({
  dataStatus: DataStatusSchema,
  status: z.literal("NOT_CONFIGURED"),
  hero: B2BHeroSchema,
  fields: z.array(z.string().min(1)).length(8),
  formats: z.array(z.string().min(1)).length(8),
  pendingMessage: z.string().min(1),
});

export type Product = z.infer<typeof ProductSchema>;
export type Media = z.infer<typeof MediaSchema>;
export type NutritionHealthCategory = z.infer<typeof NutritionHealthCategorySchema>;
export type NutritionForm = z.infer<typeof NutritionFormSchema>;
export type NutritionProduct = z.infer<typeof NutritionProductSchema>;
export type ScienceStage = z.infer<typeof ScienceStageSchema>;
export type Formula = z.infer<typeof FormulaSchema>;
export type Ingredient = z.infer<typeof IngredientSchema>;
export type Technology = z.infer<typeof TechnologySchema>;
export type Evidence = z.infer<typeof EvidenceSchema>;
export type Capability = z.infer<typeof CapabilitySchema>;
export type MarketConfiguration = z.infer<typeof MarketConfigurationSchema>;
export type SiteConfig = z.infer<typeof SiteConfigSchema>;
export type HomeContent = z.infer<typeof HomeContentSchema>;
export type B2BHomeSectionId = z.infer<typeof B2BHomeSectionIdSchema>;
export type VitheloB2BHomeContent = z.infer<typeof VitheloB2BHomeContentSchema>;
export type B2BPageMedia = z.infer<typeof B2BPageMediaSchema>;
export type B2BSiteContent = z.infer<typeof B2BSiteContentSchema>;
export type B2BProductsPage = z.infer<typeof B2BProductsPageSchema>;
export type B2BOemOdmPage = z.infer<typeof B2BOemOdmPageSchema>;
export type B2BInsightArticle = z.infer<typeof B2BInsightArticleSchema>;
export type B2BInsightsPage = z.infer<typeof B2BInsightsPageSchema>;
export type B2BContactPage = z.infer<typeof B2BContactPageSchema>;
