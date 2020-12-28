import { ModalProvider } from '../components/modal'
import Search from '../components/search-field'
import { createGlobalStyle } from 'styled-components'

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
`
function MyApp({ Component, pageProps }) {
  return (
    <ModalProvider>
      <GlobalStyle />
      <Search />
      <Component {...pageProps} />
    </ModalProvider>
  )
}
export default MyApp
