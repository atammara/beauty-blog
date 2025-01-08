import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm text-gray-600">
              Beauty Blog is your go-to source for the latest beauty tips, product reviews, and skincare advice.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-gray-600 hover:text-pink-500">Home</Link></li>
              <li><Link href="/articles" className="text-sm text-gray-600 hover:text-pink-500">Articles</Link></li>
              <li><Link href="/beauty-tips" className="text-sm text-gray-600 hover:text-pink-500">Beauty Tips</Link></li>
              <li><Link href="/about" className="text-sm text-gray-600 hover:text-pink-500">About</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-600 hover:text-pink-500">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-sm text-gray-600 mb-2">Email: info@beautyblog.com</p>
            <p className="text-sm text-gray-600">Phone: (123) 456-7890</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-pink-500">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-pink-500">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-pink-500">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-pink-500">
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Beauty Blog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

