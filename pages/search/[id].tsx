import Image from 'next/image'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import styled from 'styled-components'
import { useQuery } from '../hooks/useGraphql'

const Wrapper = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(275px, 1fr));
  grid-gap: 10px;
`

export default function Search() {
  const router = useRouter()
  const variables = useMemo(() => ({ search: router.query.id }), [router.query.id])

  const { data, error } = useQuery(
    `query($search: String!) {
      getSearch(search: $search) {
        id
        orignalImagesUrl
        downsizedSmallUrl
        downsizedSmallHeight
        downsizedSmallWidth
      }
    }`,
    variables
  )

  if (error) {
    return <div>Error!</div>
  }

  if (!data) {
    return <div>Loading…</div>
  }

  return (
    <Wrapper>
      {data.getSearch.map(
        (gifs: {
          id: string
          orignalImagesUrl: string
          downsizedSmallHeight: string
          downsizedSmallWidth: string
        }) => {
          return (
            <li key={gifs.id}>
              <Image
                src={gifs.orignalImagesUrl}
                height={gifs.downsizedSmallHeight}
                width={gifs.downsizedSmallWidth}
              />
            </li>
          )
        }
      )}
    </Wrapper>
  )
}
