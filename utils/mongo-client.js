import { MongoClient } from 'mongodb'

/**
 * connects to mongodb and returns client and collection
 * @param {string} collection
 */
async function getMongoClientCollection(collection) {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_SECRET}@cluster0.bhpyf9f.mongodb.net/meetups?retryWrites=true&w=majority`
  )
  const db = client.db()

  const dbCollection = db.collection(collection)
  return { client, dbCollection }
}

export default getMongoClientCollection
