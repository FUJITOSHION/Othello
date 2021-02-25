import { combineReducers } from "redux"
import { getDefaultMiddleware, configureStore } from "@reduxjs/toolkit"
import logger from "redux-logger"
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"
import storage from "redux-persist/lib/storage"

import gameConfigSlice, { initialState as gameConfigState } from "./game-config"
import boardSlice, { initialState as boardState } from "./board"

export const rootReducer = combineReducers({
  gameConfig: gameConfigSlice.reducer,
  board: boardSlice.reducer,
})
export type RootState = ReturnType<typeof rootReducer>

const persistedReducer = persistReducer(
  {
    key: "root",
    storage,
    whitelist: ["gameConfig"],
  },
  rootReducer
)

const preloadedState = (): RootState => {
  return {
    gameConfig: gameConfigState,
    board: boardState,
  }
}

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    logger,
  ],
  devTools: process.env.NODE_ENV !== "production",
  preloadedState: preloadedState(),
})

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
