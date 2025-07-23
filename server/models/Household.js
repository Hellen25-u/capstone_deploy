const mongoose = require('mongoose');

const householdSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Household name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  description: {
    type: String,
    maxlength: [200, 'Description cannot exceed 200 characters']
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  members: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    role: {
      type: String,
      enum: ['owner', 'admin', 'member'],
      default: 'member'
    },
    joinedAt: {
      type: Date,
      default: Date.now
    },
    permissions: {
      canEditLists: { type: Boolean, default: true },
      canDeleteLists: { type: Boolean, default: false },
      canInviteMembers: { type: Boolean, default: false },
      canManageExpenses: { type: Boolean, default: true },
      canViewReports: { type: Boolean, default: true }
    }
  }],
  inviteCode: {
    type: String,
    unique: true
  },
  settings: {
    currency: {
      type: String,
      default: 'KSH'
    },
    budget: {
      monthly: { type: Number, default: 0 },
      weekly: { type: Number, default: 0 }
    },
    notifications: {
      newExpense: { type: Boolean, default: true },
      budgetAlert: { type: Boolean, default: true },
      listUpdates: { type: Boolean, default: true }
    },
    privacy: {
      allowMemberInvites: { type: Boolean, default: true },
      shareLocation: { type: Boolean, default: false }
    }
  },
  statistics: {
    totalExpenses: { type: Number, default: 0 },
    totalLists: { type: Number, default: 0 },
    totalMembers: { type: Number, default: 1 },
    averageMonthlySpending: { type: Number, default: 0 }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
householdSchema.index({ owner: 1 });
householdSchema.index({ 'members.user': 1 });
householdSchema.index({ inviteCode: 1 });

// Generate invite code before saving
householdSchema.pre('save', function(next) {
  if (!this.inviteCode) {
    this.inviteCode = Math.random().toString(36).substring(2, 15).toUpperCase();
  }
  next();
});

// Virtual for member count
householdSchema.virtual('memberCount').get(function() {
  return this.members.length;
});

// Method to add member
householdSchema.methods.addMember = function(userId, role = 'member') {
  const existingMember = this.members.find(m => m.user.toString() === userId.toString());
  if (existingMember) {
    throw new Error('User is already a member of this household');
  }
  
  this.members.push({
    user: userId,
    role: role,
    joinedAt: new Date()
  });
  
  this.statistics.totalMembers = this.members.length;
  return this.save();
};

// Method to remove member
householdSchema.methods.removeMember = function(userId) {
  this.members = this.members.filter(m => m.user.toString() !== userId.toString());
  this.statistics.totalMembers = this.members.length;
  return this.save();
};

// Method to check if user is member
householdSchema.methods.isMember = function(userId) {
  return this.members.some(m => m.user.toString() === userId.toString());
};

// Method to get member role
householdSchema.methods.getMemberRole = function(userId) {
  const member = this.members.find(m => m.user.toString() === userId.toString());
  return member ? member.role : null;
};

module.exports = mongoose.model('Household', householdSchema);