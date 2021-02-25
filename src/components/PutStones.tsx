import { aiCounter, opponentCounter } from "../utils/game/simulate"
import { GameState } from "types"

type PutStonesProps = {
  state: GameState
}

const displayStoneState = (state: GameState): string => {
  return (
    "あなたは: " +
    opponentCounter(state).toString() +
    " vs " +
    "AIは: " +
    aiCounter(state).toString()
  )
}

export const PutStones: React.FC<PutStonesProps> = ({
  state,
}: PutStonesProps) => {
  return (
    <div>
      <div>{displayStoneState(state)}</div>
    </div>
  )
}
