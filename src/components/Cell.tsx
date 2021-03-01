import { memo } from "react"
import { includes } from "ramda"

import styles from "@styles/modules/Cell.module.scss"
import type { CellState } from "types"
import { useIsAiWhite } from "@hooks/store/game-config"
import { useIsAiTurn } from "@hooks/store/board"

type Props = {
  state: CellState
  onClick: () => void
}

const BaseCell: React.FC<Props> = ({ state, onClick }: Props) => {
  const isAIWhite = useIsAiWhite()
  const isAiTurn = useIsAiTurn()

  return (
    <div
      className={`${styles.cell} ${
        (state === "ai" && isAIWhite) || (state === "opponent" && !isAIWhite)
          ? styles.white
          : styles.black
      } ${!isAiTurn && state === "puttable" ? styles.puttable : ""}`}
      onClick={!isAiTurn && state === "puttable" ? onClick : undefined}
    >
      {includes(state, ["ai", "opponent"]) ? "●" : ""}
    </div>
  )
}

export const Cell = memo(BaseCell)
