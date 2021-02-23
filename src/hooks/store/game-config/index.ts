import { useSelector } from "react-redux"

import type { RootState } from "@store"
import type { AILevel } from "types"

export const useAiLevel = (): AILevel => {
  return useSelector((state: RootState) => state.gameConfig.aiLevel)
}

export const useIsAiWhite = (): boolean => {
  return useSelector((state: RootState) => state.gameConfig.isAiWhite)
}
