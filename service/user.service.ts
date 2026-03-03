import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { env } from "@/env";

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

};