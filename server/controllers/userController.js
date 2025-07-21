const asyncWrapper = require('../utils/asyncWrapper');
const AppError = require('../utils/AppError');
const User = require('../models/User');
const logger = require('../utils/logger');

// @desc    Get user profile
// @route   GET /api/v1/users/profile
// @access  Private
const getProfile = asyncWrapper(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: {
      user
    }
  });
});

// @desc    Update user profile
// @route   PUT /api/v1/users/profile
// @access  Private
const updateProfile = asyncWrapper(async (req, res, next) => {
  const {
    firstName,
    lastName,
    bio,
    avatar,
    location,
    website,
    socialLinks,
    skills,
    experience,
    preferences
  } = req.body;

  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  // Update allowed fields
  if (firstName) user.firstName = firstName;
  if (lastName) user.lastName = lastName;
  if (bio !== undefined) user.bio = bio;
  if (avatar) user.avatar = avatar;
  if (location) user.location = location;
  if (website) user.website = website;
  if (socialLinks) user.socialLinks = { ...user.socialLinks, ...socialLinks };
  if (skills) user.skills = skills;
  if (experience) user.experience = experience;
  if (preferences) user.preferences = { ...user.preferences, ...preferences };

  await user.save();

  logger.info(`User profile updated: ${user.email}`);

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    data: {
      user
    }
  });
});

// @desc    Get user by ID
// @route   GET /api/v1/users/:id
// @access  Private
const getUserById = asyncWrapper(async (req, res, next) => {
  const user = await User.findById(req.params.id)
    .select('-password -refreshTokens -passwordResetToken -passwordResetExpires -emailVerificationToken -emailVerificationExpires');

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.status(200).json({
    success: true,
    data: {
      user
    }
  });
});

// @desc    Get all users (Admin/Moderator only)
// @route   GET /api/v1/users
// @access  Private (Admin/Moderator)
const getAllUsers = asyncWrapper(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const query = {};

  // Filter by role
  if (req.query.role) {
    query.role = req.query.role;
  }

  // Filter by status
  if (req.query.isActive !== undefined) {
    query.isActive = req.query.isActive === 'true';
  }

  // Search by username or email
  if (req.query.search) {
    query.$or = [
      { username: { $regex: req.query.search, $options: 'i' } },
      { email: { $regex: req.query.search, $options: 'i' } }
    ];
  }

  const users = await User.find(query)
    .select('-password -refreshTokens -passwordResetToken -passwordResetExpires -emailVerificationToken -emailVerificationExpires')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments(query);

  res.status(200).json({
    success: true,
    data: {
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }
  });
});

// @desc    Update user status (Admin/Moderator only)
// @route   PATCH /api/v1/users/:id/status
// @access  Private (Admin/Moderator)
const updateUserStatus = asyncWrapper(async (req, res, next) => {
  const { isActive, role } = req.body;

  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  // Prevent admin from deactivating themselves
  if (user._id.toString() === req.user.id && isActive === false) {
    return next(new AppError('You cannot deactivate your own account', 400));
  }

  // Prevent non-admin from changing roles
  if (role && req.user.role !== 'admin') {
    return next(new AppError('Only admins can change user roles', 403));
  }

  if (isActive !== undefined) user.isActive = isActive;
  if (role) user.role = role;

  await user.save();

  logger.info(`User status updated by ${req.user.email}: ${user.email} - Active: ${user.isActive}, Role: ${user.role}`);

  res.status(200).json({
    success: true,
    message: 'User status updated successfully',
    data: {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        isActive: user.isActive,
        role: user.role
      }
    }
  });
});

// @desc    Get user statistics
// @route   GET /api/v1/users/:id/stats
// @access  Private
const getUserStats = asyncWrapper(async (req, res, next) => {
  const user = await User.findById(req.params.id)
    .select('stats username');

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  res.status(200).json({
    success: true,
    data: {
      username: user.username,
      stats: user.stats
    }
  });
});

// @desc    Update user skills
// @route   PATCH /api/v1/users/skills
// @access  Private
const updateSkills = asyncWrapper(async (req, res, next) => {
  const { skills } = req.body;

  if (!Array.isArray(skills)) {
    return next(new AppError('Skills must be an array', 400));
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  user.skills = skills;
  await user.save();

  logger.info(`User skills updated: ${user.email}`);

  res.status(200).json({
    success: true,
    message: 'Skills updated successfully',
    data: {
      skills: user.skills
    }
  });
});

// @desc    Get user activity
// @route   GET /api/v1/users/:id/activity
// @access  Private
const getUserActivity = asyncWrapper(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  // TODO: Implement activity tracking
  // This would typically involve querying multiple collections
  // for posts, comments, bounties, courses, etc.

  res.status(200).json({
    success: true,
    data: {
      message: 'Activity tracking to be implemented',
      user: {
        id: user._id,
        username: user.username,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt
      }
    }
  });
});

module.exports = {
  getProfile,
  updateProfile,
  getUserById,
  getAllUsers,
  updateUserStatus,
  getUserStats,
  updateSkills,
  getUserActivity
}; 