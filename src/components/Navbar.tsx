"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-950 border-b border-gray-800">
      <h1
        onClick={() => router.push("/")}
        className="text-2xl font-bold text-indigo-400 cursor-pointer"
      >
        LearnHub
      </h1>

      <div className="flex items-center gap-6 text-gray-300">
        {!user ? (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        ) : (
          <>
            {user.role === "admin" && (
              <>
                <Link href="/admin/add-course">Add Course</Link>
              </>
            )}

            <Link href="/dashboard">Dashboard</Link>
            <Link href="/change-password">Change Password</Link>

            <button
              onClick={() => {
                logout();
                router.push("/login");
              }}
              className="bg-red-600 px-3 py-1 rounded text-white"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
