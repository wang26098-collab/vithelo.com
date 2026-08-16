import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "group/button inline-flex min-h-11 shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-4)] border text-[var(--font-size-label)] font-medium tracking-[var(--letter-spacing-label)] uppercase outline-none transition-[color,background-color,border-color,opacity,transform] duration-[var(--motion-fast)] ease-[var(--ease-standard)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus)] active:translate-y-px disabled:pointer-events-none disabled:opacity-45 aria-busy:cursor-wait aria-busy:opacity-70 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_[data-loading]]:animate-spin",
  {
    variants: {
      variant: {
        primary:
          "border-[var(--color-graphite)] bg-[var(--color-graphite)] text-[var(--color-ivory)] hover:bg-[var(--color-graphite-soft)] hover:border-[var(--color-graphite-soft)] aria-pressed:bg-[var(--color-graphite-soft)]",
        secondary:
          "border-[var(--color-border)] bg-transparent text-[var(--color-foreground)] hover:border-[var(--color-graphite)] hover:bg-[var(--color-surface)] aria-pressed:bg-[var(--color-ivory-deep)]",
        text:
          "border-transparent bg-transparent px-0 text-[var(--color-foreground)] underline-offset-4 hover:underline aria-pressed:text-[var(--color-muted)]",
        icon:
          "border-[var(--color-border)] bg-transparent text-[var(--color-foreground)] hover:border-[var(--color-graphite)] hover:bg-[var(--color-surface)] aria-pressed:bg-[var(--color-ivory-deep)]",
      },
      size: {
        default: "px-5 py-3",
        small: "px-4 py-2",
        large: "min-h-12 px-6 py-3",
        icon: "size-11 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function Button({
  asChild = false,
  className,
  type,
  variant,
  size,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      className={cn(buttonVariants({ variant, size, className }))}
      data-slot="button"
      data-variant={variant ?? "primary"}
      data-size={size ?? "default"}
      type={asChild ? undefined : (type ?? "button")}
      {...props}
    />
  );
}

export { Button, buttonVariants, type ButtonProps };
