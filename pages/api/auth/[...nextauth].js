import { verifyPassword } from '@/helpers/auth-utils';
import { connectToDatabase } from '@/helpers/db-utils';
import User from '@/models/users';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';

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
  // callbacks: {
  //   async session({ session }) {
  //     const sessionUser = await User.findOne({
  //       email: session.user.email
  //     });

  //     session.user.id = sessionUser._id.toString();
  //     return session;
  //   },
  //   async signIn({email, password}) {
  //     console.log(email);
  //     try {
  //       await connectToDatabase(); // Assuming this is correct
  //       const userExists = await User.findOne({
  //         email: email
  //       });

  //       if (!userExists) {
  //         await User.create({
  //           email: email,
  //           password: password,
  //         });
  //       }
  //       return true;
  //     } catch (error) {
  //       console.error('Error during sign-in:', error);
  //       return false;
  //     }
  //   },
  // },
});
