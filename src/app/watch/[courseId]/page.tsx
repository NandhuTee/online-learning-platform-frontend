"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function WatchPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = use(params); // IMPORTANT FIX
  const router = useRouter();

  const [videos, setVideos] = useState([]);
  const [current, setCurrent] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/videos/enrolled/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) {
        router.push(`/courses/${courseId}`);
        return;
      }

      setVideos(data.videos);
      setCurrent(data.videos[0]);
    }
    load();
  }, [courseId]);

  if (!current) return <div className="text-white p-8">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 text-white">
      <video className="w-full h-[60vh]" controls src={current.videoUrl} />
      <h2 className="mt-4 text-xl">{current.title}</h2>
    </div>
  );
}
//src/app/watch/[courseId]/page.tsx