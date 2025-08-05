import { BASE_URL } from "@/Constants/Endpoints";
import { loginProps } from "@/interfaces/auth/loginSignup";
import axios from "axios";




export const loginUserWithEmail = async (credentials: loginProps) => {
    try {
        credentials.provider = "CREDENTIALS"; // ✅ correct spelling

        const response = await axios.post(
            `${BASE_URL}/auth/login`, // Ensure this URL is correct
            credentials,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            }
        );

        console.log("✅ Login successful:");
        // console.log({ response });
        const { data } = response
        return data.data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("Error While Logging In:", error.message);
            throw new Error(error.message);
        } else {
            console.log("Unexpected error:", error);
            throw new Error("An unknown error occurred");
        }
    }
};

export const loginWithGoogle = async ({ email, name, pfp }: { email: string, name: string, pfp: string }) => {
    try {
        // console.log("Attempting to login with Google user:", { email, name, pfp });
        const response = await axios.post(
            `${BASE_URL}/auth/login`,
            { email, name, pfp, provider: "GOOGLE" }, // Ensure the provider is set correctly
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log("✅ Google login successful:");
        const { data } = response.data;
        return data;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("Error While Logging In with Google:", error.message);
            throw new Error(error.message);
        } else {
            console.log("Unexpected error:", error);
            throw new Error("An unknown error occurred");
        }


    }
}


