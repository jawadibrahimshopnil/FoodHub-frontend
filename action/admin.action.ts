"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const BACKEND_URL = process.env.BACKEND_URL

export const updateUserStatusAction = async (userId: string, newStatus: string) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return { success: false, message: "Authentication cookie not found" };
    }


    const res = await fetch(`${BACKEND_URL}/users/${userId}`, {
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": token 
      },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return { 
        success: false, 
        message: errorData?.message || `Backend rejected the update (${res.status})` 
      };
    }

   
    revalidatePath("/admin-dashboard/users"); 
    
    return { success: true, message: `User status updated to ${newStatus}` };
  } catch (err) {
    console.error("Action Error:", err);
    return { success: false, message: "Connection to server failed" };
  }
};