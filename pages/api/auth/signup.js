import { hashPassword } from '@/helpers/auth-utils';
import { connectToDatabase } from '@/helpers/db-utils';

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    const { email, password, firstName, lastName, isJudge } = data;

    // server side validation
    if (
      !email ||
      !email.includes('@') ||
      !password ||
      password.trim().length < 7
    ) {
      res.status(422).json({
        message:
          'Invalid Input - password has to be atleast 7 characters long!',
      });
      return;
    }

    // connect database
    const client = await connectToDatabase();

    const db = client.db();

    //checks if user already exists from MongoDb
    const existingUser = await db.collection('User').findOne({ email: email });
    if (existingUser) {
      res.status(422).json({ message: 'User already exists!' });
      client.close();
      return;
    }

    // hash password using bcrypt
    const hashedPassword = await hashPassword(password);

    // create user
    const result = await db.collection('User').insertOne({
      email: email,
      password: hashedPassword,
      firstName,
      lastName,
      isJudge
    });

    res.status(201).json({ message: 'Created User!!', result });
    client.close();
  }
}

export default handler;
