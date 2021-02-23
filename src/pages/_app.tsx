import type { AppProps } from "next/app"
import { Provider } from "react-redux"

import "@styles/globals/index.scss"
import { configureStore } from "@store"

export const stores = configureStore()

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Provider store={stores.store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
