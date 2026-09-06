import { SiteConfigSchema } from "@/content/schema";

export const siteConfig = SiteConfigSchema.parse({
  brand: {
    name: "VITHELO",
    signature: "PRECISION · SCIENCE · HUMAN",
    designFormula: "HUMAN × MATERIAL × PRECISION",
  },
  contact: {
    email: {
      status: "CONFIGURED",
      value: "wang26098@gmail.com",
      message: "Public business inquiry email",
    },
    whatsapp: {
      status: "CONFIGURED",
      e164: "8618273669556",
      message: "Public business inquiry WhatsApp",
    },
  },
});
