import { useMemo } from "react"
import fs from "fs"

import type { JsonNode } from "types"
import { MCTS } from "@utils/mcts"
import { GameNode } from "@utils/mcts/game-node"
import { ApplyLocalStorage } from "@components/apply-local-storage"
import { SelectionCpuLevel } from "../components/SelectionCpuLevel"
import { BoardSurface } from "../components/BoardSurface"

type GamePageProps = {
  initJson: {
    rootNode: JsonNode
  }
}

const GamePage: React.FC<GamePageProps> = ({ initJson }: GamePageProps) => {
  const rootNode = GameNode.fromJson(initJson.rootNode)
  const config = {
    expandThreshold: 2,
    CP: 1 / Math.sqrt(2),
    stepNumber: 10,
  }

  const mcts = useMemo(() => new MCTS(config, undefined, rootNode), [])

  return (
    <div>
      <ApplyLocalStorage>
        <SelectionCpuLevel />
        <BoardSurface mcts={mcts} />
      </ApplyLocalStorage>
    </div>
  )
}

export default GamePage

export const getStaticProps = async (): Promise<{ props: GamePageProps }> => {
  const rawData = fs.readFileSync(`./dist/tree.json`, "utf8")
  const jsonData = JSON.parse(rawData) as { rootNode: JsonNode }

  return {
    props: {
      initJson: jsonData,
    },
  }
}
