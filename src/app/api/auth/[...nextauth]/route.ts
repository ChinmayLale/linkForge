// app/api/auth/[...nextauth]/route.ts
import { authOptions } from "./options"
import NextAuth from "next-auth/next"

// ✅ This will fix the error
const handler = NextAuth(authOptions)

export const GET = handler
export const POST = handler
