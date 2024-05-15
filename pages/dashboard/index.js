import Feed from '@/components/Feed';
import FeedHeader from '@/components/FeedHeader';
import { connectToDatabase } from '@/helpers/db-utils';
import { getSession, signOut, useSession } from 'next-auth/react';
import image from './download.jpg';
import Head from 'next/head';
import Footer from '@/components/Footer';

function Dashboard(props) {
  const { cases } = props;
  const parsedData = JSON.parse(cases);
  // console.log(session);

  return (
    <div>
      <Head>
        <title>Dashboard: {props.session.user.email}</title>
        <meta
          name="description"
          content="Adaalat: One step Solution to managing court hearings"
        />
      </Head>
      <div >
      <div 
          style={{ 
            backgroundImage: "url('https://media.gettyimages.com/id/1195318484/photo/general-view-of-supreme-court-of-india-in-new-delhi-india-on-22-january-2020-no-stay-on-caa.jpg?s=612x612&w=0&k=20&c=38ELBW4zuUx9KZCmEbpADY9K1zS0fZMlzsWS4Ej6XfM=')", 
           backgroundRepeat: "no-repeat",
           backgroundSize: "100% auto",
           height: "600px",
           width: "100%"
          }} className=" py-20  flex items-start justify-center text-3xl font-serif">
        Welcome : {props.session.user.name || props.session.user.email}
      </div>
      </div>
     
      {/* Section for add clients */}
      <FeedHeader />
      {/* Table of clients */}
      <Feed cases={parsedData} />
      <div className='mb-8'></div>
      <Footer/>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  // checks for the incoming request and sees whether a session token is available or not and accordingly takes action

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false, // if we want to permanently redirect to auth page or not ?
      },
    };
  }
  console.log(session?.user)
  const client = await connectToDatabase();
  const db = client.db();
  const response = await db.collection('cases').find().toArray();
  const stringifiedData = JSON.stringify(response);

  return {
    props: {
      session,
      cases: stringifiedData,
    },
  };
}

export default Dashboard;
