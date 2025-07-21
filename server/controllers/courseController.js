const asyncWrapper = require('../utils/asyncWrapper');
const AppError = require('../utils/AppError');
const Course = require('../models/Course');
const logger = require('../utils/logger');

// @desc    Get all courses
// @route   GET /api/v1/courses
// @access  Public
const getAllCourses = asyncWrapper(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const filters = {};

  // Apply filters
  if (req.query.category) filters.category = req.query.category;
  if (req.query.level) filters.level = req.query.level;
  if (req.query.instructor) filters.instructor = req.query.instructor;
  if (req.query.isFree !== undefined) filters.isFree = req.query.isFree === 'true';
  if (req.query.tags) filters.tags = req.query.tags.split(',');

  const courses = await Course.getPublishedCourses(page, limit, filters);

  res.status(200).json({
    success: true,
    data: {
      courses
    }
  });
});

// @desc    Get course by slug
// @route   GET /api/v1/courses/:slug
// @access  Public
const getCourseBySlug = asyncWrapper(async (req, res, next) => {
  const course = await Course.findOne({ slug: req.params.slug, isPublished: true })
    .populate('instructor', 'username firstName lastName avatar bio');

  if (!course) {
    return next(new AppError('Course not found', 404));
  }

  res.status(200).json({
    success: true,
    data: {
      course
    }
  });
});

// @desc    Create new course
// @route   POST /api/v1/courses
// @access  Private
const createCourse = asyncWrapper(async (req, res, next) => {
  const {
    title,
    description,
    shortDescription,
    category,
    level,
    tags,
    lessons,
    isFree = false,
    price = 0,
    currency = 'USD',
    thumbnail,
    previewVideo,
    prerequisites,
    learningObjectives,
    certificateTemplate,
    minimumCompletionPercentage = 80
  } = req.body;

  const course = await Course.create({
    title,
    description,
    shortDescription,
    category,
    level,
    tags,
    lessons,
    isFree,
    price,
    currency,
    thumbnail,
    previewVideo,
    prerequisites,
    learningObjectives,
    certificateTemplate,
    minimumCompletionPercentage,
    instructor: req.user.id
  });

  await course.populate('instructor', 'username firstName lastName avatar');

  logger.info(`New course created: ${course.title} by ${req.user.email}`);

  res.status(201).json({
    success: true,
    message: 'Course created successfully',
    data: {
      course
    }
  });
});

// @desc    Update course
// @route   PUT /api/v1/courses/:id
// @access  Private
const updateCourse = asyncWrapper(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new AppError('Course not found', 404));
  }

  // Check if user is instructor or admin/moderator
  if (course.instructor.toString() !== req.user.id && !['admin', 'moderator'].includes(req.user.role)) {
    return next(new AppError('You can only update your own courses', 403));
  }

  const {
    title,
    description,
    shortDescription,
    category,
    level,
    tags,
    lessons,
    isFree,
    price,
    currency,
    thumbnail,
    previewVideo,
    prerequisites,
    learningObjectives,
    certificateTemplate,
    minimumCompletionPercentage,
    isPublished
  } = req.body;

  // Update fields
  if (title) course.title = title;
  if (description) course.description = description;
  if (shortDescription !== undefined) course.shortDescription = shortDescription;
  if (category) course.category = category;
  if (level) course.level = level;
  if (tags) course.tags = tags;
  if (lessons) course.lessons = lessons;
  if (isFree !== undefined) course.isFree = isFree;
  if (price !== undefined) course.price = price;
  if (currency) course.currency = currency;
  if (thumbnail !== undefined) course.thumbnail = thumbnail;
  if (previewVideo !== undefined) course.previewVideo = previewVideo;
  if (prerequisites) course.prerequisites = prerequisites;
  if (learningObjectives) course.learningObjectives = learningObjectives;
  if (certificateTemplate !== undefined) course.certificateTemplate = certificateTemplate;
  if (minimumCompletionPercentage) course.minimumCompletionPercentage = minimumCompletionPercentage;
  if (isPublished !== undefined) course.isPublished = isPublished;

  await course.save();
  await course.populate('instructor', 'username firstName lastName avatar');

  logger.info(`Course updated: ${course.title} by ${req.user.email}`);

  res.status(200).json({
    success: true,
    message: 'Course updated successfully',
    data: {
      course
    }
  });
});

// @desc    Delete course
// @route   DELETE /api/v1/courses/:id
// @access  Private
const deleteCourse = asyncWrapper(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new AppError('Course not found', 404));
  }

  // Check if user is instructor or admin/moderator
  if (course.instructor.toString() !== req.user.id && !['admin', 'moderator'].includes(req.user.role)) {
    return next(new AppError('You can only delete your own courses', 403));
  }

  // Prevent deletion if course has enrollments
  if (course.enrollments.length > 0) {
    return next(new AppError('Cannot delete course with enrollments', 400));
  }

  await Course.findByIdAndDelete(req.params.id);

  logger.info(`Course deleted: ${course.title} by ${req.user.email}`);

  res.status(200).json({
    success: true,
    message: 'Course deleted successfully'
  });
});

// @desc    Enroll in course
// @route   POST /api/v1/courses/:id/enroll
// @access  Private
const enrollInCourse = asyncWrapper(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new AppError('Course not found', 404));
  }

  if (!course.isPublished) {
    return next(new AppError('Course is not published', 400));
  }

  // Check if user is already enrolled
  const existingEnrollment = course.enrollments.find(enrollment => 
    enrollment.user.toString() === req.user.id
  );

  if (existingEnrollment) {
    return next(new AppError('You are already enrolled in this course', 400));
  }

  await course.enrollUser(req.user.id);

  logger.info(`User enrolled in course: ${course.title} by ${req.user.email}`);

  res.status(200).json({
    success: true,
    message: 'Successfully enrolled in course',
    data: {
      course: {
        id: course._id,
        title: course.title,
        enrollment: course.enrollments[course.enrollments.length - 1]
      }
    }
  });
});

