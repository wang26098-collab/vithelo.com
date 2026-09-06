import {
  analyticsEventNames,
  trackBusinessEvent,
  unconfiguredAnalyticsAdapter,
  type AnalyticsAdapter,
  type AnalyticsEvent,
} from "@/lib/analytics";

it("keeps the approved business-event vocabulary stable", () => {
  expect(analyticsEventNames).toEqual([
    "insight_commercial_click",
    "insight_related_content_click",
    "insight_start_project_click",
    "rfq_start",
    "email_continue",
    "whatsapp_continue",
  ]);
});

it("is a safe no-op when no analytics provider is configured", () => {
  const event: AnalyticsEvent = {
    name: "insight_commercial_click",
    properties: {
      pagePath: "/insights/what-information-to-include-in-an-rfq",
      pageType: "insight",
      articleSlug: "what-information-to-include-in-an-rfq",
      destinationPath: "/contact",
      linkContext: "commercial",
    },
  };

  expect(unconfiguredAnalyticsAdapter.status).toBe("NOT_CONFIGURED");
  expect(() => trackBusinessEvent(event)).not.toThrow();
});

it("passes the unchanged business payload to a configured adapter", () => {
  const events: AnalyticsEvent[] = [];
  const adapter: AnalyticsAdapter = {
    status: "CONFIGURED",
    track: (event) => events.push(event),
  };
  const event: AnalyticsEvent = {
    name: "email_continue",
    properties: {
      pagePath: "/contact",
      pageType: "contact",
      contactMethod: "email",
    },
  };

  trackBusinessEvent(event, adapter);

  expect(events).toEqual([event]);
});
