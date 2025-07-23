const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Mock store data - in a real app, this would come from a database
const stores = [
  {
    id: 1,
    name: 'Naivas Supermarket',
    category: 'Supermarket',
    address: 'Westlands, Nairobi',
    coordinates: { latitude: -1.2634, longitude: 36.8155 },
    distance: 0.8,
    rating: 4.5,
    isOpen: true,
    openingHours: '7:00 AM - 10:00 PM',
    phone: '+254 700 123 456',
    offers: [
      { item: 'Milk', discount: 15, originalPrice: 60, discountedPrice: 51 },
      { item: 'Bread', discount: 10, originalPrice: 50, discountedPrice: 45 }
    ]
  },
  {
    id: 2,
    name: 'Carrefour',
    category: 'Hypermarket',
    address: 'Junction Mall, Nairobi',
    coordinates: { latitude: -1.2921, longitude: 36.7856 },
    distance: 2.1,
    rating: 4.3,
    isOpen: true,
    openingHours: '8:00 AM - 11:00 PM',
    phone: '+254 700 234 567',
    offers: [
      { item: 'Rice', discount: 20, originalPrice: 150, discountedPrice: 120 },
      { item: 'Cooking Oil', discount: 12, originalPrice: 250, discountedPrice: 220 }
    ]
  },
  {
    id: 3,
    name: 'Quickmart',
    category: 'Supermarket',
    address: 'Karen, Nairobi',
    coordinates: { latitude: -1.3197, longitude: 36.7025 },
    distance: 1.5,
    rating: 4.2,
    isOpen: false,
    openingHours: '7:30 AM - 9:30 PM',
    phone: '+254 700 345 678',
    offers: [
      { item: 'Vegetables', discount: 25, originalPrice: 100, discountedPrice: 75 }
    ]
  },
  {
    id: 4,
    name: 'Tuskys Supermarket',
    category: 'Supermarket',
    address: 'CBD, Nairobi',
    coordinates: { latitude: -1.2841, longitude: 36.8155 },
    distance: 3.2,
    rating: 4.0,
    isOpen: true,
    openingHours: '8:00 AM - 10:00 PM',
    phone: '+254 700 456 789',
    offers: [
      { item: 'Meat', discount: 18, originalPrice: 500, discountedPrice: 410 }
    ]
  }
];

// Get nearby stores
router.get('/nearby', auth, async (req, res) => {
  try {
    const { latitude, longitude, radius = 5, category } = req.query;
    
    let filteredStores = stores;
    
    // Filter by category if provided
    if (category && category !== 'all') {
      filteredStores = stores.filter(store => 
        store.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Sort by distance
    filteredStores.sort((a, b) => a.distance - b.distance);
    
    res.json({
      success: true,
      stores: filteredStores,
      total: filteredStores.length
    });
  } catch (error) {
    console.error('Get nearby stores error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get nearby stores'
    });
  }
});

// Get store details
router.get('/:storeId', auth, async (req, res) => {
  try {
    const { storeId } = req.params;
    const store = stores.find(s => s.id === parseInt(storeId));
    
    if (!store) {
      return res.status(404).json({
        success: false,
        message: 'Store not found'
      });
    }
    
    res.json({
      success: true,
      store
    });
  } catch (error) {
    console.error('Get store details error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get store details'
    });
  }
});

// Get store offers
router.get('/:storeId/offers', auth, async (req, res) => {
  try {
    const { storeId } = req.params;
    const store = stores.find(s => s.id === parseInt(storeId));
    
    if (!store) {
      return res.status(404).json({
        success: false,
        message: 'Store not found'
      });
    }
    
    res.json({
      success: true,
      offers: store.offers || [],
      storeName: store.name
    });
  } catch (error) {
    console.error('Get store offers error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get store offers'
    });
  }
});

// Search stores
router.get('/search/:query', auth, async (req, res) => {
  try {
    const { query } = req.params;
    
    if (!query || query.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Search query must be at least 2 characters'
      });
    }
    
    const filteredStores = stores.filter(store =>
      store.name.toLowerCase().includes(query.toLowerCase()) ||
      store.category.toLowerCase().includes(query.toLowerCase()) ||
      store.address.toLowerCase().includes(query.toLowerCase())
    );
    
    res.json({
      success: true,
      stores: filteredStores,
      total: filteredStores.length
    });
  } catch (error) {
    console.error('Search stores error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to search stores'
    });
  }
});

// Get store categories
router.get('/categories/list', auth, async (req, res) => {
  try {
    const categories = [...new Set(stores.map(store => store.category))];
    
    res.json({
      success: true,
      categories: categories.map(category => ({
        name: category,
        count: stores.filter(store => store.category === category).length
      }))
    });
  } catch (error) {
    console.error('Get store categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get store categories'
    });
  }
});

module.exports = router;