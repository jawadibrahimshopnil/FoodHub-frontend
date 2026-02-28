import { env } from "@/env";

const API_URL = env.BACKEND_URL; 

export const providerService = {
  
  getProviders: async function (revalidate = 3600) {
    try {
      console.log(`${API_URL}/providers`);
      const res = await fetch(`${API_URL}/providers`, {
        next: { 
          revalidate,
          tags: ["providers"] 
        }
      });

      if (!res.ok) {
        throw new Error("Failed to fetch providers");
      }

      const result = await res.json();

      console.log("featued resuilt",result);
      return { 
        data: result.data, 
        error: null
      };
    } catch (err) {
     
      return { 
        data: null, 
         error: { message: "Something Went Wrong" }
      };
    }
  }
};