"use client";

import { useState } from "react";

export default function AIPage() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const MAX_CHARS = 300;

  const askAI = async () => {
    if (!prompt.trim() || loading) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `Give reel caption + hashtags only:\n${prompt}`,
        }),
      });

      const data = await res.json();
      setResponse(data.text || "No response generated.");
    } catch {
      setResponse("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4 py-8">
      <div
        className="
          w-full
          max-w-xl
          sm:max-w-2xl
          bg-white/5
          backdrop-blur-xl
          border
          border-white/10
          rounded-3xl
          p-5
          sm:p-6
          md:p-8
          space-y-6
          shadow-2xl
        "
      >
        {/* HEADER */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            🤖 Reel AI Assistant
          </h1>
          <p className="text-sm sm:text-base text-gray-400">
            Generate captions & hashtags for your reels
          </p>
        </div>

        {/* TEXTAREA */}
        <div className="space-y-2">
          <textarea
            value={prompt}
            onChange={(e) =>
              setPrompt(e.target.value.slice(0, MAX_CHARS))
            }
            rows={4}
            placeholder="Describe your reel idea…"
            className="
              w-full
              rounded-2xl
              bg-black/60
              border
              border-gray-700
              px-4
              py-3
              text-white
              text-sm
              sm:text-base
              resize-none
              focus:outline-none
              focus:ring-2
              focus:ring-purple-500
            "
          />

          <div className="flex justify-between text-xs text-gray-400">
            <span>Max {MAX_CHARS} characters</span>
            <span>{prompt.length}/{MAX_CHARS}</span>
          </div>
        </div>

        {/* BUTTON */}
        <button
          onClick={askAI}
          disabled={loading || !prompt.trim()}
          className="
            w-full
            py-3
            rounded-2xl
            font-semibold
            text-white
            bg-gradient-to-r
            from-purple-600
            to-pink-600
            hover:opacity-90
            transition
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {loading ? "Thinking…" : "✨ Generate Caption"}
        </button>

        {/* RESPONSE */}
        {response && (
          <div
            className="
              bg-black/70
              border
              border-gray-700
              rounded-2xl
              p-4
              sm:p-5
              text-white
              text-sm
              sm:text-base
              whitespace-pre-wrap
              leading-relaxed
            "
          >
            {response}
          </div>
        )}
      </div>
    </main>
  );
}
