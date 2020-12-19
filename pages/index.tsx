import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useGraphql } from './hooks/useGraphql'
import Search from '../components/search'

export default function Home() {
  // const { data } = useGraphql(
  //   `{
  //     getTrending {
  //       id
  //       orignalImagesUrl
  //       downsizedSmallHeight
  //       downsizedSmallWidth
  //     }
  //   }`,
  //   null
  // )

  // if (!data) {
  //   return 'loading'
  // }
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Search />
        <Link href="/about">about</Link>
        {/* {data.getTrending.map((gifs) => {
          return (
            <Image
            
              key={gifs.id}
              src={gifs.orignalImagesUrl}
              height={gifs.downsizedSmallHeight}
              width={gifs.downsizedSmallWidth}
            />
          )
        })} */}
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
