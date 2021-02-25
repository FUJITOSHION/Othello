import Head from "next/head"
import { useState } from "react"
import Link from "next/link"
import { useDispatch } from "react-redux"

import styles from "@styles/modules/Home.module.scss"
import { ClientSideRender } from "@components/ClientSideRender"
import { SelectionCpuLevel } from "@components/SelectionCpuLevel"
import { pagesPath } from "@path"
import boardSlice from "@store/board"

export default function Home(): JSX.Element {
  const [kagawa, setKagawa] = useState<boolean>(false)
  const [isAgreeCpu, setIsAgreeCpu] = useState<boolean>(false)
  const dispatch = useDispatch()

  const handleKagawa = () => {
    setKagawa(!kagawa)
  }

  const handleIsAgreeCpu = () => {
    setIsAgreeCpu(!isAgreeCpu)
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>オセロゲーム</div>
      <ul className={styles.checkList}>
        <li>
          <label>
            <input type="checkbox" checked={kagawa} onChange={handleKagawa} />
            香川県民ではありません。*香川県の条例に基づく
          </label>
        </li>
        <li>
          <label>
            <input
              type="checkbox"
              checked={isAgreeCpu}
              onChange={handleIsAgreeCpu}
            />
            cpuを利用することに同意します。
          </label>
        </li>
      </ul>
      <ClientSideRender>
        <SelectionCpuLevel />
      </ClientSideRender>
      <Link href={pagesPath.game.$url()}>
        <button
          disabled={!(kagawa && isAgreeCpu)}
          onClick={() => {
            dispatch(boardSlice.actions.setIsFin(false))
          }}
        >
          ゲームを開始する
        </button>
      </Link>
    </div>
  )
}
