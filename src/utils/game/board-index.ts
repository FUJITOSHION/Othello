import { range, curry } from "ramda"

import type { GameState, BoardIndex, CellState } from "types"
import { checkPuttable, isValidIndex } from "./check"

export function createAllIndexes(numMin: number, numMax: number): BoardIndex[] {
  return range(numMin, numMax).flatMap((i) =>
    range(numMin, numMax).map((j): BoardIndex => [i, j])
  )
}

export function validIndexes(state: GameState): BoardIndex[] {
  let numMin = 9
  let numMax = 0
  state.boardState.forEach((item, numRow) => {
    item.forEach((cell, index) => {
      if (cell !== undefined) {
        numMin = Math.min(numMin, index, numRow)
        numMax = Math.max(numMax, index, numRow)
      }
    })
  })
  numMax = numMax === 9 ? numMax + 1 : numMax + 2
  numMin = numMin === 0 ? numMin : numMin - 1
  return createAllIndexes(numMin, numMax).filter((index) =>
    checkPuttable(state, index)
  )
}

export const getCellState = curry(
  (state: GameState, index: BoardIndex): CellState => {
    return isValidIndex(index)
      ? state.boardState[index[0]][index[1]]
      : undefined
  }
)
