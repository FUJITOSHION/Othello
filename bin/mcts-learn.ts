import fs from "fs"

import { MCTS, getInitCells } from "@utils/mcts"
import { GameTree } from "@utils/mcts/game-tree"

const config = {
  expandThreshold: 20,
  CP: 1 / Math.sqrt(2),
  stepNumber: 10000,
}

const Mcts = new MCTS(config, {
  boardState: getInitCells(true),
  nextPlayer: "opponent",
})
fs.mkdir("./dist", { recursive: true }, (err) => {
  if (err) throw err
})
const now = new Date()

const sep = 100
let count = 0
Mcts.runStepsLocal((tree: GameTree) => {
  count += sep
  console.log(`Finished ${count} steps`)

  fs.writeFileSync(
    `./dist/${now.toISOString().split("T")[0]}-tree.json`,
    JSON.stringify(tree),
    {
      flag: "w",
    }
  )
}, sep)
console.log("All steps has completed")
