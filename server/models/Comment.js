const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Comment content is required'],
    trim: true,
    maxlength: [1000, 'Comment cannot exceed 1000 characters']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    default: null
  },
  isEdited: {
    type: Boolean,
    default: false
  },
  editedAt: Date,
  // Engagement
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
  moderationReason: String,
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for likes count
commentSchema.virtual('likesCount').get(function() {
  return this.likes.length;
});

// Virtual for replies count
commentSchema.virtual('repliesCount', {
  ref: 'Comment',
  localField: '_id',
  foreignField: 'parentComment',
  count: true
});

// Indexes for better query performance
commentSchema.index({ post: 1, createdAt: -1 });
commentSchema.index({ author: 1, createdAt: -1 });
commentSchema.index({ parentComment: 1, createdAt: 1 });
commentSchema.index({ isDeleted: 1 });

// Instance method to toggle like
commentSchema.methods.toggleLike = function(userId) {
  const likeIndex = this.likes.findIndex(like => like.user.toString() === userId.toString());
  
  if (likeIndex > -1) {
    this.likes.splice(likeIndex, 1);
  } else {
    this.likes.push({ user: userId });
  }
  
  return this.save();
};

// Instance method to soft delete
commentSchema.methods.softDelete = function() {
  this.isDeleted = true;
  this.content = '[This comment has been deleted]';
  return this.save();
};

// Static method to get comments for a post
commentSchema.statics.getCommentsForPost = function(postId, page = 1, limit = 10) {
  const skip = (page - 1) * limit;
  
  return this.find({ 
    post: postId, 
    parentComment: null, 
    isDeleted: false 
  })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate('author', 'username firstName lastName avatar')
    .populate({
      path: 'repliesCount',
      match: { isDeleted: false }
    });
};

// Static method to get replies for a comment
commentSchema.statics.getReplies = function(commentId, page = 1, limit = 5) {
  const skip = (page - 1) * limit;
  
  return this.find({ 
    parentComment: commentId, 
    isDeleted: false 
  })
    .sort({ createdAt: 1 })
    .skip(skip)
    .limit(limit)
    .populate('author', 'username firstName lastName avatar');
};

module.exports = mongoose.model('Comment', commentSchema); 