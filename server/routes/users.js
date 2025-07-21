const express = require('express');
const { protect, restrictTo } = require('../middleware/authMiddleware');
const {
  getProfile,
  updateProfile,
  getUserById,
  getAllUsers,
  updateUserStatus,
  getUserStats,
  updateSkills,
  getUserActivity
} = require('../controllers/userController');

const router = express.Router();

// Protect all routes after this middleware
router.use(protect);

// User profile routes
router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.patch('/skills', updateSkills);

// User routes
router.get('/:id', getUserById);
router.get('/:id/stats', getUserStats);
router.get('/:id/activity', getUserActivity);

// Admin only routes
router.use(restrictTo('admin', 'moderator'));

router.get('/', getAllUsers);
router.patch('/:id/status', updateUserStatus);

module.exports = router; 