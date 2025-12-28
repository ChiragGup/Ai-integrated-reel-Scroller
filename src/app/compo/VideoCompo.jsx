"use client";

import { useEffect, useRef, useState } from "react";

export default function VideoCompo({
  video,
  isActive,
  soundEnabled,
  setSoundEnabled,
  onEdit,
  onDelete,
}) {
  const videoRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /* -----------------------------
     Auto play / pause on slide
  ------------------------------ */
  useEffect(() => {
    const v = videoRef.current;
    if (!v || hasError) return;

    if (isActive) {
      v.muted = !soundEnabled;
      v.play().catch(() => {});
      setIsPaused(false);
    } else {
      v.pause();
      v.muted = true;
      setIsPaused(true);
    }
  }, [isActive, soundEnabled, hasError]);

  /* -----------------------------
     Tap → Pause / Resume
  ------------------------------ */
  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;

    if (!soundEnabled) setSoundEnabled(true);

    if (v.paused) {
      v.muted = false;
      v.play().catch(() => {});
      setIsPaused(false);
    } else {
      v.pause();
      v.muted = true;
      setIsPaused(true);
    }
  };

  if (!video?.videoUrl || hasError) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-black text-gray-400">
        Video unavailable
      </div>
    );
  }

  return (
    <div
      onClick={togglePlay}
      className="relative h-full w-full bg-black overflow-hidden cursor-pointer select-none"
    >
      {/* VIDEO */}
      <video
        ref={videoRef}
        src={video.videoUrl}
        className="h-full w-full object-cover"
        loop
        playsInline
        preload="metadata"
        onError={() => setHasError(true)}
      />

      {/* ▶ PLAY OVERLAY */}
      {isPaused && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-10">
          <div className="h-16 w-16 flex items-center justify-center rounded-full bg-white/20 text-white text-3xl">
            ▶
          </div>
        </div>
      )}

      {/* 🔥 TEXT OVERLAY (TITLE + DESCRIPTION) */}
      <div className="
        pointer-events-none
        absolute
        bottom-0
        left-0
        right-0
        z-20
        px-4
        pb-4
        pt-10
        bg-gradient-to-t
        from-black/90
        via-black/60
        to-transparent
      ">
        <h3 className="
          text-white
          font-semibold
          text-sm
          sm:text-base
          md:text-lg
          leading-tight
          line-clamp-1
        ">
          {video.title || "Untitled Reel"}
        </h3>

        {video.description && (
          <p className="
            mt-1
            text-gray-200
            text-xs
            sm:text-sm
            md:text-base
            leading-snug
            line-clamp-2
          ">
            {video.description}
          </p>
        )}
      </div>

      {/* ⋮ MENU */}
      <div
        className="absolute top-4 right-4 z-30"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="text-white text-2xl px-2"
          onClick={() => setMenuOpen((v) => !v)}
        >
          ⋮
        </button>

        {menuOpen && (
          <div className="mt-2 w-32 rounded-md bg-black/90 border border-white/10 shadow-lg overflow-hidden">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(false);
                onEdit(video._id);
              }}
              className="block w-full px-4 py-2 text-left text-sm text-white hover:bg-white/10"
            >
              ✏️ Edit
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(false);
                onDelete(video._id);
              }}
              className="block w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-white/10"
            >
              🗑 Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
