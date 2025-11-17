"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail?: string | null;
  isFree: boolean;
  price?: number | null;
}

export default function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params); // IMPORTANT FIX
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);


  useEffect(() => {
    async function load() {
      const res = await fetch(`https://online-learning-platform-backend-gf68.onrender.com/api/courses/${id}`);
      const data = await res.json();
      setCourse(data);
    }
    load();
  }, [id]);

  if (!course) return <div>Loading...</div>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-4xl font-bold">{course.title}</h1>
      <p className="text-gray-300">{course.description}</p>

      {course.isFree ? (
        <button
          onClick={() => router.push(`/watch/${id}`)}
          className="bg-green-600 px-4 py-2 rounded mt-6"
        >
          🎥 Watch Free
        </button>
      ) : (
        <button
          onClick={() => router.push(`/buy/${id}`)}
          className="bg-blue-600 px-4 py-2 rounded mt-6"
        >
          💳 Buy Now – ${course.price}
        </button>
      )}
    </div>
  );
}
//src/app/courses/[id]/page.tsx