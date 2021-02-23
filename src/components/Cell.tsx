import { CellState } from "../types/index"

type Props = {
  state: CellState
}

type CellDisplayType = "白" | "黒" | undefined

export const Cell: React.FC<Props> = ({ state }: Props) => {
  // ここのisAIWhiteをglobalでもつ
  const isAIWhite = true
  const FirsStriketOpponent = { ai: "白", opponent: "黒", undefined: "" }
  const FirsStriketgAi = { ai: "黒", opponent: "白", undefined: "" }

  const ans = (isAIWhite ? FirsStriketOpponent : FirsStriketgAi)[
    typeof state !== "undefined" ? state : "undefined"
  ]

  return (
    <div>
      {typeof state === "string"
        ? (state === "ai" && isAIWhite) || (state === "opponent" && !isAIWhite)
          ? "白"
          : "黒"
        : null}
      {/* <div>{ans}</div> */}
    </div>
  )
}
