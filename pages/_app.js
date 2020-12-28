import { ModalProvider } from '../components/modal'
import Search from '../components/search-field'

function MyApp({ Component, pageProps }) {
  return (
    <ModalProvider>
      <Search />
      <Component {...pageProps} />
    </ModalProvider>
  )
}
export default MyApp
