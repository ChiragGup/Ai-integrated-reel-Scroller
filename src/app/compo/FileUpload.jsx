"use client";

import { upload } from "@imagekit/next";
import { useState } from "react";

const FileUpload = ({
  onSuccess,
  onProgress,
  fileType = "video",
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const validateFile = (file) => {
    if (fileType === "video" && !file.type.startsWith("video/")) {
      setError("Please upload a valid video file");
      return false;
    }

    if (file.size > 100 * 1024 * 1024) {
      setError("File size must be less than 100 MB");
      return false;
    }

    return true;
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !validateFile(file)) return;

    setUploading(true);
    setError(null);

    try {
      // 1️⃣ Fetch ImageKit auth
      const authRes = await fetch("/api/auth/imagekit-auth");
      if (!authRes.ok) throw new Error("ImageKit auth failed");

      const auth = await authRes.json();
      console.log("🔐 ImageKit Auth Params:", auth);

      // 2️⃣ Upload to ImageKit
      const res = await upload({
        file,
        fileName: file.name,
        publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
        signature: auth.signature,
        expire: auth.expire,
        token: auth.token,
        onProgress: (event) => {
          if (event.lengthComputable && onProgress) {
            const percent = Math.round(
              (event.loaded / event.total) * 100
            );
            onProgress(percent);
          }
        },
      });

      // 🔴 THIS IS THE MOST IMPORTANT LOG
      console.log("📦 IMAGEKIT RAW RESPONSE:", res);

      // 3️⃣ Build FINAL playable video URL
      const videoUrl = res.filePath
        ? `${process.env.NEXT_PUBLIC_URL_ENDPOINT}${res.filePath}`
        : res.url;

      console.log("🎬 FINAL VIDEO URL:", videoUrl);
      console.log("📏 VIDEO URL LENGTH:", videoUrl?.length);

      // 4️⃣ Return to parent
      onSuccess({
        ...res,
        videoUrl, // ✅ THIS is what must go into DB
      });
    } catch (err) {
      console.error("❌ Upload failed:", err);
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <label className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 text-white cursor-pointer hover:bg-indigo-700 transition">
        Select {fileType}
        <input
          type="file"
          className="hidden"
          accept={fileType === "video" ? "video/*" : "image/*"}
          onChange={handleFileChange}
        />
      </label>

      {uploading && (
        <p className="text-sm text-gray-400">Uploading…</p>
      )}

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default FileUpload;
