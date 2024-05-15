import SignUp from '@/components/auth/SignUp';
import { getSession } from 'next-auth/react';

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

  if (session) {
    if(session.user.isJudge){
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
