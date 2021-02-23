import { CellState, GameState } from "../../../src/types/index"
import { apply } from "../../../src/utils/game/simulate"

test(`checkPuttableVertical`, () => {
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

  // [6, 4] に置いた時の期待盤面
  // prettier-ignore
  const nextState: CellState[][] = [
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, "ai", "opponent", undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, "ai", "ai", undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, "ai", undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  ]

  expect(
    apply({ boardState: initState, nextPlayer: "ai" } as GameState, [6, 4])
  ).toEqual({
    boardState: nextState,
    nextPlayer: "opponent",
  })
})
