"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  isFree: boolean;
  price?: number;
}

interface CourseCardProps {
  courses: Course[];
}

export default function CourseCard({ courses }: CourseCardProps) {
  const router = useRouter();

  if (!courses || courses.length === 0) {
    return (
      <div className="text-gray-400 text-center py-10">
        No courses available.
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {courses.map((course, index) => (
        <motion.div
          key={course.id || index}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="bg-gray-800 rounded-xl p-5 shadow hover:scale-[1.02] transition"
        >
          <Image
            src={course.thumbnail || "/placeholder.png"}
            alt={course.title}
            width={640}
            height={160}
            className="w-full h-40 object-cover rounded-lg mb-3"
          />

          <h2 className="text-2xl font-semibold mb-2">{course.title}</h2>
          <p className="text-gray-400 mb-3 line-clamp-2">{course.description}</p>

          <div className="flex items-center justify-between">
            <span
              className={`font-semibold ${
                course.isFree ? "text-green-400" : "text-yellow-400"
              }`}
            >
              {course.isFree ? "Free" : `$${course.price ?? 0}`}
            </span>
            <button
              onClick={() => router.push(`/courses/${course.id}`)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
            >
              {course.isFree ? "🎥 View Course" : "💳 Buy Now"}
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
