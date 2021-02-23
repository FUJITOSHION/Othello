import { combineReducers } from "redux"
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import logger from "redux-logger"
import { save, load } from "redux-localstorage-simple"

import gameConfigSlice, {
  initialState as gameConfigState,
} from "./game-config/slice"

const rootReducer = combineReducers({
  gameConfig: gameConfigSlice.reducer,
})
export type RootState = ReturnType<typeof rootReducer>

const preloadedState = (): RootState => {
  return {
    gameConfig: gameConfigState,
  }
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), logger, save()],
  devTools: process.env.NODE_ENV !== "production",
  preloadedState: {
    ...preloadedState(),
    ...load(),
  },
})

export type AppDispatch = typeof store.dispatch
