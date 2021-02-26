import { CellState, GameState } from "../../../src/types/index"
import { NUMCELLS } from "../../../src/utils/game/index"
import {
  validIndexes,
  createAllIndexes,
} from "../../../src/utils/game/board-index"

// ボードがイメージしやすいように整形しないで置く
// prettier-ignore
const initState: CellState[][] = [
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, "ai", "opponent", undefined, undefined, undefined],
  [undefined, undefined, undefined, "opponent", "ai", undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
]

const initBoard: GameState = { boardState: initState, nextPlayer: "ai" }

test(`createAllIndexes`, () => {
  const allIndexes = createAllIndexes()
  expect(allIndexes[0]).toEqual([0, 0])
  expect(allIndexes[allIndexes.length - 1]).toEqual([
    NUMCELLS - 1,
    NUMCELLS - 1,
  ])
  expect(allIndexes.length).toBe(NUMCELLS * NUMCELLS)
})

test(`validIndexes`, () => {
  expect(validIndexes(initBoard)).toEqual([
    [2, 4],
    [3, 5],
    [4, 2],
    [5, 3],
  ])
})
