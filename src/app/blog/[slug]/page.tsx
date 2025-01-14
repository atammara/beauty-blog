import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getBlogPost } from '@/lib/api'; 
import CommentSection from '@/components/comment-section';
import FavoriteButton from '@/components/favorite-button';

interface BlogPostParams {
  params: {
    slug: string;
  };
  searchParams?: Record<string, string>;
}

export async function generateMetadata({ params }: BlogPostParams): Promise<{ title: string; description?: string }> {
  const post = await getBlogPost(params.slug);

  if (!post) {
    return { title: 'Not Found' };
  }

  return {
    title: post.title,
    description: post.content.substring(0, 160), // Ensure description is concise
  };
}

export default async function BlogPost({ params }: BlogPostParams) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto">
      {/* Title and Metadata */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>
        <div className="flex items-center justify-between text-gray-600">
          <div className="flex items-center gap-4">
            <span>{post.category}</span>
            <span>•</span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
          <FavoriteButton postId={post.id} />
        </div>
      </header>

      {/* Featured Image */}
      {post.image && (
        <div className="relative aspect-video mb-8">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority // Optimizes the loading of the image
          />
        </div>
      )}

      {/* Post Content */}
      <section className="prose prose-lg max-w-none mb-12">
        {post.content.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-4">
            {paragraph}
          </p>
        ))}
      </section>

      {/* Comments Section */}
      <CommentSection postSlug={params.slug} />

      {/* Related Posts Section (Placeholder) */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
        <div>
          {/* Logic for fetching and displaying related posts goes here */}
          <p className="text-gray-600">Coming soon...</p>
        </div>
      </section>
    </article>
  );
}
