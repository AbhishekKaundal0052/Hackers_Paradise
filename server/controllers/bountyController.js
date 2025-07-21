const asyncWrapper = require('../utils/asyncWrapper');
const AppError = require('../utils/AppError');
const Bounty = require('../models/Bounty');
const logger = require('../utils/logger');

// @desc    Get all bounties
// @route   GET /api/v1/bounties
// @access  Public
const getAllBounties = asyncWrapper(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const filters = {};

  // Apply filters
  if (req.query.category) filters.category = req.query.category;
  if (req.query.difficulty) filters.difficulty = req.query.difficulty;
  if (req.query.minReward) filters.minReward = parseInt(req.query.minReward);
  if (req.query.maxReward) filters.maxReward = parseInt(req.query.maxReward);
  if (req.query.tags) filters.tags = req.query.tags.split(',');

  const bounties = await Bounty.getOpenBounties(page, limit, filters);

  res.status(200).json({
    success: true,
    data: {
      bounties
    }
  });
});

// @desc    Get bounty by ID
// @route   GET /api/v1/bounties/:id
// @access  Public
const getBountyById = asyncWrapper(async (req, res, next) => {
  const bounty = await Bounty.findById(req.params.id)
    .populate('creator', 'username firstName lastName avatar')
    .populate('assignedTo', 'username firstName lastName avatar')
    .populate('completedBy', 'username firstName lastName avatar');

  if (!bounty) {
    return next(new AppError('Bounty not found', 404));
  }

  // Check if user has access to private bounty
  if (!bounty.isPublic && bounty.creator.toString() !== req.user?.id && !bounty.allowedUsers.includes(req.user?.id)) {
    return next(new AppError('Access denied to this bounty', 403));
  }

  // Increment views
  await bounty.incrementViews();

  res.status(200).json({
    success: true,
    data: {
      bounty
    }
  });
});

// @desc    Create new bounty
// @route   POST /api/v1/bounties
// @access  Private
const createBounty = asyncWrapper(async (req, res, next) => {
  const {
    title,
    description,
    reward,
    difficulty,
    category,
    tags,
    requirements,
    acceptanceCriteria,
    deadline,
    isPublic = true,
    allowedUsers
  } = req.body;

  const bounty = await Bounty.create({
    title,
    description,
    reward,
    difficulty,
    category,
    tags,
    requirements,
    acceptanceCriteria,
    deadline,
    isPublic,
    allowedUsers,
    creator: req.user.id
  });

  await bounty.populate('creator', 'username firstName lastName avatar');

  logger.info(`New bounty created: ${bounty.title} by ${req.user.email}`);

  res.status(201).json({
    success: true,
    message: 'Bounty created successfully',
    data: {
      bounty
    }
  });
});

// @desc    Update bounty
// @route   PUT /api/v1/bounties/:id
// @access  Private
const updateBounty = asyncWrapper(async (req, res, next) => {
  const bounty = await Bounty.findById(req.params.id);

  if (!bounty) {
    return next(new AppError('Bounty not found', 404));
  }

  // Check if user is creator or admin/moderator
  if (bounty.creator.toString() !== req.user.id && !['admin', 'moderator'].includes(req.user.role)) {
    return next(new AppError('You can only update your own bounties', 403));
  }

  // Prevent updates if bounty is completed
  if (bounty.status === 'completed') {
    return next(new AppError('Cannot update completed bounty', 400));
  }

  const {
    title,
    description,
    reward,
    difficulty,
    category,
    tags,
    requirements,
    acceptanceCriteria,
    deadline,
    isPublic,
    allowedUsers
  } = req.body;

  // Update fields
  if (title) bounty.title = title;
  if (description) bounty.description = description;
  if (reward) bounty.reward = reward;
  if (difficulty) bounty.difficulty = difficulty;
  if (category) bounty.category = category;
  if (tags) bounty.tags = tags;
  if (requirements) bounty.requirements = requirements;
  if (acceptanceCriteria) bounty.acceptanceCriteria = acceptanceCriteria;
  if (deadline) bounty.deadline = deadline;
  if (isPublic !== undefined) bounty.isPublic = isPublic;
  if (allowedUsers) bounty.allowedUsers = allowedUsers;

  await bounty.save();
  await bounty.populate('creator', 'username firstName lastName avatar');

  logger.info(`Bounty updated: ${bounty.title} by ${req.user.email}`);

  res.status(200).json({
    success: true,
    message: 'Bounty updated successfully',
    data: {
      bounty
    }
  });
});

