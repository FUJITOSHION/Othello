import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type BoardState = {
  isFin: boolean
}

export const initialState: BoardState = {
  isFin: false,
}

const gameConfigSlice = createSlice({
  name: "gameConfig",
  initialState,
  reducers: {
    setIsFin: (state, { payload }: PayloadAction<boolean>) => {
      state.isFin = payload
    },
  },
})

export default gameConfigSlice
