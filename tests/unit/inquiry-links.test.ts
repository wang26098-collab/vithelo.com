import {
  buildEmailInquiryUrl,
  buildInquiryMessage,
  buildWhatsAppInquiryUrl,
} from "@/lib/inquiry";

const context = {
  cooperationType: "Private Label",
  productWorld: "Nutrition",
  market: "Singapore",
  summary: "Looking for an initial product discussion.",
};

it("builds a stable inquiry message", () => {
  expect(buildInquiryMessage(context)).toBe(
    "Cooperation type: Private Label\nProduct world: Nutrition\nMarket: Singapore\nProject summary: Looking for an initial product discussion.",
  );
});

it("builds an encoded mailto URL", () => {
  const url = buildEmailInquiryUrl("hello@vithelo.example", context);

  expect(url).toContain("mailto:hello@vithelo.example?");
  expect(url).toContain("subject=VITHELO%20inquiry%3A%20Private%20Label");
  expect(url).toContain("body=Cooperation%20type%3A%20Private%20Label");
});

it("builds an encoded WhatsApp URL", () => {
  const url = buildWhatsAppInquiryUrl("8613800138000", context);

  expect(url).toBe(
    `https://wa.me/8613800138000?text=${encodeURIComponent(buildInquiryMessage(context))}`,
  );
});
