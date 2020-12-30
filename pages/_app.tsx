import type { AppProps /*, AppContext */ } from 'next/app'

import styled, { createGlobalStyle } from 'styled-components'
import { ModalProvider } from '../components/modal'
import Search from '../components/search-field'

const GlobalStyle = createGlobalStyle`
  :root  {
    --btn-color: #fb4b68;
    --custom-black: #0b161b
  }
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: var(--custom-black)
  }
  .reset-btn {
    appearance: none;
    border: 0;
    cursor: pointer;
    outline: none;
  }

  li {
    list-style: none;
  }
`
const Main = styled.main`
  max-width: 1000px;
  margin: 0 auto;
`

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ModalProvider>
      <GlobalStyle />
      <Main>
        <Search />
        <Component {...pageProps} />
      </Main>
    </ModalProvider>
  )
}
export default MyApp
