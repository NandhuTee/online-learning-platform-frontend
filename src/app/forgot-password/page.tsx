"use client";

import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setMessage(data.message + " | OTP: " + data.otp);
    setOtp(data.otp);
  }

  return (
    <div className="flex justify-center mt-20">
      <form className="bg-gray-800 p-6 rounded-lg w-96" onSubmit={handleSubmit}>
        <h1 className="text-xl font-bold mb-3">Forgot Password</h1>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 mb-4 bg-gray-700 text-white rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button className="w-full bg-indigo-600 py-2 rounded">
          Send OTP
        </button>

        {message && <p className="text-sm text-green-400 mt-3">{message}</p>}
      </form>
    </div>
  );
}
//src/app/forgot-password/page.tsx