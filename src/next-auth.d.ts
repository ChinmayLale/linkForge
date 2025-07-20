// types/next-auth.d.ts
import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
    interface Session {
        user: {
            id: string
            name?: string | null
            email?: string | null
            image?: string | null
        }
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
    }
}