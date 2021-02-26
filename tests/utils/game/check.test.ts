import { CellState, GameState } from "../../../src/types/index"
import {
  isValidIndex,
  createCheckLinePuttable,
} from "../../../src/utils/game/check"

test(`isValidIndex`, () => {
  expect(isValidIndex([0, 0])).toBe(true)
  expect(isValidIndex([-1, 0])).toBe(false)
  expect(isValidIndex([0, -1])).toBe(false)
  expect(isValidIndex([7, 7])).toBe(true)
  expect(isValidIndex([8, 8])).toBe(false)
})

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

test(`checkPuttable`, () => {
  const checkPuttableVertical = createCheckLinePuttable([1, 0])
  expect(checkPuttableVertical(initBoard, [5, 3])).toBe(true)
  expect(checkPuttableVertical(initBoard, [2, 4])).toBe(true)
  expect(checkPuttableVertical(initBoard, [3, 4])).toBe(false)
  expect(checkPuttableVertical(initBoard, [6, 5])).toBe(false)
})
