import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import type { Score, Player } from "types"

export type BoardState = {
  isFin: boolean
  winner?: Player
  score?: Score
  isAiTurn: boolean
}

export const initialState: BoardState = {
  isFin: false,
  winner: undefined,
  score: undefined,
  isAiTurn: false,
}

const gameConfigSlice = createSlice({
  name: "gameConfig",
  initialState,
  reducers: {
    setIsFin: (state, { payload }: PayloadAction<boolean>) => {
      state.isFin = payload
    },
    setResult: (state, { payload }: PayloadAction<Score>) => {
      if (payload) {
        ;(state.winner = payload.ai > payload.opponent ? "ai" : "opponent"),
          (state.score = {
            ...payload,
          })
      }
    },
    setIsAiTurn: (state, { payload }: PayloadAction<boolean>) => {
      state.isAiTurn = payload
    },
  },
})

export default gameConfigSlice
