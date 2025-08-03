import { BASE_URL } from "@/Constants/Endpoints";
import axios from "axios";



const getUserProfileApi = async (username: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/user/${username}`);
        const { data } = response.data;
        // console.log({ data })
        if (!data) {
            throw new Error('Failed to fetch user profile for this username');
        }
        return data;
    } catch (error) {
        console.error("Error fetching user profile:", error);
        throw error;
    }
}



export const userProfileService = {
    getUserProfileApi
};
