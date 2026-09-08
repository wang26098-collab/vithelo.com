import { fireEvent, render } from "@testing-library/react";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  VitheloFormatWallMotion,
  buildDecodedLabel,
  clampFormatVelocity,
} from "@/components/motion/vithelo-format-wall-motion";

function MotionFixture() {
  return (
    <section id="dosage-forms">
      <div data-format-intro />
      <article data-format-project>
        <figure data-format-media>
          <span data-testid="plane" />
        </figure>
        <h3 data-format-label="Gummies">Gummies</h3>
      </article>
      <VitheloFormatWallMotion />
    </section>
  );
}

describe("format wall motion helpers", () => {
  it("clamps scroll velocity to the supported motion range", () => {
    expect(clampFormatVelocity(80)).toBe(1);
    expect(clampFormatVelocity(-80)).toBe(-1);
    expect(clampFormatVelocity(0)).toBe(0);
  });

  it("decodes toward the stable product label deterministically", () => {
    expect(buildDecodedLabel("Gummies", 0, 0)).toBe("ALW7IT4");
    expect(buildDecodedLabel("Gummies", 3, 4)).toBe("GumZALW");
    expect(buildDecodedLabel("Gummies", 7, 4)).toBe("Gummies");
  });
});

it("uses the approved directional 2.5D motion grammar", () => {
  const css = readFileSync(
    join(process.cwd(), "src/components/patterns/vithelo-b2b-home.module.css"),
    "utf8",
  );

    expect(css).toContain(".formatCharClip");
    expect(css).toContain("data-format-intro-visible");
    expect(css).toContain(
      '.dosageSection[data-format-motion="enhanced"][data-format-intro-visible="true"] .formatChar',
    );
  expect(css).toContain("--format-entry-x: -8vw");
  expect(css).toContain("--format-entry-x: 8vw");
  expect(css).toContain("--format-pointer-x");
  expect(css).toContain("--format-scroll-velocity");
  expect(css).not.toContain("@keyframes format-project-reveal");
  expect(css).not.toContain("@keyframes format-media-progress");
});

describe("VitheloFormatWallMotion", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("enhances visible projects and responds to fine-pointer movement", () => {
    const callbacks: IntersectionObserverCallback[] = [];
    const disconnect = vi.fn();
    class IntersectionObserverMock {
      constructor(callback: IntersectionObserverCallback) {
        callbacks.push(callback);
      }
      disconnect = disconnect;
      observe = vi.fn();
      unobserve = vi.fn();
    }
    vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);
    vi.stubGlobal("matchMedia", vi.fn((query: string) => ({
      matches: query.includes("pointer: fine"),
    })));
    vi.stubGlobal("requestAnimationFrame", vi.fn(() => 1));
    vi.stubGlobal("cancelAnimationFrame", vi.fn());

    const { unmount } = render(<MotionFixture />);
    const section = document.getElementById("dosage-forms")!;
    const intro = section.querySelector<HTMLElement>("[data-format-intro]")!;
    const project = section.querySelector<HTMLElement>("[data-format-project]")!;
    const media = section.querySelector<HTMLElement>("[data-format-media]")!;
    vi.spyOn(media, "getBoundingClientRect").mockReturnValue({
      bottom: 300,
      height: 200,
      left: 100,
      right: 500,
      top: 100,
      width: 400,
      x: 100,
      y: 100,
      toJSON: () => ({}),
    });

    expect(section).toHaveAttribute("data-format-motion", "enhanced");
    callbacks[0]([
      { isIntersecting: true, target: intro } as unknown as IntersectionObserverEntry,
      { isIntersecting: true, target: project } as unknown as IntersectionObserverEntry,
    ], {} as IntersectionObserver);
    expect(section).toHaveAttribute("data-format-intro-visible", "true");
    expect(project).toHaveAttribute("data-format-visible", "true");

    fireEvent(media, new MouseEvent("pointermove", { clientX: 500, clientY: 100 }));
    expect(project.style.getPropertyValue("--format-pointer-x")).toBe("1.000");
    expect(project.style.getPropertyValue("--format-pointer-y")).toBe("-1.000");
    fireEvent.pointerLeave(media);
    expect(project.style.getPropertyValue("--format-pointer-x")).toBe("0");
    expect(project.style.getPropertyValue("--format-pointer-y")).toBe("0");

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
