import styled, { createGlobalStyle } from 'styled-components'
import { ModalProvider } from '../components/modal'
import Search from '../components/search-field'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #0b161b;
  }
  .reset-btn {
    appearance: none;
    border: 0;
    cursor: pointer;
    font-family: inherit;
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

function MyApp({ Component, pageProps }) {
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
