const asyncWrapper = require('../utils/asyncWrapper');
const AppError = require('../utils/AppError');
const Comment = require('../models/Comment');
const Post = require('../models/Post');
const logger = require('../utils/logger');

// @desc    Get comments for a post
// @route   GET /api/v1/comments/post/:postId
// @access  Public
const getCommentsForPost = asyncWrapper(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  // Check if post exists
  const post = await Post.findById(req.params.postId);
  if (!post) {
    return next(new AppError('Post not found', 404));
  }

  const comments = await Comment.getCommentsForPost(req.params.postId, page, limit);

  res.status(200).json({
    success: true,
    data: {
      comments,
      post: {
        id: post._id,
        title: post.title,
        slug: post.slug
      }
    }
  });
});

// @desc    Create new comment
// @route   POST /api/v1/comments
// @access  Private
const createComment = asyncWrapper(async (req, res, next) => {
  const { content, postId, parentCommentId } = req.body;

  // Check if post exists
  const post = await Post.findById(postId);
  if (!post) {
    return next(new AppError('Post not found', 404));
  }

  // Check if post allows comments
  if (!post.allowComments) {
    return next(new AppError('Comments are disabled for this post', 400));
  }

  // Check if post is published
  if (post.status !== 'published') {
    return next(new AppError('Cannot comment on unpublished posts', 400));
  }

  // If this is a reply, check if parent comment exists
  if (parentCommentId) {
    const parentComment = await Comment.findById(parentCommentId);
    if (!parentComment) {
      return next(new AppError('Parent comment not found', 404));
    }
  }

  const comment = await Comment.create({
    content,
    post: postId,
    parentComment: parentCommentId || null,
    author: req.user.id
  });

  await comment.populate('author', 'username firstName lastName avatar');

  // Update post comment count
  post.stats.commentsCount = (post.stats.commentsCount || 0) + 1;
  await post.save();

  logger.info(`New comment created by ${req.user.email} on post: ${post.title}`);

  res.status(201).json({
    success: true,
    message: 'Comment created successfully',
    data: {
      comment
    }
  });
});

// @desc    Update comment
// @route   PUT /api/v1/comments/:id
// @access  Private
const updateComment = asyncWrapper(async (req, res, next) => {
  const { content } = req.body;

  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(new AppError('Comment not found', 404));
  }

  // Check if user is author or admin/moderator
  if (comment.author.toString() !== req.user.id && !['admin', 'moderator'].includes(req.user.role)) {
    return next(new AppError('You can only update your own comments', 403));
  }

  // Check if comment is deleted
  if (comment.isDeleted) {
    return next(new AppError('Cannot update deleted comment', 400));
  }

  comment.content = content;
  comment.isEdited = true;
  comment.editedAt = new Date();

  await comment.save();
  await comment.populate('author', 'username firstName lastName avatar');

  logger.info(`Comment updated by ${req.user.email}`);

  res.status(200).json({
    success: true,
    message: 'Comment updated successfully',
    data: {
      comment
    }
  });
});

// @desc    Delete comment
// @route   DELETE /api/v1/comments/:id
// @access  Private
const deleteComment = asyncWrapper(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(new AppError('Comment not found', 404));
  }

  // Check if user is author or admin/moderator
  if (comment.author.toString() !== req.user.id && !['admin', 'moderator'].includes(req.user.role)) {
    return next(new AppError('You can only delete your own comments', 403));
  }

  // Soft delete the comment
  await comment.softDelete();

  // Update post comment count
  const post = await Post.findById(comment.post);
  if (post) {
    post.stats.commentsCount = Math.max(0, (post.stats.commentsCount || 0) - 1);
    await post.save();
  }

  logger.info(`Comment deleted by ${req.user.email}`);

  res.status(200).json({
    success: true,
    message: 'Comment deleted successfully'
  });
});

// @desc    Like/unlike comment
// @route   POST /api/v1/comments/:id/like
// @access  Private
const toggleLike = asyncWrapper(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(new AppError('Comment not found', 404));
  }

  if (comment.isDeleted) {
    return next(new AppError('Cannot like deleted comment', 400));
  }

  await comment.toggleLike(req.user.id);

  res.status(200).json({
    success: true,
    message: 'Comment like toggled successfully',
    data: {
      likesCount: comment.likesCount
    }
  });
});

// @desc    Get comment replies
// @route   GET /api/v1/comments/:id/replies
// @access  Public
const getReplies = asyncWrapper(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    return next(new AppError('Comment not found', 404));
  }

  const replies = await Comment.getReplies(req.params.id, page, limit);

  res.status(200).json({
    success: true,
    data: {
      replies,
      parentComment: {
        id: comment._id,
        content: comment.content,
        author: comment.author
      }
    }
  });
});

// @desc    Get user's comments
// @route   GET /api/v1/comments/my-comments
// @access  Private
const getMyComments = asyncWrapper(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const comments = await Comment.find({ 
    author: req.user.id,
    isDeleted: false
  })
    .populate('author', 'username firstName lastName avatar')
    .populate('post', 'title slug')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Comment.countDocuments({ 
    author: req.user.id,
    isDeleted: false
  });

  res.status(200).json({
    success: true,
    data: {
      comments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }
  });
});

// @desc    Moderate comment (Admin/Moderator only)
// @route   PATCH /api/v1/comments/:id/moderate
// @access  Private (Admin/Moderator)
const moderateComment = asyncWrapper(async (req, res, next) => {
  const { isModerated, moderationReason } = req.body;

  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(new AppError('Comment not found', 404));
  }

  comment.isModerated = isModerated;
  comment.moderatedBy = req.user.id;
  comment.moderatedAt = new Date();
  comment.moderationReason = moderationReason;

  await comment.save();

  logger.info(`Comment moderated by ${req.user.email}: ${comment._id}`);

  res.status(200).json({
    success: true,
    message: 'Comment moderated successfully',
    data: {
      comment: {
        id: comment._id,
        isModerated: comment.isModerated,
        moderationReason: comment.moderationReason,
        moderatedAt: comment.moderatedAt
      }
    }
  });
});

module.exports = {
  getCommentsForPost,
  createComment,
  updateComment,
  deleteComment,
  toggleLike,
  getReplies,
  getMyComments,
  moderateComment
}; 