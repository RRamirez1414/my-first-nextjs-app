import Head from 'next/head'
import MeetupDetail from '../../components/meetups/MeetupDetail'
import getMongoClientCollection from '../../utils/mongo-client'
import { ObjectId } from 'mongodb'

function MeetupDetails(props) {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  )
}

export async function getStaticPaths() {
  const { client, dbCollection } = await getMongoClientCollection('meetups')

  // collect all documents but extract only the _id key
  const meetups = await dbCollection.find({}, { _id: 1 }).toArray()

  client.close()

  return {
    // configuration stating existense of all possible paths
    fallback: false,
    // usually mapped from API
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  }
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId

  const { client, dbCollection } = await getMongoClientCollection('meetups')

  const meetup = await dbCollection.findOne({ _id: ObjectId(meetupId) })

  client.close()

  console.log(meetupId)

  return {
    props: {
      meetupData: {
        id: meetupId,
        image: meetup.image,
        title: meetup.title,
        address: meetup.address,
        description: meetup.description,
      },
    },
  }
}

export default MeetupDetails
