import DisplayCaseDetails from '@/components/DisplayCaseDetails';
import { connectToDatabase, getUserDetails } from '@/helpers/db-utils';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import toast from 'react-hot-toast';
import { useState } from 'react';


function CaseDetailsPage(props) {
  const parsedFees = JSON.parse(props.fees);
  const parsedData = JSON.parse(props.caseDetail);
  const parsedUserType = JSON.parse(props.user);
  const router = useRouter();

  async function deleteHandler(uid) {
    const response = await fetch('/api/case/deletecase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uid),
    });

    const data = await response.json();
    console.log(data);
    router.replace('/dashboard');

    return data;
  }

  return (
    <>
      <Head>
        <title>Case No : {parsedData.uid}</title>
        <meta
          name="description"
          content="Adaalat: One step Solution to managing court hearings"
        />
      </Head>
      <DisplayCaseDetails
        caseDetail={parsedData}
        delete={deleteHandler}
        fees={parsedFees}
        userType={parsedUserType}
      />
    </>
  );
}

export async function getServerSideProps(context) {
  const caseId = context.params.caseId;
 
 
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
  const db = client.db();
  const user = await getUserDetails(client, session?.user.email);
  const response = await db.collection('cases').findOne({ uid: caseId });
  const stringifiedData = JSON.stringify(response);

  const parsedData = JSON.parse(stringifiedData);

  if (session.user.email !== parsedData.email && !user.isJudge) {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }

  const feeResponse = await db
    .collection('lawyersList')
    .findOne({ name: parsedData.Lawyer_Name });
  console.log(feeResponse);
  const stringifyFee = feeResponse.fees;

  return {
    props: {
      caseDetail: stringifiedData,
      fees: stringifyFee,
      user: user.isJudge,
    },
  };
}

export default CaseDetailsPage;
