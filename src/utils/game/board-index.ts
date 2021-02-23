import { range, curry } from "ramda"

import type { GameState, BoardIndex, CellState } from "types"
import { checkPuttable, isValidIndex } from "./check"

export function createAllIndexes(): BoardIndex[] {
  return range(0, 10).flatMap((i) =>
    range(0, 10).map((j): BoardIndex => [i, j])
  )
}

export function validIndexes(state: GameState): BoardIndex[] {
  return createAllIndexes().filter((index) => checkPuttable(state, index))
}

export const getCellState = curry(
  (state: GameState, index: BoardIndex): CellState => {
    return isValidIndex(index)
      ? state.boardState[index[0]][index[1]]
      : undefined
  }
)
