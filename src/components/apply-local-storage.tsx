import type { PropsWithChildren } from "react"
import { PersistGate } from "redux-persist/integration/react"

import { stores } from "@pages/_app"

type ApplyLocalStorageProps = PropsWithChildren<{
  loading?: React.ReactNode
}>

export const ApplyLocalStorage: React.FC<ApplyLocalStorageProps> = ({
  children,
  loading,
}: ApplyLocalStorageProps) => {
  // WARN: このコンポーネント以下はSSGが適用されないので、できるだけ下層に
  // ローカルストレージから Redux State を読み出す
  return (
    <PersistGate loading={loading} persistor={stores.persistor}>
      {children}
    </PersistGate>
  )
}
