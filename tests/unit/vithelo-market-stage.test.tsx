import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { VitheloMarketStage } from "@/components/patterns/vithelo-market-stage";
import { decideMarketStageAction } from "@/components/patterns/vithelo-market-stage-logic";
import { vitheloB2BHome } from "@/content/demo/vithelo-b2b-home";

beforeEach(() => {
  vi.stubGlobal(
    "matchMedia",
    vi.fn((query: string) => ({
      matches: query === "(min-width: 761px)",
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

it("advances only inside the desktop center and releases at gutters and boundaries", () => {
  expect(
    decideMarketStageAction({
      index: 2,
      count: 6,
      direction: 1,
      pointerRatio: 0.5,
    }),
  ).toEqual({ type: "advance", index: 3 });
  expect(
    decideMarketStageAction({
      index: 2,
      count: 6,
      direction: 1,
      pointerRatio: 0.05,
    }),
  ).toEqual({ type: "release" });
  expect(
    decideMarketStageAction({
      index: 2,
      count: 6,
      direction: 1,
      pointerRatio: 0.95,
    }),
  ).toEqual({ type: "release" });
  expect(
    decideMarketStageAction({
      index: 0,
      count: 6,
      direction: -1,
      pointerRatio: 0.5,
    }),
  ).toEqual({ type: "release" });
  expect(
    decideMarketStageAction({
      index: 5,
      count: 6,
      direction: 1,
      pointerRatio: 0.5,
    }),
  ).toEqual({ type: "release" });
});

it("exposes six stories and keyboard-operable progress controls", () => {
  render(<VitheloMarketStage market={vitheloB2BHome.market} />);

  expect(screen.getByTestId("market-stage")).toHaveAttribute(
    "data-layout",
    "image-background-panels",
  );
  expect(screen.getAllByTestId("market-story")).toHaveLength(6);
  expect(screen.getAllByTestId("market-story")[0]).toHaveAttribute(
    "data-media-status",
    "FREE_COMMERCIAL_OR_REAL",
  );
  expect(screen.getByText("01 / 06", { selector: "[aria-live='polite']" })).toBeVisible();
  expect(screen.getByRole("button", { name: "Previous market direction" })).toBeDisabled();

  fireEvent.click(screen.getByRole("button", { name: "Next market direction" }));
  expect(screen.getByText("02 / 06", { selector: "[aria-live='polite']" })).toBeVisible();

  const stage = screen.getByTestId("market-stage");
  fireEvent.keyDown(stage, { key: "ArrowRight" });
  expect(screen.getByText("03 / 06", { selector: "[aria-live='polite']" })).toBeVisible();

  stage.focus();
  expect(stage).toHaveFocus();
  fireEvent.keyDown(stage, { key: "Escape" });
  expect(stage).not.toHaveFocus();
});

it("keeps every story accessible when Reduced Motion is requested", async () => {
  vi.stubGlobal(
    "matchMedia",
    vi.fn((query: string) => ({
      matches:
        query === "(min-width: 761px)" ||
        query === "(prefers-reduced-motion: reduce)",
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  );

  render(<VitheloMarketStage market={vitheloB2BHome.market} />);

  await waitFor(() => {
    expect(
      screen.getAllByTestId("market-story").every((story) => !story.hasAttribute("aria-hidden")),
    ).toBe(true);
  });
});
