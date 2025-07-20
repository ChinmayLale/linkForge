// linktree/src/types/next-auth.d.ts
import { DefaultSession } from "next-auth";
declare module "next-auth" {
    interface Session {
        user: {
            id: string
            name?: string | null
            email?: string | null
            image?: string | null
        } & DefaultSession["user"];
        username?: string
        customToken?: string
    }

    interface User {
        id: string
        username?: string
        email?: string
        token?: string
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id?: string
        username?: string
        customToken?: string
        email?: string
    }
}
