import { BASE_URL } from "@/Constants/Endpoints";
import axios from "axios";

export const addViewsToLinkService = async (username: string) => {
   try {
      if(!username || username.trim() === "") {
         throw new Error("Username cannot be empty");
      }
      const response = await axios.post(`${BASE_URL}/link/analytics/add-views`, { username });
      const { data } = response.data;
      return data;
   } catch (error) {
      console.error("Error adding views to link:");
      console.log({ error });
      throw error;
   }
}