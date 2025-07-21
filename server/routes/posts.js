const express = require('express');
const { protect, optionalAuth } = require('../middleware/authMiddleware');
const {
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
} = require('../controllers/postController');

const router = express.Router();

// Public routes (with optional auth)
router.get('/', optionalAuth, getAllPosts);
router.get('/trending', optionalAuth, getTrendingPosts);
router.get('/featured', optionalAuth, getFeaturedPosts);
router.get('/author/:authorId', optionalAuth, getPostsByAuthor);
router.get('/:slug', optionalAuth, getPostBySlug);

// Protected routes
router.use(protect);

router.get('/my-posts', getMyPosts);
router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.post('/:id/like', toggleLike);
router.post('/:id/bookmark', toggleBookmark);

module.exports = router; 