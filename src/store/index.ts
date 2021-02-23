import { combineReducers, applyMiddleware, Dispatch, AnyAction } from "redux"
import { getDefaultMiddleware } from "@reduxjs/toolkit"
import logger from "redux-logger"
import { composeWithDevTools } from "redux-devtools-extension"
import { createStore } from "redux"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage"

import gameConfigSlice, {
  initialState as gameConfigState,
} from "./game-config/slice"

export const rootReducer = combineReducers({
  gameConfig: gameConfigSlice.reducer,
})
export type RootState = ReturnType<typeof rootReducer>

const preloadedState = (): RootState => {
  return {
    gameConfig: gameConfigState,
  }
}

const persistedReducer = persistReducer(
  {
    key: "root",
    storage,
  },
  rootReducer
)

// eslint-disable-next-line
export const configureStore = () => {
  const middlewares = [...getDefaultMiddleware(), logger]
  const composedEnhancers = composeWithDevTools(
    ...[applyMiddleware(...middlewares)]
  )

  const store = createStore(
    persistedReducer,
    preloadedState(),
    composedEnhancers
  )
  const persistor = persistStore(store)

  return { store, persistor }
}

export type ConfigureStore = ReturnType<typeof configureStore>
export type AppDispatch = Dispatch<AnyAction>
