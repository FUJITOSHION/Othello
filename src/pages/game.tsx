import { useMemo } from "react"
import Link from "next/link"
import fs from "fs"

import type { JsonNode } from "types"
import { pagesPath } from "@path"
import { useIsFin, useResult } from "@hooks/store/board"
import { MCTS, createConfig } from "@utils/mcts"
import { GameNode } from "@utils/mcts/game-node"
import { Layout } from "@components/Layout"
import { ClientSideRender } from "@components/ClientSideRender"
import { BoardSurface } from "../components/BoardSurface"
import { useAiLevel } from "@hooks/store/game-config"

type GamePageProps = {
  initJson: {
    rootNode: JsonNode
  }
}

const GamePage: React.FC<GamePageProps> = ({ initJson }: GamePageProps) => {
  const rootNode = GameNode.fromJson(initJson.rootNode)
  const level = useAiLevel()
  const isFin = useIsFin()
  const result = useResult()
  const conf = createConfig(level)
  const mcts = useMemo(() => new MCTS(conf(0), undefined, rootNode), [isFin])

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
            <BoardSurface mcts={mcts} conf={conf} />
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
