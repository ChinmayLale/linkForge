import { userProfileService } from "@/Services/user/userProfile";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";


const getUserProfileThunk = createAsyncThunk(
    "getUserProfile",
    async ({ username, token }: { username: string; token: string }, { rejectWithValue }) => {
        try {
            if (!token) throw new Error("No token found");
            const response = await userProfileService.getUserProfileApi(username, token);
            if (!response) throw new Error("Failed to fetch user profile for this username");
            return response;
        } catch (err) {
            const error = err as AxiosError;
            return rejectWithValue(error.response?.data);
        }
    }
);


export const userThunks = {
    getUserProfileThunk
};