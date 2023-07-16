import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import User from "@models/user";
import { connectToDB } from "@utils/database";

import { DefaultSession } from "next-auth";

// console.log({
//     clientId: process.env.GOOGLE_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET
// })

// Module augmentation to add "id" property to the user session
declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
    } & DefaultSession["user"];
  }
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  session: {
    /* jwt: true */
  },
  callbacks: {
    async session({ session }) {
      // Find user in the database based on session email
      const sessionUser = await User.findOne({
        email: session?.user?.email,
      });

      // Set "id" property of session user to the user's ID from the database
      session.user = {
        ...(session.user ?? {}),
        id: sessionUser?._id?.toString(),
      };

      return session;
    },
    async signIn({ profile }) {
      try {
        // connect to Database
        await connectToDB();

        // check if a user already exists
        const userExists = await User.findOne({
          email: profile?.email,
        });

        // if user does not exist, create a new user
        if (!userExists) {
          await User.create({
            email: profile?.email,
            username: profile?.name?.replace(" ", "").toLowerCase(),
            image: profile?.image,
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
