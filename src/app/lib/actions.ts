"use server";
import { getAllUsers, getUser } from "@/app/api/data";
import { z } from "zod";

export type FormState = {
  message: string;
  success: boolean;
  userId?: number;
  user?: User;
};

interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  };
  address: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: {
      lat: string;
      long: string;
    };
  };
  phone: string;
}

export async function authenticate(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const users: User[] = await getAllUsers();
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      return { success: true, message: "Login successful", userId: user.id };
    } else {
      return { success: false, message: "Invalid email or password" };
    }
  } catch (e) {
    return {
      success: false,
      message: "Failed to login. Please try again later.",
    };
  }
}

const GetUserSchema = z.object({
  userId: z.string().min(1, { message: "User ID is required." }),
});

export async function getUserData(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = GetUserSchema.safeParse({
    userId: formData.get("userId"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Invalid user ID.",
    };
  }

  const { userId } = validatedFields.data;

  try {
    const user = await getUser(Number(userId));
    if (user && user.id) {
      return {
        success: true,
        message: "User data fetched successfully.",
        user,
      };
    } else {
      return { success: false, message: "User not found." };
    }
  } catch (e) {
    return {
      success: false,
      message: "Failed to fetch user data. Please try again later.",
    };
  }
}
