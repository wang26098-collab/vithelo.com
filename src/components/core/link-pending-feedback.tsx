"use client";

import { useLinkStatus } from "next/link";

type LinkPendingFeedbackProps = {
  className?: string;
  label?: string;
};

export function LinkPendingFeedback({
  className,
  label = "Opening…",
}: LinkPendingFeedbackProps) {
  const { pending } = useLinkStatus();

  return (
    <span
      aria-atomic="true"
      aria-live="polite"
      className={className}
      data-link-pending-feedback
      data-pending={pending ? "true" : "false"}
      role="status"
    >
      {pending ? <span className="sr-only">{label}</span> : null}
    </span>
  );
}
