import { MongoClient, ObjectID } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;

export async function connectToDatabase() {
  const client = await MongoClient.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return client;
}

export async function getAllLawyerProfiles(client) {
  const db = client.db();

  const documents = await db.collection('lawyersList').find().toArray();
  return documents;
}

export async function getLawyerProfile(client, id) {
  const db = client.db();

  const lawyerProfile = await db.collection('lawyersList').findOne({
    bar_council_id: id,
  });

  return lawyerProfile;
}

export async function getLawyerId(client, id) {
  const db = client.db();
  const lawyerProfile = await db.collection('lawyersList').findOne({
    bar_council_id: id
  });
  return lawyerProfile;
}

export async function getUserDetails(client, email){
  const db = client.db();

  const user = await db.collection('User').findOne({
    email: email,
  })

  return user;
}

export async function getCase(client, email){
  const db = client.db();

  const user = await db.collection('cases').find({
    email: email,
  }).toArray();

  return user;
}

export async function getAllCases(client){
  const db = client.db();

  const user = await db.collection('cases').find({
    Country: "India"
  }).toArray();

  return user;
}
