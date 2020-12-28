import Head from 'next/head'
import Image from 'next/image'
import styled from 'styled-components'
import { useGraphql } from './hooks/useGraphql'

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(275px, 1fr));
  grid-gap: 10px;
`

export default function Home() {
  const { data } = useGraphql(
    `{
      getTrending {
        id
        orignalImagesUrl
        downsizedSmallHeight
        downsizedSmallWidth
      }
    }`
  )

  if (!data) {
    return 'loading'
  }

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <List>
        {data.getTrending.map((gifs) => {
          return (
            <li key={gifs.id}>
              <Image
                src={gifs.orignalImagesUrl}
                height={gifs.downsizedSmallHeight}
                width={gifs.downsizedSmallWidth}
              />
            </li>
          )
        })}
      </List>
    </div>
  )
}
