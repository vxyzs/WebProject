import Feed from '@/components/Feed';
import FeedHeader from '@/components/FeedHeader';
import { connectToDatabase, getUserDetails, getCase , getAllCases} from '@/helpers/db-utils';
import { getSession, signOut, useSession } from 'next-auth/react';


import Head from "next/head";

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
      <div className="flex items-start justify-center mt-20 text-3xl font-serif">
        Welcome : {props.session.user.name || props.session.user.email}
      </div>
      {/* Section for add clients */}
      <FeedHeader />
      {/* Table of clients */}
      <Feed cases={parsedData} user={props.user}/>
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
  const client = await connectToDatabase();
  const user = await getUserDetails(client,session?.user.email);
  const response = !user.isJudge ? await getCase(client,session?.user.email): await getAllCases(client);
  const stringifiedData = JSON.stringify(response);

    return {
        props: {
            session,
            cases: stringifiedData,
        },
    };
}

export default Dashboard;
