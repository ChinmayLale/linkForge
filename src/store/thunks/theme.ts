import { getAllThemesService } from "@/Services/Theme/getAllThemes.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";




const getAllThemesThunk = createAsyncThunk(
   "getAllThemesThunk",
   async ({ token }: { token: string }, { rejectWithValue }) => {
      try {
         if (!token) throw new Error("No token found");
         const response = await getAllThemesService(token);
         if (!response) throw new Error("Failed to fetch user profile for this username");
         return response;
      } catch (err) {
         const error = err as AxiosError;
         return rejectWithValue(error.response?.data);
      }
   }
);



export const themeThunks = {
   getAllThemesThunk
}