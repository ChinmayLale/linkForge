import { BASE_URL } from "@/Constants/Endpoints";
import { UpdateUserProfileInput } from "@/types";



import axios from "axios";



export const updateUserProfileService = async (data: UpdateUserProfileInput, token: string): Promise<boolean> => {
   try {
      const response = await axios.post(BASE_URL + "/user/profile", data, {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
         timeout: 10000,
      });

      // Check success flag in API response
      if (response.data?.success === true) {
         return true;
      }

      return false;
   } catch (error: Error | unknown) {
      if (axios.isAxiosError(error)) {
         console.error("API Error:", error.response?.data || error.message);
      } else {
         console.error("Unexpected Error:", error);
      }
      return false; // return false on any error
   }
};
