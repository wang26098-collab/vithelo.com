export const demoProducts = {
  mode: "DEMO_ONLY",
  ingredients: [
    {
      id: "demo-ingredient-01",
      dataStatus: "DEMO_ONLY",
      name: "Demo Ingredient Record",
      descriptor: "Approved ingredient information required",
    },
  ],
  formulas: [
    {
      id: "demo-formula-01",
      dataStatus: "DEMO_ONLY",
      name: "Demo Formula Record",
      descriptor: "Approved formula information required",
      ingredientIds: ["demo-ingredient-01"],
    },
  ],
  technologies: [
    {
      id: "demo-technology-01",
      dataStatus: "DEMO_ONLY",
      name: "Demo Technology Record",
      descriptor: "Approved technology information required",
    },
  ],
  items: [
    {
      id: "demo-nutrition-01",
      slug: "demo-daily-formula",
      kind: "nutrition",
      dataStatus: "DEMO_ONLY",
      name: "Demo Daily Formula",
      descriptor: "Demonstration nutrition product",
      media: [
        {
          status: "NOT_CONFIGURED",
          alt: "Demo Daily Formula media requires approved product assets",
        },
      ],
      commerce: {
        status: "NOT_CONFIGURED",
        message: "Price not configured",
      },
      safety: {
        status: "NOT_CONFIGURED",
        dataStatus: "DEMO_ONLY",
        message: "Safety details require approved product input",
      },
      formulaIds: ["demo-formula-01"],
      ingredientIds: ["demo-ingredient-01"],
      relationshipIds: ["demo-formula-01", "demo-ingredient-01"],
    },
    {
      id: "demo-device-01",
      slug: "demo-precision-device",
      kind: "device",
      dataStatus: "DEMO_ONLY",
      name: "Demo Precision Device",
      descriptor: "Demonstration aesthetic technology product",
      media: [
        {
          status: "NOT_CONFIGURED",
          alt: "Demo Precision Device media requires approved product assets",
        },
      ],
      commerce: {
        status: "NOT_CONFIGURED",
        message: "Price not configured",
      },
      safety: {
        status: "NOT_CONFIGURED",
        dataStatus: "DEMO_ONLY",
        message: "Safety details require approved product input",
      },
      technologyIds: ["demo-technology-01"],
      relationshipIds: ["demo-technology-01"],
    },
  ],
} as const;
