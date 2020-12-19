import { ApolloServer } from 'apollo-server-micro'
import { gql } from 'apollo-server-micro'
import axios from 'axios'

// schema
const typeDefs = gql`
  type Trending {
    id: ID
    orignalImagesUrl: String
    downsizedSmallUrl: String
    downsizedSmallHeight: String
    downsizedSmallWidth: String
  }

  type Query {
    getSearch(search: String): [Trending]
    getTrending: [Trending]
  }
`
const api_key = 'Ag87TeYV783S975gkbpdzvpVgeW9ft5W'
const resolvers = {
  Query: {
    getSearch: async (_, { search }) => {
      const { data } = await axios.get(
        `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${search}&limit=25&offset=0&rating=g&lang=en`
      )
      return data.data.map((gifs) => {
        console.log({
          id: gifs.id,
          orignalImagesUrl: gifs.images.original.url,
          downsizedSmallUrl: gifs.images.downsized_small.mp4,
          downsizedSmallHeight: gifs.images.downsized_small.height,
          downsizedSmallWidth: gifs.images.downsized_small.width,
        })
        return {
          id: gifs.id,
          orignalImagesUrl: gifs.images.original.url,
          downsizedSmallUrl: gifs.images.downsized_small.mp4,
          downsizedSmallHeight: gifs.images.downsized_small.height,
          downsizedSmallWidth: gifs.images.downsized_small.width,
        }
      })
    },
    getTrending: async () => {
      const { data } = await axios.get(
        `https://api.giphy.com/v1/gifs/trending?api_key=${api_key}&limit=15&rating=g`
      )
      return data.data.map((gifs) => {
        return {
          id: gifs.id,
          orignalImagesUrl: gifs.images.original.url,
          downsizedSmallUrl: gifs.images.downsized_small.mp4,
          downsizedSmallHeight: gifs.images.downsized_small.height,
          downsizedSmallWidth: gifs.images.downsized_small.width,
        }
      })
    },
  },
}

export const config = {
  api: {
    bodyParser: false,
  },
}

const apolloServer = new ApolloServer({ typeDefs, resolvers })
export default apolloServer.createHandler({ path: '/api/graphql' })
