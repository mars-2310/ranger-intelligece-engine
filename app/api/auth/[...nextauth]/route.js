import { prismaClient } from "../../../lib/db/db.js";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt"
  },

  callbacks: {
    async signIn({ user, account }) {
      if (!user?.email) return false;

      try {
        await prismaClient.ranger.upsert({
          where: { email: user.email },
          update: {},
          create: {
            email: user.email,
            callSign: user.name || user.email.split("@")[0],
            color: "GREEN",
          }
        });
      } catch (e) {
        console.error("Error saving ranger:", e);
        return false;
      }

      return true;
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.email = user.email;
        token.provider = account?.provider || "google";
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email;
        session.user.provider = token.provider;
      }
      session.jwt = token;
      return session;
    }
  }
});

export { handler as GET, handler as POST };
