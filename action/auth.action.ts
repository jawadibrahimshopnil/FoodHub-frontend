"use server";

import { userService } from "@/service/user.service";

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role: "CUSTOMER" | "PROVIDER";
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