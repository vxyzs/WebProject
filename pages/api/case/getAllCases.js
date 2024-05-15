import { connectToDatabase } from "@/helpers/db-utils";

async function handler(req, res) {
    const client = await connectToDatabase();
    const db = client.db();

    const result = await db.collection("cases").find({ country: "India" });

    res.status(200).json({
        message: "Successfully retrieved all cases",
        result,
    });
    client.close();
}

export default handler;
