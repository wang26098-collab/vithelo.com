import { StatePanel } from "@/components/core/state-panel";
import { UtilityPage } from "@/components/patterns/utility-page";
import { InquiryActionPair } from "@/components/core/inquiry-action-pair";

export default function Loading() {
  return (
    <UtilityPage description="Preparing the requested task and its current system state." title="Loading">
      <StatePanel
        description="The destination will appear when its local data and route are ready."
        state="loading"
        title="Loading the requested page"
      />
      <noscript>
        <div className="mt-8">
          <h2 className="mb-4">Contact VITHELO directly</h2>
          <InquiryActionPair />
        </div>
      </noscript>
    </UtilityPage>
  );
}
