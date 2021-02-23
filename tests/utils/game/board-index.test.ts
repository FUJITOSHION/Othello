import { CellState } from "../../../src/types/index"
import {
  validIndexes,
  createAllIndexes,
} from "../../../src/utils/game/board-index"

// ボードがイメージしやすいように整形しないで置く
// prettier-ignore
const initState: CellState[][] = [
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, "ai", "opponent", undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, "opponent", "ai", undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
]

const initBoard = { boardState: initState }

test(`createAllIndexes`, () => {
  const allIndexes = createAllIndexes()
  expect(allIndexes[0]).toEqual([0, 0])
  expect(allIndexes[allIndexes.length - 1]).toEqual([9, 9])
  expect(allIndexes.length).toBe(10 * 10)
})

test(`validIndexes`, () => {
  expect(validIndexes(initBoard, "ai")).toEqual([
    [3, 5],
    [4, 6],
    [5, 3],
    [6, 4],
  ])
})
