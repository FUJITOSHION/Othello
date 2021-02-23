import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import type { AILevel } from "types"

export type GameConfigState = {
  aiLevel: AILevel
  isAiWhite: boolean
}

export const initialState: GameConfigState = {
  aiLevel: "強い",
  isAiWhite: true,
}

const gameConfigSlice = createSlice({
  name: "gameConfig",
  initialState,
  reducers: {
    setAiLevel: (state, { payload }: PayloadAction<AILevel>) => {
      state.aiLevel = payload
    },
    setAiIsWhite: (state, { payload }: PayloadAction<boolean>) => {
      state.isAiWhite = payload
    },
  },
})

export default gameConfigSlice
