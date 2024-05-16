import React from 'react';
import AddCase from '@/components/AddCase';
import { connectToDatabase, getAllLawyerProfiles, getUserDetails } from '@/helpers/db-utils';
import { getSession } from 'next-auth/react';
import toast from 'react-hot-toast';

import Head from 'next/head';

function AddCases(props) {
  const { lawyerNames } = props;
  const parsedData = JSON.parse(lawyerNames);
  return (
    <>
      <Head>
        <title>Register Case</title>
        <meta
          name="description"
          content="Adaalat: One step Solution to managing court hearings"
        />
      </Head>
      <AddCase names={parsedData} />
    </>
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
  const data = await getAllLawyerProfiles(client);
  const user = await getUserDetails(client, session?.user.email);

  if(user.isJudge){
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false, 
      },
    };
  }

  const lawyerNames = data.map((item) => ({
    name: item.name,
  }));

  const stringifiedData = JSON.stringify(lawyerNames);

  return {
    props: {
      lawyerNames: stringifiedData,
    },
  };
}

export default AddCases;
