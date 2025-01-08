'use client'

import { useEffect } from 'react'
import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from '@/components/auth-context'
import { useFavorites } from '@/components/favorites-context'

const allPosts = {
  "skincare-products": {
    id: "skincare-products",
    title: "15 Must-Have Skincare Products for Radiant Skin",
    excerpt: "Discover the essential skincare products that will transform your beauty routine.",
    image: "/b1.png?height=400&width=600",
    category: "Skincare",
    date: "2024-01-05",
  },
  "beauty-innovations": {
    id: "beauty-innovations",
    title: "Reworking the Latest Beauty Innovations in 2023",
    excerpt: "Stay ahead of the curve with these groundbreaking beauty innovations.",
    image: "/b2.png?height=400&width=600",
    category: "Trends",
    date: "2024-01-04",
  },
  "natural-remedies": {
    id: "natural-remedies",
    title: "Natural Beauty Remedies from Your Kitchen",
    excerpt: "Learn how to create effective beauty treatments using common kitchen ingredients.",
    image: "/b3.png?height=400&width=600",
    category: "DIY",
    date: "2024-01-03",
  },
  "winter-skincare-tips": {
    id: "winter-skincare-tips",
    title: "Winter Skincare Tips: Keep Your Skin Healthy and Hydrated",
    excerpt: "Protect your skin from harsh winter conditions with these expert tips.",
    image: "/b4.png?height=400&width=600",
    category: "Skincare",
    date: "2024-01-02",
  },
  "makeup-trends": {
    id: "makeup-trends",
    title: "Top 10 Makeup Trends to Watch in 2024",
    excerpt: "Explore the hottest makeup trends that will dominate the beauty world in 2024.",
    image: "/b5.png?height=400&width=600",
    category: "Makeup",
    date: "2024-01-01",
  },
  "eco-friendly-products": {
    id: "eco-friendly-products",
    title: "Eco-Friendly Beauty Products for a Sustainable Routine",
    excerpt: "Switch to eco-conscious beauty products that are good for you and the planet.",
    image: "/b6.png?height=400&width=600",
    category: "Sustainability",
    date: "2023-12-31",
  },
}

export default function FavoritesPage() {
  const { user } = useAuth()
  const { favorites } = useFavorites()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  if (!user) {
    return null // or a loading spinner
  }

  const favoritePosts = (favorites || []).map(id => allPosts[id as keyof typeof allPosts]).filter(Boolean)

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Your Favorite Articles</h1>
      {favoritePosts.length === 0 ? (
        <p className="text-gray-600">You haven't added any favorites yet. Start exploring our articles!</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoritePosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`}>
              <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-1 bg-pink-500 text-white text-xs rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-gray-800 line-clamp-2">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
                  <time className="text-sm text-gray-500 mt-2 block">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}