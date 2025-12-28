'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { toast } from 'react-toastify';


export default function Login() {
  const router = useRouter()
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === 'authenticated') {
       toast.success('Welcome!')
      router.push('/')
    }
  }, [status, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-md w-full text-black">
        <h1 className="text-3xl font-bold mb-6 text-center">Welcome Back!</h1>
        <p className="mb-8 text-gray-700 text-center">Sign in to your account</p>

        <div className="space-y-4">
          <button
            onClick={() => signIn('google')}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            <FcGoogle size={22} />
            <span>Sign in with Google</span>
          </button>

          <button
            onClick={() => signIn('github')}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            <FaGithub size={22} />
            <span>Sign in with GitHub</span>
          </button>
        </div>
      </div>
    </div>
  )
}
