import { useState } from "react"

import styles from "@styles/modules/Home.module.scss"

export default function Home(): JSX.Element {
  const [kagawa, setKagawa] = useState<boolean>(false)
  const [useCpu, setUseCpu] = useState<boolean>(false)

  const handlekagawa = () => {
    const nextKagawa = !kagawa
    setKagawa(nextKagawa)
  }

  const handleUseCpu = () => {
    const nextUseCpu = !useCpu
    setUseCpu(nextUseCpu)
  }
  return (
    <div>
      <div>オセロゲーム</div>
      <ul className={styles.checkList}>
        <li>
          <label>
            <input type="checkbox" checked={kagawa} onChange={handlekagawa} />
            香川県民ではありません。*香川県の条例に基づく
          </label>
        </li>
        <li>
          <label>
            <input type="checkbox" checked={useCpu} onChange={handleUseCpu} />
            cpuを利用することに同意します。
          </label>
        </li>
      </ul>
      <button disabled={!(kagawa && useCpu)}>ゲームを開始する</button>
    </div>
  )
}
