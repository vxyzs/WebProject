import { useSession } from "next-auth/react";

function Userprofile() {
  return <div>User profile</div>;
}

export async function getServerSideProps(context) {
  const { data: session} = useSession();
  // checks for the incoming request and sees whether a session token is available or not and accordingly takes action

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false, // if we want to permanently redirect to auth page or not ?
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
