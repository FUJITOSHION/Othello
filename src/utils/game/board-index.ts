import { range, curry, includes } from "ramda"

import type { GameState, BoardIndex, CellState } from "types"
import { checkPuttable, isValidIndex } from "./check"
import { NUMCELLSPERLINE } from "./index"

export function createAllIndexes(): BoardIndex[] {
  return range(0, NUMCELLSPERLINE).flatMap((i) =>
    range(0, NUMCELLSPERLINE).map((j): BoardIndex => [i, j])
  )
}

export function createPossibleIndexes(
  numMin: number,
  numMax: number
): BoardIndex[] {
  return range(numMin, numMax).flatMap((i) =>
    range(numMin, numMax).map((j): BoardIndex => [i, j])
  )
}

export function validIndexes(state: GameState): BoardIndex[] {
  let numMin = NUMCELLSPERLINE - 1
  let numMax = 0
  state.boardState.forEach((item, i) => {
    item.forEach((cell, j) => {
      if (includes(cell, ["ai", "opponent"])) {
        numMin = Math.min(numMin, i, j)
        numMax = Math.max(numMax, i, j)
      }
    })
  })
  numMax = numMax === NUMCELLSPERLINE - 1 ? numMax + 1 : numMax + 2
  numMin = numMin === 0 ? numMin : numMin - 1
  return createPossibleIndexes(numMin, numMax).filter((index) =>
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
