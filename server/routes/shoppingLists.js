const express = require('express');
const router = express.Router();
const ShoppingList = require('../models/ShoppingList');
const Household = require('../models/Household');
const auth = require('../middleware/auth');

// Get shopping lists for a household
router.get('/:householdId', auth, async (req, res) => {
  try {
    const { householdId } = req.params;
    const { status = 'active', page = 1, limit = 20 } = req.query;

    // Verify user is member of household
    const household = await Household.findById(householdId);
    if (!household || !household.isMember(req.user.id)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const query = { 
      household: householdId,
      status: status === 'all' ? { $in: ['active', 'completed', 'archived'] } : status
    };

    const lists = await ShoppingList.find(query)
      .populate('createdBy', 'name email')
      .populate('items.addedBy', 'name')
      .populate('items.purchasedBy', 'name')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await ShoppingList.countDocuments(query);

    res.json({
      success: true,
      lists,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get shopping lists error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get shopping lists'
    });
  }
});

// Create new shopping list
router.post('/', auth, async (req, res) => {
  try {
    const { title, description, household, items, budget, dueDate, store } = req.body;

    // Verify user is member of household
    const householdDoc = await Household.findById(household);
    if (!householdDoc || !householdDoc.isMember(req.user.id)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const shoppingList = new ShoppingList({
      title,
      description,
      household,
      createdBy: req.user.id,
      budget,
      dueDate,
      store
    });

    // Add items if provided
    if (items && items.length > 0) {
      shoppingList.items = items.map(item => ({
        ...item,
        addedBy: req.user.id
      }));
    }

    await shoppingList.save();
    await shoppingList.populate('createdBy', 'name email');

    // Update household statistics
    householdDoc.statistics.totalLists += 1;
    await householdDoc.save();

    res.status(201).json({
      success: true,
      message: 'Shopping list created successfully',
      list: shoppingList
    });
  } catch (error) {
    console.error('Create shopping list error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create shopping list'
    });
  }
});

// Get single shopping list
router.get('/list/:listId', auth, async (req, res) => {
  try {
    const list = await ShoppingList.findById(req.params.listId)
      .populate('createdBy', 'name email')
      .populate('items.addedBy', 'name')
      .populate('items.purchasedBy', 'name')
      .populate('sharedWith.user', 'name email');

    if (!list) {
      return res.status(404).json({
        success: false,
        message: 'Shopping list not found'
      });
    }

    // Verify user has access
    const household = await Household.findById(list.household);
    if (!household || !household.isMember(req.user.id)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      list
    });
  } catch (error) {
    console.error('Get shopping list error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get shopping list'
    });
  }
});

// Update shopping list
router.put('/:listId', auth, async (req, res) => {
  try {
    const list = await ShoppingList.findById(req.params.listId);
    
    if (!list) {
      return res.status(404).json({
        success: false,
        message: 'Shopping list not found'
      });
    }

    // Verify user can edit
    const household = await Household.findById(list.household);
    const canEdit = list.createdBy.toString() === req.user.id.toString() ||
                   list.sharedWith.some(s => s.user.toString() === req.user.id.toString() && s.canEdit) ||
                   household.getMemberRole(req.user.id) === 'owner';

    if (!canEdit) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Update allowed fields
    const allowedUpdates = ['title', 'description', 'budget', 'dueDate', 'store', 'status'];
    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        list[field] = req.body[field];
      }
    });

    await list.save();
    await list.populate('createdBy', 'name email');

    res.json({
      success: true,
      message: 'Shopping list updated successfully',
      list
    });
  } catch (error) {
    console.error('Update shopping list error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update shopping list'
    });
  }
});

// Add item to shopping list
router.post('/:listId/items', auth, async (req, res) => {
  try {
    const list = await ShoppingList.findById(req.params.listId);
    
    if (!list) {
      return res.status(404).json({
        success: false,
        message: 'Shopping list not found'
      });
    }

    // Verify user can edit
    const household = await Household.findById(list.household);
    const canEdit = list.createdBy.toString() === req.user.id.toString() ||
                   list.sharedWith.some(s => s.user.toString() === req.user.id.toString() && s.canEdit) ||
                   household.isMember(req.user.id);

    if (!canEdit) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    await list.addItem(req.body, req.user.id);
    await list.populate('items.addedBy', 'name');

    res.json({
      success: true,
      message: 'Item added successfully',
      list
    });
  } catch (error) {
    console.error('Add item error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add item'
    });
  }
});

// Mark item as purchased
router.post('/:listId/items/:itemId/purchase', auth, async (req, res) => {
  try {
    const { actualPrice } = req.body;
    const list = await ShoppingList.findById(req.params.listId);
    
    if (!list) {
      return res.status(404).json({
        success: false,
        message: 'Shopping list not found'
      });
    }

    // Verify user has access
    const household = await Household.findById(list.household);
    if (!household || !household.isMember(req.user.id)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    await list.markItemPurchased(req.params.itemId, req.user.id, actualPrice);
    await list.populate('items.purchasedBy', 'name');

    res.json({
      success: true,
      message: 'Item marked as purchased',
      list
    });
  } catch (error) {
    console.error('Mark item purchased error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to mark item as purchased'
    });
  }
});

// Delete shopping list
router.delete('/:listId', auth, async (req, res) => {
  try {
    const list = await ShoppingList.findById(req.params.listId);
    
    if (!list) {
      return res.status(404).json({
        success: false,
        message: 'Shopping list not found'
      });
    }

    // Verify user can delete
    const household = await Household.findById(list.household);
    const canDelete = list.createdBy.toString() === req.user.id.toString() ||
                     household.getMemberRole(req.user.id) === 'owner';

    if (!canDelete) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    await list.remove();

    // Update household statistics
    household.statistics.totalLists -= 1;
    await household.save();

    res.json({
      success: true,
      message: 'Shopping list deleted successfully'
    });
  } catch (error) {
    console.error('Delete shopping list error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete shopping list'
    });
  }
});

// Get shopping suggestions
router.get('/:listId/suggestions', auth, async (req, res) => {
  try {
    const list = await ShoppingList.findById(req.params.listId);
    
    if (!list) {
      return res.status(404).json({
        success: false,
        message: 'Shopping list not found'
      });
    }

    const suggestions = await list.generateSuggestions();

    res.json({
      success: true,
      suggestions
    });
  } catch (error) {
    console.error('Get suggestions error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get suggestions'
    });
  }
});

module.exports = router;