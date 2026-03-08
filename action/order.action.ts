"use server";

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

    console.log(result);

    if (res.ok && result.success) {
      return result.data; 
    }
    return [];
  } catch (err) {
    console.error("GET_ORDERS_ERROR:", err);
    return [];
  }
};