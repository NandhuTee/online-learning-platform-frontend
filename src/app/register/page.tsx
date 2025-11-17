"use client";

import { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setMessage("Registering...");
    try {
      const res = await fetch("https://online-learning-platform-backend-gf68.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Registration successful! You can now log in.");
      } else {
        setMessage("❌ " + data.message);
      }
    } catch (err) {
      setMessage("Error registering user.");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <h1 className="text-3xl font-bold mb-4">Register</h1>
      <form
        onSubmit={handleRegister}
        className="bg-gray-900 p-8 rounded-xl border border-gray-800 shadow-lg w-96"
      >
        <input
          type="text"
          placeholder="Full Name"
          className="w-full mb-3 p-3 bg-gray-800 rounded-lg text-white outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-3 bg-gray-800 rounded-lg text-white outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 bg-gray-800 rounded-lg text-white outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded-lg transition"
        >
          Register
        </button>
        {message && (
          <p className="mt-3 text-sm text-center text-gray-300">{message}</p>
        )}
      </form>
    </div>
  );
}
//src/app/register/page.tsx