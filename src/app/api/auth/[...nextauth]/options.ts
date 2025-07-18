import { loginUserWithEmail } from "@/Services/auth/Login";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginProps, LoginResponse } from "@/interfaces/auth/loginSignup";
import { toast } from "sonner";
// import { NextApiRequest } from "next";
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",

            credentials: {
                username: { label: "Username", type: "text", placeholder: "abc@gmail.com" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials, req): Promise<LoginResponse | null> {
                console.log({ req })
                try {
                    const res = await loginUserWithEmail(credentials as loginProps) as LoginResponse | null;
                    if (res) {
                        console.log("User Logged In:", res);
                        return {
                            id: res.id,
                            username: res.username,
                            email: res.email,
                            token: res.token, // add custom token field
                        };
                    } else {
                        console.log("Login Failed: Invalid credentials");
                        toast.error("Invalid username or password");
                        return null;
                    }
                } catch (error: unknown) {
                    if (error instanceof Error) {
                        console.log("Error While Logging In:", error.message);
                        throw new Error(error.message);
                    } else {
                        console.log("Unexpected error:", error);
                        throw new Error("An unknown error occurred");
                    }
                }
            },
        })
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
        error: "/auth/error", // Error code passed in query string as ?error=
    }
}