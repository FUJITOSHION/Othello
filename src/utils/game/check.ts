import { curry } from "ramda"

import type { GameState, BoardIndex, CellState, Player } from "types"
import { getCellState } from "./board-index"

export function isValidIndex(index: BoardIndex): boolean {
  return index[0] >= 0 && index[1] >= 0 && index[0] <= 9 && index[0] <= 9
}

export function createCheckCellPuttable(
  diffIndex: BoardIndex
): (state: GameState, index: BoardIndex, player: Player) => boolean {
  const getNextIndex = (index: BoardIndex): BoardIndex => {
    return [index[0] + diffIndex[0], index[1] + diffIndex[1]]
  }

  return (state: GameState, index: BoardIndex, player: Player): boolean => {
    let currentIndex: BoardIndex = getNextIndex(index)
    let currentState: CellState = getCellState(state, currentIndex)

    if (typeof currentState === "undefined" || currentState === player)
      return false

    currentIndex = getNextIndex(currentIndex)
    currentState = getCellState(state, currentIndex)

    while (typeof currentState !== "undefined") {
      if (currentState === player) {
        return true
      }

      currentIndex = getNextIndex(currentIndex)
      currentState = getCellState(state, currentIndex)
    }

    return false
  }
}

export const createCheckLinePuttable = curry(
  (diff: BoardIndex, state: GameState, index: BoardIndex, player: Player) => {
    const diffs: BoardIndex[] = [
      [diff[0], diff[1]],
      [-1 * diff[0], -1 * diff[1]],
    ]
    return diffs.reduce(
      (s, t) => s || createCheckCellPuttable(t)(state, index, player),
      false
    )
  }
)

export const checkPuttableVertical = createCheckLinePuttable([1, 0])
export const checkPuttableHorizontal = createCheckLinePuttable([0, 1])
export const checkPuttableDiagonal = createCheckLinePuttable([1, 1])

export const checkPuttable = curry(
  (state: GameState, index: BoardIndex, player: Player): boolean => {
    return (
      checkPuttableVertical(state, index, player) ||
      checkPuttableHorizontal(state, index, player) ||
      checkPuttableDiagonal(state, index, player)
    )
  }
)
