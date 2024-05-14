import Feed from "@/components/Feed";
import FeedHeader from "@/components/FeedHeader";
import { connectToDatabase } from "@/helpers/db-utils";
import { getSession, signOut, useSession } from "next-auth/react";

import Head from "next/head";

function Dashboard(props) {
    const { cases } = props;
    const parsedData = JSON.parse(cases);

    return (
        <div>
            <Head>
                {/* <title>Dashboard: {props.session.user.email}</title> */}
                <meta
                    name="description"
                    content="Adaalat: One step Solution to managing court hearings"
                />
            </Head>
            <div className="flex items-center justify-center mt-20 text-3xl">
                Welcome :{" "}
                {props.session.user.firstName +
                    " " +
                    props.session.user.lastName}
            </div>
            {/* Section for add clients */}
            <FeedHeader />
            {/* Table of clients */}
            <Feed cases={parsedData} />
        </div>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req });
    // checks for the incoming request and sees whether a session token is available or not and accordingly takes action

    if (!session) {
        return {
            redirect: {
                destination: "/auth",
                permanent: false, // if we want to permanently redirect to auth page or not ?
            },
        };
    }

    const client = await connectToDatabase();
    const db = client.db();
    console.log(db);
    const cases = await db.collection("cases").find().toArray();
    const stringifiedCases = JSON.stringify(cases);

    return {
        props: {
            session,
            cases: stringifiedCases,
        },
    };
}

export default Dashboard;
