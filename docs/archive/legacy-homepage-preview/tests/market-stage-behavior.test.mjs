import test from 'node:test';
import assert from 'node:assert/strict';
import { decideMarketStageAction } from '../market-stage-logic.mjs';

test('center advances one story while gutters release page scroll', () => {
  assert.deepEqual(
    decideMarketStageAction({ index: 2, count: 6, direction: 1, pointerRatio: 0.5 }),
    { type: 'advance', index: 3 },
  );
  assert.deepEqual(
    decideMarketStageAction({ index: 2, count: 6, direction: 1, pointerRatio: 0.05 }),
    { type: 'release' },
  );
  assert.deepEqual(
    decideMarketStageAction({ index: 2, count: 6, direction: 1, pointerRatio: 0.95 }),
    { type: 'release' },
  );
});

test('first-up and last-down gestures release page scroll', () => {
  assert.deepEqual(
    decideMarketStageAction({ index: 0, count: 6, direction: -1, pointerRatio: 0.5 }),
    { type: 'release' },
  );
  assert.deepEqual(
    decideMarketStageAction({ index: 5, count: 6, direction: 1, pointerRatio: 0.5 }),
    { type: 'release' },
  );
});

test('zero delta never changes the active story', () => {
  assert.deepEqual(
    decideMarketStageAction({ index: 2, count: 6, direction: 0, pointerRatio: 0.5 }),
    { type: 'release' },
  );
});
