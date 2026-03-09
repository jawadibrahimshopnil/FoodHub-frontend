"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const BACKEND_URL = process.env.BACKEND_URL;

export const updateProviderProfileAction = async (formData: {
  name: string;
  address: string;
  phone: string;
  photoUrl: string;
}) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const res = await fetch(`${BACKEND_URL}/providers`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token!
      },
      body: JSON.stringify(formData),
    });

    const result = await res.json();

    if (res.ok && result.success) {
      revalidatePath("provider-dashboard/kitchen-profile");
      return { success: true, message: result.message };
    }

    return { success: false, message: result.message || "Failed to update profile" };
  } catch (err) {
    console.error("UPDATE_PROFILE_ERROR:", err);
    return { success: false, message: "Internal Server Error" };
  }
};