'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface Comment {
  id: number;
  author: string;
  content: string;
  createdAt: string;
}

export default function CommentSection({ postSlug }: { postSlug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        // Simulate fetching comments
        await new Promise((resolve) => setTimeout(resolve, 500));
        setComments([
          {
            id: 1,
            author: 'Alice',
            content: 'Great article! Very informative.',
            createdAt: '2024-01-10T12:00:00Z',
          },
          {
            id: 2,
            author: 'Bob',
            content: 'I learned a lot from this. Thanks for sharing!',
            createdAt: '2024-01-11T14:30:00Z',
          },
        ]);
      } catch (err) {
        setError('Failed to load comments. Please try again later.');
      }
    };
    fetchComments();
  }, [postSlug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!newComment.trim()) {
      setError('Please enter a comment.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Simulate API call to post comment
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const newCommentObj: Comment = {
        id: comments.length + 1,
        author: authorName,
        content: newComment,
        createdAt: new Date().toISOString(),
      };
      setComments((prev) => [...prev, newCommentObj]);
      setNewComment('');
      setAuthorName('');
    } catch (err) {
      setError('Failed to post comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Comments</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-start mb-2">
                <span className="font-semibold text-gray-800">{comment.author}</span>
                <time className="text-sm text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </time>
              </div>
              <p className="text-gray-600">{comment.content}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Be the first to leave a comment!</p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-8">
        <input
          type="text"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          placeholder="Your Name"
          className="w-full px-3 py-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-pink-500"
          required
        />
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Leave a comment..."
          required
          className="w-full mb-4"
          rows={4}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded"
        >
          {isSubmitting ? 'Posting...' : 'Post Comment'}
        </Button>
      </form>
    </section>
  );
}
