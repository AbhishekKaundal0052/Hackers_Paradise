const express = require('express');
const { protect, optionalAuth, restrictTo } = require('../middleware/authMiddleware');
const {
  getAllBounties,
  getBountyById,
  createBounty,
  updateBounty,
  deleteBounty,
  toggleBookmark,
  assignBounty,
  submitSolution,
  getSubmissions,
  reviewSubmission,
  getTrendingBounties,
  getMyBounties
} = require('../controllers/bountyController');

const router = express.Router();

// Public routes (with optional auth)
router.get('/', optionalAuth, getAllBounties);
router.get('/trending', optionalAuth, getTrendingBounties);
router.get('/:id', optionalAuth, getBountyById);

// Protected routes
router.use(protect);

router.get('/my-bounties', getMyBounties);
router.post('/', createBounty);
router.put('/:id', updateBounty);
router.delete('/:id', deleteBounty);
router.post('/:id/bookmark', toggleBookmark);
router.post('/:id/assign', assignBounty);
router.post('/:id/submit', submitSolution);
router.get('/:id/submissions', getSubmissions);

// Admin/Moderator routes
router.patch('/:id/submissions/:submissionId', restrictTo('admin', 'moderator'), reviewSubmission);

module.exports = router; 