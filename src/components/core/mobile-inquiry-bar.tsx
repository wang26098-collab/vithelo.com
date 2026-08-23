"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { InquiryActionPair } from "@/components/core/inquiry-action-pair";
import { StickyResource } from "@/components/core/sticky-resource";

function MobileInquiryBar() {
  const pathname = usePathname();
  const [heroExited, setHeroExited] = useState(false);
  const isProductDetail = /^\/(nutrition|aesthetic-technology)\/[^/]+$/.test(pathname);
  const isInquiryRoute = pathname === "/contact";
  const active = pathname !== "/" || heroExited;

  useEffect(() => {
    if (pathname !== "/") return;

    const hero = document.querySelector("#nutrition-hero");
    if (!hero) return;

    const observer = new IntersectionObserver(([entry]) => setHeroExited(!entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, [pathname]);

  if (isProductDetail || isInquiryRoute || !active) return null;

  return (
    <>
      <div aria-hidden="true" className="h-32 lg:hidden" />
      <StickyResource
        className="block lg:hidden"
        label="Inquiry channels"
        position="fixed"
        priority="P1"
      >
        <InquiryActionPair showConfigurationMessages={false} />
      </StickyResource>
    </>
  );
}

export { MobileInquiryBar };
