import { gql } from 'graphql-request'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import styled from 'styled-components'
import { Grid, GridItem } from '../components/grid'
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
        <Grid gutter={10} columnWidth={250} rowHeight={20}>
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
                        <Image src="/heart.png" width={20} height={20} />
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
