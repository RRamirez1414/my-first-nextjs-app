import Head from 'next/head'
import MeetupList from '../components/meetups/MeetupList'
import getMongoClientCollection from '../utils/mongo-client'

function HomePage(props) {
  // this component is not a page, but from the components folder
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  )
}

// reserved word function for SSR
// export async function getServerSideProps(context) {
//   // similar to nodejs, this function gives access to incoming request data
//   const req = context.req
//   const res = context.res

//   // fetch data from API

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   }
// }

// reserved word function for SSG during build process
export async function getStaticProps() {
  // build process to do: fetch data from the api or database
  const { client, dbCollection } = await getMongoClientCollection('meetups')

  // find function by default gets all documents/records
  const meetups = await dbCollection.find().toArray()

  client.close()

  // always need to return an object with props this component expects
  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    // wait 1 second to re-pre-render this page and serve, avoids rebuilding and redeploying for outdated data
    revalidate: 1,
  }
}

export default HomePage
