import { ApolloServer } from 'apollo-server-micro'
import { gql } from 'apollo-server-micro'
import axios from 'axios'

// schema
const typeDefs = gql`
  type User {
    login: String
    avatar_url: String
  }

  type Trending {
    id: ID
    orignalImagesHeight: String
  }

  type Query {
    getUser(name: String!): User!
    getTrending: [Trending]
  }
`

const resolvers = {
  Query: {
    getUser: async (_, args) => {
      const user = await axios.get(`https://api.github.com/users/${args.name}`)
      return {
        id: user.data.id,
        login: user.data.login,
        avatar_url: user.data.avatar_url,
      }
    },
    getTrending: async () => {
      const { data } = await axios.get(
        'https://api.giphy.com/v1/gifs/trending?api_key=Ag87TeYV783S975gkbpdzvpVgeW9ft5W&limit=15&rating=g'
      )
      return data.data.map((gifs) => {
        return {
          id: gifs.id,
          orignalImagesHeight: gifs.images.original.height,
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
