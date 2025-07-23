const mongoose = require('mongoose');

const shoppingListSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    maxlength: [300, 'Description cannot exceed 300 characters']
  },
  household: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Household',
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    name: {
      type: String,
      required: true,
      maxlength: [100, 'Item name cannot exceed 100 characters']
    },
    quantity: {
      type: Number,
      default: 1,
      min: [0, 'Quantity must be positive']
    },
    unit: {
      type: String,
      default: 'pcs',
      maxlength: [20, 'Unit cannot exceed 20 characters']
    },
    estimatedPrice: {
      type: Number,
      min: [0, 'Price must be positive']
    },
    actualPrice: {
      type: Number,
      min: [0, 'Price must be positive']
    },
    category: {
      type: String,
      enum: ['dairy', 'meat', 'vegetables', 'fruits', 'grains', 'beverages', 'snacks', 'household', 'personal_care', 'other'],
      default: 'other'
    },
    brand: {
      type: String,
      maxlength: [50, 'Brand cannot exceed 50 characters']
    },
    notes: {
      type: String,
      maxlength: [200, 'Notes cannot exceed 200 characters']
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium'
    },
    isPurchased: {
      type: Boolean,
      default: false
    },
    purchasedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    purchasedAt: {
      type: Date
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  totalEstimated: {
    type: Number,
    default: 0
  },
  totalActual: {
    type: Number,
    default: 0
  },
  budget: {
    type: Number,
    min: [0, 'Budget must be positive']
  },
  store: {
    name: String,
    address: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'archived'],
    default: 'active'
  },
  sharedWith: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    canEdit: {
      type: Boolean,
      default: true
    },
    notifications: {
      type: Boolean,
      default: true
    }
  }],
  dueDate: {
    type: Date
  },
  completedAt: {
    type: Date
  },
  tags: [String]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
shoppingListSchema.index({ household: 1, status: 1 });
shoppingListSchema.index({ createdBy: 1, status: 1 });
shoppingListSchema.index({ dueDate: 1 });

// Virtual for completion percentage
shoppingListSchema.virtual('completionPercentage').get(function() {
  if (this.items.length === 0) return 0;
  const purchasedItems = this.items.filter(item => item.isPurchased).length;
  return Math.round((purchasedItems / this.items.length) * 100);
});

// Virtual for remaining items count
shoppingListSchema.virtual('remainingItems').get(function() {
  return this.items.filter(item => !item.isPurchased).length;
});

// Virtual for budget status
shoppingListSchema.virtual('budgetStatus').get(function() {
  if (!this.budget) return 'no-budget';
  if (this.totalEstimated <= this.budget) return 'within-budget';
  if (this.totalEstimated <= this.budget * 1.1) return 'close-to-budget';
  return 'over-budget';
});

// Update totals before saving
shoppingListSchema.pre('save', function(next) {
  this.totalEstimated = this.items.reduce((total, item) => {
    return total + (item.estimatedPrice * item.quantity || 0);
  }, 0);
  
  this.totalActual = this.items.reduce((total, item) => {
    return total + (item.actualPrice * item.quantity || 0);
  }, 0);
  
  // Auto-complete if all items are purchased
  if (this.items.length > 0 && this.items.every(item => item.isPurchased)) {
    if (this.status === 'active') {
      this.status = 'completed';
      this.completedAt = new Date();
    }
  }
  
  next();
});

// Method to add item
shoppingListSchema.methods.addItem = function(itemData, userId) {
  this.items.push({
    ...itemData,
    addedBy: userId,
    addedAt: new Date()
  });
  return this.save();
};

// Method to mark item as purchased
shoppingListSchema.methods.markItemPurchased = function(itemId, userId, actualPrice) {
  const item = this.items.id(itemId);
  if (!item) throw new Error('Item not found');
  
  item.isPurchased = true;
  item.purchasedBy = userId;
  item.purchasedAt = new Date();
  if (actualPrice !== undefined) {
    item.actualPrice = actualPrice;
  }
  
  return this.save();
};

// Method to generate shopping suggestions
shoppingListSchema.methods.generateSuggestions = async function() {
  // This would integrate with AI service or use historical data
  // For now, return basic suggestions based on category
  const suggestions = {
    dairy: ['Milk', 'Yogurt', 'Cheese', 'Butter'],
    meat: ['Chicken', 'Beef', 'Fish', 'Eggs'],
    vegetables: ['Tomatoes', 'Onions', 'Potatoes', 'Carrots'],
    fruits: ['Bananas', 'Apples', 'Oranges', 'Avocados'],
    household: ['Soap', 'Detergent', 'Toilet Paper', 'Cooking Oil']
  };
  
  return suggestions;
};

module.exports = mongoose.model('ShoppingList', shoppingListSchema);