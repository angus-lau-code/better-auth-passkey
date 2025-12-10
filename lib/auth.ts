import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { passkey } from "@better-auth/passkey";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  user: {
    additionalFields: {
      initialized: {
        type: "boolean",
        default: true,
        required: true,
        input: true,
      },
    },
  },
  socialProviders: {
    microsoft: {
      clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID!,
      clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
      issuer: process.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER,
      mapProfileToUser: (profile) => {
        return {
          email: profile.preferred_username || profile.email,
        };
      },
      prompt: "select_account",
    },
  },
  plugins: [passkey()],
});
