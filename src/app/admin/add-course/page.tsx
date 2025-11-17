"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddCoursePage() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    isFree: false,
    price: "",
  });

  const [video, setVideo] = useState<File | null>(null);

  function handleChange(e: any) {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("⚠️ Please login first");
      setLoading(false);
      return;
    }

    const fd = new FormData();
    fd.append("title", formData.title);
    fd.append("description", formData.description);
    fd.append("isFree", formData.isFree.toString());
    if (!formData.isFree) fd.append("price", formData.price);
    if (video) fd.append("video", video);

    try {
      const res = await fetch("http://localhost:5000/api/courses/create", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Course created successfully!");
        setTimeout(() => router.push("/courses"), 1500);
      } else {
        setMessage("❌ " + data.message);
      }
    } catch (err) {
      setMessage("❌ Server error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto text-white p-6 bg-gray-900 rounded-xl mt-10">
      <h1 className="text-3xl font-bold mb-6">Add Course</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Course title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 rounded"
        />

        <textarea
          name="description"
          placeholder="Course description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 rounded"
        />

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isFree"
            checked={formData.isFree}
            onChange={handleChange}
          />
          <label>This is a free course</label>
        </div>

        {!formData.isFree && (
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 rounded"
          />
        )}

        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideo(e.target.files?.[0] || null)}
          className="w-full text-gray-400"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 py-2 rounded-lg"
        >
          {loading ? "Adding..." : "Add Course"}
        </button>
      </form>

      {message && (
        <p className="text-center mt-4">{message}</p>
      )}
    </div>
  );
}
//src/app/admin/add-course/page.tsx