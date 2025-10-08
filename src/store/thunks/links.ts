import { getGraphDataService } from "@/Services/links/getGraphData.service";
import { getUserLinksService } from "@/Services/links/getUserLinks.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";



const getAllUserLinkThunk = createAsyncThunk(
   "getAllUserLinkThunk",
   async ({ token }: { token: string }, { rejectWithValue }) => {
      try {
         if (!token) throw new Error("No token found");
         const response = await getUserLinksService(token);
         if (!response) throw new Error("Failed to fetch user profile for this username");
         return response;
      } catch (err) {
         const error = err as AxiosError;
         return rejectWithValue(error.response?.data);
      }
   }
)


const getViewsVsClickGraphDataThunk = createAsyncThunk(
   "getViewsVsClickGraphDataThunk",
   async ({ token }: { token: string }, { rejectWithValue }) => {
      try {
         if (!token) throw new Error("No token found");

         console.log("inside Thunk With Token");
         const response = await getGraphDataService(token);
         if (!response) throw new Error("Failed to fetch user profile for this username");
         return response;
      } catch (err) {
         const error = err as AxiosError;
         return rejectWithValue(error.response?.data);
      }
   }
)



export const linksThunks = {
   getAllUserLinkThunk,
   getViewsVsClickGraphDataThunk
}

