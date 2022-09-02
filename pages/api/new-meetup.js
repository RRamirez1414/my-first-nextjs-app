import getMongoClientCollection from '../../utils/mongo-client'

// /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body

    const { client, dbCollection } = await getMongoClientCollection('meetups')

    const result = await dbCollection.insertOne(data)

    console.log(result)

    client.close()

    res.status(201).json({ message: 'Meetup inserted!' })
  }
}

export default handler
