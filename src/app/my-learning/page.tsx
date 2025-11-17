"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail?: string | null;
  isFree: boolean;
  price?: number | null;
}

export default function MyLearning() {
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    async function load() {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://online-learning-platform-backend-gf68.onrender.com/api/enrollments/my-courses",
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      const data = await res.json();
      setCourses(data.enrolledCourses || []);
    }

    load();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-semibold mb-6">My Learning</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {courses.length === 0 && (
          <p className="text-gray-400">No enrolled courses yet.</p>
        )}

        {courses.map((c) => (
          <div key={c.id} className="bg-gray-800 rounded-lg p-4">
            <img
              src={c.thumbnail || "/default-course.jpg"}
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
