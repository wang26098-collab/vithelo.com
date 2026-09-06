import { z } from "zod";

const RFQSchema = z.object({
  name: z.string().trim().optional(),
  company: z.string().trim().min(1, "Company is required"),
  email: z.string().trim().email("Enter a valid email"),
  productOrDosageForm: z.string().trim().min(1, "Choose a dosage form"),
  formulaOrIngredients: z.string().trim().optional(),
  targetMarket: z.string().trim().optional(),
  estimatedQuantity: z.string().trim().optional(),
  packaging: z.string().trim().optional(),
  whatsapp: z.string().trim().optional(),
  message: z.string().trim().optional(),
});

type RFQ = z.infer<typeof RFQSchema>;

function normalizeRFQ(input: Partial<RFQ>) {
  const normalized = Object.fromEntries(Object.entries(input).map(([key, value]) => [key, typeof value === "string" ? value.trim() : value]));
  return RFQSchema.parse(normalized);
}

export { RFQSchema, normalizeRFQ, type RFQ };
