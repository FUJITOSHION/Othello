import { CellState, GameState } from "types/index"
import { NUMCELLSPERLINE } from "@utils/game/index"
import { validIndexes, createAllIndexes } from "@utils/game/board-index"

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
    NUMCELLSPERLINE - 1,
    NUMCELLSPERLINE - 1,
  ])
  expect(allIndexes.length).toBe(NUMCELLSPERLINE * NUMCELLSPERLINE)
})

test(`validIndexes`, () => {
  expect(validIndexes(initBoard)).toEqual([
    [2, 4],
    [3, 5],
    [4, 2],
    [5, 3],
  ])
})
