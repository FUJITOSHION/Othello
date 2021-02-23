import { CellState } from "../types/index"
import { useState } from "react"

type Props = {
  state: CellState
  isValid: boolean
}

// type CellDisplayType = "白" | "黒" | undefined

export const Cell: React.FC<Props> = ({ state, isValid }: Props) => {
  // ここのisAIWhiteをglobalでもつ
  const isAIWhite = true

  return (
    <div
      style={{
        border: "medium solid #000000",
        backgroundColor: "#336f33",
        color: isValid ? "#FFFFFF" : "#000000",
      }}
    >
      {typeof state === "string"
        ? (state === "ai" && isAIWhite) || (state === "opponent" && !isAIWhite)
          ? "白"
          : "黒"
        : "他"}
    </div>
  )
}
