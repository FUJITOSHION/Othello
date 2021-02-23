import styles from "@styles/modules/Home.module.scss"
import { ApplyLocalStorage } from "@components/apply-local-storage"
import { SelectionCpuLevel } from "../components/SelectionCpuLevel"
import { BoardSurface } from "../components/BoardSurface"

export default function Game(): JSX.Element {
  return (
    <div>
      <ApplyLocalStorage>
        <SelectionCpuLevel />
        <BoardSurface />
      </ApplyLocalStorage>
    </div>
  )
}
