import type { PropsWithChildren } from "react"
import { PersistGate } from "redux-persist/integration/react"

import { persistor } from "@store"

type ClientSideRenderProps = PropsWithChildren<{
  loading?: React.ReactNode
}>

export const ClientSideRender: React.FC<ClientSideRenderProps> = ({
  children,
  loading,
}: ClientSideRenderProps) => {
  // WARN: このコンポーネント以下はSSGが適用されない
  // ローカルストレージのステートで表示が分かれるときに使用
  return (
    <PersistGate loading={loading} persistor={persistor}>
      {children}
    </PersistGate>
  )
}
