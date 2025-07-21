const express = require('express');
const { protect, optionalAuth, restrictTo } = require('../middleware/authMiddleware');
const {
  getCommentsForPost,
  createComment,
  updateComment,
  deleteComment,
  toggleLike,
  getReplies,
  getMyComments,
  moderateComment
} = require('../controllers/commentController');

const router = express.Router();

// Public routes (with optional auth)
router.get('/post/:postId', optionalAuth, getCommentsForPost);
router.get('/:id/replies', optionalAuth, getReplies);

// Protected routes
router.use(protect);

router.get('/my-comments', getMyComments);
router.post('/', createComment);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);
router.post('/:id/like', toggleLike);

// Admin/Moderator routes
router.patch('/:id/moderate', restrictTo('admin', 'moderator'), moderateComment);

module.exports = router; 