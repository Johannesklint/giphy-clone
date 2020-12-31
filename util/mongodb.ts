import { nanoid } from 'nanoid'
import { MongoClient } from 'mongodb'

const { MONGODB_URI, MONGODB_DB } = process.env

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

if (!MONGODB_DB) {
  throw new Error('Please define the MONGODB_DB environment variable inside .env.local')
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongo

if (!cached) {
  cached = global.mongo = { conn: null, promise: null }
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn
  }
  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }

    cached.promise = MongoClient.connect(MONGODB_URI, opts).then((client) => {
      return {
        client,
        db: client.db(MONGODB_DB),
      }
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}

export async function findUserByEmail(email: string) {
  const { db } = await connectToDatabase()
  return db
    .collection('users')
    .findOne({
      email,
    })
    .then((user) => user || null)
}

export async function insertUser(email: string, password: string) {
  const { db } = await connectToDatabase()
  return db
    .collection('users')
    .insertOne({
      _id: nanoid(12),
      email,
      password,
    })
    .then(({ ops }) => ops[0])
}

type Likes = {
  id: string
}
export async function updateUserById(id: string, update: Likes[]) {
  const { db } = await connectToDatabase()
  return db
    .collection('users')
    .findOneAndUpdate({ _id: id }, { $set: update }, { returnOriginal: false })
    .then(({ value }) => value)
}
