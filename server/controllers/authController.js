const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const asyncWrapper = require('../utils/asyncWrapper');
const AppError = require('../utils/AppError');
const User = require('../models/User');
const logger = require('../utils/logger');

// Generate JWT tokens
const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '15m' }
  );

  const refreshToken = jwt.sign(
    { id: userId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' }
  );

  return { accessToken, refreshToken };
};

// Set token cookies
const setTokenCookies = (res, accessToken, refreshToken) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  };

  res.cookie('accessToken', accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000 // 15 minutes
  });

  res.cookie('refreshToken', refreshToken, cookieOptions);
};

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
const register = asyncWrapper(async (req, res, next) => {
  const { username, email, password, passwordConfirm, firstName, lastName } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({
    $or: [{ email }, { username }]
  });

  if (existingUser) {
    return next(new AppError('User with this email or username already exists', 400));
  }

  // Create user
  const user = await User.create({
    username,
    email,
    password,
    passwordConfirm,
    firstName,
    lastName
  });

  // Generate tokens
  const { accessToken, refreshToken } = generateTokens(user._id);

  // Add refresh token to user
  user.addRefreshToken(refreshToken);
  await user.save();

  // Set cookies
  setTokenCookies(res, accessToken, refreshToken);

  // Update last login
  user.lastLogin = new Date();
  await user.save();

  // Remove password from output
  user.password = undefined;

  logger.info(`New user registered: ${user.email}`);

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      user,
      accessToken,
      refreshToken
    }
  });
});

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  // Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // Check if user is active
  if (!user.isActive) {
    return next(new AppError('Your account has been deactivated', 401));
  }

  // Generate tokens
  const { accessToken, refreshToken } = generateTokens(user._id);

  // Add refresh token to user
  user.addRefreshToken(refreshToken);
  await user.save();

  // Set cookies
  setTokenCookies(res, accessToken, refreshToken);

  // Update last login
  user.lastLogin = new Date();
  await user.save();

  // Remove password from output
  user.password = undefined;

  logger.info(`User logged in: ${user.email}`);

  res.status(200).json({
    success: true,
    message: 'Logged in successfully',
    data: {
      user,
      accessToken,
      refreshToken
    }
  });
});

// @desc    Logout user
// @route   POST /api/v1/auth/logout
// @access  Private
const logout = asyncWrapper(async (req, res, next) => {
  const { refreshToken } = req.cookies;

  if (refreshToken) {
    // Remove refresh token from user
    const user = await User.findById(req.user.id);
    if (user) {
      user.removeRefreshToken(refreshToken);
      await user.save();
    }
  }

  // Clear cookies
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');

  logger.info(`User logged out: ${req.user.email}`);

  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
});

// @desc    Refresh access token
// @route   POST /api/v1/auth/refresh-token
// @access  Public
const refreshToken = asyncWrapper(async (req, res, next) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return next(new AppError('No refresh token provided', 401));
  }

  try {
    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // Check if user exists
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new AppError('User not found', 401));
    }

    // Check if refresh token exists in user's tokens
    const tokenExists = user.refreshTokens.some(rt => rt.token === refreshToken);
    if (!tokenExists) {
      return next(new AppError('Invalid refresh token', 401));
    }

    // Generate new tokens
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = generateTokens(user._id);

    // Remove old refresh token and add new one
    user.removeRefreshToken(refreshToken);
    user.addRefreshToken(newRefreshToken);
    await user.save();

    // Set new cookies
    setTokenCookies(res, newAccessToken, newRefreshToken);

    res.status(200).json({
      success: true,
      message: 'Token refreshed successfully',
      data: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
      }
    });
  } catch (error) {
    return next(new AppError('Invalid refresh token', 401));
  }
});

// @desc    Get current user
// @route   GET /api/v1/auth/me
// @access  Private
const getMe = asyncWrapper(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: {
      user
    }
  });
});

// @desc    Forgot password
// @route   POST /api/v1/auth/forgot-password
// @access  Public
const forgotPassword = asyncWrapper(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError('There is no user with this email address', 404));
  }

  // Generate random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // TODO: Send email with reset token
  // For now, just return the token (in production, send via email)
  logger.info(`Password reset token for ${email}: ${resetToken}`);

  res.status(200).json({
    success: true,
    message: 'Password reset token sent to email',
    data: {
      resetToken: process.env.NODE_ENV === 'development' ? resetToken : undefined
    }
  });
});

// @desc    Reset password
// @route   PATCH /api/v1/auth/reset-password/:token
// @access  Public
const resetPassword = asyncWrapper(async (req, res, next) => {
  // Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }

  // Set new password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // Generate tokens
  const { accessToken, refreshToken } = generateTokens(user._id);

  // Add refresh token to user
  user.addRefreshToken(refreshToken);
  await user.save();

  // Set cookies
  setTokenCookies(res, accessToken, refreshToken);

  // Remove password from output
  user.password = undefined;

  logger.info(`Password reset for user: ${user.email}`);

  res.status(200).json({
    success: true,
    message: 'Password reset successful',
    data: {
      user,
      accessToken,
      refreshToken
    }
  });
});

// @desc    Update password
// @route   PATCH /api/v1/auth/update-password
// @access  Private
const updatePassword = asyncWrapper(async (req, res, next) => {
  const { currentPassword, newPassword, newPasswordConfirm } = req.body;

  // Get user from collection
  const user = await User.findById(req.user.id).select('+password');

  // Check current password
  if (!(await user.correctPassword(currentPassword, user.password))) {
    return next(new AppError('Your current password is incorrect', 401));
  }

  // Update password
  user.password = newPassword;
  user.passwordConfirm = newPasswordConfirm;
  await user.save();

  // Generate tokens
  const { accessToken, refreshToken } = generateTokens(user._id);

  // Add refresh token to user
  user.addRefreshToken(refreshToken);
  await user.save();

  // Set cookies
  setTokenCookies(res, accessToken, refreshToken);

  // Remove password from output
  user.password = undefined;

  logger.info(`Password updated for user: ${user.email}`);

  res.status(200).json({
    success: true,
    message: 'Password updated successfully',
    data: {
      user,
      accessToken,
      refreshToken
    }
  });
});

module.exports = {
  register,
  login,
  logout,
  refreshToken,
  getMe,
  forgotPassword,
  resetPassword,
  updatePassword
}; 