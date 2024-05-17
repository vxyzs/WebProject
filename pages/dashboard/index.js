import Feed from '@/components/Feed';
import FeedHeader from '@/components/FeedHeader';
import { connectToDatabase, getUserDetails, getCase , getAllCases} from '@/helpers/db-utils';
import { getSession, signOut, useSession } from 'next-auth/react';
import image from './download.jpg';
import Head from 'next/head';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';

function Dashboard(props) {
  const { cases, user } = props;
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
      <FeedHeader session={props.session} user={user} />
      <Feed cases={parsedData} />
      <div className='mb-8'></div>
      <Footer/>
    </div>
  );
}

export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }
  const client = await connectToDatabase();
  const user = await getUserDetails(client,session?.user.email);
  const db = client.db();
  const response = user.isJudge ? await getAllCases(client): await getCase(client,session?.user.email);
  const stringifiedData = JSON.stringify(response);

    return {
        props: {
            session,
            cases: stringifiedData,
            user: user.isJudge,
        },
    };
}

export default Dashboard;
