import SignUp from '@/components/auth/SignUp';
import { getSession } from 'next-auth/react';
import { connectToDatabase, getUserDetails } from '@/helpers/db-utils';

import Head from 'next/head';

function SignUppage() {
  return (
    <>
      <Head>
        <title>SignUp!</title>
        <meta
          name="description"
          content="Adaalat: One step Solution to managing court hearings"
        />
      </Head>
      <SignUp />
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  console.log(session?.user);

  const client = await connectToDatabase();

  const user = await getUserDetails(client, session?.user.email);

  if (session) {
    if(user.isJudge){
      return {
        redirect: {
          destination: '/judge/dashboard',
          permanent: false,
        },
      };
    }
    else{
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false, 
        },
      };
    }
  }

  return {
    props: {},
  };
}

export default SignUppage;
