import { NutritionFormVisual } from "@/components/domain/nutrition-form-visual";
import { ScrollExplanationStage } from "@/components/motion/scroll-explanation-stage";
import { NutritionCapsuleStage } from "@/components/patterns/nutrition-capsule-stage";
import type { ScienceStage } from "@/content/schema";

type NutritionScienceStageProps = { stage: ScienceStage };

function NutritionScienceStage({ stage }: NutritionScienceStageProps) {
  if (stage.id === "capsule-stage") {
    return <NutritionCapsuleStage stage={stage} />;
  }

  return (
    <section className="section-space bg-[var(--color-surface)]" id="gummy-science">
      <div className="container-standard">
        <ScrollExplanationStage intent="EXPLAIN" stage={stage} visual={<NutritionFormVisual form={stage.form} media={stage.media} />} />
      </div>
    </section>
  );
}

export { NutritionScienceStage, type NutritionScienceStageProps };
