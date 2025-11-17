"use client";

import { useEffect, useState } from "react";
import CourseCard from "@/components/CourseCard";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("${process.env.NEXT_PUBLIC_API_URL}/api/courses");
      const data = await res.json();
      setCourses(data);
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
      <h1 className="text-4xl font-bold text-center mb-8">All Courses</h1>
      <CourseCard courses={courses} />
    </div>
  );
}
