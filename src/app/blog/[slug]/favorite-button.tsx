'use client'

import { Button } from "@/components/ui/button"
import { useAuth } from '@/components/auth-context'
import { useFavorites } from '@/components/favorites-context'
import { Heart } from 'lucide-react'

export default function FavoriteButton({ postId }: { postId: string }) {
  const { user } = useAuth()
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()

  if (!user) {
    return null
  }

  const handleFavoriteClick = () => {
    if (isFavorite(postId)) {
      removeFavorite(postId)
    } else {
      addFavorite(postId)
    }
  }

  return (
    <Button
      onClick={handleFavoriteClick}
      variant="outline"
      className={isFavorite(postId) ? 'text-pink-500' : 'text-gray-500'}
    >
      <Heart className="mr-2" />
      {isFavorite(postId) ? 'Favorited' : 'Add to Favorites'}
    </Button>
  )
}

