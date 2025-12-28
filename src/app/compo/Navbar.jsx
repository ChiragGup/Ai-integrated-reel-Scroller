'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const handleUpload = () => {
    if (!session) router.push('/login')
    else router.push('/upload')
  }

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="https://cdn-icons-png.flaticon.com/512/1170/1170627.png"
            alt="logo"
            width={36}
            height={36}
            className="rounded-full border border-white shadow"
          />
          <span className="text-white font-extrabold text-lg sm:text-xl">
            ReelUploader
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-white font-semibold hover:text-yellow-300">
            Home
          </Link>

          <Link href="/reel" className="text-white font-semibold hover:text-yellow-300">
            Reel
          </Link>

          <Link href="/ai" className="text-white font-semibold hover:text-yellow-300">
            AI
          </Link>

          <button
            onClick={handleUpload}
            className="text-white font-semibold hover:text-yellow-300"
          >
            Upload
          </button>

          {status !== 'authenticated' ? (
            <button
              onClick={() => router.push('/login')}
              className="bg-white text-purple-600 px-4 py-2 rounded-full font-bold hover:bg-yellow-200 transition"
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => signOut()}
              className="bg-white text-red-600 px-4 py-2 rounded-full font-bold hover:bg-red-200 transition"
            >
              Signout
            </button>
          )}
        </div>

        {/* HAMBURGER (SMALL SCREENS) */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU – ALL OPTIONS */}
      {open && (
        <div className="md:hidden bg-gradient-to-b from-purple-600 to-red-500 px-6 py-5 space-y-4">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="block text-white font-semibold"
          >
            🏠 Home
          </Link>

          <Link
            href="/reel"
            onClick={() => setOpen(false)}
            className="block text-white font-semibold"
          >
            ▶️ Reel
          </Link>

          <Link
            href="/ai"
            onClick={() => setOpen(false)}
            className="block text-white font-semibold"
          >
            🤖 AI
          </Link>

          <button
            onClick={() => {
              setOpen(false)
              handleUpload()
            }}
            className="block text-white font-semibold"
          >
            ⬆️ Upload
          </button>

          {status !== 'authenticated' ? (
            <button
              onClick={() => {
                setOpen(false)
                router.push('/login')
              }}
              className="w-full bg-white text-purple-600 py-2 rounded-full font-bold"
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => {
                setOpen(false)
                signOut()
              }}
              className="w-full bg-white text-red-600 py-2 rounded-full font-bold"
            >
              Signout
            </button>
          )}
        </div>
      )}
    </nav>
  )
}
