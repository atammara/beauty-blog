'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/components/auth-context'
import Search from '@/components/search'
import { Button } from "@/components/ui/button"
import Cart from '@/components/cart'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const MotionButton = motion(Button)

export default function NavBar() {
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = user
    ? ['Home', 'Articles', 'Beauty Tips', 'About', 'Contact']
    : ['Home']

  return (
    <motion.nav 
      className="bg-white shadow"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="text-2xl font-bold text-gray-800">Beauty Blog</Link>
          </motion.div>
          <div className="hidden md:flex items-center space-x-6">
            {user && <Search />}
            {navItems.map((item) => (
              <motion.div
                key={item}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`} className="text-gray-600 hover:text-gray-800 transition-colors">
                  {item}
                </Link>
              </motion.div>
            ))}
            {user ? (
              <>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Link href="/profile" className="text-gray-600 hover:text-gray-800 transition-colors">Profile</Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Link href="/favorites" className="text-gray-600 hover:text-gray-800 transition-colors">Favorites</Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <MotionButton onClick={logout} className="bg-pink-500 hover:bg-pink-600">Logout</MotionButton>
                </motion.div>
                <Cart />
              </>
            ) : (
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link href="/signup" className="text-gray-600 hover:text-gray-800 transition-colors">Sign Up</Link>
              </motion.div>
            )}
          </div>
          <div className="md:hidden">
            <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="mt-4 md:hidden">
            {user && <Search />}
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item}
                  href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                  className="text-gray-600 hover:text-gray-800 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
              {user ? (
                <>
                  <Link href="/profile" className="text-gray-600 hover:text-gray-800 transition-colors" onClick={() => setIsMenuOpen(false)}>Profile</Link>
                  <Link href="/favorites" className="text-gray-600 hover:text-gray-800 transition-colors" onClick={() => setIsMenuOpen(false)}>Favorites</Link>
                  <Button onClick={() => { logout(); setIsMenuOpen(false); }} className="bg-pink-500 hover:bg-pink-600">Logout</Button>
                  <Cart />
                </>
              ) : (
                <Link href="/signup" className="text-gray-600 hover:text-gray-800 transition-colors" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.nav>
  )
}

