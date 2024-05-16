import { connectToDatabase } from '@/helpers/db-utils';

async function handler(req, res) {
  if (req.method === 'PATCH') {
    const data = req.body;
  
    const {
        uid,
      Hearing_Date,
      email,
    } = data;


    const client = await connectToDatabase();
    const db = client.db();
    let result = await db.collection('cases').findOneAndUpdate({uid}, {"$set":{Hearing_Date, status:"Pending but Assigned"}})
   

    res.status(201).json({ message: 'Successfully updated case!', result });
    client.close();
  }

  
}

export default handler;
