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
