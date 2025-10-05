import { BASE_URL } from "@/Constants/Endpoints";
import axios from "axios";

export const checkUsernameAvailability = async (username: string): Promise<{ available: boolean; message?: string }> => {
    try {
        if (!username || username.trim() === "") {
            return { available: false, message: "Username cannot be empty" };
        }
        const response = await axios.get(`${BASE_URL}/auth/check-username`, {
            params: { username },
        })
        console.log({ response: response });
        const { data } = response.data;
        console.log("Is Username Availble : ", data);
        const { availble, message } = data;
        return { available: availble, message: message || availble ? "Username is available" : "Username is not available" };
    } catch (error) {
        console.log({ error });
        return { available: false, message: "An error occurred while checking username availability" };
    }
};