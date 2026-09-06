"use client";

import { useEffect, useRef, useState } from "react";

type VitheloCapacityMetricProps = {
  label: string;
  prefix: string;
  suffix: string;
  value: number;
};

function formatValue(value: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value);
}

function VitheloCapacityMetric({
  label,
  prefix,
  suffix,
  value,
}: VitheloCapacityMetricProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const section = rootRef.current?.closest<HTMLElement>("#capacity-dashboard");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!section || reducedMotion) {
      setDisplayValue(value);
      return;
    }

    let frame = 0;
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      const startedAt = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - startedAt) / 900, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplayValue(Math.round(value * eased));
        if (progress < 1) frame = window.requestAnimationFrame(tick);
      };
      frame = window.requestAnimationFrame(tick);
    };

    if (section.dataset.motionState === "visible") start();
    const observer = new MutationObserver(() => {
      if (section.dataset.motionState === "visible") start();
    });
    observer.observe(section, { attributeFilter: ["data-motion-state"] });

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [value]);

  const finalValue = `${prefix}${formatValue(value)}${suffix}`;

  return (
    <div
      aria-label={`${finalValue} ${label}`}
      data-testid="capacity-metric"
      ref={rootRef}
    >
      <dd aria-hidden="true">
        {prefix}
        {formatValue(displayValue)}
        {suffix ? <span>{suffix}</span> : null}
      </dd>
      <dt aria-hidden="true">{label}</dt>
    </div>
  );
}

export { VitheloCapacityMetric };
