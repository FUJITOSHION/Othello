import { aiCounter, opponentCounter } from "../utils/game/simulate"
import { GameState } from "types"

type PutStonesProps = {
  state: GameState
}

const winUser = (ai: number, opponent: number): string => {
  if (ai === opponent) {
    return "引き分けです"
  } else if (ai >= opponent) {
    return "AIがかってます"
  } else {
    return "あなたがかってます"
  }
}

const displayStoneState = (state: GameState): string => {
  const numOpponent = opponentCounter(state)
  const numAi = aiCounter(state)

  return (
    "あなたは: " +
    numOpponent.toString() +
    " vs " +
    "AIは: " +
    numAi.toString() +
    "　現在" +
    winUser(numAi, numOpponent)
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
