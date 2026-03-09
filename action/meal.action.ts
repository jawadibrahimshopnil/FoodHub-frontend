"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const BACKEND_URL = process.env.BACKEND_URL;

export const createMealAction = async (data: {
  name: string;
  description: string;
  price: number;
  photoUrl: string;
  categoryIds: string;
  cuisine?: string;
  dietaryIds?: string;
}) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const res = await fetch(`${BACKEND_URL}/meals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token!,
      },
      body: JSON.stringify({
         ...data,
         dietaryIds: [data.dietaryIds],
         categoryIds: [data.categoryIds],
      }),
    });

    const result = await res.json();
    if (res.ok) {
      revalidatePath("/provider-dashboard/menu-management");
      return { success: true, message: "Meal added to kitchen registry." };
    }
    return { success: false, message: result.message || "Failed to create meal." };
  } catch (err) {
    return { success: false, message: "Connection to central server failed." };
  }
};