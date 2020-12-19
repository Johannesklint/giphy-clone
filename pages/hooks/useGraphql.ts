import useSWR from 'swr'
import { request } from 'graphql-request'
import { Variables } from 'graphql-request/dist/types'
import { useRef } from 'react'

const key = '/api/graphql'

function fetcher(query: any) {
  return request(key, query)
}

export function useGraphql(query: string) {
  return useSWR(query, fetcher)
}

export function useMutate(query: string) {
  const variablesRef = useRef({})
  const { data, error, mutate } = useSWR(query)

  const handleMutate = () => {
    mutate({ ...data, ...variablesRef.current })
  }

  const init = (variables: Variables) => {
    return request(key, query, variables)
  }

  return {
    data,
    error,
    init,
    mutate: handleMutate,
  }
}
