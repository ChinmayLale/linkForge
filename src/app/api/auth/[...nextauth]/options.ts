import { loginUserWithEmail, loginWithGoogle } from "@/Services/auth/Login";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { loginProps, LoginResponse } from "@/interfaces/auth/loginSignup";
import { toast } from "sonner";
import type { NextAuthOptions } from "next-auth";
import { Session } from "next-auth";
import { signupWithEmail } from "@/Services/auth/Signup";

interface User {
    id: string;
    username?: string;
    email?: string | null;
    name?: string | null;
    image?: string | null;
    token?: string;
}

interface Account {
    provider: string;
    type: string;
}

interface Profile {
    email?: string;
    name?: string;
}

interface GoogleProfile extends Profile {
    sub: string;
    name: string;
    email: string;
    picture: string;
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "email", placeholder: "abc@gmail.com" },
                password: { label: "password", type: "password" },
                provider: { label: "Provider", type: "hidden", value: "CREDENTIALS" },
                username: { label: "username", type: "text", placeholder: "Enter your username" }
            },
            async authorize(credentials, req) {
                try {
                    if (!credentials?.email || !credentials?.password) {
                        console.log("Missing credentials: email or password is empty");
                        return null;
                    }

                    credentials.provider = "CREDENTIALS";
                    let res;
                    if (credentials.username && credentials.username.trim() !== "") {
                        res = await signupWithEmail({ email: credentials.email, password: credentials.password, username: credentials.username });
                    } else {
                        res = await loginUserWithEmail(credentials as loginProps) as LoginResponse | null;
                    }
                    console.log("Login Response in Authorize fun");
                    console.log({ res });
                    if (res) {
                        return {
                            id: res.id,
                            name: res.username,
                            email: res.email ?? undefined,
                            username: res.username,
                            token: res.token,
                            avatarUrl: res.avatarUrl || `https://avatar.iran.liara.run/username?username=${res.username}`,
                            createdAt: res.createdAt,
                            updatedAt: res.updatedAt,
                            tags: res.tags || [],
                            totalClicks: res.totalClicks || 0,
                            totalLinks: res.totalLinks || 0,
                            ctr: res.ctr || 0,
                        };
                    } else {
                        console.log("Login Failed: Invalid credentials");
                        credentials.provider = "CREDENTIALS";
                        return null;
                    }
                } catch (error: unknown) {
                    if (error instanceof Error) {
                        console.log("Error While Logging In:", error.message);
                    } else {
                        console.log("Unexpected error:", error);
                    }
                    return null;
                }
            }
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            profile(profile: GoogleProfile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    username: "",
                    token: profile.sub,
                };
            },
        })
    ],

    session: {
        strategy: "jwt",
    },

    pages: {
        signIn: "/login",
        error: "/auth/error", // Custom error page
    },

    callbacks: {
        async jwt({
            token,
            account,
            // profile,
            user
        }: {
            token: JWT;
            account: Account | null;
            profile?: Profile;
            user?: User;
        }): Promise<JWT> {
            console.log("🔧 JWT Callback triggered:");

            // Handle Google login
            if (user && account?.provider === "google") {
                console.log("🌐 Processing Google login");

                try {
                    const userFromBackend = await loginWithGoogle({
                        email: user.email || "",
                        name: user.name || "",
                        pfp: user.image || ""
                    }) as LoginResponse | null;

                    // console.log({ userFromBackend });

                    if (!userFromBackend) {
                        console.log("Google login failed: User not found in backend");

                        // Store user info for potential signup
                        token.pendingGoogleUser = {
                            email: user.email || "",
                            name: user.name || "",
                            image: user.image || ""
                        };
                        token.needsSignup = true;
                        token.error = "USER_NOT_FOUND";

                        // Don't return early - let the token be created so we can handle in session callback
                        return token;
                    }

                    // Successful login
                    token.id = userFromBackend.id;
                    token.username = userFromBackend.username;
                    token.picture = userFromBackend.avatarUrl || `https://avatar.iran.liara.run/username?username=${userFromBackend.username}`;
                    token.customToken = userFromBackend.token;
                    token.email = userFromBackend.email ?? undefined;
                    token.token = userFromBackend.token;
                    token.needsSignup = false;

                } catch (error) {
                    console.error("Error during Google login:", error);
                    token.error = "GOOGLE_LOGIN_ERROR";
                    token.needsSignup = true;
                }
            }

            // Handle credentials login
            if (account?.provider === "credentials" && user) {
                console.log("🔐 Processing credentials login");
                token.id = user.id;
                token.username = user.username;
                token.email = user.email ?? undefined;
                token.customToken = user.token;
                token.token = user.token;
                token.needsSignup = false;
            }

            // console.log("🏁 Final token:", { token });
            return token;
        },

        async session({ session, token }: { session: Session; token: JWT }) {
            console.log("🔄 Session Callback triggered:");

            if (token) {
                // Add error information to session
                session.error = token.error as string;
                session.needsSignup = token.needsSignup as boolean;
                session.pendingGoogleUser = token.pendingGoogleUser as any;

                // Only set user data if login was successful
                if (!token.needsSignup) {
                    session.user.id = token.id as string;
                    session.user.email = token.email as string;
                    session.user.name = token.username as string;
                    session.username = token.username;
                    session.customToken = token.customToken;
                }

                console.log("🎯 Session updated");
            }
            return session;
        },

        async redirect({ url, baseUrl }) {
            // Custom redirect logic
            // console.log("Redirect callback:", { url, baseUrl });

            // If redirecting back to the app after OAuth
            if (url.startsWith(baseUrl)) {
                return url;
            }

            return baseUrl;
        }
    }
};