"use client";

import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import Image from "next/image";
import type { NutritionProduct } from "@/content/schema";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type NutritionProductFocusRailProps = {
  products: readonly NutritionProduct[];
};

const approvedCardAssets: Record<string, string> = {
  "sleep-health": "/media/vithelo-product-card-sleep.png",
  "womens-health": "/media/vithelo-product-card-womens.png",
  "daily-essential": "/media/vithelo-product-card-daily.png",
};

function NutritionProductFocusRail({ products }: NutritionProductFocusRailProps) {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(products.length > 1 ? 1 : 0);
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const pointerPosition = useRef<{ index: number; x: number; y: number } | null>(null);

  function activate(index: number) {
    if (products[index]) setActiveIndex(index);
  }

  function focusProduct(index: number) {
    activate(index);
    linkRefs.current[index]?.focus();
  }

  function handlePointerEnter(event: PointerEvent<HTMLElement>, index: number) {
    const previous = pointerPosition.current;
    const reflowedUnderStationaryPointer = previous && previous.index !== index && previous.x === event.clientX && previous.y === event.clientY;
    if (!reflowedUnderStationaryPointer) activate(index);
    pointerPosition.current = reflowedUnderStationaryPointer ? previous : { index, x: event.clientX, y: event.clientY };
  }

  function handlePointerMove(event: PointerEvent<HTMLElement>, index: number) {
    pointerPosition.current = { index, x: event.clientX, y: event.clientY };
  }

  function handleKeyDown(event: KeyboardEvent<HTMLAnchorElement>, index: number) {
    const nextIndex = event.key === "ArrowRight"
      ? (index + 1) % products.length
      : event.key === "ArrowLeft"
        ? (index - 1 + products.length) % products.length
        : event.key === "Home"
          ? 0
          : event.key === "End"
            ? products.length - 1
            : null;
    if (nextIndex === null) return;
    event.preventDefault();
    focusProduct(nextIndex);
  }

  return (
    <div className="nutrition-product-rail flex h-full min-h-[30rem] items-end gap-[clamp(0.75rem,1.35vw,1.5rem)] overflow-x-auto snap-x snap-mandatory px-1 pt-7 pb-3 lg:min-h-[32rem] lg:overflow-visible" data-testid={reducedMotion ? "reduced-motion-static" : "nutrition-product-focus-rail"}>
      {products.map((product, index) => {
        const active = index === activeIndex;
        const asset = approvedCardAssets[product.healthCategory];
        return (
          <article
            className="nutrition-product-card relative h-[clamp(28rem,53vh,34.5rem)] min-w-[82vw] flex-1 basis-0 snap-center overflow-hidden rounded-[var(--radius-12)] bg-[#dfdcd5] lg:min-w-0"
            data-active={active}
            data-category={product.healthCategory}
            data-form={product.form}
            data-testid="nutrition-product-card"
            key={product.id}
            onPointerEnter={(event) => handlePointerEnter(event, index)}
            onPointerMove={(event) => handlePointerMove(event, index)}
          >
            <a
              aria-label={product.name}
              className="group relative block h-full min-h-11 outline-offset-[-4px] focus-visible:outline-2 focus-visible:outline-[var(--color-focus)]"
              href={`/nutrition/${product.slug}`}
              onFocus={() => activate(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              ref={(node) => { linkRefs.current[index] = node; }}
            >
              <Image alt="" className="object-cover transition-transform duration-[var(--motion-slow)] ease-[var(--ease-standard)] group-hover:scale-[1.015]" data-testid="nutrition-product-card-image" fill sizes="(min-width: 1024px) 38vw, 82vw" src={asset ?? "/media/vithelo-product-card-daily.png"} />
              <span className="sr-only">{product.name}. {product.descriptor}. {product.safety.status}: {product.safety.message}</span>
              <span className="absolute bottom-3 left-3 bg-black/55 px-2 py-1 text-[0.625rem] tracking-[0.12em] text-white/80 uppercase">DEMO_ONLY</span>
            </a>
          </article>
        );
      })}
    </div>
  );
}

export { NutritionProductFocusRail, type NutritionProductFocusRailProps };
