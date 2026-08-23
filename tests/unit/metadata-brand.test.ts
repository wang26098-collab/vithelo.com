import { metadata as accountMetadata } from "@/app/account/page";
import { metadata as deviceLandingMetadata } from "@/app/aesthetic-technology/page";
import { generateMetadata as generateDeviceMetadata } from "@/app/aesthetic-technology/[slug]/page";
import { metadata as cartMetadata } from "@/app/cart/page";
import { metadata as checkoutMetadata } from "@/app/checkout/page";
import { metadata as contactMetadata } from "@/app/contact/page";
import { metadata as homeMetadata } from "@/app/page";
import { metadata as nutritionLandingMetadata } from "@/app/nutrition/page";
import { generateMetadata as generateNutritionMetadata } from "@/app/nutrition/[slug]/page";
import { metadata as professionalMetadata } from "@/app/professional/page";
import { metadata as scienceMetadata } from "@/app/science/page";
import { metadata as searchMetadata } from "@/app/search/page";
import { metadata as supportMetadata } from "@/app/support/page";

const staticMetadata = [
  accountMetadata,
  deviceLandingMetadata,
  cartMetadata,
  checkoutMetadata,
  contactMetadata,
  homeMetadata,
  nutritionLandingMetadata,
  professionalMetadata,
  scienceMetadata,
  searchMetadata,
  supportMetadata,
];

it("keeps every route title in the VITHELO brand", async () => {
  const dynamicMetadata = await Promise.all([
    generateDeviceMetadata({ params: Promise.resolve({ slug: "demo-precision-device" }) }),
    generateNutritionMetadata({ params: Promise.resolve({ slug: "demo-daily-formula" }) }),
  ]);

  for (const metadata of [...staticMetadata, ...dynamicMetadata]) {
    expect(metadata.title).toEqual(expect.stringContaining("VITHELO"));
    expect(metadata.title).not.toEqual(expect.stringContaining("A PRIME"));
  }
});
