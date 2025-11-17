"use client";

import { useState } from "react";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleReset(e: any) {
    e.preventDefault();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp, newPassword }),
    });

    const data = await res.json();
    setMessage(data.message);
  }

  return (
    <div className="flex justify-center mt-20">
      <form className="bg-gray-800 p-6 rounded-lg w-96" onSubmit={handleReset}>
        <h1 className="text-xl font-bold mb-3">Reset Password</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 bg-gray-700 text-white rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="OTP"
          className="w-full p-3 mb-4 bg-gray-700 text-white rounded"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="New Password"
          className="w-full p-3 mb-4 bg-gray-700 text-white rounded"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <button className="w-full bg-green-600 py-2 rounded">
          Reset Password
        </button>

        {message && <p className="text-sm text-green-400 mt-3">{message}</p>}
      </form>
    </div>
  );
}
//src/app/reset-password/page.tsx