// @desc    Delete bounty
// @route   DELETE /api/v1/bounties/:id
// @access  Private
const deleteBounty = asyncWrapper(async (req, res, next) => {
  const bounty = await Bounty.findById(req.params.id);

  if (!bounty) {
    return next(new AppError('Bounty not found', 404));
  }

  // Check if user is creator or admin/moderator
  if (bounty.creator.toString() !== req.user.id && !['admin', 'moderator'].includes(req.user.role)) {
    return next(new AppError('You can only delete your own bounties', 403));
  }

  // Prevent deletion if bounty has submissions
  if (bounty.submissions.length > 0) {
    return next(new AppError('Cannot delete bounty with submissions', 400));
  }

  await Bounty.findByIdAndDelete(req.params.id);

  logger.info(`Bounty deleted: ${bounty.title} by ${req.user.email}`);

  res.status(200).json({
    success: true,
    message: 'Bounty deleted successfully'
  });
});

// @desc    Bookmark/unbookmark bounty
// @route   POST /api/v1/bounties/:id/bookmark
// @access  Private
const toggleBookmark = asyncWrapper(async (req, res, next) => {
  const bounty = await Bounty.findById(req.params.id);

  if (!bounty) {
    return next(new AppError('Bounty not found', 404));
  }

  if (bounty.status !== 'open') {
    return next(new AppError('Cannot bookmark non-open bounties', 400));
  }

  await bounty.toggleBookmark(req.user.id);

  res.status(200).json({
    success: true,
    message: 'Bounty bookmark toggled successfully',
    data: {
      bookmarksCount: bounty.bookmarksCount
    }
  });
});

// @desc    Assign bounty to user
// @route   POST /api/v1/bounties/:id/assign
// @access  Private
const assignBounty = asyncWrapper(async (req, res, next) => {
  const { userId } = req.body;

  const bounty = await Bounty.findById(req.params.id);

  if (!bounty) {
    return next(new AppError('Bounty not found', 404));
  }

  // Check if user is creator or admin/moderator
  if (bounty.creator.toString() !== req.user.id && !['admin', 'moderator'].includes(req.user.role)) {
    return next(new AppError('You can only assign your own bounties', 403));
  }

  if (bounty.status !== 'open') {
    return next(new AppError('Bounty is not open for assignment', 400));
  }

  await bounty.assignBounty(userId);
  await bounty.populate('assignedTo', 'username firstName lastName avatar');

  logger.info(`Bounty assigned: ${bounty.title} to user ${userId} by ${req.user.email}`);

  res.status(200).json({
    success: true,
    message: 'Bounty assigned successfully',
    data: {
      bounty
    }
  });
});

