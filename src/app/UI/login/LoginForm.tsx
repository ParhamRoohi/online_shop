"use client";
import React, { useEffect, useActionState } from "react";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { authenticate, FormState } from "@/app/lib/actions";

const initialState: FormState = {
  message: "",
  success: false,
};

function LoginForm() {
  const [state, formAction] = useActionState(authenticate, initialState);
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem("userId")) {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    if (state.success && state.userId) {
      sessionStorage.setItem("userId", state.userId.toString());
      router.push("/");
    }
  }, [state, router]);

  return (
    <div className="flex justify-center items-center h-screen w-full ">
      <form
        action={formAction}
        className="rounded-lg border-2 w-full max-w-sm flex flex-col p-4 justify-center gap-8 m-4"
      >
        <h1 className="text-2xl text-bold text-center">LOGIN</h1>
        {state.message && !state.success && (
          <p className="text-red-500 text-center">{state.message}</p>
        )}
        <input
          type="email"
          name="email"
          className="border-gray-100 border-1 h-fit w-full p-4"
          placeholder="Enter Your Email "
          required
        />
        <input
          type="password"
          name="password"
          id=""
          className="border-gray-100 border-1 h-fit w-full p-4"
          placeholder="Enter your Password"
          required
        />
        <SubmitButton />
      </form>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <input
      type="submit"
      value={pending ? "Submitting..." : "Submit"}
      disabled={pending}
      className="border-gray-100 bg-blue-600 text-white rounded-lg h-fit w-full p-2 disabled:bg-gray-400"
    />
  );
}

export default LoginForm;