import type { AppProps } from "next/app"
import { Provider } from "react-redux"

import "@styles/globals/index.scss"
import { store } from "@store"

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
