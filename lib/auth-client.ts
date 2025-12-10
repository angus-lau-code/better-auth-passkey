import { createAuthClient } from "better-auth/react";
import { passkeyClient } from "@better-auth/passkey/client";
import { inferAdditionalFields } from "better-auth/client/plugins";

import { auth } from "./auth";

export const authClient = createAuthClient({
  plugins: [passkeyClient(), inferAdditionalFields<typeof auth>()],
});

export type Session = typeof authClient.$Infer.Session;