// @desc    Get course progress
// @route   GET /api/v1/courses/:id/progress
// @access  Private
const getCourseProgress = asyncWrapper(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new AppError('Course not found', 404));
  }

  const enrollment = course.enrollments.find(enrollment => 
    enrollment.user.toString() === req.user.id
  );

  if (!enrollment) {
    return next(new AppError('You are not enrolled in this course', 403));
  }

  res.status(200).json({
    success: true,
    data: {
      course: {
        id: course._id,
        title: course.title,
        totalLessons: course.totalLessons,
        totalDuration: course.totalDuration
      },
      enrollment
    }
  });
});

// @desc    Mark lesson as complete
// @route   POST /api/v1/courses/:id/lessons/:lessonId/complete
// @access  Private
const completeLesson = asyncWrapper(async (req, res, next) => {
  const { score } = req.body;

  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new AppError('Course not found', 404));
  }

  const enrollment = course.enrollments.find(enrollment => 
    enrollment.user.toString() === req.user.id
  );

  if (!enrollment) {
    return next(new AppError('You are not enrolled in this course', 403));
  }

  // Check if lesson exists
  const lesson = course.lessons.find(lesson => lesson._id.toString() === req.params.lessonId);
  if (!lesson) {
    return next(new AppError('Lesson not found', 404));
  }

  await course.updateUserProgress(req.user.id, req.params.lessonId, score);

  // Get updated enrollment
  const updatedEnrollment = course.enrollments.find(enrollment => 
    enrollment.user.toString() === req.user.id
  );

  logger.info(`Lesson completed: ${lesson.title} in course ${course.title} by ${req.user.email}`);

  res.status(200).json({
    success: true,
    message: 'Lesson completed successfully',
    data: {
      lesson: {
        id: lesson._id,
        title: lesson.title
      },
      enrollment: updatedEnrollment
    }
  });
});

// @desc    Rate course
// @route   POST /api/v1/courses/:id/rate
// @access  Private
const rateCourse = asyncWrapper(async (req, res, next) => {
  const { rating, review } = req.body;

  if (rating < 1 || rating > 5) {
    return next(new AppError('Rating must be between 1 and 5', 400));
  }

  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new AppError('Course not found', 404));
  }

  // Check if user is enrolled and has completed the course
  const enrollment = course.enrollments.find(enrollment => 
    enrollment.user.toString() === req.user.id
  );

  if (!enrollment) {
    return next(new AppError('You must be enrolled to rate this course', 403));
  }

  if (!enrollment.completedAt) {
    return next(new AppError('You must complete the course before rating it', 403));
  }

  // Check if user has already rated
  const existingRating = course.ratings.find(rating => 
    rating.user.toString() === req.user.id
  );

  if (existingRating) {
    return next(new AppError('You have already rated this course', 400));
  }

  course.ratings.push({
    user: req.user.id,
    rating,
    review
  });

  await course.save();
  await course.populate('ratings.user', 'username firstName lastName avatar');

  logger.info(`Course rated: ${course.title} by ${req.user.email} - Rating: ${rating}`);

  res.status(200).json({
    success: true,
    message: 'Course rated successfully',
    data: {
      rating: course.ratings[course.ratings.length - 1],
      averageRating: course.averageRating
    }
  });
});

// @desc    Get trending courses
// @route   GET /api/v1/courses/trending
// @access  Public
const getTrendingCourses = asyncWrapper(async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 10;

  const courses = await Course.getTrending(limit);

  res.status(200).json({
    success: true,
    data: {
      courses
    }
  });
});

// @desc    Get instructor's courses
// @route   GET /api/v1/courses/instructor/:instructorId
// @access  Public
const getCoursesByInstructor = asyncWrapper(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const courses = await Course.find({
    instructor: req.params.instructorId,
    isPublished: true
  })
    .populate('instructor', 'username firstName lastName avatar')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Course.countDocuments({
    instructor: req.params.instructorId,
    isPublished: true
  });

  res.status(200).json({
    success: true,
    data: {
      courses,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }
  });
});

// @desc    Get user's enrolled courses
// @route   GET /api/v1/courses/my-enrollments
// @access  Private
const getMyEnrollments = asyncWrapper(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const courses = await Course.find({
    'enrollments.user': req.user.id
  })
    .populate('instructor', 'username firstName lastName avatar')
    .sort({ 'enrollments.enrolledAt': -1 })
    .skip(skip)
    .limit(limit);

  const total = await Course.countDocuments({
    'enrollments.user': req.user.id
  });

  res.status(200).json({
    success: true,
    data: {
      courses,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    }
  });
});

// @desc    Get user's created courses
// @route   GET /api/v1/courses/my-courses
// @access  Private
const getMyCourses = asyncWrapper(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const courses = await Course.find({ instructor: req.user.id })
    .populate('instructor', 'username firstName lastName avatar')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Course.countDocuments({ instructor: req.user.id });

  res.status(200).json({
    success: true,
    data: {
      courses,
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
  getAllCourses,
  getCourseBySlug,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollInCourse,
  getCourseProgress,
  completeLesson,
  rateCourse,
  getTrendingCourses,
  getCoursesByInstructor,
  getMyEnrollments,
  getMyCourses
}; 