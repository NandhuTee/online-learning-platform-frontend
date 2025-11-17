"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setMessage("Logging in...");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage("❌ " + data.message);
        return;
      }

      login(data.token, data.user);

      router.push("/dashboard");
    } catch {
      setMessage("⚠️ Network error");
    }
  }

  return (
    <div className="flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-6">Login</h1>

      <form
        onSubmit={handleLogin}
        className="bg-gray-900 p-8 rounded-xl w-96 border border-gray-700"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 mb-4 bg-gray-800 rounded"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-3 mb-4 bg-gray-800 rounded"
          required
        />

        <button className="w-full bg-indigo-600 py-2 rounded">
          Login
        </button>

        {message && (
          <p className="mt-3 text-sm text-center text-gray-300">{message}</p>
        )}
      </form>
    </div>
  );
}
//src/app/login/page.tsx