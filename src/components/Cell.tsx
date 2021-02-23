import { CellState } from "../types/index"

type Props = {
  state: CellState
}

type CellDisplayType = "白" | "黒" | undefined

export const Cell: React.FC<Props> = ({ state }: Props) => {
  // ここのisAIWhiteをglobalでもつ
  const isAIWhite = true

  return (
    <div>
      {typeof state === "string"
        ? (state === "ai" && isAIWhite) || (state === "opponent" && !isAIWhite)
          ? "白"
          : "黒"
        : null}
    </div>
  )
}
