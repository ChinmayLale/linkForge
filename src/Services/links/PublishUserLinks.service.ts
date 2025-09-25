import { BASE_URL } from "@/Constants/Endpoints";
import axios from "axios";

export const publishUserLinks = async (token: string): Promise<boolean> => {
   try {
      const response = await axios.post(`${BASE_URL}/link/publish`, {}, {
         headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
         },
      });
      const { data } = response.data;
      return data;
   } catch (error) {
      console.error("Error deleting link:", error);
      return false;
   }
};