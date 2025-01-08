import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { AuthProvider } from '@/components/auth-context'
import { FavoritesProvider } from '@/components/favorites-context'
import { CartProvider } from '@/components/cart-context'
import NavBar from '@/components/nav-bar'
import Footer from '@/components/footer'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Beauty Blog",
  description: "Latest beauty and skincare tips and products",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 flex flex-col min-h-screen`}>
        <AuthProvider>
          <FavoritesProvider>
            <CartProvider>
              <NavBar />
              <main className="container mx-auto px-4 py-8 flex-grow">
                {children}
              </main>
              <Footer />
            </CartProvider>
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

