import { gql } from 'graphql-request'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import styled from 'styled-components'
import Masonry from 'react-masonry-css'
import LoginSignup from '../components/login-signup'
import { useUser } from '../components/user'
import { useGraphql } from './hooks/useGraphql'

const Item = styled.li`
  position: relative;

  :hover {
    cursor: pointer;
  }
`

const DetailsWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
`

export default function Home() {
  const [showDetailsId, setShowDetailsId] = useState<string>('')
  const { user } = useUser()
  const { data } = useGraphql(
    gql`
      {
        getTrending {
          id
          orignalImagesUrl
          downsizedSmallHeight
          downsizedSmallWidth
        }
      }
    `
  )

  if (!data) {
    return 'loading'
  }

  return (
    <div className="container">
      <Head>
        <title>Giphy clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!user ? <LoginSignup /> : null}
      <ul>
        <Masonry
          breakpointCols={{
            default: 4,
            1100: 4,
            700: 3,
            500: 2,
          }}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column">
          {data.getTrending.map((gifs) => {
            return (
              <Item key={gifs.id}>
                <Image
                  src={gifs.orignalImagesUrl}
                  height={gifs.downsizedSmallHeight + 10}
                  width={gifs.downsizedSmallWidth + 10}
                  onMouseEnter={() => {
                    setShowDetailsId(gifs.id)
                  }}
                  onMouseLeave={() => {
                    setShowDetailsId('')
                  }}
                />
                {/* {showDetailsId === gifs.id ? ( */}
                  <DetailsWrapper>
                    <Image src="/heart.png" width={20} height={20} />
                  </DetailsWrapper>
                {/* ) : null} */}
              </Item>
            )
          })}
        </Masonry>
      </ul>
    </div>
  )
}
