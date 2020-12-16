import { ModalProvider } from '../components/modal'

function MyApp({ Component, pageProps }) {
  return (
    <ModalProvider>
      <Component {...pageProps} />
    </ModalProvider>
  )
}
export default MyApp
