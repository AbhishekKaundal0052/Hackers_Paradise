const mongoose = require('mongoose');

const bountySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Bounty title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Bounty description is required'],
    minlength: [50, 'Description must be at least 50 characters long']
  },
  reward: {
    amount: {
      type: Number,
      required: [true, 'Reward amount is required'],
      min: [1, 'Reward must be at least 1']
    },
    currency: {
      type: String,
      enum: ['USD', 'EUR', 'BTC', 'ETH'],
      default: 'USD'
    }
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard', 'expert'],
    required: true
  },
  category: {
    type: String,
    enum: ['web-security', 'mobile-security', 'network-security', 'cryptography', 'reverse-engineering', 'forensics', 'other'],
    required: true
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'completed', 'expired', 'cancelled'],
    default: 'open'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  assignedAt: Date,
  completedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  completedAt: Date,
  deadline: {
    type: Date,
    required: true
  },
  // Requirements and criteria
  requirements: [{
    type: String,
    trim: true
  }],
  acceptanceCriteria: [{
    type: String,
    trim: true
  }],
  // Files and resources
  attachments: [{
    filename: String,
    originalName: String,
    mimeType: String,
    size: Number,
    url: String
  }],
  // Submissions
  submissions: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    title: String,
    description: String,
    proofOfConcept: String,
    attachments: [{
      filename: String,
      originalName: String,
      mimeType: String,
      size: Number,
      url: String
    }],
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reviewedAt: Date,
    reviewNotes: String,
    submittedAt: {
      type: Date,
      default: Date.now
    }
  }],
  // Engagement metrics
  views: {
    type: Number,
    default: 0
  },
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
  // Visibility and access
  isPublic: {
    type: Boolean,
    default: true
  },
  allowedUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
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

// Virtual for submissions count
bountySchema.virtual('submissionsCount').get(function() {
  return this.submissions.length;
});

// Virtual for pending submissions count
bountySchema.virtual('pendingSubmissionsCount').get(function() {
  return this.submissions.filter(sub => sub.status === 'pending').length;
});

// Virtual for bookmarks count
bountySchema.virtual('bookmarksCount').get(function() {
  return this.bookmarks.length;
});

// Virtual for time remaining
bountySchema.virtual('timeRemaining').get(function() {
  if (this.status !== 'open') return 0;
  const now = new Date();
  const remaining = this.deadline - now;
  return remaining > 0 ? remaining : 0;
});

// Virtual for is expired
bountySchema.virtual('isExpired').get(function() {
  return new Date() > this.deadline;
});

// Indexes for better query performance
bountySchema.index({ status: 1, createdAt: -1 });
bountySchema.index({ category: 1, status: 1 });
bountySchema.index({ difficulty: 1, status: 1 });
bountySchema.index({ creator: 1, createdAt: -1 });
bountySchema.index({ assignedTo: 1, status: 1 });
bountySchema.index({ deadline: 1, status: 1 });
bountySchema.index({ tags: 1 });
bountySchema.index({ 'reward.amount': -1 });
bountySchema.index({ title: 'text', description: 'text' });

// Pre-save middleware to check deadline
bountySchema.pre('save', function(next) {
  if (this.isModified('deadline') && this.deadline <= new Date()) {
    this.status = 'expired';
  }
  next();
});

// Instance method to increment views
bountySchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

// Instance method to toggle bookmark
bountySchema.methods.toggleBookmark = function(userId) {
  const bookmarkIndex = this.bookmarks.findIndex(bookmark => bookmark.user.toString() === userId.toString());
  
  if (bookmarkIndex > -1) {
    this.bookmarks.splice(bookmarkIndex, 1);
  } else {
    this.bookmarks.push({ user: userId });
  }
  
  return this.save();
};

// Instance method to assign bounty
bountySchema.methods.assignBounty = function(userId) {
  this.assignedTo = userId;
  this.assignedAt = new Date();
  this.status = 'in-progress';
  return this.save();
};

// Instance method to complete bounty
bountySchema.methods.completeBounty = function(userId) {
  this.completedBy = userId;
  this.completedAt = new Date();
  this.status = 'completed';
  return this.save();
};

// Static method to get open bounties
bountySchema.statics.getOpenBounties = function(page = 1, limit = 10, filters = {}) {
  const skip = (page - 1) * limit;
  const query = { 
    status: 'open', 
    isPublic: true,
    deadline: { $gt: new Date() }
  };

  // Apply filters
  if (filters.category) query.category = filters.category;
  if (filters.difficulty) query.difficulty = filters.difficulty;
  if (filters.minReward) query['reward.amount'] = { $gte: filters.minReward };
  if (filters.maxReward) query['reward.amount'] = { ...query['reward.amount'], $lte: filters.maxReward };
  if (filters.tags && filters.tags.length > 0) query.tags = { $in: filters.tags };

  return this.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate('creator', 'username firstName lastName avatar');
};

// Static method to get trending bounties
bountySchema.statics.getTrending = function(limit = 10) {
  return this.find({ 
    status: 'open', 
    isPublic: true,
    deadline: { $gt: new Date() }
  })
    .sort({ views: -1, bookmarksCount: -1 })
    .limit(limit)
    .populate('creator', 'username firstName lastName avatar');
};

module.exports = mongoose.model('Bounty', bountySchema); 