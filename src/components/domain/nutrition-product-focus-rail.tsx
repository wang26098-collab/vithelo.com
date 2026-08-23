"use client";

import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import type { NutritionProduct } from "@/content/schema";
import { motionTransition } from "@/components/motion/reveal";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

type NutritionProductFocusRailProps = {
  products: readonly NutritionProduct[];
};

function NutritionProductFocusRail({ products }: NutritionProductFocusRailProps) {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
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
    const reflowedUnderStationaryPointer =
      previous &&
      previous.index !== index &&
      previous.x === event.clientX &&
      previous.y === event.clientY;

    if (!reflowedUnderStationaryPointer) activate(index);

    pointerPosition.current = reflowedUnderStationaryPointer
      ? previous
      : { index, x: event.clientX, y: event.clientY };
  }

  function handlePointerMove(event: PointerEvent<HTMLElement>, index: number) {
    pointerPosition.current = { index, x: event.clientX, y: event.clientY };
  }

  function handleKeyDown(event: KeyboardEvent<HTMLAnchorElement>, index: number) {
    const nextIndex =
      event.key === "ArrowRight"
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
    <div
      className="flex gap-[var(--space-16)] overflow-x-auto snap-x snap-mandatory pb-[var(--space-12)] lg:overflow-visible"
      data-testid={reducedMotion ? "reduced-motion-static" : "nutrition-product-focus-rail"}
    >
      {products.map((product, index) => {
        const active = index === activeIndex;
        const media = product.media[0];

        return (
          <motion.article
            animate={reducedMotion ? undefined : { flexGrow: active ? 1.4 : 1 }}
            className="min-w-[82vw] snap-center border border-[var(--color-border)] bg-[var(--color-surface)] lg:min-w-0 lg:basis-0"
            data-active={active}
            data-category={product.healthCategory}
            data-form={product.form}
            data-testid="nutrition-product-card"
            initial={false}
            key={product.id}
            onPointerEnter={(event) => handlePointerEnter(event, index)}
            onPointerMove={(event) => handlePointerMove(event, index)}
            transition={reducedMotion ? { duration: 0 } : motionTransition.standard}
          >
            <a
              className="block h-full min-h-11 outline-offset-4 focus-visible:outline-2 focus-visible:outline-[var(--color-focus)]"
              href={`/nutrition/${product.slug}`}
              onFocus={() => activate(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              ref={(node) => {
                linkRefs.current[index] = node;
              }}
            >
              {media?.status === "DEMO_ONLY" ? (
                <Image
                  alt={media.alt}
                  className="aspect-[4/3] w-full object-cover"
                  height={media.height}
                  src={media.src}
                  width={media.width}
                />
              ) : (
                <div className="flex aspect-[4/3] items-end border-b border-[var(--color-border)] bg-[var(--color-ivory-deep)] p-[var(--space-20)] text-[var(--color-muted)]">
                  <p>{media?.alt}</p>
                </div>
              )}

              <div className="grid gap-[var(--space-12)] p-[var(--space-20)]">
                <p className="text-[var(--font-size-label)] tracking-[var(--letter-spacing-label)] text-[var(--color-muted)] uppercase">
                  {product.dataStatus}
                </p>
                <h3 className="text-[length:var(--font-size-h3-mobile)] leading-[var(--line-height-tight)]">
                  {product.name}
                </h3>
                <p className="text-[var(--color-muted)]">{product.descriptor}</p>
                <dl className="grid grid-cols-2 gap-[var(--space-12)] text-[var(--font-size-body-sm)]">
                  <div>
                    <dt className="text-[var(--color-muted)]">Category</dt>
                    <dd>{product.healthCategory}</dd>
                  </div>
                  <div>
                    <dt className="text-[var(--color-muted)]">Form</dt>
                    <dd>{product.form}</dd>
                  </div>
                </dl>
                <p data-testid="product-focus-fact" className="text-[var(--font-size-body-sm)] text-[var(--color-muted)]">
                  {product.safety.status}: {product.safety.message}
                </p>
                {media?.status === "NOT_CONFIGURED" && (
                  <p className="text-[var(--font-size-body-sm)] text-[var(--color-muted)]">
                    NOT_CONFIGURED: {media.message}
                  </p>
                )}
              </div>
            </a>
          </motion.article>
        );
      })}
    </div>
  );
}

export { NutritionProductFocusRail, type NutritionProductFocusRailProps };
