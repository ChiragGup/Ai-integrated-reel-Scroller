"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import VideoSwiper from "../compo/Swiper";

export default function ReelUI() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await fetch("/api/video");
      const data = await res.json();
      setVideos(data);
      setLoading(false);
    };
    fetchVideos();
  }, []);

  // ✅ EDIT → REDIRECT
  const handleEdit = (videoId) => {
    router.push(`/upload?id=${videoId}`);
  };

  // ✅ DELETE → API + UI UPDATE
  const handleDelete = async (videoId) => {
    setVideos((prev) => prev.filter((v) => v._id !== videoId));
    await fetch(`/api/video/${videoId}`, { method: "DELETE" });
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading…
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black flex items-center justify-center">
      <div
        className="
          aspect-[9/16]
          h-[92vh]
          max-h-[900px]
          w-auto
          max-w-[390px]
          md:max-w-[420px]
          lg:max-w-[460px]
          rounded-xl
          overflow-hidden
          border border-white/10
          bg-black
        "
      >
        <VideoSwiper
          videos={videos}
          onEdit={handleEdit}     // ✅ PASSED HERE
          onDelete={handleDelete}
        />
      </div>
    </main>
  );
}
