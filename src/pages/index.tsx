import { useState } from "react"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu"

import styles from "@styles/modules/Home.module.scss"
import { Layout } from "@components/Layout"
import { ClientSideRender } from "@components/ClientSideRender"
import { SelectionCpuLevel } from "@components/SelectionCpuLevel"
import { Checkbox } from "@components/Checkbox"
import { Button } from "@components/Button"
import { pagesPath } from "@path"
import boardSlice from "@store/board"

export default function Home(): JSX.Element {
  const [kagawa, setKagawa] = useState<boolean>(false)
  const [isAgreeCpu, setIsAgreeCpu] = useState<boolean>(false)
  const dispatch = useDispatch()
  const router = useRouter()

  const handleKagawa = () => {
    setKagawa(!kagawa)
  }

  const handleIsAgreeCpu = () => {
    setIsAgreeCpu(!isAgreeCpu)
  }

  return (
    <Layout>
      <div className={styles.container}>
        <img
          className={styles.logoImage}
          src="logo.png"
          alt="Othello"
          height={300}
        />
        <ul className={styles.checkList}>
          <li>
            <Checkbox
              checked={kagawa}
              onChange={handleKagawa}
              label="香川県民ではありません。*香川県の条例に基づく"
            />
          </li>
          <li>
            <Checkbox
              checked={isAgreeCpu}
              onChange={handleIsAgreeCpu}
              label="端末側でAIが演算を行います。CPUを使用することに同意します。"
            />
          </li>
        </ul>
        <ClientSideRender>
          <SelectionCpuLevel />
        </ClientSideRender>
        <Button
          text={"ゲームを開始する"}
          icon={<RestaurantMenuIcon />}
          disabled={!(kagawa && isAgreeCpu)}
          handleClick={() => {
            dispatch(boardSlice.actions.setIsFin(false))
            router.push(pagesPath.game.$url())
          }}
        />
      </div>
    </Layout>
  )
}
