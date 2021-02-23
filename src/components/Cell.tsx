import { CellState } from "../types/index"

type Props = {
  state: CellState
  isValid: boolean
  onClick: () => void
}

// type CellDisplayType = "白" | "黒" | undefined

export const Cell: React.FC<Props> = ({ state, isValid, onClick }: Props) => {
  // ここのisAIWhiteをglobalでもつ
  const isAIWhite = true

  return (
    <div
      style={{
        border: "medium solid #000000",
        backgroundColor: "#336f33",
        color: isValid ? "#FFFFFF" : "#000000",
        cursor: isValid ? "pointer" : undefined,
      }}
      onClick={isValid ? onClick : undefined}
    >
      {typeof state === "string"
        ? (state === "ai" && isAIWhite) || (state === "opponent" && !isAIWhite)
          ? "白"
          : "黒"
        : "他"}
    </div>
  )
}
