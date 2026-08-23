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
