"use client";

import { Button } from "@/components/core/button";
import { StatePanel } from "@/components/core/state-panel";
import { UtilityPage } from "@/components/patterns/utility-page";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ reset }: GlobalErrorProps) {
  return (
    <UtilityPage description="The requested task could not be completed." title="Something went wrong">
      <StatePanel
        description={
          <div>
            <p>Try the route again. If the problem continues, return to a known destination.</p>
            <Button className="mt-5" onClick={reset} variant="secondary">
              Try again
            </Button>
          </div>
        }
        state="error"
        title="This page could not be loaded"
      />
    </UtilityPage>
  );
}
