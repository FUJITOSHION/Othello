import { curry } from "ramda"

import type { GameState, BoardIndex, CellState } from "types"
import { getCellState } from "./board-index"

export function isValidIndex(index: BoardIndex): boolean {
  return index[0] >= 0 && index[1] >= 0 && index[0] <= 9 && index[0] <= 9
}

export function createCheckPuttable(
  diffIndex: BoardIndex
): (state: GameState, index: BoardIndex) => boolean {
  const getNextIndex = (index: BoardIndex): BoardIndex => {
    return [index[0] + diffIndex[0], index[1] + diffIndex[1]]
  }

  return (state: GameState, index: BoardIndex): boolean => {
    let currentIndex: BoardIndex = getNextIndex(index)
    let currentState: CellState = getCellState(state, currentIndex)

    if (
      typeof currentState === "undefined" ||
      currentState === state.nextPlayer
    )
      return false

    currentIndex = getNextIndex(currentIndex)
    currentState = getCellState(state, currentIndex)

    while (typeof currentState !== "undefined") {
      if (currentState === state.nextPlayer) {
        return true
      }

      currentIndex = getNextIndex(currentIndex)
      currentState = getCellState(state, currentIndex)
    }

    return false
  }
}

export const createCheckLinePuttable = curry(
  (diff: BoardIndex, state: GameState, index: BoardIndex) => {
    const diffs: BoardIndex[] = [
      [diff[0], diff[1]],
      [-1 * diff[0], -1 * diff[1]],
    ]
    return diffs.reduce(
      (s, t) => s || createCheckPuttable(t)(state, index),
      false
    )
  }
)

export const checkPuttableVertical = createCheckLinePuttable([1, 0])
export const checkPuttableHorizontal = createCheckLinePuttable([0, 1])
export const checkPuttableDiagonal = createCheckLinePuttable([1, 1])

export const checkPuttable = curry(
  (state: GameState, index: BoardIndex): boolean => {
    return (
      checkPuttableVertical(state, index) ||
      checkPuttableHorizontal(state, index) ||
      checkPuttableDiagonal(state, index)
    )
  }
)
