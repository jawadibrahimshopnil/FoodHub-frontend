import { env } from "@/env";

const API_URL = env.BACKEND_URL; 

export const providerService = {
  
  getProviders: async function (revalidate = 1) {
    try {
      console.log(`${API_URL}/providers`);
      const res = await fetch(`${API_URL}/providers`, {
        method: 'GET',
        headers: {
          'Origin': process.env.NEXT_PUBLIC_SITE_URL! ,
        },
        next: { 
          revalidate,
          tags: ["providers"] 
        }
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Backend Response Error:", errorText);
        throw new Error(`Status: ${res.status}`);
      }

      const result = await res.json();

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