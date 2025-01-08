'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get('authToken')
    if (token) {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    }
  }, [])

  const login = async (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const foundUser = users.find((u: User & { password: string }) => u.email === email && u.password === password)
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem('user', JSON.stringify(userWithoutPassword))
      Cookies.set('authToken', 'dummy-token', { expires: 7 }) // Set cookie to expire in 7 days
      router.push('/')
    } else {
      throw new Error('Invalid email or password')
    }
  }

  const signup = async (name: string, email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const existingUser = users.find((u: User) => u.email === email)
    if (existingUser) {
      throw new Error('User already exists')
    }
    const newUser = { id: Date.now().toString(), name, email, password }
    users.push(newUser)
    localStorage.setItem('users', JSON.stringify(users))
    const { password: _, ...userWithoutPassword } = newUser
    setUser(userWithoutPassword)
    localStorage.setItem('user', JSON.stringify(userWithoutPassword))
    Cookies.set('authToken', 'dummy-token', { expires: 7 }) // Set cookie to expire in 7 days
    router.push('/')
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    Cookies.remove('authToken')
    router.push('/')
  }


  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

