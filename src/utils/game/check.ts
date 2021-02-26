import { curry } from "ramda"

import type { GameState, BoardIndex, CellState } from "types"
import { getCellState } from "./board-index"
import { diffs } from "./simulate"
import { NUMCELLSPERLINE } from "./index"

export function isValidIndex(index: BoardIndex): boolean {
  return (
    index[0] >= 0 &&
    index[1] >= 0 &&
    index[0] <= NUMCELLSPERLINE - 1 &&
    index[0] <= NUMCELLSPERLINE - 1
  )
}

export function createCheckPuttable(
  diffIndex: BoardIndex
): (state: GameState, index: BoardIndex) => boolean {
  const getNextIndex = (index: BoardIndex): BoardIndex => {
    return [index[0] + diffIndex[0], index[1] + diffIndex[1]]
  }

  return (state: GameState, index: BoardIndex): boolean => {
    if (typeof getCellState(state, index) !== "undefined") return false

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
    return ([
      [diff[0], diff[1]],
      [-1 * diff[0], -1 * diff[1]],
    ] as BoardIndex[]).reduce(
      (s, t) => s || createCheckPuttable(t)(state, index),
      false
    )
  }
)

export const checkPuttable = curry(
  (state: GameState, index: BoardIndex): boolean => {
    return diffs.reduce(
      (s, t: BoardIndex) => s || createCheckLinePuttable(t)(state, index),
      false
    )
  }
)
