const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const Household = require('../models/Household');
const auth = require('../middleware/auth');

// Get expenses for a household
router.get('/:householdId', auth, async (req, res) => {
  try {
    const { householdId } = req.params;
    const { page = 1, limit = 20, category, startDate, endDate } = req.query;

    // Verify user is member of household
    const household = await Household.findById(householdId);
    if (!household || !household.isMember(req.user.id)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Build query
    const query = { 
      household: householdId,
      status: 'approved'
    };

    if (category) query.category = category;
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const expenses = await Expense.find(query)
      .populate('paidBy', 'name email')
      .populate('splitBetween.user', 'name email')
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Expense.countDocuments(query);

    res.json({
      success: true,
      expenses,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get expenses error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get expenses'
    });
  }
});

// Create new expense
router.post('/', auth, async (req, res) => {
  try {
    const {
      description,
      amount,
      category,
      household,
      splitBetween,
      paymentMethod,
      location,
      notes,
      date
    } = req.body;

    // Verify user is member of household
    const householdDoc = await Household.findById(household);
    if (!householdDoc || !householdDoc.isMember(req.user.id)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const expense = new Expense({
      description,
      amount,
      category,
      household,
      paidBy: req.user.id,
      paymentMethod: paymentMethod || 'cash',
      location,
      notes,
      date: date || new Date()
    });

    // Handle expense splitting
    if (splitBetween && splitBetween.length > 0) {
      expense.splitBetween = splitBetween.map(split => ({
        user: split.user,
        amount: split.amount,
        paid: split.user.toString() === req.user.id.toString()
      }));
    } else {
      // Default to splitting equally among all household members
      const memberIds = householdDoc.members.map(m => m.user);
      await expense.splitEqually(memberIds);
    }

    await expense.save();
    await expense.populate('paidBy', 'name email');
    await expense.populate('splitBetween.user', 'name email');

    // Update household statistics
    householdDoc.statistics.totalExpenses += amount;
    await householdDoc.save();

    res.status(201).json({
      success: true,
      message: 'Expense created successfully',
      expense
    });
  } catch (error) {
    console.error('Create expense error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create expense'
    });
  }
});

// Update expense
router.put('/:expenseId', auth, async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.expenseId);
    
    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found'
      });
    }

    // Verify user can edit this expense
    const household = await Household.findById(expense.household);
    const userRole = household.getMemberRole(req.user.id);
    const canEdit = expense.paidBy.toString() === req.user.id.toString() || 
                   userRole === 'owner' || userRole === 'admin';

    if (!canEdit) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Update allowed fields
    const allowedUpdates = ['description', 'amount', 'category', 'location', 'notes', 'date'];
    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        expense[field] = req.body[field];
      }
    });

    await expense.save();
    await expense.populate('paidBy', 'name email');
    await expense.populate('splitBetween.user', 'name email');

    res.json({
      success: true,
      message: 'Expense updated successfully',
      expense
    });
  } catch (error) {
    console.error('Update expense error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update expense'
    });
  }
});

// Delete expense
router.delete('/:expenseId', auth, async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.expenseId);
    
    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found'
      });
    }

    // Verify user can delete this expense
    const household = await Household.findById(expense.household);
    const userRole = household.getMemberRole(req.user.id);
    const canDelete = expense.paidBy.toString() === req.user.id.toString() || 
                     userRole === 'owner' || userRole === 'admin';

    if (!canDelete) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    await expense.remove();

    // Update household statistics
    household.statistics.totalExpenses -= expense.amount;
    await household.save();

    res.json({
      success: true,
      message: 'Expense deleted successfully'
    });
  } catch (error) {
    console.error('Delete expense error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete expense'
    });
  }
});

// Get expense statistics
router.get('/:householdId/stats', auth, async (req, res) => {
  try {
    const { householdId } = req.params;
    const { period = 'month' } = req.query;

    // Verify access
    const household = await Household.findById(householdId);
    if (!household || !household.isMember(req.user.id)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Calculate date range based on period
    const now = new Date();
    let startDate;
    
    switch (period) {
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'quarter':
        startDate = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    }

    const stats = await Expense.getHouseholdStats(householdId, startDate, now);

    // Calculate totals
    const totalAmount = stats.reduce((sum, stat) => sum + stat.total, 0);
    const totalTransactions = stats.reduce((sum, stat) => sum + stat.count, 0);

    res.json({
      success: true,
      stats: {
        period,
        totalAmount,
        totalTransactions,
        averageTransaction: totalAmount / (totalTransactions || 1),
        categoryBreakdown: stats,
        budget: household.settings.budget.monthly || 0,
        budgetUsed: (totalAmount / (household.settings.budget.monthly || 1)) * 100
      }
    });
  } catch (error) {
    console.error('Get expense stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get expense statistics'
    });
  }
});

// Mark split as paid
router.post('/:expenseId/mark-paid', auth, async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.expenseId);
    
    if (!expense) {
      return res.status(404).json({
        success: false,
        message: 'Expense not found'
      });
    }

    await expense.markSplitPaid(req.user.id);

    res.json({
      success: true,
      message: 'Split marked as paid'
    });
  } catch (error) {
    console.error('Mark split paid error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to mark split as paid'
    });
  }
});

module.exports = router;