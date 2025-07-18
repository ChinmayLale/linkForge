import { loginProps, LoginResponse } from "@/interfaces/auth/loginSignup";
import axios from "axios";




export const loginUserWithEmail = async (credentials: loginProps): Promise<LoginResponse | null> => {
    try {
        console.log("Inside loginUserWithEmail Attempting to login with credentials:", credentials);
        const response = await axios.post<LoginResponse>(
            'https://dummyjson.com/auth/login',
            credentials,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log("✅ Login successful:", response.data);
        return response.data;
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

