"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import CourseCard from "@/components/CourseCard";

export default function DashboardPage() {
  const { user, token, ready } = useAuth();
  const router = useRouter();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (!ready) return;

    if (!user || !token) {
      router.push("/login");
      return;
    }

    async function loadCourses() {
      const res = await fetch("${process.env.NEXT_PUBLIC_API_URL}/api/courses");
      const data = await res.json();
      setCourses(data);
    }

    loadCourses();
  }, [ready, user, token]);

  if (!ready) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl font-bold mb-6">
        {user?.role === "admin" ? "Admin Dashboard" : "My Learning"}
      </h1>

      <CourseCard courses={courses} />
    </div>
  );
}
//src/app/dashboard/page.tsx