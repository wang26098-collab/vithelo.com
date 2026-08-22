import { HomeContentSchema, SiteConfigSchema } from "@/content/schema";
import { demoHome } from "@/content/demo/home";
import { siteConfig } from "@/content/site-config";

describe("VITHELO site configuration", () => {
  it("uses the approved master brand and visible signature", () => {
    const parsed = SiteConfigSchema.parse(siteConfig);

    expect(parsed.brand.name).toBe("VITHELO");
    expect(parsed.brand.signature).toBe("PRECISION · SCIENCE · HUMAN");
  });

  it("keeps unavailable contact channels explicit", () => {
    const parsed = SiteConfigSchema.parse(siteConfig);

    expect(parsed.contact.email.status).toBe("NOT_CONFIGURED");
    expect(parsed.contact.email.value).toBeNull();
    expect(parsed.contact.whatsapp.status).toBe("NOT_CONFIGURED");
    expect(parsed.contact.whatsapp.e164).toBeNull();
  });

  it("validates the B2B-first Home content", () => {
    const parsed = HomeContentSchema.parse(demoHome);

    expect(parsed.dataStatus).toBe("DEMO_ONLY");
    expect(parsed.hero.primaryAction).toBe("email");
    expect(parsed.hero.secondaryAction).toBe("whatsapp");
    expect(parsed.capabilities).toHaveLength(5);
  });
});
