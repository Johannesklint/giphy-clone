import Head from 'next/head'
import Link from 'next/link'
import useSWR from 'swr'
import { request } from 'graphql-request'

const fetcher = (query) => request('/api/graphql', query)

export default function Home() {
  const { data, error } = useSWR(
    `{
      getTrending {
        gifs
      }
    }`,
    fetcher
  )
  console.log('data, error', { data, error })
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Link href="/about">about</Link>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer">
          Powered by <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </a>
      </footer>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
            Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
      <div id="modal" />
    </div>
  )
}
