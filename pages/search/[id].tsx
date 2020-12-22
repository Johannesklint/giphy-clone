import Image from 'next/image'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useMutate, useQuery } from '../hooks/useGraphql'

type Props = {
  result: [
    {
      id: string
      orignalImagesUrl: string
      downsizedSmallHeight: string
      downsizedSmallWidth: string
    }
  ]
}

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

  return data.getSearch.map((gifs) => {
    return (
      <Image
        key={gifs.id}
        src={gifs.orignalImagesUrl}
        height={gifs.downsizedSmallHeight}
        width={gifs.downsizedSmallWidth}
      />
    )
  })
}
