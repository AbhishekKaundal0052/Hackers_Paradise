'use client';
import React, { useState } from 'react';
import { Comment, User } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, Reply, Send } from 'lucide-react';

interface CommentSectionProps {
  comments: Comment[];
  postId: string;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ comments, postId }) => {
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      // TODO: Submit comment to API
      console.log('Submitting comment:', newComment);
      setNewComment('');
    }
  };

  const handleSubmitReply = (commentId: string) => {
    if (replyText.trim()) {
      // TODO: Submit reply to API
      console.log('Submitting reply to', commentId, ':', replyText);
      setReplyText('');
      setReplyingTo(null);
    }
  };

  const CommentItem: React.FC<{ comment: Comment; level?: number }> = ({ comment, level = 0 }) => (
    <div className={`${level > 0 ? 'ml-8 border-l-2 border-slate-700 pl-4' : ''}`}>
      <div className="flex items-start gap-3 mb-4">
        <img 
          src={comment.author.avatar || '/public/avatar.svg'} 
          alt={comment.author.username} 
          className="w-8 h-8 rounded-full bg-white object-cover flex-shrink-0" 
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-white font-semibold">{comment.author.username}</span>
            <span className="text-xs text-gray-400">
              {new Date(comment.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p className="text-gray-300 mb-2">{comment.content}</p>
          <Button
            onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
          >
            <Reply className="w-4 h-4 mr-1" />
            Reply
          </Button>
        </div>
      </div>

      {/* Reply Form */}
      {replyingTo === comment.id && (
        <div className="mb-4">
          <Textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
            className="mb-2"
            rows={3}
          />
          <div className="flex gap-2">
            <Button
              onClick={() => handleSubmitReply(comment.id)}
              size="sm"
              className="flex items-center gap-1"
            >
              <Send className="w-4 h-4" />
              Reply
            </Button>
            <Button
              onClick={() => setReplyingTo(null)}
              variant="outline"
              size="sm"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <Card className="bg-slate-800/80 border-slate-700">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <MessageCircle className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-semibold text-white">Comments ({comments.length})</h3>
        </div>

        {/* Comment Form */}
        <div className="mb-8">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts..."
            className="mb-3"
            rows={4}
          />
          <Button
            onClick={handleSubmitComment}
            className="flex items-center gap-1"
          >
            <Send className="w-4 h-4" />
            Post Comment
          </Button>
        </div>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No comments yet. Be the first to comment!</p>
          ) : (
            comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}; 