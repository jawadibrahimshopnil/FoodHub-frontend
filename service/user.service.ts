/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

const AUTH_URL = process.env.BACKEND_URL

export const userService = {
   registerUser : async (userData: Record<string, any>) => {
      try {
         const res = await fetch(`${AUTH_URL}/auth/register`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "origin": process.env.NEXT_PUBLIC_SITE_URl || "http://localhost:5000"
            },
            body: JSON.stringify({
               email: userData.email,
               password: userData.password,
               name: userData.name,
               role: userData.role,
            }),
         });
         const result = await res.json();
         console.log(result);
         return result;
      } catch (error) {
         console.log(error);
      }
   },
   
   loginUser : async (userData: Record<string, any>) => {
      try {
         const res = await fetch(`${AUTH_URL}/auth/login`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "origin": process.env.NEXT_PUBLIC_SITE_URl || "http://localhost:5000"
            },
            credentials: "include",
            body: JSON.stringify(userData),
         });
         
      const result = await res.json();
      return result;

      } catch (error) {
         console.log(error);
      }
   },

   getUser : async () => {
      const storeCookie = await cookies();
      const token = storeCookie.get("token")?.value;
      let decodedData = null;
      if (token) {
         decodedData = await jwtDecode(token);
         return decodedData;
      } else {
         return null;
      }
   },

   getAllUsers: async () => {
      try {
         const cookieStore = await cookies();
         const token = cookieStore.get("token")?.value;

         if (!token) {
            console.error("No auth cookie found");
            return { data: [], ok: false };
         }

         const res = await fetch(`${AUTH_URL}/users/all`, {
            method: "GET",
            headers: {
            Authorization: token,
            }
         });

         if (!res.ok) {
            console.error(`Failed to fetch users: ${res.status}`);
            return { data: [], ok: false };
         }

         const data = await res.json();
         return { data, ok: true };
      } catch (error) {
         console.error("Get all users error:", error);
         return { data: [], ok: false };
      }
   },

   userLogOut : async () => {
      const storeCookie = await cookies();
      storeCookie.delete("token");
   }
};