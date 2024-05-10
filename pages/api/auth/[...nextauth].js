import { verifyPassword } from '@/helpers/auth-utils';
import { connectToDatabase } from '@/helpers/db-utils';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const client = await connectToDatabase();
        const usersCollection = client.db().collection('User');

        // find user if exists
        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();
          throw new Error('No user found!');
        }

        // compare passwords
        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error('Invalid password!');
        }

        client.close();

        const name = user.firstName + ' ' + user.lastName;

        return {
          email: user.email,
          name: name,
        };
      },
    }),
    {
      Google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      },
    },
  ],
});
