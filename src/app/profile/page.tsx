'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from '@/components/auth-context'

export default function ProfilePage() {
  const { user } = useAuth()
  const router = useRouter()
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    bio: '',
    avatar: '/placeholder.svg',
  })
  const [isEditing, setIsEditing] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push('/login')
    } else {
      setProfile(prevProfile => ({
        ...prevProfile,
        name: user.name,
        email: user.email,
      }))
    }
  }, [user, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedFile) {
      const reader = new FileReader()
      reader.onload = () => {
        setProfile({ ...profile, avatar: reader.result as string })
      }
      reader.readAsDataURL(selectedFile)
    }
    setIsEditing(false)

    console.log('Updated profile:', profile)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  if (!user) {
    return null
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Your Profile</h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden p-6">
        <div className="flex items-center mb-6">
          <Image
            src={profile.avatar}
            alt={profile.name}
            width={100}
            height={100}
            className="rounded-full mr-4 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{profile.name}</h2>
            <p className="text-gray-600">{profile.email}</p>
          </div>
        </div>
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <Textarea
                id="bio"
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                rows={4}
              />
            </div>
            <div>
              <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
              <Input
                id="avatar"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <Button type="submit" className="bg-pink-500 hover:bg-pink-600">Save Changes</Button>
          </form>
        ) : (
          <div>
            <p className="text-gray-600 mb-4">{profile.bio || 'No bio yet. Click Edit Profile to add one!'}</p>
            <Button onClick={() => setIsEditing(true)} className="bg-pink-500 hover:bg-pink-600">Edit Profile</Button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg overflow-hidden">
            <Image
              src={profile.avatar}
              alt={profile.name}
              width={500}
              height={500}
              className="w-full h-auto"
            />
            <Button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
