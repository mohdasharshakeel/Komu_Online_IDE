import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import authConfig from "./auth.config";
import { create } from "domain";

export const { handlers, auth, signIn, signOut } = NextAuth({

  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user || !account) return false;

      const existingUser = await db.user.findUnique({
        where:{email : user.email}
      })

      if (!existingUser) { 
        const newUser = await db.user.create({
          data: {
            email: user.email!,
            name: user.name,
            image : user.image,
            account: {
              create: {
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                refreshToken: account.refresh_token,
                access_token: account.access_token,
                expiresAt: account.expires_at,
                tokenType: account.token_type,
                scope: account.scope,
                isToken: account.is_token,
                sessionState: account.session_state 

              }
            }
          }
        })

        if (!newUser) return false;
        
      }
     }
   }, 

  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  ...authConfig,
});
