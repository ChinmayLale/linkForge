import { BASE_URL } from "@/Constants/Endpoints";
import axios from "axios";

export const deleteUserLinkService = async (linkId: string, token: string): Promise<boolean> => {
   try {
      if (linkId.startsWith('temp_')) return true
      const response = await axios.delete(`${BASE_URL}/link/delete?linkId=${linkId}`, {
         headers: {
            Authorization: `Bearer ${token}`,
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