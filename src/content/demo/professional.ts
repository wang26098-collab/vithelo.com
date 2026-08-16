export const demoProfessional = {
  mode: "DEMO_ONLY",
  capabilities: [
    {
      id: "demo-capability-product-development",
      dataStatus: "DEMO_ONLY",
      name: "Product Development",
      descriptor: "Capability details require approved business input",
    },
    {
      id: "demo-capability-private-label",
      dataStatus: "DEMO_ONLY",
      name: "Private Label",
      descriptor: "Capability details require approved business input",
    },
  ],
  marketConfiguration: {
    status: "NOT_CONFIGURED",
    dataStatus: "DEMO_ONLY",
    message: "Market configuration not configured",
  },
} as const;
