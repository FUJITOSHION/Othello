import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import type { Score, Player } from "types"

export type BoardState = {
  isFin: boolean
  winner?: Player
  score?: Score
}

export const initialState: BoardState = {
  isFin: false,
  winner: undefined,
  score: undefined,
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
  },
})

export default gameConfigSlice
