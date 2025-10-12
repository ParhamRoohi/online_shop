"use client";
import React, { useState } from "react";
import { getAllUsers } from "@/app/api/data";
import { useRouter } from "next/navigation";

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

function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const users: User[] = await getAllUsers();
      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        router.push("/");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Failed to login. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <form
        onSubmit={handleSubmit}
        className="rounded-lg border-2 h-100 w-100 flex flex-col p-4 justify-center gap-8"
      >
        <h1 className="text-2xl text-bold text-center">LOGIN</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <input
          type="email"
          className="border-gray-100 border-1 h-fit w-full p-4"
          placeholder="Enter Your Email "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          id=""
          className="border-gray-100 border-1 h-fit w-full p-4"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="submit"
          value="submit"
          className="border-gray-100 bg-blue-600 text-white rounded-lg h-fit w-full p-2"
        />
      </form>
    </div>
  );
}

export default Page;
