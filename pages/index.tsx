import Head from 'next/head'
import Image from 'next/image'
import styled from 'styled-components'
import { useGraphql } from './hooks/useGraphql'

const Main = styled.main`
  max-width: 1000px;
  margin: 0 auto;
`
const Grid = styled.div`
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

      <Main>
        <Grid>
          {data.getTrending.map((gifs) => {
            return (
              <Image
                key={gifs.id}
                src={gifs.orignalImagesUrl}
                height={gifs.downsizedSmallHeight}
                width={gifs.downsizedSmallWidth}
              />
            )
          })}
        </Grid>
      </Main>
    </div>
  )
}
