const asyncWrapper = require('../utils/asyncWrapper');
const AppError = require('../utils/AppError');
const Post = require('../models/Post');
const logger = require('../utils/logger');

// @desc    Get all posts
// @route   GET /api/v1/posts
// @access  Public
const getAllPosts = asyncWrapper(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const query = { status: 'published' };

  // Filter by category
  if (req.query.category) {
    query.category = req.query.category;
  }

  // Filter by type
  if (req.query.type) {
    query.type = req.query.type;
  }

  // Filter by author
  if (req.query.author) {
    query.author = req.query.author;
  }

  // Filter by tags
  if (req.query.tags) {
    const tags = req.query.tags.split(',');
    query.tags = { $in: tags };
  }

  // Search functionality
  if (req.query.search) {
    query.$text = { $search: req.query.search };
  }

  // Sort options
  let sort = { createdAt: -1 };
  if (req.query.sort === 'popular') {
    sort = { views: -1, likesCount: -1 };
  } else if (req.query.sort === 'trending') {
    sort = { views: -1, createdAt: -1 };
  }

  const posts = await Post.find(query)
    .populate('author', 'username firstName lastName avatar')
    .sort(sort)
    .skip(skip)
    .limit(limit);

  const total = await Post.countDocuments(query);

  res.status(200).json({
    success: true,
    data: {
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }
  });
});

// @desc    Get post by slug
// @route   GET /api/v1/posts/:slug
// @access  Public
const getPostBySlug = asyncWrapper(async (req, res, next) => {
  const post = await Post.findOne({ slug: req.params.slug, status: 'published' })
    .populate('author', 'username firstName lastName avatar bio');

  if (!post) {
    return next(new AppError('Post not found', 404));
  }

  // Increment views
  await post.incrementViews();

  res.status(200).json({
    success: true,
    data: {
      post
    }
  });
});

// @desc    Create new post
// @route   POST /api/v1/posts
// @access  Private
const createPost = asyncWrapper(async (req, res, next) => {
  const {
    title,
    content,
    excerpt,
    type,
    category,
    tags,
    featuredImage,
    metaTitle,
    metaDescription,
    status = 'draft'
  } = req.body;

  const post = await Post.create({
    title,
    content,
    excerpt,
    type,
    category,
    tags,
    featuredImage,
    metaTitle,
    metaDescription,
    status,
    author: req.user.id
  });

  await post.populate('author', 'username firstName lastName avatar');

  logger.info(`New post created: ${post.title} by ${req.user.email}`);

  res.status(201).json({
    success: true,
    message: 'Post created successfully',
    data: {
      post
    }
  });
});

// @desc    Update post
// @route   PUT /api/v1/posts/:id
// @access  Private
const updatePost = asyncWrapper(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new AppError('Post not found', 404));
  }

  // Check if user is author or admin/moderator
  if (post.author.toString() !== req.user.id && !['admin', 'moderator'].includes(req.user.role)) {
    return next(new AppError('You can only update your own posts', 403));
  }

  const {
    title,
    content,
    excerpt,
    type,
    category,
    tags,
    featuredImage,
    metaTitle,
    metaDescription,
    status
  } = req.body;

  // Update fields
  if (title) post.title = title;
  if (content) post.content = content;
  if (excerpt !== undefined) post.excerpt = excerpt;
  if (type) post.type = type;
  if (category) post.category = category;
  if (tags) post.tags = tags;
  if (featuredImage !== undefined) post.featuredImage = featuredImage;
  if (metaTitle) post.metaTitle = metaTitle;
  if (metaDescription) post.metaDescription = metaDescription;
  if (status) post.status = status;

  await post.save();
  await post.populate('author', 'username firstName lastName avatar');

  logger.info(`Post updated: ${post.title} by ${req.user.email}`);

  res.status(200).json({
    success: true,
    message: 'Post updated successfully',
    data: {
      post
    }
  });
});

// @desc    Delete post
// @route   DELETE /api/v1/posts/:id
// @access  Private
const deletePost = asyncWrapper(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new AppError('Post not found', 404));
  }

  // Check if user is author or admin/moderator
  if (post.author.toString() !== req.user.id && !['admin', 'moderator'].includes(req.user.role)) {
    return next(new AppError('You can only delete your own posts', 403));
  }

  await Post.findByIdAndDelete(req.params.id);

  logger.info(`Post deleted: ${post.title} by ${req.user.email}`);

  res.status(200).json({
    success: true,
    message: 'Post deleted successfully'
  });
});

// @desc    Like/unlike post
// @route   POST /api/v1/posts/:id/like
// @access  Private
const toggleLike = asyncWrapper(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new AppError('Post not found', 404));
  }

  if (post.status !== 'published') {
    return next(new AppError('Cannot like unpublished posts', 400));
  }

  await post.toggleLike(req.user.id);

  res.status(200).json({
    success: true,
    message: 'Post like toggled successfully',
    data: {
      likesCount: post.likesCount
    }
  });
});

// @desc    Bookmark/unbookmark post
// @route   POST /api/v1/posts/:id/bookmark
// @access  Private
const toggleBookmark = asyncWrapper(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new AppError('Post not found', 404));
  }

  if (post.status !== 'published') {
    return next(new AppError('Cannot bookmark unpublished posts', 400));
  }

  await post.toggleBookmark(req.user.id);

  res.status(200).json({
    success: true,
    message: 'Post bookmark toggled successfully',
    data: {
      bookmarksCount: post.bookmarksCount
    }
  });
});

// @desc    Get trending posts
// @route   GET /api/v1/posts/trending
// @access  Public
const getTrendingPosts = asyncWrapper(async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 10;

  const posts = await Post.getTrending(limit);

  res.status(200).json({
    success: true,
    data: {
      posts
    }
  });
});

// @desc    Get featured posts
// @route   GET /api/v1/posts/featured
// @access  Public
const getFeaturedPosts = asyncWrapper(async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 5;

  const posts = await Post.getFeatured(limit);

  res.status(200).json({
    success: true,
    data: {
      posts
    }
  });
});

// @desc    Get posts by author
// @route   GET /api/v1/posts/author/:authorId
// @access  Public
const getPostsByAuthor = asyncWrapper(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const posts = await Post.find({
    author: req.params.authorId,
    status: 'published'
  })
    .populate('author', 'username firstName lastName avatar')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Post.countDocuments({
    author: req.params.authorId,
    status: 'published'
  });

  res.status(200).json({
    success: true,
    data: {
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }
  });
});

// @desc    Get user's posts
// @route   GET /api/v1/posts/my-posts
// @access  Private
const getMyPosts = asyncWrapper(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const posts = await Post.find({ author: req.user.id })
    .populate('author', 'username firstName lastName avatar')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Post.countDocuments({ author: req.user.id });

  res.status(200).json({
    success: true,
    data: {
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }
  });
});

module.exports = {
  getAllPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
  toggleLike,
  toggleBookmark,
  getTrendingPosts,
  getFeaturedPosts,
  getPostsByAuthor,
  getMyPosts
}; 