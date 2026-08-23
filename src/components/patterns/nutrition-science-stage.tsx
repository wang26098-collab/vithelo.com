import { NutritionFormVisual } from "@/components/domain/nutrition-form-visual";
import { ScrollExplanationStage } from "@/components/motion/scroll-explanation-stage";
import type { ScienceStage } from "@/content/schema";

type NutritionScienceStageProps = { stage: ScienceStage };

function NutritionScienceStage({ stage }: NutritionScienceStageProps) {
  const id = stage.id === "capsule-stage" ? "capsule-science" : "gummy-science";

  return (
    <section className="section-space bg-[var(--color-surface)]" id={id}>
      <div className="container-standard">
        <ScrollExplanationStage intent="EXPLAIN" stage={stage} visual={<NutritionFormVisual form={stage.form} media={stage.media} />} />
      </div>
    </section>
  );
}

export { NutritionScienceStage, type NutritionScienceStageProps };
