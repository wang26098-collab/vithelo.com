type MarketStageDirection = -1 | 0 | 1;

type MarketStageInput = {
  index: number;
  count: number;
  direction: MarketStageDirection;
  pointerRatio: number;
};

type MarketStageAction =
  | { type: "release" }
  | { type: "advance"; index: number };

function decideMarketStageAction({
  index,
  count,
  direction,
  pointerRatio,
}: MarketStageInput): MarketStageAction {
  if (direction === 0 || pointerRatio < 0.12 || pointerRatio > 0.88) {
    return { type: "release" };
  }

  const nextIndex = index + direction;
  if (nextIndex < 0 || nextIndex >= count) return { type: "release" };

  return { type: "advance", index: nextIndex };
}

export {
  decideMarketStageAction,
  type MarketStageAction,
  type MarketStageDirection,
  type MarketStageInput,
};
