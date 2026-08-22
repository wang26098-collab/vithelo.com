import { SiteConfigSchema } from "@/content/schema";

export const siteConfig = SiteConfigSchema.parse({
  brand: {
    name: "VITHELO",
    signature: "PRECISION · SCIENCE · HUMAN",
    designFormula: "HUMAN × MATERIAL × PRECISION",
  },
  contact: {
    email: {
      status: "NOT_CONFIGURED",
      value: null,
      message: "Email inquiry address not configured",
    },
    whatsapp: {
      status: "NOT_CONFIGURED",
      e164: null,
      message: "WhatsApp number not configured",
    },
  },
});
