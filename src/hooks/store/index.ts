import { useDispatch as useBaseDispatch } from "react-redux"

import type { AppDispatch } from "@store"

export const useDispatch = (): AppDispatch => useBaseDispatch<AppDispatch>()
