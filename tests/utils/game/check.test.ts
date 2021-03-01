import { CellState, GameState } from "types/index"
import {
  applyIsValid,
  isValidIndex,
  createCheckLinePuttable,
} from "@utils/game/check"
import { apply } from "@utils/game/simulate"
import { validIndexes } from "@utils/game/board-index"

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

test(`applyIsValid`, () => {
  const nextState = applyIsValid(initBoard)

  expect(nextState).toEqual({
    // prettier-ignore
    boardState: [
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, "puttable", undefined, undefined, undefined],
      [undefined, undefined, undefined, "ai", "opponent", "puttable", undefined, undefined],
      [undefined, undefined, "puttable", "opponent", "ai", undefined, undefined, undefined],
      [undefined, undefined, undefined, "puttable", undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    ],
    nextPlayer: "ai",
  })

  expect(
    applyIsValid({
      // prettier-ignore
      boardState: [
      ["puttable", undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, "puttable", undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, "puttable", undefined, "ai", "opponent", undefined, undefined, undefined],
      [undefined, undefined, undefined, "opponent", "ai", undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, "puttable", undefined],
      [undefined, "puttable", undefined, undefined, undefined, undefined, undefined, undefined],
    ],
      nextPlayer: "ai",
    })
  ).toEqual({
    // prettier-ignore
    boardState: [
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, "puttable", undefined, undefined, undefined],
      [undefined, undefined, undefined, "ai", "opponent", "puttable", undefined, undefined],
      [undefined, undefined, "puttable", "opponent", "ai", undefined, undefined, undefined],
      [undefined, undefined, undefined, "puttable", undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
      [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    ],
    nextPlayer: "ai",
  })
})
