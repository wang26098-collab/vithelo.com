import { HomeContentSchema, SiteConfigSchema } from "@/content/schema";
import { demoHome } from "@/content/demo/home";
import { siteConfig } from "@/content/site-config";

describe("VITHELO site configuration", () => {
  it("uses the approved master brand and visible signature", () => {
    const parsed = SiteConfigSchema.parse(siteConfig);

    expect(parsed.brand.name).toBe("VITHELO");
    expect(parsed.brand.signature).toBe("PRECISION · SCIENCE · HUMAN");
  });

  it("uses the approved public inquiry channels", () => {
    const parsed = SiteConfigSchema.parse(siteConfig);

    expect(parsed.contact.email).toEqual({
      status: "CONFIGURED",
      value: "wang26098@gmail.com",
      message: "Public business inquiry email",
    });
    expect(parsed.contact.whatsapp).toEqual({
      status: "CONFIGURED",
      e164: "8618273669556",
      message: "Public business inquiry WhatsApp",
    });
  });

  it("validates the B2B-first Home content", () => {
    const parsed = HomeContentSchema.parse(demoHome);

    expect(parsed.dataStatus).toBe("DEMO_ONLY");
    expect(parsed.hero.primaryAction).toEqual({
      label: "START A PROJECT",
      href: "/contact?world=nutrition&subject=Women%E2%80%99s%20gummy%20partnership",
    });
    expect(parsed.hero).not.toHaveProperty("secondaryAction");
    expect(parsed.capabilities).toHaveLength(5);
  });
});
