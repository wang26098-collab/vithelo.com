export const businessIntents = [
  {
    id: "develop",
    label: "Develop a product",
    firstQuestion: "What product world and early brief should we understand?",
  },
  {
    id: "private-label",
    label: "Private Label",
    firstQuestion: "What approved product category and brand scope should be considered?",
  },
  {
    id: "oem-odm",
    label: "OEM / ODM",
    firstQuestion: "What concept and development ownership model should be considered?",
  },
  {
    id: "distribution",
    label: "Distribution",
    firstQuestion: "Which market and portfolio context should we understand?",
  },
] as const;

export type BusinessIntentId = (typeof businessIntents)[number]["id"];
