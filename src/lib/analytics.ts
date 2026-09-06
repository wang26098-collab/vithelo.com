export const analyticsEventNames = [
  "insight_commercial_click",
  "insight_related_content_click",
  "insight_start_project_click",
  "rfq_start",
  "email_continue",
  "whatsapp_continue",
] as const;

export type AnalyticsEventName = (typeof analyticsEventNames)[number];

export type AnalyticsEvent = {
  name: AnalyticsEventName;
  properties: {
    pagePath: string;
    pageType: "insight" | "product" | "dosage_form" | "commercial" | "contact";
    articleSlug?: string;
    destinationPath?: string;
    linkContext?: "commercial" | "related_content" | "start_project";
    dosageForm?: string;
    contactMethod?: "email" | "whatsapp";
  };
};

export interface AnalyticsAdapter {
  readonly status: "CONFIGURED" | "NOT_CONFIGURED";
  track(event: AnalyticsEvent): void;
}

export const unconfiguredAnalyticsAdapter: AnalyticsAdapter = {
  status: "NOT_CONFIGURED",
  track: () => undefined,
};

export function trackBusinessEvent(
  event: AnalyticsEvent,
  adapter: AnalyticsAdapter = unconfiguredAnalyticsAdapter,
) {
  adapter.track(event);
}
