import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, ShoppingCart, Check, X, Edit3, Share2, Users, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

const ShoppingLists = () => {
  const [lists, setLists] = useState([
    {
      id: 1,
      name: 'Weekly Groceries',
      items: [
        { id: 1, name: 'Rice (2kg)', quantity: 1, completed: false, price: 180 },
        { id: 2, name: 'Milk (1L)', quantity: 2, completed: true, price: 60 },
        { id: 3, name: 'Bread', quantity: 1, completed: false, price: 45 },
        { id: 4, name: 'Tomatoes (1kg)', quantity: 1, completed: false, price: 80 }
      ],
      collaborators: ['Mom', 'Dad', 'Sister'],
      createdAt: '2024-01-15',
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 2,
      name: 'Party Supplies',
      items: [
        { id: 5, name: 'Balloons', quantity: 20, completed: false, price: 100 },
        { id: 6, name: 'Cake', quantity: 1, completed: false, price: 1500 },
        { id: 7, name: 'Juice (2L)', quantity: 3, completed: true, price: 120 }
      ],
      collaborators: ['Sarah', 'John'],
      createdAt: '2024-01-16',
      color: 'from-purple-500 to-violet-500'
    },
    {
      id: 3,
      name: 'Monthly Household',
      items: [
        { id: 8, name: 'Detergent', quantity: 1, completed: false, price: 250 },
        { id: 9, name: 'Toilet Paper', quantity: 4, completed: false, price: 200 },
        { id: 10, name: 'Cooking Oil (1L)', quantity: 1, completed: true, price: 180 }
      ],
      collaborators: ['Family'],
      createdAt: '2024-01-10',
      color: 'from-blue-500 to-cyan-500'
    }
  ]);

  const [newListName, setNewListName] = useState('');
  const [showNewListForm, setShowNewListForm] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [selectedList, setSelectedList] = useState(null);

  const createNewList = () => {
    if (newListName.trim()) {
      const colors = [
        'from-green-500 to-emerald-500',
        'from-orange-500 to-amber-500',
        'from-teal-500 to-cyan-500',
        'from-indigo-500 to-purple-500'
      ];
      
      const newList = {
        id: Date.now(),
        name: newListName,
        items: [],
        collaborators: ['You'],
        createdAt: new Date().toISOString().split('T')[0],
        color: colors[Math.floor(Math.random() * colors.length)]
      };
      
      setLists([...lists, newList]);
      setNewListName('');
      setShowNewListForm(false);
      toast.success('New shopping list created!');
    }
  };

  const addItemToList = (listId) => {
    if (newItemName.trim()) {
      setLists(lists.map(list => 
        list.id === listId 
          ? {
              ...list,
              items: [...list.items, {
                id: Date.now(),
                name: newItemName,
                quantity: 1,
                completed: false,
                price: 0
              }]
            }
          : list
      ));
      setNewItemName('');
      toast.success('Item added to list!');
    }
  };

  const toggleItemCompletion = (listId, itemId) => {
    setLists(lists.map(list => 
      list.id === listId 
        ? {
            ...list,
            items: list.items.map(item =>
              item.id === itemId ? { ...item, completed: !item.completed } : item
            )
          }
        : list
    ));
  };

  const removeItem = (listId, itemId) => {
    setLists(lists.map(list => 
      list.id === listId 
        ? {
            ...list,
            items: list.items.filter(item => item.id !== itemId)
          }
        : list
    ));
    toast.success('Item removed from list');
  };

  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getProgress = (items) => {
    if (items.length === 0) return 0;
    const completed = items.filter(item => item.completed).length;
    return Math.round((completed / items.length) * 100);
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
              Shopping Lists
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create, share, and manage your family's shopping lists with real-time collaboration
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-2xl p-6 text-center">
            <ShoppingCart className="w-8 h-8 text-pink-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-pink-600">{lists.length}</div>
            <div className="text-sm text-gray-600">Active Lists</div>
          </div>
          <div className="bg-gradient-to-r from-purple-100 to-violet-100 rounded-2xl p-6 text-center">
            <Check className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">
              {lists.reduce((total, list) => total + list.items.filter(item => item.completed).length, 0)}
            </div>
            <div className="text-sm text-gray-600">Items Completed</div>
          </div>
          <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-2xl p-6 text-center">
            <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">
              {new Set(lists.flatMap(list => list.collaborators)).size}
            </div>
            <div className="text-sm text-gray-600">Collaborators</div>
          </div>
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-6 text-center">
            <div className="text-lg font-bold text-green-600">
              KSH {lists.reduce((total, list) => total + calculateTotal(list.items), 0)}
            </div>
            <div className="text-sm text-gray-600">Total Budget</div>
          </div>
        </motion.div>

        {/* New List Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          {!showNewListForm ? (
            <button
              onClick={() => setShowNewListForm(true)}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create New List
            </button>
          ) : (
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  placeholder="Enter list name..."
                  className="flex-1 px-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  onKeyPress={(e) => e.key === 'Enter' && createNewList()}
                />
                <button
                  onClick={createNewList}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Create
                </button>
                <button
                  onClick={() => setShowNewListForm(false)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Shopping Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {lists.map((list, index) => (
            <motion.div
              key={list.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* List Header */}
              <div className={`bg-gradient-to-r ${list.color} rounded-t-2xl p-6 text-white`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{list.name}</h3>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>{list.collaborators.join(', ')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{list.createdAt}</span>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{getProgress(list.items)}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div 
                      className="bg-white rounded-full h-2 transition-all duration-300"
                      style={{ width: `${getProgress(list.items)}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* List Items */}
              <div className="p-6">
                <div className="space-y-3 mb-4">
                  {list.items.map((item) => (
                    <div
                      key={item.id}
                      className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all duration-300 ${
                        item.completed
                          ? 'bg-green-50 border-green-200 text-green-800'
                          : 'bg-gray-50 border-gray-200 text-gray-800'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => toggleItemCompletion(list.id, item.id)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                            item.completed
                              ? 'bg-green-500 border-green-500'
                              : 'border-gray-300 hover:border-green-400'
                          }`}
                        >
                          {item.completed && <Check className="w-4 h-4 text-white" />}
                        </button>
                        <div>
                          <div className={`font-medium ${item.completed ? 'line-through' : ''}`}>
                            {item.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            Qty: {item.quantity} • KSH {item.price}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(list.id, item.id)}
                        className="p-1 text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add New Item */}
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={selectedList === list.id ? newItemName : ''}
                    onChange={(e) => {
                      setNewItemName(e.target.value);
                      setSelectedList(list.id);
                    }}
                    placeholder="Add new item..."
                    className="flex-1 px-3 py-2 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm"
                    onKeyPress={(e) => e.key === 'Enter' && addItemToList(list.id)}
                  />
                  <button
                    onClick={() => addItemToList(list.id)}
                    className="p-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* List Total */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700">Total:</span>
                    <span className="text-2xl font-bold text-gray-800">
                      KSH {calculateTotal(list.items)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShoppingLists;