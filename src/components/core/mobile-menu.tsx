"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { List, MagnifyingGlass } from "@phosphor-icons/react";
import { Button } from "@/components/core/button";
import {
  primaryNavigation,
  secondaryNavigation,
  utilityNavigation,
} from "@/components/core/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const utilityIcons = {
  Search: MagnifyingGlass,
} as const;

function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.dataset.dialogOpen = "true";
    } else {
      delete document.body.dataset.dialogOpen;
    }

    return () => {
      delete document.body.dataset.dialogOpen;
    };
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button aria-label="Open menu" size="icon" variant="icon">
          <List aria-hidden="true" />
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby="site-navigation-description">
        <DialogHeader>
          <DialogTitle>Site navigation</DialogTitle>
          <DialogDescription id="site-navigation-description">
            Explore products, evidence, and professional services.
          </DialogDescription>
        </DialogHeader>

        <nav aria-label="Mobile primary navigation">
          <ul className="m-0 flex list-none flex-col gap-1 p-0">
            {primaryNavigation.map((item) => (
              <li key={item.href}>
                <DialogClose asChild>
                  <Link
                    className="flex min-h-11 items-center border-b border-[var(--color-border)] py-3 text-lg text-[var(--color-foreground)] no-underline"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </DialogClose>
              </li>
            ))}
          </ul>
        </nav>

        <DialogClose asChild>
          <Link
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-[var(--radius-4)] border border-[var(--color-graphite)] bg-[var(--color-graphite)] px-6 font-medium text-[var(--color-ivory)] no-underline"
            href="/contact"
          >
            Start a Project
          </Link>
        </DialogClose>

        <nav aria-label="Mobile secondary navigation">
          <ul className="m-0 flex list-none gap-5 p-0">
            {secondaryNavigation.map((item) => (
              <li key={item.href}>
                <DialogClose asChild>
                  <Link
                    className="inline-flex min-h-11 items-center text-sm text-[var(--color-muted)]"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </DialogClose>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Mobile utility navigation" className="mt-auto">
          <ul className="m-0 grid list-none grid-cols-1 gap-2 p-0">
            {utilityNavigation.map((item) => {
              const Icon = utilityIcons[item.label];
              return (
                <li key={item.href}>
                  <DialogClose asChild>
                    <Link
                      className="flex min-h-11 flex-col items-center justify-center gap-1 rounded-[var(--radius-4)] border border-[var(--color-border)] p-2 text-xs text-[var(--color-foreground)] no-underline"
                      href={item.href}
                    >
                      <Icon aria-hidden="true" />
                      {item.label}
                    </Link>
                  </DialogClose>
                </li>
              );
            })}
          </ul>
        </nav>
      </DialogContent>
    </Dialog>
  );
}

export { MobileMenu };
