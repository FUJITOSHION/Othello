import { useSelector } from "react-redux"

import type { RootState } from "@store"
import type { Score, Player } from "types"

export const useIsFin = (): boolean => {
  return useSelector((state: RootState) => state.board.isFin)
}

export const useScore = (): Score | undefined => {
  return useSelector((state: RootState) => state.board.score)
}

export const useWinner = (): Player | undefined => {
  return useSelector((state: RootState) => state.board.winner)
}

export const useResult = (): {
  score: Score | undefined
  winner: Player | undefined
} => {
  const score = useScore()
  const winner = useWinner()

  return {
    score,
    winner,
  }
}

export const useIsAiTurn = (): boolean => {
  return useSelector((state: RootState) => state.board.isAiTurn)
}
