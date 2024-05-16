import { MongoClient, ObjectID } from 'mongodb';

// const username = process.env.MONGODB_USERNAME;
// const password = process.env.MONGODB_PASSWORD;
// const cluster = process.env.MONGODB_CLUSTER;
// const database = process.env.MONGODB_DATABASE;

// const MONGODB_URI = `mongodb+srv://${username}:${password}@${cluster}.3svps.mongodb.net/${database}?retryWrites=true&w=majority`;

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

  const user = await db.collection('cases').find({}).toArray();

  return user;
}
