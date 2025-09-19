import { userProfileService } from "@/Services/user/userProfile";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

const getUserProfileThunk = createAsyncThunk(
    'getUserProfile',
    async (username: string, { rejectWithValue }) => {
        try {
            const token = sessionStorage.getItem('token') || localStorage.getItem('token') || '';
            // console.log("Token retrieved from localStorage:", token);
            const response = await userProfileService.getUserProfileApi(username, token);
            console.log({ response })
            if (!response) {
                throw new Error('Failed to fetch user profile for this username');
            }
            return response;
        } catch (err) {
            const error = err as AxiosError;
            return rejectWithValue(error.response?.data);
        }
    }
)


export const userThunks = {
    getUserProfileThunk
};