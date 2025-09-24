import { BASE_URL } from "@/Constants/Endpoints";
import axios from "axios";


const getUserProfileApi = async (username: string, token?: string) => {
    try {
        if (!username || username.trim() === "") {
            throw new Error("Username cannot be empty");
        }


        console.log("Token From Get User Profile:", token);

        const response = await axios.get(`${BASE_URL}/user/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const { data } = response.data;
        // console.log({ data })
        if (!data) {
            throw new Error('Failed to fetch user profile for this username');
        }
        return data;
    } catch (error) {
        console.error("Error fetching user profile:", error);
        console.log({ error })
        throw error;
    }
}



export const userProfileService = {
    getUserProfileApi
};
