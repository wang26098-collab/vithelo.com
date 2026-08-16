import { StatePanel } from "@/components/core/state-panel";
import { UtilityPage } from "@/components/patterns/utility-page";

export default function Loading() {
  return (
    <UtilityPage description="Preparing the requested task and its current system state." title="Loading">
      <StatePanel
        description="The destination will appear when its local data and route are ready."
        state="loading"
        title="Loading the requested page"
      />
    </UtilityPage>
  );
}
