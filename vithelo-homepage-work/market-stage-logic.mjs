export function decideMarketStageAction({ index, count, direction, pointerRatio }) {
  if (direction === 0 || pointerRatio < 0.12 || pointerRatio > 0.88) {
    return { type: 'release' };
  }

  const nextIndex = index + direction;
  if (nextIndex < 0 || nextIndex >= count) {
    return { type: 'release' };
  }

  return { type: 'advance', index: nextIndex };
}
