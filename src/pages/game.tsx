import styles from "@styles/modules/Home.module.scss"
import { ApplyLocalStorage } from "@components/apply-local-storage"
import { SelectionCpuLevel } from "@components/SelectionCpuLevel"

export default function Game(): JSX.Element {
  return (
    <div>
      <ApplyLocalStorage>
        <SelectionCpuLevel />
      </ApplyLocalStorage>
    </div>
  )
}
