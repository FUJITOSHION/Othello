import styles from "@styles/modules/Home.module.scss"
import { SelectionCpuLevel } from "../components/SelectionCpuLevel"

export default function Game(): JSX.Element {
  return (
    <div>
      <SelectionCpuLevel />
    </div>
  )
}
