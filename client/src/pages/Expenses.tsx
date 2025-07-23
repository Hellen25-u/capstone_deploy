import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  PieChart, 
  Calendar,
  Plus,
  Edit3,
  Trash2,
  Filter,
  Download,
  CreditCard,
  ShoppingCart,
  Home,
  Car,
  Utensils,
  Coffee
} from 'lucide-react';
import toast from 'react-hot-toast';

const Expenses = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    category: 'food',
    date: new Date().toISOString().split('T')[0]
  });

  const expenses = [
    {
      id: 1,
      description: 'Weekly Groceries',
      amount: 5500,
      category: 'food',
      date: '2024-01-15',
      paidBy: 'Hellen',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 2,
      description: 'Electricity Bill',
      amount: 3200,
      category: 'utilities',
      date: '2024-01-14',
      paidBy: 'Dad',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 3,
      description: 'Fuel',
      amount: 4000,
      category: 'transport',
      date: '2024-01-13',
      paidBy: 'Sarah',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 4,
      description: 'Restaurant Dinner',
      amount: 2800,
      category: 'dining',
      date: '2024-01-12',
      paidBy: 'Family',
      color: 'from-purple-500 to-violet-500'
    },
    {
      id: 5,
      description: 'House Cleaning Supplies',
      amount: 1500,
      category: 'household',
      date: '2024-01-11',
      paidBy: 'Mom',
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 6,
      description: 'Coffee & Snacks',
      amount: 800,
      category: 'entertainment',
      date: '2024-01-10',
      paidBy: 'John',
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  const categories = [
    { id: 'food', name: 'Food & Groceries', icon: ShoppingCart, color: 'from-green-500 to-emerald-500' },
    { id: 'utilities', name: 'Utilities', icon: Home, color: 'from-yellow-500 to-orange-500' },
    { id: 'transport', name: 'Transport', icon: Car, color: 'from-blue-500 to-cyan-500' },
    { id: 'dining', name: 'Dining Out', icon: Utensils, color: 'from-purple-500 to-violet-500' },
    { id: 'household', name: 'Household', icon: Home, color: 'from-pink-500 to-rose-500' },
    { id: 'entertainment', name: 'Entertainment', icon: Coffee, color: 'from-indigo-500 to-purple-500' }
  ];

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const avgDaily = totalExpenses / 30;

  const categoryTotals = categories.map(category => ({
    ...category,
    total: expenses.filter(e => e.category === category.id).reduce((sum, e) => sum + e.amount, 0)
  })).sort((a, b) => b.total - a.total);

  const addExpense = () => {
    if (newExpense.description && newExpense.amount) {
      // In a real app, this would save to the database
      toast.success('Expense added successfully!');
      setNewExpense({
        description: '',
        amount: '',
        category: 'food',
        date: new Date().toISOString().split('T')[0]
      });
      setShowAddExpense(false);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Expense Tracker
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Track, analyze, and optimize your household spending with detailed insights
          </p>
        </motion.div>

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-pink-600" />
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-pink-600 mb-1">KSH {totalExpenses.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total This Month</div>
          </div>

          <div className="bg-gradient-to-r from-purple-100 to-violet-100 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="w-8 h-8 text-purple-600" />
              <TrendingDown className="w-5 h-5 text-red-500" />
            </div>
            <div className="text-2xl font-bold text-purple-600 mb-1">KSH {Math.round(avgDaily).toLocaleString()}</div>
            <div className="text-sm text-gray-600">Daily Average</div>
          </div>

          <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <PieChart className="w-8 h-8 text-blue-600" />
              <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">TOP</span>
            </div>
            <div className="text-2xl font-bold text-blue-600 mb-1">{categoryTotals[0]?.name.split(' ')[0]}</div>
            <div className="text-sm text-gray-600">Top Category</div>
          </div>

          <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <CreditCard className="w-8 h-8 text-green-600" />
              <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">85%</span>
            </div>
            <div className="text-2xl font-bold text-green-600 mb-1">₦{(25000 - totalExpenses).toLocaleString()}</div>
            <div className="text-2xl font-bold text-green-600 mb-1">KSH {(25000 - totalExpenses).toLocaleString()}</div>
            <div className="text-sm text-gray-600">Budget Remaining</div>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0"
        >
          <div className="flex items-center space-x-4">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>

          <button
            onClick={() => setShowAddExpense(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <Plus className="w-5 h-5" />
            <span>Add Expense</span>
          </button>
        </motion.div>

        {/* Add Expense Modal */}
        {showAddExpense && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Add New Expense</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <input
                    type="text"
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                    placeholder="e.g., Weekly groceries"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount (₦)</label>
                  <input
                    type="number"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                    placeholder="0"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={newExpense.category}
                    onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={newExpense.date}
                    onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>
              </div>
              
              <div className="flex space-x-4 mt-8">
                <button
                  onClick={addExpense}
                  className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  Add Expense
                </button>
                <button
                  onClick={() => setShowAddExpense(false)}
                  className="flex-1 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Expenses List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Expenses</h3>
              
              <div className="space-y-4">
                {expenses.map((expense, index) => {
                  const category = categories.find(c => c.id === expense.category);
                  const Icon = category?.icon || DollarSign;
                  
                  return (
                    <motion.div
                      key={expense.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 bg-gradient-to-r ${category?.color} rounded-xl flex items-center justify-center`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">{expense.description}</div>
                          <div className="text-sm text-gray-500">
                            {expense.date} • Paid by {expense.paidBy}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-gray-800">₦{expense.amount.toLocaleString()}</span>
                        <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="space-y-6">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Spending by Category</h3>
              
              <div className="space-y-4">
                {categoryTotals.map((category, index) => {
                  const Icon = category.icon;
                  const percentage = totalExpenses > 0 ? (category.total / totalExpenses) * 100 : 0;
                  
                  return (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center`}>
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-medium text-gray-700">{category.name}</span>
                        </div>
                        <span className="font-bold text-gray-800">₦{category.total.toLocaleString()}</span>
                      </div>
                      
                      <div className="relative">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`bg-gradient-to-r ${category.color} rounded-full h-2 transition-all duration-500`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="absolute right-0 top-3 text-xs text-gray-500">
                          {percentage.toFixed(1)}%
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Budget Status */}
            <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-green-800 mb-4">Budget Status</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-green-700">Monthly Budget</span>
                  <span className="font-bold text-green-800">KSH 25,000</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-green-700">Spent So Far</span>
                  <span className="font-bold text-green-800">KSH {totalExpenses.toLocaleString()}</span>
                </div>
                
                <div className="w-full bg-green-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full h-3 transition-all duration-500"
                    style={{ width: `${(totalExpenses / 25000) * 100}%` }}
                  ></div>
                </div>
                
                <div className="text-center">
                  <span className="text-2xl font-bold text-green-800">
                    KSH {(25000 - totalExpenses).toLocaleString()}
                  </span>
                  <div className="text-sm text-green-600">remaining this month</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expenses;