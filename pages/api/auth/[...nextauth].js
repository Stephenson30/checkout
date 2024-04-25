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
        const { name, email, family_name, given_name, picture, iss } = profile;

        // console.log("name: ", profile);
        // console.log("email: ", email);

        try {
          await connectMongoDB();
          const userExists = await User.findOne({ email });

          if (!userExists) {
            const res = await fetch("http://localhost:3000/api/register", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name, email, family_name, given_name, picture, iss 
              }),
            });

            if (res.ok) {
              const data = await res.json();
              console.log(data);
              return account;
            } else {
              const errorData = await res.json();
              console.error("Registration error:", errorData);
            }

          }
          return true;
        } catch (error) {
          console.error("User creation error:", error);
        }

        // return true;
      }
      // return true; // Do different verification for other providers that don't have `email_verified`
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
