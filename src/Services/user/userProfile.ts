import { BASE_URL } from "@/Constants/Endpoints";
import axios from "axios";


const getUserProfileApi = async (username: string, token?: string) => {
    try {
        // const token = localStorage.getItem('token') || '';
        console.log("Token from Params:", token);
        // if (!token) {
        //     throw new Error('User is not authenticated');
        // }


        const response = await axios.get(`https://linktree-backend-two.vercel.app/api/v1/user/profile`, {
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQzYzc4Y2FkLTNkZmYtNDkxMS1hYjMyLTg3ZjkyMDQ5N2YzOCIsImVtYWlsIjoidGVtcDFAZ21haWwuY29tIiwiaWF0IjoxNzU1MDIyMzY1LCJleHAiOjE3NTU2MjcxNjV9.ZmS_sxrLcCuo1r2B2SCpTJG_nPwQ3N2ZkdX3Gsy5taY`,
                'Content-Type': 'application/json'
            }
        });
        const { data } = response.data;
        console.log({ data })
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
