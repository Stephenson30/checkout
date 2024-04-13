import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    // ...add more providers here
  ],

  callbacks: {
    async signIn({ account, profile }) {
      // console.log("User: ", profile);

      if (account.provider === "google") {
        const { name, email, family_name, given_name, picture } = profile;
        

        // console.log("name: ", name);
        // console.log("email: ", email);

        try {
          await connectMongoDB();
          const userExists = await User.findOne({ email });

          if (!userExists) {
            await User.create({
              name,
              email,
              family_name,
              given_name,
              picture,
            });

            console.log("User registered");
          } 
          return true; 
        } catch (error) {
          console.error("User creation error:", error);
        }

        return true;
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: process.env.NEXTAUTH_URL,
  },
};

export default NextAuth(authOptions);