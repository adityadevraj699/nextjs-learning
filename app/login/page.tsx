"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useNotification } from "../components/Notification";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { showNotification } = useNotification();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      showNotification(result.error, "error");
    } else {
      showNotification("Login successful!", "success");
      router.push("/");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-black dark:text-white">
        Login
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block mb-1 text-black dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:border-sky-500 focus:ring-sky-500"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-1 text-black dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:border-sky-500 focus:ring-sky-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-sky-500 text-white py-2 rounded hover:bg-sky-600 transition-all"
        >
          Login
        </button>
        <p className="text-center mt-4 text-black dark:text-white">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-red-500 hover:text-red-600 transition-all"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
