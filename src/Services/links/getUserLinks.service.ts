import axios from "axios";
import { LinkItem } from "../../types"; // adjust path if needed
import { BASE_URL } from "@/Constants/Endpoints";



export const getUserLinksService = async (token: string): Promise<LinkItem[]> => {
   try {
      const response = await axios.get(`${BASE_URL}/link/all`, {
         headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
         },
      });

      console.log("User links fetched successfully:");
      console.log({ resData: response.data });
      if (response.data.success) {

         return response.data.data as LinkItem[];
      } else {
         console.error("Failed to fetch links:", response.data.message);
         return [];
      }
   } catch (error: unknown) {
      if (error instanceof Error) {
         console.error("Error fetching user links:", error.message);
      } else {
         console.error("Unknown error fetching user links:", error);
      }
      return [];
   }
};
