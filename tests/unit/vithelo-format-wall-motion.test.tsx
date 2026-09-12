import { render } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { VitheloFormatWallMotion } from "@/components/motion/vithelo-format-wall-motion";

function MotionFixture() {
  return (
    <section id="dosage-forms">
      <div data-format-intro />
      <article data-format-project>
        <figure data-format-media />
        <h3 data-format-label="Gummies">Gummies</h3>
      </article>
      <VitheloFormatWallMotion />
    </section>
  );
}

it("uses one restrained upward reveal without directional or parallax variables", () => {
  const css = readFileSync(
    join(process.cwd(), "src/components/patterns/vithelo-b2b-home.module.css"),
    "utf8",
  );

  expect(css).toContain("data-format-intro-visible");
  expect(css).toContain("--format-entry-y: 32px");
  expect(css).toContain("var(--motion-narrative) var(--ease-standard)");
  expect(css).not.toContain("--format-entry-x");
  expect(css).not.toContain("--format-pointer-x");
  expect(css).not.toContain("--format-pointer-y");
  expect(css).not.toContain("--format-scroll-velocity");
  expect(css).not.toContain("--format-view-progress");
});

describe("VitheloFormatWallMotion", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("reveals each observed item once without scroll, pointer or label decoding", () => {
    const callbacks: IntersectionObserverCallback[] = [];
    const observe = vi.fn();
    const unobserve = vi.fn();
    const disconnect = vi.fn();
    class IntersectionObserverMock {
      constructor(callback: IntersectionObserverCallback) {
        callbacks.push(callback);
      }
      disconnect = disconnect;
      observe = observe;
      unobserve = unobserve;
    }
    vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);
    vi.stubGlobal("matchMedia", vi.fn(() => ({ matches: false })));
    const windowAddEventListener = vi.spyOn(window, "addEventListener");

    const { unmount } = render(<MotionFixture />);
    const section = document.getElementById("dosage-forms")!;
    const intro = section.querySelector<HTMLElement>("[data-format-intro]")!;
    const project = section.querySelector<HTMLElement>("[data-format-project]")!;
    const media = section.querySelector<HTMLElement>("[data-format-media]")!;
    const mediaAddEventListener = vi.spyOn(media, "addEventListener");

    expect(section).toHaveAttribute("data-format-motion", "enhanced");
    expect(observe).toHaveBeenCalledTimes(2);
    callbacks[0]([
      { isIntersecting: true, target: intro } as unknown as IntersectionObserverEntry,
      { isIntersecting: true, target: project } as unknown as IntersectionObserverEntry,
    ], {} as IntersectionObserver);

    expect(section).toHaveAttribute("data-format-intro-visible", "true");
    expect(project).toHaveAttribute("data-format-visible", "true");
    expect(project.querySelector("[data-format-label]")).toHaveTextContent("Gummies");
    expect(unobserve).toHaveBeenCalledWith(intro);
    expect(unobserve).toHaveBeenCalledWith(project);
    expect(windowAddEventListener.mock.calls.some(([type]) => type === "scroll")).toBe(false);
    expect(mediaAddEventListener.mock.calls.some(([type]) => type === "pointermove")).toBe(false);

    unmount();
    expect(disconnect).toHaveBeenCalled();
  });

  it("keeps the final static state for Reduced Motion", () => {
    const observe = vi.fn();
    class IntersectionObserverMock {
      observe = observe;
      disconnect = vi.fn();
      unobserve = vi.fn();
    }
    vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);
    vi.stubGlobal("matchMedia", vi.fn(() => ({ matches: true })));

    render(<MotionFixture />);
    const section = document.getElementById("dosage-forms")!;
    expect(section).toHaveAttribute("data-format-motion", "static");
    expect(section).toHaveAttribute("data-format-intro-visible", "true");
    expect(section.querySelector("[data-format-project]")).toHaveAttribute(
      "data-format-visible",
      "true",
    );
    expect(observe).not.toHaveBeenCalled();
  });
});
