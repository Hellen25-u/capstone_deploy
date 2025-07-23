const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [100, 'Description cannot exceed 100 characters']
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0, 'Amount must be positive']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['food', 'utilities', 'transport', 'dining', 'household', 'entertainment', 'healthcare', 'education', 'clothing', 'other']
  },
  subcategory: {
    type: String,
    maxlength: [50, 'Subcategory cannot exceed 50 characters']
  },
  household: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Household',
    required: true
  },
  paidBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  splitBetween: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    amount: {
      type: Number,
      required: true
    },
    paid: {
      type: Boolean,
      default: false
    }
  }],
  paymentMethod: {
    type: String,
    enum: ['cash', 'mpesa', 'card', 'bank_transfer', 'other'],
    default: 'cash'
  },
  transactionId: {
    type: String,
    sparse: true
  },
  receipt: {
    url: String,
    filename: String,
    size: Number
  },
  location: {
    name: String,
    address: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  tags: [String],
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  recurring: {
    isRecurring: { type: Boolean, default: false },
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly', 'yearly']
    },
    nextDue: Date,
    endDate: Date
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'approved'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance
expenseSchema.index({ household: 1, date: -1 });
expenseSchema.index({ paidBy: 1, date: -1 });
expenseSchema.index({ category: 1, date: -1 });
expenseSchema.index({ transactionId: 1 });

// Virtual for formatted amount
expenseSchema.virtual('formattedAmount').get(function() {
  return `KSH ${this.amount.toLocaleString()}`;
});

// Virtual for total split amount
expenseSchema.virtual('totalSplitAmount').get(function() {
  return this.splitBetween.reduce((total, split) => total + split.amount, 0);
});

// Method to calculate split amounts equally
expenseSchema.methods.splitEqually = function(userIds) {
  const splitAmount = this.amount / userIds.length;
  this.splitBetween = userIds.map(userId => ({
    user: userId,
    amount: splitAmount,
    paid: userId.toString() === this.paidBy.toString()
  }));
  return this.save();
};

// Method to mark split as paid
expenseSchema.methods.markSplitPaid = function(userId) {
  const split = this.splitBetween.find(s => s.user.toString() === userId.toString());
  if (split) {
    split.paid = true;
    return this.save();
  }
  throw new Error('Split not found for this user');
};

// Static method for expense statistics
expenseSchema.statics.getHouseholdStats = async function(householdId, startDate, endDate) {
  const pipeline = [
    {
      $match: {
        household: mongoose.Types.ObjectId(householdId),
        date: { $gte: startDate, $lte: endDate },
        status: 'approved'
      }
    },
    {
      $group: {
        _id: '$category',
        total: { $sum: '$amount' },
        count: { $sum: 1 },
        avgAmount: { $avg: '$amount' }
      }
    },
    {
      $sort: { total: -1 }
    }
  ];
  
  return await this.aggregate(pipeline);
};

module.exports = mongoose.model('Expense', expenseSchema);