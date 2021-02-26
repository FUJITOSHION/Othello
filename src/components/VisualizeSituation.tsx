import styles from "@styles/modules/VisualizeSituation.module.scss"
import type { GameState } from "types"
import { aiCounter, opponentCounter } from "../utils/game/simulate"

type VisualizeSituationProps = {
  state: GameState
}

const getGamestatus = (ai: number, opponent: number): string => {
  if (ai === opponent) {
    return "引き分けです"
  } else if (ai >= opponent) {
    return "AIが勝っています"
  } else {
    return "あなたが勝っています"
  }
}

export const VisualizeSituation: React.FC<VisualizeSituationProps> = ({
  state,
}: VisualizeSituationProps) => {
  const numOpponent = opponentCounter(state)
  const numAi = aiCounter(state)

  return (
    <div className={styles.container}>
      <div className={styles.scoreContainer}>
        <div className={styles.opponent}>あなた</div>
        <div className={styles.score}>
          {numOpponent} vs {numAi}
        </div>
        <div className={styles.ai}>AI</div>
      </div>
      <div className={styles.gameStatus}>
        {getGamestatus(numAi, numOpponent)}
      </div>
    </div>
  )
}
