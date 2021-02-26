import { useMemo } from "react"
import Link from "next/link"
import fs from "fs"

import type { JsonNode } from "types"
import { pagesPath } from "@path"
import { useIsFin, useResult } from "@hooks/store/board"
import { MCTS } from "@utils/mcts"
import { GameNode } from "@utils/mcts/game-node"
import { Layout } from "@components/Layout"
import { ClientSideRender } from "@components/ClientSideRender"
import { BoardSurface } from "../components/BoardSurface"
import { useAiLevel } from "@hooks/store/game-config"
import { MctsConfig } from "@utils/mcts/types"

type GamePageProps = {
  initJson: {
    rootNode: JsonNode
  }
}

const GamePage: React.FC<GamePageProps> = ({ initJson }: GamePageProps) => {
  const rootNode = GameNode.fromJson(initJson.rootNode)
  const level = useAiLevel()
  const createConfig = (level: string): MctsConfig => {
    const CP = 1 / Math.sqrt(2)
    if (level === "強い") {
      return { expandThreshold: 5, CP, stepNumber: 150 }
    } else if (level === "普通") {
      return { expandThreshold: 3, CP, stepNumber: 50 }
    } else {
      return { expandThreshold: 2, CP, stepNumber: 20 }
    }
  }
  const config = createConfig(level)
  console.log(config)
  console.log("a")

  const isFin = useIsFin()
  const result = useResult()
  const mcts = useMemo(() => new MCTS(config, undefined, rootNode), [isFin])

  return (
    <Layout>
      <ClientSideRender>
        {isFin ? (
          <div>
            <h1>
              {result.score?.ai} vs {result.score?.opponent} で{" "}
              {result.winner === "ai" ? "AI" : "あなた"} の勝ち！
            </h1>

            <Link href={pagesPath.$url()}>トップページへ</Link>
          </div>
        ) : (
          <>
            <BoardSurface mcts={mcts} />
          </>
        )}
      </ClientSideRender>
    </Layout>
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
