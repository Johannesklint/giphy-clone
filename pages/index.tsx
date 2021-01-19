import { gql } from 'graphql-request'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { Grid, GridItem } from '../components/grid'
import LoginSignup from '../components/login-signup'
import { useUser } from '../components/user'
import { useGraphql } from './hooks/useGraphql'

const rotate = keyframes`
    0% {
      transform: rotate(0);
      animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }
    50% {
      transform: rotate(900deg);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    100% {
      transform: rotate(1800deg);
  }
`

const Loader = styled.div`
  display: flex;
  margin: 20vh auto;
  position: relative;
  width: 80px;
  height: 80px;

  ::after {
    content: ' ';
    display: block;
    border-radius: 50%;
    width: 0;
    height: 0;
    margin: 8px;
    box-sizing: border-box;
    border: 32px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation-name: ${rotate};
    animation-duration: 3s;
    animation-iteration-count: infinite;
  }
`

const Item = styled.li`
  position: relative;

  :hover {
    cursor: pointer;
  }
`

const DetailsWrapper = styled.div`
  position: absolute;
  bottom: 4px;
  left: 0px;
  width: calc(100% - 22px);
  background-color: var(--btn-color);
  padding: 4px 0;
  border-radius: 2px;
  padding-left: 10px;
  padding-right: 12px;
  & img {
    bottom: -1px !important;
  }
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

  function handleLike() {
    return () => {
      if (!user) {
        return null
      }
    }
  }

  if (!data) {
    return <Loader />
  }

  return (
    <div className="container">
      <Head>
        <title>Giphy clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!user ? <LoginSignup /> : null}
      <ul>
        <Grid gutter={10} columnWidth={200} rowHeight={2}>
          {data.getTrending.map(
            (gifs: {
              id: string
              orignalImagesUrl: string
              downsizedSmallHeight: number
              downsizedSmallWidth: number
            }) => {
              return (
                <GridItem key={gifs.id}>
                  <Item>
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
                    {showDetailsId === gifs.id ? (
                      <DetailsWrapper
                        onMouseEnter={() => {
                          setShowDetailsId(gifs.id)
                        }}
                        onMouseLeave={() => {
                          setShowDetailsId('')
                        }}>
                        <button onClick={handleLike(gifs.id)}>
                          <Image src="/heart.png" width={20} height={20} />
                        </button>
                      </DetailsWrapper>
                    ) : null}
                  </Item>
                </GridItem>
              )
            }
          )}
        </Grid>
      </ul>
    </div>
  )
}
