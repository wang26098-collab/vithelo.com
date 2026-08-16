export const demoEvidence = {
  mode: "DEMO_ONLY",
  items: [
    {
      id: "demo-evidence-01",
      dataStatus: "DEMO_ONLY",
      type: "SOURCE_PLACEHOLDER",
      title: "Demo Evidence Record",
      summary: "Approved evidence summary required",
      source: {
        status: "NOT_CONFIGURED",
        message: "Source not configured",
      },
      scope: "Scope requires approved source input",
      supportedStatementBoundary: "No product statement is supported by this placeholder",
      limitation: "This demonstration record is not product evidence",
      relationshipIds: ["demo-nutrition-01"],
    },
  ],
} as const;
