"use client";

import { useState } from "react";

export default function ChangePasswordPage() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("❌ Please login first");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage("❌ " + data.message);
        return;
      }

      setMessage("✅ Password updated successfully!");
      setOldPassword("");
      setNewPassword("");

    } catch (err) {
      setMessage("❌ Something went wrong");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        onSubmit={handleChangePassword}
        className="bg-gray-900 p-6 rounded-xl shadow-md border border-gray-800 w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Change Password</h2>

        <input
          type="password"
          placeholder="Old Password"
          className="w-full p-3 mb-3 bg-gray-800 rounded-lg text-white"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="New Password"
          className="w-full p-3 mb-3 bg-gray-800 rounded-lg text-white"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <button className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded-lg">
          Update Password
        </button>

        {message && (
          <p className="text-center mt-3 text-sm text-gray-300">{message}</p>
        )}
      </form>
    </div>
  );
}
