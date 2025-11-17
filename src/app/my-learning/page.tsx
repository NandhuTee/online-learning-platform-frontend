"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Course } from "@/types/course";
import Image from "next/image";

export default function MyLearning() {
  const [courses, setCourses] = useState<Course[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    async function load() {
      const res = await fetch("${process.env.NEXT_PUBLIC_API_URL}/api/enrollments/my-courses", {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();
      setCourses(data.enrolledCourses || []);
    }

    load();
  }, [router]);

  return (
    <div className="max-w-6xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-semibold mb-6">My Learning</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {courses.map(c => (
          <div key={c.id} className="bg-gray-800 rounded-lg p-4">
            <Image
              src={c.thumbnail || "/placeholder.png"}
              alt={c.title}
              width={400}
              height={200}
              className="w-full h-40 object-cover rounded"
            />

            <h3 className="mt-3 font-semibold">{c.title}</h3>
            <p className="text-sm text-gray-400">{c.description}</p>

            <button
              onClick={() => router.push(`/watch/${c.id}`)}
              className="mt-4 bg-indigo-600 px-3 py-2 rounded"
            >
              Continue Learning
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
//scr/app/my-learning/page.tsx