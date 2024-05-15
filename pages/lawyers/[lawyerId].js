import {
  connectToDatabase,
  getAllLawyerProfiles,
  getLawyerId,
} from '@/helpers/db-utils';
import LawyerDetails from '@/components/LawyerDetails';

import Head from 'next/head';

function LawyerProfile(props) {
  const { profile } = props;
  console.log("proofffffffffffffffffffile");
  console.log(profile);
  const parsedProfile = JSON.parse(profile);
  const lawyerName = parsedProfile.name;

  return (
    <>
      <Head>
        <title>Profile: {lawyerName}</title>
        <meta
          name="description"
          content="Adaalat: One step Solution to managing court hearings"
        />
      </Head>
      <LawyerDetails lawyer={parsedProfile} />
    </>
  );
}

export async function getStaticProps(context) {
  const lawyerId = context.params.lawyerId;
// console.log("LAWYERRRRRRRRRRRRRRRRRR IIIIIIIIIIIIIIIFDDDDDDDDDD", lawyerId);
  const client = await connectToDatabase();

  const profile = await getLawyerId(client, lawyerId);
  console.log("ttyyyyyyyyyyyyyyypppppppppppeeee ", typeof(lawyerId));
  const data = JSON.stringify(profile);
  // console.log("daaaaaaattttttttttttttttaaaaaaaaa" );
  console.log(data);

  return {
    props: {
      profile: data,
    },
  };
}

export async function getStaticPaths() {
  const client = await connectToDatabase();

  const profiles = await getAllLawyerProfiles(client);
  // console.log(profiles);
  const paths = profiles.map((p) => ({
  
    params: { lawyerId: p.bar_council_id.toString() },
  }));
// console.log("paths " , paths);
  return {
    paths: paths,
    fallback: 'blocking',
  };
}

export default LawyerProfile;
