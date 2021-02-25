import { useSelector } from "react-redux"

import type { RootState } from "@store"

export const useIsFin = (): boolean => {
  return useSelector((state: RootState) => state.board.isFin)
}
