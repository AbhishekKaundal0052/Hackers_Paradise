const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Post title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  content: {
    type: String,
    required: [true, 'Post content is required'],
    minlength: [10, 'Content must be at least 10 characters long']
  },
  excerpt: {
    type: String,
    maxlength: [300, 'Excerpt cannot exceed 300 characters']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  type: {
    type: String,
    enum: ['article', 'tutorial', 'news', 'question', 'discussion'],
    default: 'article'
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  category: {
    type: String,
    enum: ['cybersecurity', 'programming', 'web-development', 'mobile-development', 'ai-ml', 'devops', 'database', 'networking', 'other'],
    default: 'other'
  },
  featuredImage: {
    type: String,
    default: ''
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isPinned: {
    type: Boolean,
    default: false
  },
  allowComments: {
    type: Boolean,
    default: true
  },
  // Engagement metrics
  views: {
    type: Number,
    default: 0
  },
  likes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  bookmarks: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  shares: {
    type: Number,
    default: 0
  },
  // SEO fields
  metaTitle: {
    type: String,
    maxlength: [60, 'Meta title cannot exceed 60 characters']
  },
  metaDescription: {
    type: String,
    maxlength: [160, 'Meta description cannot exceed 160 characters']
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

// Virtual for likes count
postSchema.virtual('likesCount').get(function() {
  return this.likes.length;
});

// Virtual for bookmarks count
postSchema.virtual('bookmarksCount').get(function() {
  return this.bookmarks.length;
});

// Virtual for comments count (will be populated from Comment model)
postSchema.virtual('commentsCount', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'post',
  count: true
});

// Virtual for reading time (estimated)
postSchema.virtual('readingTime').get(function() {
  const wordsPerMinute = 200;
  const wordCount = this.content.split(' ').length;
  return Math.ceil(wordCount / wordsPerMinute);
});

// Indexes for better query performance
postSchema.index({ title: 'text', content: 'text' });
postSchema.index({ author: 1, createdAt: -1 });
postSchema.index({ status: 1, createdAt: -1 });
postSchema.index({ category: 1, createdAt: -1 });
postSchema.index({ tags: 1 });
postSchema.index({ slug: 1 });
postSchema.index({ isFeatured: 1, createdAt: -1 });
postSchema.index({ views: -1 });

// Pre-save middleware to generate slug
postSchema.pre('save', function(next) {
  if (!this.isModified('title')) return next();
  
  this.slug = this.title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-');
  
  next();
});

// Pre-save middleware to generate excerpt
postSchema.pre('save', function(next) {
  if (!this.isModified('content') || this.excerpt) return next();
  
  this.excerpt = this.content
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .substring(0, 300)
    .trim();
  
  if (this.excerpt.length === 300) {
    this.excerpt += '...';
  }
  
  next();
});

// Instance method to increment views
postSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

// Instance method to toggle like
postSchema.methods.toggleLike = function(userId) {
  const likeIndex = this.likes.findIndex(like => like.user.toString() === userId.toString());
  
  if (likeIndex > -1) {
    this.likes.splice(likeIndex, 1);
  } else {
    this.likes.push({ user: userId });
  }
  
  return this.save();
};

// Instance method to toggle bookmark
postSchema.methods.toggleBookmark = function(userId) {
  const bookmarkIndex = this.bookmarks.findIndex(bookmark => bookmark.user.toString() === userId.toString());
  
  if (bookmarkIndex > -1) {
    this.bookmarks.splice(bookmarkIndex, 1);
  } else {
    this.bookmarks.push({ user: userId });
  }
  
  return this.save();
};

// Static method to get trending posts
postSchema.statics.getTrending = function(limit = 10) {
  return this.find({ status: 'published' })
    .sort({ views: -1, likesCount: -1 })
    .limit(limit)
    .populate('author', 'username firstName lastName avatar');
};

// Static method to get featured posts
postSchema.statics.getFeatured = function(limit = 5) {
  return this.find({ status: 'published', isFeatured: true })
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate('author', 'username firstName lastName avatar');
};

module.exports = mongoose.model('Post', postSchema); 