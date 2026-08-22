import { z } from "zod";

export const DataStatusSchema = z.literal("DEMO_ONLY");

const ConfiguredStatusSchema = z.object({
  status: z.literal("NOT_CONFIGURED"),
  message: z.string().min(1),
});

export const MediaSchema = z.object({
  status: z.literal("NOT_CONFIGURED"),
  alt: z.string().min(1),
});

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

export const HomeContentSchema = z.object({
  dataStatus: DataStatusSchema,
  hero: z.object({
    headline: z.string().min(1),
    supportingText: z.string().min(1),
    primaryAction: z.literal("email"),
    secondaryAction: z.literal("whatsapp"),
    desktopMedia: MediaSchema,
    mobileMedia: MediaSchema,
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
export type Formula = z.infer<typeof FormulaSchema>;
export type Ingredient = z.infer<typeof IngredientSchema>;
export type Technology = z.infer<typeof TechnologySchema>;
export type Evidence = z.infer<typeof EvidenceSchema>;
export type Capability = z.infer<typeof CapabilitySchema>;
export type MarketConfiguration = z.infer<typeof MarketConfigurationSchema>;
export type SiteConfig = z.infer<typeof SiteConfigSchema>;
export type HomeContent = z.infer<typeof HomeContentSchema>;
