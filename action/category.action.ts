"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const BACKEND_URL = process.env.BACKEND_URL;

export const createCategoryAction = async (payload: { name: string; }) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return { success: false, message: "Authentication cookie not found" };
    }

    const res = await fetch(`${BACKEND_URL}/categories`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": token 
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      return { 
        success: false, 
        message: errorData?.message || `Backend rejected (${res.status})` 
      };
    }

    revalidatePath("/admin-dashboard/post-categories"); 
    
    return { success: true, message: "Category created successfully!" };
  } catch (err) {
    console.error("Action Error:", err);
    return { success: false, message: "Connection to server failed" };
  }
};





export const getAllCategoriesAction = async () => {
  try {
    // 1. Grab the auth cookie from the browser
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const res = await fetch(`${BACKEND_URL}/categories`, {
      method: "GET",
      headers: {
        "Authorization": token!
      },
    });

    const result = await res.json();


    if (!res.ok) {
        console.log("Backend Error Status:", res.status);
    }

    if (res.ok && result.success) {
      return result.data; 
    }
    return [];
  } catch (err) {
    console.error("GET_CATEGORIES_ERROR:", err);
    return [];
  }
};

export const deleteCategoryAction = async (id: string) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const res = await fetch(`${BACKEND_URL}/categories/${id}`, {
      method: "DELETE",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": token!
      },
    });

    if (!res.ok) {
      const errorResponse = await res.json().catch(() => ({}));
      console.error("DELETE_FAILED_STATUS:", res.status);
      console.error("BACKEND_RESPONSE:", errorResponse);
      return { success: false, message: errorResponse.message || "Unauthorized" };
    }

    revalidatePath("/admin-dashboard/category-list");
    return { success: true };
  } catch (err) {
    console.error("DELETE_ACTION_ERROR:", err);
    return { success: false, message: "Network connection error" };
  }
};




export const updateCategoryAction = async (id: string, payload: { name: string }) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(`${BACKEND_URL}/categories/${id}`, {
    method: "PATCH",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": token!
    },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    revalidatePath("/admin-dashboard/category-list");
    return { success: true };
  }
  return { success: false };
};