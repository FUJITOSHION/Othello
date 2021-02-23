import { CellState, GameState } from "../../../src/types/index"
import { apply, checkFin, aiCounter } from "../../../src/utils/game/simulate"

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

const sampleGameState: GameState = {
  // prettier-ignore
  boardState: [
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
  ],
  nextPlayer: "opponent",
}

const perfectGameState: GameState = {
  // prettier-ignore
  boardState: [
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, "ai", "ai", undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, "ai", "ai", undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, "ai", undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined],
  ],
  nextPlayer: "opponent",
}

const endGameState: GameState = {
  // prettier-ignore
  boardState: [
    ["ai", "ai", "ai", "ai", "opponent", "opponent", "opponent", "opponent", "opponent", "opponent"],
    ["ai", "ai", "ai", "ai", "opponent", "opponent", "opponent", "opponent", "opponent", "opponent"],
    ["ai", "ai", "ai", "ai", "opponent", "opponent", "opponent", "opponent", "opponent", "opponent"],
    ["ai", "ai", "ai", "ai", "opponent", "opponent", "opponent", "opponent", "opponent", "opponent"],
    ["ai", "ai", "ai", "ai", "opponent", "opponent", "opponent", "opponent", "opponent", "opponent"],
    ["ai", "ai", "ai", "ai", "opponent", "opponent", "opponent", "opponent", "opponent", "opponent"],
    ["ai", "ai", "ai", "ai", "opponent", "opponent", "opponent", "opponent", "opponent", "opponent"],
    ["ai", "ai", "ai", "ai", "opponent", "opponent", "opponent", "opponent", "opponent", "opponent"],
    ["ai", "ai", "ai", "ai", "opponent", "opponent", "opponent", "opponent", "opponent", "opponent"],
    ["ai", "ai", "ai", "ai", "opponent", "opponent", "opponent", "opponent", "opponent", "opponent"],
  ],
  nextPlayer: "opponent",
}

test(`stone counter`, () => {
  expect(aiCounter(sampleGameState)).toBe(4)
})

test(`checkFin`, () => {
  expect(checkFin(sampleGameState)).toEqual({
    isFin: false,
    winner: undefined,
    score: {
      ai: 4,
      opponent: 1,
    },
  })

  expect(checkFin(perfectGameState)).toEqual({
    isFin: true,
    winner: "ai",
    score: {
      ai: 100,
      opponent: 0,
    },
  })

  expect(checkFin(endGameState)).toEqual({
    isFin: true,
    winner: "opponent",
    score: {
      ai: 40,
      opponent: 60,
    },
  })
})
