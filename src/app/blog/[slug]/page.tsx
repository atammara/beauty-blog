import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getBlogPost } from '@/lib/api'; 
import CommentSection from '@/components/comment-section';
import FavoriteButton from '@/components/favorite-button';

interface BlogPostParams {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostParams) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    return { title: 'Not Found' };
  }

  return {
    title: post.title,
    description: post.content, 
  };
}

export default async function BlogPost({ params }: BlogPostParams) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto">
      {/* Title and metadata */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-gray-600">
            <span>{post.category}</span>
            <span>•</span>
            <time>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          </div>
          <FavoriteButton postId={post.id} />
        </div>
      </div>

      {/* Featured Image */}
      <div className="relative aspect-video mb-8">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover rounded-lg"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Post Content */}
      <div className="prose prose-lg max-w-none mb-12">
        {(post.content as string).split('\n').map((paragraph: string, index: number) => (
          <p key={index} className="mb-4">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Comments Section */}
      <CommentSection postSlug={params.slug} />

      {/* Placeholder for related posts */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
        {/* Add related posts logic here */}
      </section>
    </article>
  );
}
