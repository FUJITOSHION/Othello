import { curry } from "ramda"

import type { GameState, BoardIndex, CellState } from "types"
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

export const createApplyLine = curry(
  (diff: BoardIndex, state: GameState, index: BoardIndex): void => {
    const diffs: BoardIndex[] = [
      [diff[0], diff[1]],
      [-1 * diff[0], -1 * diff[1]],
    ]

    diffs.forEach((diff) => {
      if (createCheckPuttable(diff)(state, index))
        createApply(diff)(state, index)
    })
  }
)

export const applyVertical = createApplyLine([1, 0])
export const applyHorizontal = createApplyLine([0, 1])
export const applyDiagonal = createApplyLine([1, 1])

export const apply = curry(
  (state: GameState, index: BoardIndex): GameState => {
    const nextState: GameState = {
      boardState: [...state.boardState.map((line) => [...line])],
      nextPlayer: state.nextPlayer,
    }
    applyVertical(nextState, index)
    applyHorizontal(nextState, index)
    applyDiagonal(nextState, index)

    // 手番が入れ替わる
    nextState.nextPlayer = state.nextPlayer === "ai" ? "opponent" : "ai"

    return nextState
  }
)
