import type { AppProps } from "next/app"
import { Provider } from "react-redux"
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles"
import orange from "@material-ui/core/colors/orange"
import grey from "@material-ui/core/colors/grey"

import "@styles/globals/index.scss"
import { store } from "@store"

export const mainColor = orange[700]

const theme = createMuiTheme({
  palette: {
    primary: {
      main: mainColor,
    },
    action: {
      disabledBackground: grey[700],
      disabled: orange[200],
    },
  },
})

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp
