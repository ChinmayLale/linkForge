import axios from "axios";
import { BASE_URL } from "@/Constants/Endpoints";
import { LinkItem, LinkType } from "@/types";

export const addUserLinksService = async (data: LinkItem[], token: string) => {
   try {
      const typeMapping: Record<string, LinkType> = {
         'link': 'default',
         'image': 'default',
         'social': 'social',
         'music': 'music',
         'video': 'video',
         'contact': 'contact',
         'event': 'event',
         'gallery': 'gallery',
         'default': 'default'
      };

      const mappedLinks: LinkItem[] = data.map(link => ({
         ...link,
         type: typeMapping[link.type] || 'default' as LinkType, // Cast to LinkType
      }));

      const filteredLinks: LinkItem[] = mappedLinks.filter((link) => {
         return link.id.startsWith('temp_');
      });

      const response = await axios.post(`${BASE_URL}/link/add`, { links: filteredLinks }, {
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
         },
      });
      return response.data;
   } catch (error) {
      console.error("Error adding user link:", error);
      throw error;
   }
};