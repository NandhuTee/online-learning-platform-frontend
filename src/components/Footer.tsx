"use client";

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-6 text-center border-t border-gray-800">
      <p className="text-gray-500 text-sm">
        © {new Date().getFullYear()} LearnSphere. All rights reserved.
      </p>
    </footer>
  );
}
