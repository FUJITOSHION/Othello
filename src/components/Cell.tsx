import { CellState } from "../types/index"

import styles from "@styles/modules/Cell.module.scss"
import { useIsAiWhite } from "@hooks/store/game-config"

type Props = {
  state: CellState
  isValid: boolean
  onClick: () => void
}

export const Cell: React.FC<Props> = ({ state, isValid, onClick }: Props) => {
  const isAIWhite = useIsAiWhite()

  return (
    <div
      className={`${styles.cell} ${
        (state === "ai" && isAIWhite) || (state === "opponent" && !isAIWhite)
          ? styles.white
          : styles.black
      } ${isValid ? styles.puttable : ""}`}
      onClick={isValid ? onClick : undefined}
    >
      {typeof state === "string" ? "●" : ""}
    </div>
  )
}
