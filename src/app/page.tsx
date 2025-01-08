'use client'

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import NewsletterSubscription from "@/components/newsletter-subscription"
import FeaturedProducts from "@/components/featured-products"
import { motion } from 'framer-motion'

const posts = [
  {
    id: "skincare-products",
    title: "15 Must-Have Skincare Products for Radiant Skin",
    excerpt: "Discover the essential skincare products that will transform your beauty routine.",
    image: "/b1.png?height=400&width=600",
  },
  {
    id: "beauty-innovations",
    title: "Reworking the Latest Beauty Innovations in 2023",
    excerpt: "Stay ahead of the curve with these groundbreaking beauty innovations.",
    image: "/b2.png?height=400&width=600",
  },
  {
    id: "natural-remedies",
    title: "Natural Beauty Remedies from Your Kitchen",
    excerpt: "Learn how to create effective beauty treatments using common kitchen ingredients.",
    image: "/b3.png?height=400&width=600",
  },
]

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.section
        className="bg-white rounded-lg shadow-md overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid md:grid-cols-2">
          <div className="p-8 flex flex-col justify-center">
            <motion.h1
              className="text-4xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {posts[0].title}
            </motion.h1>
            <motion.p
              className="text-gray-600 mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {posts[0].excerpt}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Link
                href={`/blog/${posts[0].id}`}
                className="inline-block bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-600 transition-colors"
              >
                Read More
              </Link>
            </motion.div>
          </div>
          <motion.div
            className="relative aspect-[4/3] md:aspect-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={posts[0].image}
              alt={posts[0].title}
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Products Section */}
      <FeaturedProducts />

      {/* Blog Posts Grid */}
      <section>
        <motion.h2
          className="text-3xl font-bold text-gray-800 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Latest Articles
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
                  <motion.div
                    className="relative aspect-[4/3]"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-800 line-clamp-2">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link
            href="/articles"
            className="inline-block bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-600 transition-colors"
          >
            View All Articles
          </Link>
        </motion.div>
      </section>

      {/* Featured Video */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Featured Video</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row items-center">
          {/* Video Section */}
          <div className="relative aspect-video w-full md:w-2/3">
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/vKLfWy_clRw"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Blog Section */}
          <div className="p-6 w-full md:w-1/3">
            <h3 className="text-xl font-semibold text-gray-700">Beauty Product Tips</h3>
            <p className="text-gray-600 mt-2">
              Discover the best beauty products to keep your skin glowing. Start with a gentle cleanser to remove impurities, followed by a hydrating moisturizer to lock in moisture. Don’t forget to protect your skin from the sun with SPF and use a nourishing serum to target specific skin concerns. Additionally, incorporating exfoliators into your routine can help remove dead skin cells, leaving your skin feeling fresh and rejuvenated. For a more radiant look, consider adding a vitamin C serum to brighten your complexion. Lastly, regular use of a hydrating face mask can give your skin that extra boost of moisture and glow.
            </p>
          </div>
        </div>
      </motion.section>


      {/* Newsletter Subscription */}
      <NewsletterSubscription />
    </div>
  )
}

