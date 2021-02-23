import { curry } from "ramda"

import type { GameState, BoardIndex, CellState, Player, Score } from "types"
import { getCellState } from "./board-index"
import { createCheckPuttable } from "./check"

export function createApply(
  diffIndex: BoardIndex
): (state: GameState, index: BoardIndex) => void {
  const getNextIndex = (index: BoardIndex): BoardIndex => {
    return [index[0] + diffIndex[0], index[1] + diffIndex[1]]
  }

  const puttable = createCheckPuttable(diffIndex)

  return (state: GameState, index: BoardIndex): void => {
    if (!puttable(state, index)) {
      return
    }

    let currentIndex: BoardIndex = [...index]
    let currentState: CellState = getCellState(state, currentIndex)

    // 現在セルを上書きする関数
    const put = () => {
      state.boardState[currentIndex[0]][currentIndex[1]] = state.nextPlayer
    }

    put()

    currentIndex = getNextIndex(currentIndex)
    currentState = getCellState(state, currentIndex)
    put()

    while (typeof currentState !== "undefined") {
      if (currentState === state.nextPlayer) {
        return
      }

      currentIndex = getNextIndex(currentIndex)
      currentState = getCellState(state, currentIndex)
      put()
    }
  }
}

export const diffs: BoardIndex[] = [
  [1, 0],
  [0, 1],
  [1, 1],
  [1, -1],
]

export const createApplyLine = curry(
  (diff: BoardIndex, state: GameState, index: BoardIndex): void => {
    ;([
      [diff[0], diff[1]],
      [-1 * diff[0], -1 * diff[1]],
    ] as BoardIndex[]).forEach((diff) => {
      if (createCheckPuttable(diff)(state, index))
        createApply(diff)(state, index)
    })
  }
)

export const apply = curry(
  (state: GameState, index: BoardIndex): GameState => {
    const nextState: GameState = {
      boardState: [...state.boardState.map((line) => [...line])],
      nextPlayer: state.nextPlayer,
    }

    diffs.forEach((diff) => createApplyLine(diff)(nextState, index))

    // 手番が入れ替わる
    nextState.nextPlayer = state.nextPlayer === "ai" ? "opponent" : "ai"

    return nextState
  }
)

const createCounter = (player: Player) => {
  return (state: GameState): number => {
    return state.boardState.reduce(
      (s, line) => s + line.filter((cell) => cell === player).length,
      0
    )
  }
}

export const aiCounter = createCounter("ai")
export const opponentCounter = createCounter("opponent")
const maxCount = 100

type ResCheckFin = {
  isFin: boolean
  winner: Player | undefined // 終了してないとき or 引き分け時は undefined
  score: Score
}

export const checkFin = (state: GameState): ResCheckFin => {
  // 完全勝利/敗北判定
  const isWinOpponent = state.boardState.reduce(
    (s, line) =>
      s && line.reduce((lineSum, cell) => lineSum && cell !== "ai", true),
    true
  )
  if (isWinOpponent)
    return {
      isFin: true,
      winner: "opponent",
      score: {
        opponent: maxCount,
        ai: 0,
      },
    }

  const isWinAi = state.boardState.reduce(
    (s, line) =>
      s && line.reduce((lineSum, cell) => lineSum && cell !== "opponent", true),
    true
  )
  if (isWinAi)
    return {
      isFin: true,
      winner: "ai",
      score: {
        opponent: 0,
        ai: maxCount,
      },
    }

  // 盤面が全て埋まって終了判定
  const aiCount = aiCounter(state)
  const opponentCount = opponentCounter(state)
  const isFin = aiCount + opponentCount === maxCount

  return {
    isFin: isFin,
    winner:
      isFin || aiCount === opponentCount
        ? aiCount > opponentCount
          ? "ai"
          : "opponent"
        : undefined,
    score: {
      ai: aiCount,
      opponent: opponentCount,
    },
  }
}
