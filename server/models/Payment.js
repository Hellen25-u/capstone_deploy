const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  household: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Household'
  },
  amount: {
    type: Number,
    required: true,
    min: [1, 'Amount must be at least 1']
  },
  currency: {
    type: String,
    default: 'KSH',
    enum: ['KSH', 'USD', 'EUR']
  },
  type: {
    type: String,
    required: true,
    enum: ['subscription', 'expense_split', 'household_contribution', 'premium_feature']
  },
  method: {
    type: String,
    required: true,
    enum: ['mpesa', 'card', 'bank_transfer', 'cash']
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'completed', 'failed', 'cancelled', 'refunded'],
    default: 'pending'
  },
  description: {
    type: String,
    required: true,
    maxlength: [200, 'Description cannot exceed 200 characters']
  },
  phoneNumber: {
    type: String,
    required: function() {
      return this.method === 'mpesa';
    }
  },
  
  // M-Pesa specific fields
  mpesaCheckoutRequestId: {
    type: String,
    sparse: true
  },
  mpesaMerchantRequestId: {
    type: String,
    sparse: true
  },
  mpesaReceiptNumber: {
    type: String,
    sparse: true
  },
  mpesaTransactionDate: {
    type: Date
  },
  
  // General transaction fields
  transactionId: {
    type: String,
    sparse: true
  },
  externalTransactionId: {
    type: String,
    sparse: true
  },
  
  // Payment gateway response
  gatewayResponse: {
    type: mongoose.Schema.Types.Mixed
  },
  
  // Timing
  initiatedAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date
  },
  expiresAt: {
    type: Date,
    default: function() {
      return new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now
    }
  },
  
  // Failure handling
  failureReason: {
    type: String,
    maxlength: [500, 'Failure reason cannot exceed 500 characters']
  },
  retryCount: {
    type: Number,
    default: 0,
    max: [3, 'Maximum 3 retry attempts allowed']
  },
  
  // Refund information
  refunded: {
    type: Boolean,
    default: false
  },
  refundedAt: {
    type: Date
  },
  refundAmount: {
    type: Number
  },
  refundReason: {
    type: String,
    maxlength: [200, 'Refund reason cannot exceed 200 characters']
  },
  refundTransactionId: {
    type: String
  },
  
  // Metadata
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  
  // IP and device info for security
  ipAddress: {
    type: String
  },
  userAgent: {
    type: String
  },
  
  // Webhook processing
  webhookProcessed: {
    type: Boolean,
    default: false
  },
  webhookProcessedAt: {
    type: Date
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance
paymentSchema.index({ user: 1, status: 1 });
paymentSchema.index({ mpesaCheckoutRequestId: 1 });
paymentSchema.index({ mpesaReceiptNumber: 1 });
paymentSchema.index({ transactionId: 1 });
paymentSchema.index({ createdAt: -1 });
paymentSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
paymentSchema.index({ status: 1, method: 1 });

// Virtual for formatted amount
paymentSchema.virtual('formattedAmount').get(function() {
  return `${this.currency} ${this.amount.toLocaleString()}`;
});

// Virtual for payment duration
paymentSchema.virtual('processingDuration').get(function() {
  if (this.completedAt) {
    return this.completedAt.getTime() - this.initiatedAt.getTime();
  }
  return null;
});

// Virtual for time until expiry
paymentSchema.virtual('timeUntilExpiry').get(function() {
  if (this.status === 'pending' && this.expiresAt) {
    return Math.max(0, this.expiresAt.getTime() - Date.now());
  }
  return null;
});

// Pre-save middleware
paymentSchema.pre('save', function(next) {
  // Generate transaction ID if not provided
  if (!this.transactionId && this.isNew) {
    this.transactionId = `ZETU_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
  }
  
  // Set completion time when status changes to completed
  if (this.isModified('status') && this.status === 'completed' && !this.completedAt) {
    this.completedAt = new Date();
  }
  
  // Validate phone number format for M-Pesa
  if (this.method === 'mpesa' && this.phoneNumber) {
    const phoneRegex = /^254[71]\d{8}$/;
    if (!phoneRegex.test(this.phoneNumber)) {
      return next(new Error('Invalid phone number format for M-Pesa'));
    }
  }
  
  next();
});

// Static method to get payment statistics
paymentSchema.statics.getStats = async function(userId, startDate, endDate) {
  const pipeline = [
    {
      $match: {
        user: mongoose.Types.ObjectId(userId),
        createdAt: { $gte: startDate, $lte: endDate },
        status: 'completed'
      }
    },
    {
      $group: {
        _id: '$type',
        totalAmount: { $sum: '$amount' },
        count: { $sum: 1 },
        avgAmount: { $avg: '$amount' }
      }
    },
    {
      $sort: { totalAmount: -1 }
    }
  ];
  
  return await this.aggregate(pipeline);
};

// Method to check if payment can be refunded
paymentSchema.methods.canRefund = function() {
  const now = new Date();
  const threeDaysAgo = new Date(now.getTime() - (3 * 24 * 60 * 60 * 1000));
  
  return this.status === 'completed' && 
         !this.refunded && 
         this.completedAt > threeDaysAgo &&
         this.method === 'mpesa';
};

// Method to mark payment as expired
paymentSchema.methods.markExpired = function() {
  if (this.status === 'pending') {
    this.status = 'cancelled';
    this.failureReason = 'Payment expired';
    return this.save();
  }
};

module.exports = mongoose.model('Payment', paymentSchema);