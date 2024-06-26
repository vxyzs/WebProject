import { connectToDatabase } from "@/helpers/db-utils";

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    const {
      Case_Type,
      Case_desciption,
      Lawyer_Name,
      Address,
      City,
      Country,
      Postal_Code,
      Court_Type,
      uid,
      email,
    } = data;

    // console.log("uuuuuuuuuuuuuuuuuuuuuuiiiiiiiiiiiiiiiiiiiiiddddddddddddd" ,uid);
    // console.log(data);

        const client = await connectToDatabase();
        const db = client.db();

    const result = await db.collection('cases').insertOne({
      Case_Type,
      Case_desciption,
      Lawyer_Name,
      Address,
      City,
      Country,
      Postal_Code,
      Hearing_Date: "Not Assigned",
      Court_Type,
      uid,
      email,
      status:"pending"
    });

    res.status(201).json({ message: 'Successfully created case!', result });
    client.close();
  }


}

export default handler;
