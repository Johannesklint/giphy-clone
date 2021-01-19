import useSWR from 'swr'
import { request, GraphQLClient } from 'graphql-request'
import { useState } from 'react'
import type { RequestDocument, Variables } from 'graphql-request/dist/types'

const key = '/api/graphql'

export function useGraphql(query: string) {
  function fetcher(query: string) {
    return request(key, query)
  }
  return useSWR(query, fetcher)
}

interface Data {
  loginUser?: {
    email: string
  }
  getSearchAutoAutoComplete?: [
    {
      name: string
      length: number
    }
  ]
  writeUser?: {
    email: string
    isLoggedIn: boolean
    emailExist: boolean
    user: {
      id: string
      email: string
      password: string
    }
  }
}

export function useMutate(query: RequestDocument) {
  const [data, setData] = useState<Data>(null)
  const [error, setError] = useState<string>(null)
  const [loading, setLoading] = useState<boolean>(null)
  const client = new GraphQLClient(key, { headers: {} })

  async function mutate(variables: Variables) {
    setLoading(true)
    try {
      setData(await client.request(query, variables))
      setLoading(false)
    } catch (e) {
      setError(e)
    }
  }

  return { data, loading, error, mutate }
}

export function useQuery(query: RequestDocument, variables: Variables) {
  function fetcher(query: string, variables: Variables) {
    return request(key, query, variables)
  }
  return useSWR([query, variables], fetcher)
}

export function gql(query: TemplateStringsArray) {
  return query[0]
}
