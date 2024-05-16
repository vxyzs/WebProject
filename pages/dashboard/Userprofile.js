import { useSession, getSession } from "next-auth/react";

function Userprofile() {
  return <div>User profile</div>;
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

  return {
    props: {
      session,
    },
  };
}

export default Userprofile;
