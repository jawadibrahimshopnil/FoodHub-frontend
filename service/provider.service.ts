import { env } from "@/env";

const API_URL = env.BACKEND_URL; 

export const providerService = {
  
  getProviders: async function (revalidate = 3600) {
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
    },

  
  getProviderById: async function (id: string, revalidate = 60) {
    try {
      const res = await fetch(`${API_URL}/providers/${id}`, {
        method: 'GET',
        headers: {
          'Origin': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:5000',
        },
        next: { 
          revalidate,
          tags: [`provider-${id}`] 
        }
      });

      if (!res.ok) {
        if (res.status === 404) throw new Error("Kitchen not found");
        throw new Error(`Status: ${res.status}`);
      }

      const result = await res.json();
      
     
      return { data: result.data, error: null };
    } catch (err) {
      
      return { data: null, error: {message:  "Failed to load kitchen menu" } };
    }
  
   }
}