// @desc    Submit bounty solution
// @route   POST /api/v1/bounties/:id/submit
// @access  Private
const submitSolution = asyncWrapper(async (req, res, next) => {
  const { title, description, proofOfConcept, attachments } = req.body;

  const bounty = await Bounty.findById(req.params.id);

  if (!bounty) {
    return next(new AppError('Bounty not found', 404));
  }

  if (bounty.status !== 'open' && bounty.status !== 'in-progress') {
    return next(new AppError('Bounty is not accepting submissions', 400));
  }

  // Check if user is assigned to this bounty or if it's open to all
  if (bounty.status === 'in-progress' && bounty.assignedTo?.toString() !== req.user.id) {
    return next(new AppError('You are not assigned to this bounty', 403));
  }

  // Check if user has already submitted
  const existingSubmission = bounty.submissions.find(sub => sub.user.toString() === req.user.id);
  if (existingSubmission) {
    return next(new AppError('You have already submitted a solution for this bounty', 400));
  }

  bounty.submissions.push({
    user: req.user.id,
    title,
    description,
    proofOfConcept,
    attachments: attachments || []
  });

  await bounty.save();
  await bounty.populate('submissions.user', 'username firstName lastName avatar');

  logger.info(`Bounty solution submitted: ${bounty.title} by ${req.user.email}`);

  res.status(201).json({
    success: true,
    message: 'Solution submitted successfully',
    data: {
      submission: bounty.submissions[bounty.submissions.length - 1]
    }
  });
});

// @desc    Get bounty submissions
// @route   GET /api/v1/bounties/:id/submissions
// @access  Private
const getSubmissions = asyncWrapper(async (req, res, next) => {
  const bounty = await Bounty.findById(req.params.id)
    .populate('submissions.user', 'username firstName lastName avatar')
    .populate('submissions.reviewedBy', 'username firstName lastName avatar');

  if (!bounty) {
    return next(new AppError('Bounty not found', 404));
  }

  // Check if user is creator or admin/moderator
  if (bounty.creator.toString() !== req.user.id && !['admin', 'moderator'].includes(req.user.role)) {
    return next(new AppError('You can only view submissions for your own bounties', 403));
  }

  res.status(200).json({
    success: true,
    data: {
      submissions: bounty.submissions,
      bounty: {
        id: bounty._id,
        title: bounty.title,
        status: bounty.status
      }
    }
  });
});

// @desc    Review submission (Admin/Moderator only)
// @route   PATCH /api/v1/bounties/:id/submissions/:submissionId
// @access  Private (Admin/Moderator)
const reviewSubmission = asyncWrapper(async (req, res, next) => {
  const { status, reviewNotes } = req.body;

  const bounty = await Bounty.findById(req.params.id);

  if (!bounty) {
    return next(new AppError('Bounty not found', 404));
  }

  const submission = bounty.submissions.id(req.params.submissionId);
  if (!submission) {
    return next(new AppError('Submission not found', 404));
  }

  submission.status = status;
  submission.reviewedBy = req.user.id;
  submission.reviewedAt = new Date();
  submission.reviewNotes = reviewNotes;

  // If approved, complete the bounty
  if (status === 'approved') {
    bounty.status = 'completed';
    bounty.completedBy = submission.user;
    bounty.completedAt = new Date();
  }

  await bounty.save();
  await bounty.populate('submissions.user', 'username firstName lastName avatar');

  logger.info(`Submission reviewed: ${bounty.title} by ${req.user.email} - Status: ${status}`);

  res.status(200).json({
    success: true,
    message: 'Submission reviewed successfully',
    data: {
      submission,
      bounty: {
        id: bounty._id,
        title: bounty.title,
        status: bounty.status
      }
    }
  });
});

// @desc    Get trending bounties
// @route   GET /api/v1/bounties/trending
// @access  Public
const getTrendingBounties = asyncWrapper(async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 10;

  const bounties = await Bounty.getTrending(limit);

  res.status(200).json({
    success: true,
    data: {
      bounties
    }
  });
});

// @desc    Get user's bounties
// @route   GET /api/v1/bounties/my-bounties
// @access  Private
const getMyBounties = asyncWrapper(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const bounties = await Bounty.find({ creator: req.user.id })
    .populate('creator', 'username firstName lastName avatar')
    .populate('assignedTo', 'username firstName lastName avatar')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Bounty.countDocuments({ creator: req.user.id });

  res.status(200).json({
    success: true,
    data: {
      bounties,
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
}; 