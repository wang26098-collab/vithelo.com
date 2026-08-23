import { demoHome } from "@/content/demo/home";

it("keeps the capsule and gummy scientific stages as independent demo records", () => {
  expect(demoHome.scienceStages.map((stage) => stage.form)).toEqual([
    "capsule",
    "gummy",
  ]);
  expect(
    demoHome.scienceStages.every((stage) => stage.dataStatus === "DEMO_ONLY"),
  ).toBe(true);
  expect(
    demoHome.scienceStages.flatMap((stage) =>
      stage.states.map((state) => state.label),
    ),
  ).toEqual([
    "FORM",
    "MATERIAL",
    "USE",
    "SAFETY",
    "FORM",
    "MATERIAL",
    "USE",
    "SAFETY",
  ]);
});

it("keeps non-configured stage facts visible as disclosure language", () => {
  const safetyState = demoHome.scienceStages[0].states.find(
    (state) => state.label === "SAFETY",
  );

  expect(safetyState?.status).toEqual({
    status: "NOT_CONFIGURED",
    message: "Safety details require approved product input.",
  });
});
