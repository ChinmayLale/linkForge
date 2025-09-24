import { BASE_URL } from "@/Constants/Endpoints";
import { ThemeSettings } from "@/types";
import axios from "axios";



export const getAllThemesService = async (token: string): Promise<ThemeSettings[]> => {
   try {
      // add token in get request
      const response = await axios.get(`${BASE_URL}/theme`, {
         headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
         },
      });

      console.log("User Themes fetched successfully:");
      // console.log({ resData: response.data });
      const { data }: { data: ThemeSettings[] } = response.data

      return data;
   } catch (error) {
      console.error("Error fetching user profile:", error);
      console.log({ error })
      return [];
   }
}