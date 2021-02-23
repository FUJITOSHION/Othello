import styles from "@styles/modules/Home.module.scss"
import { SelectionCpuLevel } from "../components/SelectionCpuLevel"
import { BoardSurface } from "../components/BoardSurface"

export default function Game(): JSX.Element {
  return (
    <div>
      <SelectionCpuLevel />
      <BoardSurface />
    </div>
  )
}
