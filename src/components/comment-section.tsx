'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface Comment {
  id: number;
  author: string;
  content: string;
  createdAt: string;
}

export default function CommentSection({ postSlug }: { postSlug: string }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Simulate fetching comments
    const fetchComments = async () => {
      // In a real app, you'd fetch comments from an API
      await new Promise(resolve => setTimeout(resolve, 500))
      setComments([
        { id: 1, author: 'Alice', content: 'Great article! Very informative.', createdAt: '2024-01-10T12:00:00Z' },
        { id: 2, author: 'Bob', content: 'I learned a lot from this. Thanks for sharing!', createdAt: '2024-01-11T14:30:00Z' },
      ])
    }
    fetchComments()
  }, [postSlug])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call to post comment
    await new Promise(resolve => setTimeout(resolve, 1000))
    const newCommentObj: Comment = {
      id: comments.length + 1,
      author: 'Anonymous',
      content: newComment,
      createdAt: new Date().toISOString(),
    }
    setComments(prev => [...prev, newCommentObj])
    setNewComment('')
    setIsSubmitting(false)
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Comments</h2>
      <div className="space-y-6">
        {comments.map(comment => (
          <div key={comment.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-start mb-2">
              <span className="font-semibold text-gray-800">{comment.author}</span>
              <time className="text-sm text-gray-500">
                {new Date(comment.createdAt).toLocaleDateString()}
              </time>
            </div>
            <p className="text-gray-600">{comment.content}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="mt-8">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Leave a comment..."
          required
          className="w-full mb-4"
          rows={4}
        />
        <Button type="submit" disabled={isSubmitting} className="bg-pink-500 hover:bg-pink-600">
          {isSubmitting ? 'Posting...' : 'Post Comment'}
        </Button>
      </form>
    </section>
  )
}

