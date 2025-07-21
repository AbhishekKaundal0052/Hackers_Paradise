const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Lesson title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  content: {
    type: String,
    required: [true, 'Lesson content is required']
  },
  type: {
    type: String,
    enum: ['video', 'text', 'interactive', 'quiz', 'assignment'],
    default: 'text'
  },
  duration: {
    type: Number, // in minutes
    default: 0
  },
  order: {
    type: Number,
    required: true
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  attachments: [{
    filename: String,
    originalName: String,
    mimeType: String,
    size: Number,
    url: String
  }],
  // For interactive lessons
  exercises: [{
    type: {
      type: String,
      enum: ['multiple-choice', 'drag-drop', 'code-challenge', 'fill-blank'],
      required: true
    },
    question: String,
    options: [String], // for multiple choice
    correctAnswer: String,
    explanation: String,
    points: {
      type: Number,
      default: 1
    }
  }],
  // Progress tracking
  completionCriteria: {
    type: String,
    enum: ['view', 'complete', 'pass-quiz'],
    default: 'view'
  },
  requiredScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 70
  }
}, {
  timestamps: true
});

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Course description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  shortDescription: {
    type: String,
    maxlength: [300, 'Short description cannot exceed 300 characters']
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    enum: ['cybersecurity', 'programming', 'web-development', 'mobile-development', 'ai-ml', 'devops', 'database', 'networking', 'other'],
    required: true
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'expert'],
    required: true
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  // Course content
  lessons: [lessonSchema],
  // Course settings
  isPublished: {
    type: Boolean,
    default: false
  },
  isFree: {
    type: Boolean,
    default: false
  },
  price: {
    type: Number,
    min: 0,
    default: 0
  },
  currency: {
    type: String,
    enum: ['USD', 'EUR'],
    default: 'USD'
  },
  // Course media
  thumbnail: {
    type: String,
    default: ''
  },
  previewVideo: {
    type: String,
    default: ''
  },
  // Course requirements
  prerequisites: [{
    type: String,
    trim: true
  }],
  learningObjectives: [{
    type: String,
    trim: true
  }],
  // Course completion
  certificateTemplate: {
    type: String,
    default: ''
  },
  minimumCompletionPercentage: {
    type: Number,
    min: 0,
    max: 100,
    default: 80
  },
  // Engagement metrics
  enrollments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    enrolledAt: {
      type: Date,
      default: Date.now
    },
    completedAt: Date,
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    currentLesson: {
      type: Number,
      default: 0
    },
    completedLessons: [{
      lessonId: mongoose.Schema.Types.ObjectId,
      completedAt: Date,
      score: Number
    }],
    certificate: {
      issuedAt: Date,
      certificateId: String
    }
  }],
  // Ratings and reviews
  ratings: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    review: {
      type: String,
      maxlength: [1000, 'Review cannot exceed 1000 characters']
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  // Course stats
  totalLessons: {
    type: Number,
    default: 0
  },
  totalDuration: {
    type: Number, // in minutes
    default: 0
  },
  // Moderation
  isModerated: {
    type: Boolean,
    default: false
  },
  moderatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  moderatedAt: Date,
  moderationReason: String
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for average rating
courseSchema.virtual('averageRating').get(function() {
  if (this.ratings.length === 0) return 0;
  const sum = this.ratings.reduce((acc, rating) => acc + rating.rating, 0);
  return Math.round((sum / this.ratings.length) * 10) / 10;
});

// Virtual for total enrollments
courseSchema.virtual('totalEnrollments').get(function() {
  return this.enrollments.length;
});

// Virtual for completion rate
courseSchema.virtual('completionRate').get(function() {
  if (this.enrollments.length === 0) return 0;
  const completed = this.enrollments.filter(enrollment => enrollment.completedAt).length;
  return Math.round((completed / this.enrollments.length) * 100);
});

// Indexes for better query performance
courseSchema.index({ title: 'text', description: 'text' });
courseSchema.index({ slug: 1 });
courseSchema.index({ instructor: 1, createdAt: -1 });
courseSchema.index({ category: 1, level: 1 });
courseSchema.index({ isPublished: 1, createdAt: -1 });
courseSchema.index({ tags: 1 });
courseSchema.index({ 'ratings.rating': -1 });

// Pre-save middleware to generate slug
courseSchema.pre('save', function(next) {
  if (!this.isModified('title')) return next();
  
  this.slug = this.title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-');
  
  next();
});

// Pre-save middleware to update course stats
courseSchema.pre('save', function(next) {
  if (this.isModified('lessons')) {
    this.totalLessons = this.lessons.length;
    this.totalDuration = this.lessons.reduce((total, lesson) => total + lesson.duration, 0);
  }
  next();
});

// Instance method to enroll user
courseSchema.methods.enrollUser = function(userId) {
  const existingEnrollment = this.enrollments.find(enrollment => 
    enrollment.user.toString() === userId.toString()
  );
  
  if (!existingEnrollment) {
    this.enrollments.push({ user: userId });
  }
  
  return this.save();
};

// Instance method to update user progress
courseSchema.methods.updateUserProgress = function(userId, lessonId, score = null) {
  const enrollment = this.enrollments.find(enrollment => 
    enrollment.user.toString() === userId.toString()
  );
  
  if (enrollment) {
    // Check if lesson is already completed
    const existingLesson = enrollment.completedLessons.find(lesson => 
      lesson.lessonId.toString() === lessonId.toString()
    );
    
    if (!existingLesson) {
      enrollment.completedLessons.push({
        lessonId,
        completedAt: new Date(),
        score
      });
    }
    
    // Update progress
    enrollment.progress = Math.round((enrollment.completedLessons.length / this.lessons.length) * 100);
    
    // Check if course is completed
    if (enrollment.progress >= this.minimumCompletionPercentage && !enrollment.completedAt) {
      enrollment.completedAt = new Date();
      enrollment.certificate = {
        issuedAt: new Date(),
        certificateId: `CERT-${Date.now()}-${userId}`
      };
    }
  }
  
  return this.save();
};

// Static method to get published courses
courseSchema.statics.getPublishedCourses = function(page = 1, limit = 10, filters = {}) {
  const skip = (page - 1) * limit;
  const query = { isPublished: true };

  // Apply filters
  if (filters.category) query.category = filters.category;
  if (filters.level) query.level = filters.level;
  if (filters.instructor) query.instructor = filters.instructor;
  if (filters.isFree !== undefined) query.isFree = filters.isFree;
  if (filters.tags && filters.tags.length > 0) query.tags = { $in: filters.tags };

  return this.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate('instructor', 'username firstName lastName avatar');
};

// Static method to get trending courses
courseSchema.statics.getTrending = function(limit = 10) {
  return this.find({ isPublished: true })
    .sort({ totalEnrollments: -1, averageRating: -1 })
    .limit(limit)
    .populate('instructor', 'username firstName lastName avatar');
};

module.exports = mongoose.model('Course', courseSchema); 