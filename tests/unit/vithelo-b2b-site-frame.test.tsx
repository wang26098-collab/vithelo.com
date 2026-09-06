import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { VitheloB2BSiteFrame } from "@/components/core/vithelo-b2b-site-frame";
import { vitheloB2BSite } from "@/content/demo/vithelo-b2b-site";

describe("VitheloB2BSiteFrame navigation variants", () => {
  beforeEach(() => {
    Object.defineProperty(window, "scrollY", { configurable: true, value: 0 });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("places homepage navigation over the hero without a top disclosure", () => {
    render(
      <VitheloB2BSiteFrame content={vitheloB2BSite} variant="home">
        <main>
          <section id="hero">Hero</section>
        </main>
      </VitheloB2BSiteFrame>,
    );

    expect(screen.getByRole("banner")).toHaveAttribute(
      "data-navigation-variant",
      "home",
    );
    expect(screen.getByRole("banner")).toHaveAttribute(
      "data-navigation-state",
      "top",
    );
    expect(
      document.querySelector("[data-site-disclosure='top']"),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole("contentinfo")).not.toBeInTheDocument();
  });

  it.each(["home", "internal"] as const)("transitions the same navigation DOM on %s", (variant) => {
    render(
      <VitheloB2BSiteFrame content={vitheloB2BSite} variant={variant}>
        <main>
          <section id="hero">Hero</section>
        </main>
      </VitheloB2BSiteFrame>,
    );

    const header = screen.getByRole("banner");
    const links = Array.from(header.querySelectorAll("a"));
    act(() => {
      Object.defineProperty(window, "scrollY", { configurable: true, value: 240 });
      window.dispatchEvent(new Event("scroll"));
    });

    expect(screen.getByRole("banner")).toHaveAttribute(
      "data-navigation-state",
      "scrolled",
    );
    expect(Array.from(header.querySelectorAll("a"))).toEqual(links);
    act(() => {
      Object.defineProperty(window, "scrollY", { configurable: true, value: 0 });
      window.dispatchEvent(new Event("scroll"));
    });
    expect(header).toHaveAttribute("data-navigation-state", "top");
  });

  it("starts internal navigation at the top and retains a separate safety disclosure", () => {
    render(
      <VitheloB2BSiteFrame content={vitheloB2BSite}>
        <main>Internal page</main>
      </VitheloB2BSiteFrame>,
    );

    expect(screen.getByRole("banner")).toHaveAttribute(
      "data-navigation-variant",
      "internal",
    );
    expect(screen.getByRole("banner")).toHaveAttribute(
      "data-navigation-state",
      "top",
    );
    expect(document.querySelector("[data-site-disclosure='footer']")).toBeVisible();
  });
});
