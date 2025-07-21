const express = require('express');
const { protect, optionalAuth } = require('../middleware/authMiddleware');
const {
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
} = require('../controllers/courseController');

const router = express.Router();

// Public routes (with optional auth)
router.get('/', optionalAuth, getAllCourses);
router.get('/trending', optionalAuth, getTrendingCourses);
router.get('/instructor/:instructorId', optionalAuth, getCoursesByInstructor);
router.get('/:slug', optionalAuth, getCourseBySlug);

// Protected routes
router.use(protect);

router.get('/my-enrollments', getMyEnrollments);
router.get('/my-courses', getMyCourses);
router.post('/', createCourse);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);
router.post('/:id/enroll', enrollInCourse);
router.get('/:id/progress', getCourseProgress);
router.post('/:id/lessons/:lessonId/complete', completeLesson);
router.post('/:id/rate', rateCourse);

module.exports = router; 