'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface FavoritesContextType {
  favorites: string[];
  addFavorite: (articleId: string) => void;
  removeFavorite: (articleId: string) => void;
  isFavorite: (articleId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites')
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
  }, [])

  const addFavorite = (articleId: string) => {
    setFavorites(prev => {
      const newFavorites = [...prev, articleId]
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
      return newFavorites
    })
  }

  const removeFavorite = (articleId: string) => {
    setFavorites(prev => {
      const newFavorites = prev.filter(id => id !== articleId)
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
      return newFavorites
    })
  }

  const isFavorite = (articleId: string) => favorites.includes(articleId)

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}

