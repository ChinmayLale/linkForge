import { BASE_URL } from "@/Constants/Endpoints";
import axios from "axios";

const SignupWithGoogle = async ({ email, username, name, pfp }: { email: string, username: string, name: string, pfp: string }) => {
    try {
        if (!email || !username || !name || !pfp) {
            throw new Error("All fields are required");
        }

        const response = await axios.post(`${BASE_URL}/auth/signup`, {
            email,
            username,
            name,
            profilePic: pfp,
            provider: 'GOOGLE'
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        })

        return response;

    } catch (error) {
        console.error("Error during Google signup:", error);
        throw error;
    }
}


const signupWithEmail = async ({ email, username, password }: { email: string, username: string, password: string }) => {
    try {
        if (!email || !username || !password) {
            throw new Error("All fields are required");
        }

        const response = await axios.post(`${BASE_URL}/auth/signup`, {
            email,
            username,
            password,
            provider: 'CREDENTIALS'
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        })

        const { data } = response.data;
        console.log("-------------------------------------------------------------------------")
        console.log({ data })
        console.log("-------------------------------------------------------------------------")
        return data;
    } catch (error) {
        console.error("Error during email signup:", error);
        throw error;
    }
}


export { SignupWithGoogle, signupWithEmail }