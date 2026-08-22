"use client";

import { InquiryActionPair } from "@/components/core/inquiry-action-pair";
import { StickyResource } from "@/components/core/sticky-resource";

function MobileInquiryBar() {
  return (
    <StickyResource className="block lg:hidden" label="Inquiry channels" priority="P1">
      <InquiryActionPair showConfigurationMessages={false} />
    </StickyResource>
  );
}

export { MobileInquiryBar };
