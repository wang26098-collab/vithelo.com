import { StatePanel } from "@/components/core/state-panel";
import { UtilityPage } from "@/components/patterns/utility-page";

export default function NotFound() {
  return (
    <UtilityPage description="The requested destination is not part of this demonstration." title="Page not found">
      <StatePanel
        actionHref="/"
        actionLabel="Return to home"
        description="Check the address or return to the brand home page."
        state="empty"
        title="No page exists at this address"
      />
    </UtilityPage>
  );
}
