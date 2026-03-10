"use server";

import { userService } from "@/service/user.service";
import { cookies } from "next/headers";
import { parse } from "path";

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role: "CUSTOMER" | "PROVIDER";
}

export interface LoginInput {
  email: string;
  password: string;
}

export const signUpUserAction = async (values: RegisterInput) => {
  try {
    const { data, success } = await userService.registerUser(values);
    if (!success) {
      return { 
        success: false, 
        message: data?.error?.message || data?.message || "Registration failed" 
      };
    }

    return { success: true };
  } catch (err) {
    return { success: false, message: "Server connection failed" };
  }
};

export const signInUserAction = async (values: LoginInput) => {
  try {
    const res = await userService.loginUser(values);

    if (!res.success) {
      return { success: false, message: res?.message || "Login failed" };
    }
    
    const cookieStore = await cookies();

    cookieStore.set("token", res.data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return { success: true };
    
  } catch (err) {
    console.error("Login Action Error:", err);
    return { success: false, message: "Login error" };
  }
}

export const getServerSessionAction = async () => {
  try {
    const session = await userService.getUser();
    if (!session) return null;
    return session;
  } catch (error) {
    return null;
  }
};




export const logoutUserAction = async () => {
  const cookieStore = await cookies();

  cookieStore.delete("token");
  
  return { success: true };
};