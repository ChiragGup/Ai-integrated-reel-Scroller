'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import FileUpload from '../compo/FileUpload'

export default function UploadPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()

  const videoId = searchParams.get('id')
  const isEdit = Boolean(videoId)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [thumbnailUrl, setThumbnailUrl] = useState('')
  const [thumbnailUploaded, setThumbnailUploaded] = useState(false)
  const [loading, setLoading] = useState(false)

  /* ---------------- LOAD VIDEO IN EDIT MODE ---------------- */
  useEffect(() => {
    if (!isEdit) return

    ;(async () => {
      try {
        const res = await fetch(`/api/video/${videoId}`)
        if (!res.ok) throw new Error()

        const data = await res.json()

        setTitle(data.title)
        setDescription(data.description)
        setVideoUrl(data.videoUrl)
        setThumbnailUrl(data.thumbnailUrl)
        setThumbnailUploaded(true)
      } catch {
        toast.error('Failed to load reel')
      }
    })()
  }, [isEdit, videoId])

  /* ---------------- SUBMIT HANDLER ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !description || !thumbnailUploaded) {
      toast.error('Please complete all required fields')
      return
    }

    try {
      setLoading(true)

      const res = await fetch(
        isEdit ? `/api/video/${videoId}` : `/api/video`,
        {
          method: isEdit ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title,
            description,
            videoUrl,
            thumbnailUrl,
          }),
        }
      )

      if (!res.ok) throw new Error()

      toast.success(
        isEdit ? 'Reel updated successfully' : 'Reel uploaded successfully'
      )

      // ✅ GUARANTEED REDIRECT (PRODUCTION SAFE)
      setTimeout(() => {
        router.replace('/reel')
      }, 300)

    } catch {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="
          w-full
          max-w-5xl
          bg-white
          rounded-3xl
          shadow-2xl
          p-5
          sm:p-6
          md:p-8
          lg:p-10
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-6
          lg:gap-10
        "
      >
        {/* LEFT SIDE */}
        <div className="space-y-5">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {isEdit ? 'Edit Reel' : 'Upload New Reel'}
            </h1>
            <p className="text-gray-600 text-sm mt-1">
              {isEdit
                ? 'Update title, description, or thumbnail.'
                : 'Upload a vertical reel with thumbnail.'}
            </p>
          </div>

          {/* TITLE */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter reel title"
              className="
                w-full
                rounded-xl
                border
                border-gray-300
                px-4
                py-3
                text-gray-900
                placeholder-gray-400
                focus:ring-2
                focus:ring-purple-500
                outline-none
              "
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Write something about this reel..."
              className="
                w-full
                rounded-xl
                border
                border-gray-300
                px-4
                py-3
                text-gray-900
                placeholder-gray-400
                resize-none
                focus:ring-2
                focus:ring-purple-500
                outline-none
              "
            />
          </div>

          {/* SUBMIT */}
          <button
            disabled={loading}
            className="
              w-full
              rounded-xl
              py-3
              font-semibold
              text-white
              bg-gradient-to-r
              from-purple-600
              to-pink-600
              hover:opacity-90
              transition
              disabled:opacity-50
            "
          >
            {loading
              ? 'Saving...'
              : isEdit
              ? 'Save Changes'
              : 'Upload Reel'}
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          {/* VIDEO */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Reel Video
            </label>

            {!isEdit ? (
              <FileUpload
                fileType="video"
                onSuccess={(res) => setVideoUrl(res.videoUrl)}
              />
            ) : (
              <div className="rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 text-sm text-gray-600">
                Video cannot be changed after upload
              </div>
            )}

            {videoUrl && (
              <video
                src={videoUrl}
                controls
                className="mt-3 w-full max-h-56 rounded-xl border object-cover"
              />
            )}
          </div>

          {/* THUMBNAIL */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Thumbnail
            </label>

            <FileUpload
              fileType="image"
              onSuccess={(res) => {
                setThumbnailUrl(res.url)
                setThumbnailUploaded(true)
              }}
            />

            {thumbnailUrl && (
              <img
                src={thumbnailUrl}
                alt="Thumbnail preview"
                className="mt-3 h-36 w-full rounded-xl border object-cover"
              />
            )}
          </div>
        </div>
      </form>
    </main>
  )
}
