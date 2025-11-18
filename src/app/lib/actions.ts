'use server';
import { getAllUsers } from '@/app/api/data';

export type FormState = {
  message: string;
  success: boolean;
  userId?: number;
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
  formData: FormData,
): Promise<FormState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const users:User[] = await getAllUsers();
    const user = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (user) {
      return { success: true, message: 'Login successful', userId: user.id };
    } else {
      return { success: false, message: 'Invalid email or password' };
    }
  } catch (e) {
    return { success: false, message: 'Failed to login. Please try again later.' };
  }
}