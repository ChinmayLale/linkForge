import axios from "axios";
import { BASE_URL } from "@/Constants/Endpoints";
import { ChartData } from "@/types";

export const getGraphDataService = async (token: string): Promise<ChartData[]> => {
   if (!token) return [];

   try {
      const response = await axios.get(`${BASE_URL}/link/analytics/get-graph`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
      console.log({ response });
      const { data } = response.data;
      console.log({ data });
      if (!data) return [];

      return data;
   } catch (error) {
      console.error("Error fetching graph data:", error);
      return [];
   }
};
