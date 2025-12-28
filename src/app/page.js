import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      
      {/* NAVBAR */}
      <nav className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-betweens-between">
        <h1 className="text-xl font-bold">
          Reel<span className="text-indigo-500">Scroller</span>
        </h1>

        <Link
          href="/reel"
          className="hidden sm:inline-block px-5 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 transition"
        >
          Open Reels
        </Link>
      </nav>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            Upload. Scroll. Enhance. <br />
            <span className="text-indigo-500">AI-Powered Reels</span>
          </h2>

          <p className="mt-6 text-gray-300 text-base sm:text-lg max-w-xl">
            Upload reels with thumbnails and descriptions, update or delete them,
            scroll endlessly, and get smart AI suggestions for ideas & hashtags.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/reel"
              className="px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition font-semibold text-center"
            >
              Start Scrolling Reels
            </Link>

            <Link
              href="/upload"
              className="px-8 py-4 rounded-xl border border-gray-600 hover:border-indigo-500 transition font-semibold text-center"
            >
              Upload a Reel
            </Link>
          </div>
        </div>

        {/* Right visual card */}
        <div className="relative">
          <div className="absolute inset-0 bg-indigo-500 blur-3xl opacity-20 rounded-3xl"></div>
          <div className="relative bg-gray-900/80 border border-gray-700 rounded-3xl p-6">
            <p className="text-sm text-gray-400 mb-3">AI Reel Assistant</p>
            <div className="space-y-3">
              <div className="bg-gray-800 rounded-xl px-4 py-3 text-sm">
                Suggest reel ideas for React developers
              </div>
              <div className="bg-indigo-600 rounded-xl px-4 py-3 text-sm font-medium">
                3 reel ideas generated ✨
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h3 className="text-3xl sm:text-4xl font-bold text-center mb-14">
          Platform Features
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            ["Upload Reels", "Upload videos with thumbnail & description."],
            ["Update & Delete", "Manage your reels anytime."],
            ["Smooth Scrolling", "Mobile-first vertical reel scroll."],
            ["AI Suggestions", "Get reel ideas, captions & hashtags."],
            ["Fully Responsive", "Perfect on mobile, tablet & desktop."],
            ["Modern UI", "Clean, fast and creator-focused design."]
          ].map(([title, desc], i) => (
            <div
              key={i}
              className="bg-gray-900/70 border border-gray-700 rounded-2xl p-6 hover:border-indigo-500 transition"
            >
              <h4 className="text-xl font-semibold mb-3">{title}</h4>
              <p className="text-gray-400 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-10 text-center">
          <h4 className="text-3xl font-bold mb-4">
            Ready to Scroll Reels?
          </h4>
          <p className="text-indigo-100 mb-6">
            Experience smooth reel scrolling with smart content tools.
          </p>

          <Link
            href="/reel"
            className="inline-block bg-black text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-900 transition"
          >
            Go to Reel Page
          </Link>
        </div>
      </section>

    </main>
  );
}
