"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const BACKEND_URL = process.env.BACKEND_URL;

export const getAllOrdersAction = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const res = await fetch(`${BACKEND_URL}/orders/all`, {
      method: "GET",
      headers: { 
        "Authorization": token!
      }
    });

    const result = await res.json();

    if (res.ok && result.success) {
      return result.data; 
    }
    return [];
  } catch (err) {
    console.error("GET_ORDERS_ERROR:", err);
    return [];
  }
};

export const getProviderOrdersAction = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const res = await fetch(`${BACKEND_URL}/orders`, {
      method: "GET",
      headers: { "Authorization": token! },
      cache: "no-store",
    });

    const result = await res.json();
    console.log(result);
    return res.ok && result.success ? result.data : [];
  } catch (err) {
    console.error("GET_ORDERS_ERROR:", err);
    return [];
  }
};

// Update order status
export const updateOrderStatusAction = async (orderId: string, status: string) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const res = await fetch(`${BACKEND_URL}/orders/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token!,
      },
      body: JSON.stringify({ status }),
    });

    const result = await res.json();
    if (res.ok) {
      revalidatePath("/provider-dashboard/orders");
      return { success: true, message: "Status updated" };
    }
    return { success: false, message: result.message };
  } catch (err) {
    return { success: false, message: "Network failure" };
  }
};


export const getMyOrdersAction = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const res = await fetch(`${BACKEND_URL}/orders`, {
      method: "GET",
      headers: { "Authorization": token! },
      cache: "no-store",
    });

    const result = await res.json();
    return res.ok && result.success ? result.data : [];
  } catch (err) {
    return [];
  }
};

export const trackOrderAction = async (orderId: string) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const res = await fetch(`${BACKEND_URL}/orders/${orderId}`, {
      method: "GET",
      headers: { "Authorization": token! },
      cache: "no-store"
    });

    const result = await res.json();
   
    return res.ok && result.success ? result.data : null;
  } catch (err) {
    console.error("TRACKING_ERROR:", err);
    return null;
  }
};

export const createOrderAction = async (payload: { 
  address: string; 
  items: { mealId: string; quantity: number }[] 
}) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const res = await fetch(`${BACKEND_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token!,
      },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (res.ok && result.success) {
    
      revalidatePath("/dashboard/my-orders");
      revalidatePath("/provider-dashboard/orders");
      return { success: true, message: "Order placed successfully", data: result.data };
    }

    return { 
      success: false, 
      message: result.message || "Failed to finalize order" 
    };
  } catch (err) {
    console.error("CREATE_ORDER_ERROR:", err);
    return { success: false, message: "Network connection failed" };
  }
};