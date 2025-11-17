"use client";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center text-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black pt-20">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-6xl font-extrabold mb-6 text-blue-400"
      >
        Empower Your Learning Journey
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-xl text-gray-300 mb-8"
      >
        Learn from expert instructors and master new skills with our interactive courses — all in one place.
      </motion.p>

      <motion.a
        href="#courses"
        whileHover={{ scale: 1.05 }}
        className="bg-blue-500 px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-600 transition"
      >
        Explore Courses
      </motion.a>
    </section>
  );
}
