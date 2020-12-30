import { ApolloServer } from 'apollo-server-micro'
import { gql } from 'apollo-server-micro'
import axios from 'axios'
import bcrypt from 'bcryptjs'
import { findUserByEmail, insertUser } from '../../util/mongodb'

// schema
const typeDefs = gql`
  type Result {
    id: ID
    orignalImagesUrl: String
    downsizedSmallUrl: String
    downsizedSmallHeight: String
    downsizedSmallWidth: String
  }

  type Search {
    id: ID
    name: String
  }

  type ExistingUser {
    id: String
    email: String
    password: String
  }

  type User {
    emailExist: Boolean
    user: ExistingUser
    isLoggedIn: Boolean
  }

  type Query {
    getSearchAutoAutoComplete(letters: String): [Search]
    getSearch(search: String): [Result]
    getTrending: [Result]
    writeUser(email: String, password: String): User
    loginUser(email: String, password: String): ExistingUser
  }
`
const api_key = process.env.NEXT_PUBLIC_API_KEY

const resolvers = {
  Query: {
    getSearch: async (_, { search }: string) => {
      const { data } = await axios.get(
        `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${search}&limit=25&offset=0&rating=g&lang=en`
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
    getSearchAutoAutoComplete: async (
      _,
      {
        letters,
      }: {
        letters: string
      }
    ) => {
      const { data } = await axios.get(
        `https://api.giphy.com/v1/gifs/search/tags?api_key=${api_key}&q=${letters}`
      )
      return data.data.map(({ name }: { name: string }) => {
        return { name }
      })
    },
    writeUser: async (_, { email, password }: { email: string; password: string }) => {
      try {
        if (await findUserByEmail(email)) {
          return {
            emailExist: true,
          }
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await insertUser(email, hashedPassword)
        return {
          user,
          isLoggedIn: true,
        }
      } catch (error) {
        throw new Error(error)
      }
    },
    loginUser: async (_, { email, password }: { email: string; password: string }) => {
      const { password: hash, _id: id, email: responseEmail } = await findUserByEmail(email)
      const success = await bcrypt.compare(password, hash)
      return {
        isLoggedIn: success,
        email: responseEmail,
        id,
      }
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
