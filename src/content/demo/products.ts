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
      slug: "demo-sleep-formula",
      kind: "nutrition",
      dataStatus: "DEMO_ONLY",
      name: "Demo Sleep Formula",
      descriptor: "Demonstration nutrition product",
      healthCategory: "sleep-health",
      form: "capsule",
      media: [
        {
          status: "DEMO_ONLY",
          src: "/media/nutrition-ritual.png",
          width: 1536,
          height: 1024,
          alt: "Demonstration nutrition product image",
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
      id: "demo-nutrition-02",
      slug: "demo-womens-formula",
      kind: "nutrition",
      dataStatus: "DEMO_ONLY",
      name: "Demo Women’s Formula",
      descriptor: "Demonstration nutrition product",
      healthCategory: "womens-health",
      form: "gummy",
      media: [
        {
          status: "NOT_CONFIGURED",
          alt: "Demo Women’s Formula media requires approved product assets",
          message: "Demo Women’s Formula media requires approved product assets.",
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
      id: "demo-nutrition-03",
      slug: "demo-daily-formula",
      kind: "nutrition",
      dataStatus: "DEMO_ONLY",
      name: "Demo Daily Formula",
      descriptor: "Demonstration nutrition product",
      healthCategory: "daily-essential",
      form: "capsule",
      media: [
        {
          status: "NOT_CONFIGURED",
          alt: "Demo Daily Formula media requires approved product assets",
          message: "Demo Daily Formula media requires approved product assets.",
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
          message: "Demo Precision Device media requires approved product assets.",
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
