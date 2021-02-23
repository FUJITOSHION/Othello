import { CellState, GameState } from "../../../src/types/index"
import {
  isValidIndex,
  checkPuttableVertical,
} from "../../../src/utils/game/check"

test(`isValidIndex`, () => {
  expect(isValidIndex([0, 0])).toBe(true)
  expect(isValidIndex([-1, 0])).toBe(false)
  expect(isValidIndex([0, -1])).toBe(false)
  expect(isValidIndex([9, 9])).toBe(true)
  expect(isValidIndex([10, 10])).toBe(false)
})

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

const initBoard: GameState = { boardState: initState, nextPlayer: "ai" }

test(`checkPuttableVertical`, () => {
  expect(checkPuttableVertical(initBoard, [6, 4])).toBe(true)
  expect(checkPuttableVertical(initBoard, [3, 5])).toBe(true)
  expect(checkPuttableVertical(initBoard, [3, 4])).toBe(false)
  expect(checkPuttableVertical(initBoard, [6, 5])).toBe(false)
})
