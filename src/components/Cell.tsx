import { CellState } from "../types/index"

type Props = {
  state: CellState
  isValid: boolean
}

// type CellDisplayType = "白" | "黒" | undefined

export const Cell: React.FC<Props> = ({ state, isValid }: Props) => {
  // ここのisAIWhiteをglobalでもつ
  const isAIWhite = true
  console.log(isValid)
  console.log(state)
  return (
    <div style={{ border: "medium solid #000000", backgroundColor: "#336f33" }}>
      {typeof state === "string"
        ? (state === "ai" && isAIWhite) || (state === "opponent" && !isAIWhite)
          ? "白"
          : "黒"
        : "他"}
    </div>
  )
}
