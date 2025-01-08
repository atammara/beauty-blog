import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllBlogPosts } from '@/lib/api'

export default async function ArticlesPage() {
  const articles = await getAllBlogPosts()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">All Articles</h1>
        <p className="text-gray-600">Explore our collection of beauty tips, tutorials, and insights</p>
      </div>

      {/* Categories Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {Array.from(new Set(articles.map(article => article.category))).map((category) => (
          <button
            key={category}
            className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 whitespace-nowrap hover:bg-pink-500 hover:text-white hover:border-pink-500 transition-colors"
          >
            {category}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <Link key={article.id} href={`/blog/${article.id}`}>
            <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
              <div className="relative aspect-[4/3]">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-1 bg-pink-500 text-white text-xs rounded-full">
                    {article.category}
                  </span>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-gray-800 line-clamp-2">{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 line-clamp-3 mb-2">{article.content.split('\n')[0]}</p>
                <time className="text-sm text-gray-500">
                  {new Date(article.date).toLocaleDateString('en-US', {
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
    </div>
  )
}

