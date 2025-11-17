"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-4xl font-bold text-indigo-400 mb-4">
        Welcome to LearnHub
      </h1>
      <p className="text-gray-400 max-w-xl">
        Empower your future with interactive online learning. Log in to access
        our curated collection of free and paid courses.
      </p>
    </div>
  );
}
