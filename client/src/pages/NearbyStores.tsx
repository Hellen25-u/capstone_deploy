import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Store, Star, Clock, Phone, Navigation, Filter, Search } from 'lucide-react';

const NearbyStores = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('distance');

  const stores = [
    {
      id: 1,
      name: 'Naivas Supermarket',
      category: 'supermarket',
      distance: '0.5 km',
      rating: 4.5,
      address: 'Westlands, Nairobi',
      phone: '+254 700 123 456',
      hours: '7:00 AM - 10:00 PM',
      image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=400',
      specialOffers: ['10% off on groceries', 'Buy 2 Get 1 Free bread'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      name: 'Carrefour Mall',
      category: 'hypermarket',
      distance: '1.2 km',
      rating: 4.3,
      address: 'Sarit Centre, Westlands',
      phone: '+254 700 234 567',
      hours: '8:00 AM - 11:00 PM',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=400',
      specialOffers: ['Weekend discounts up to 25%', 'Fresh produce deals'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 3,
      name: 'Mama Mboga Fresh',
      category: 'local',
      distance: '0.3 km',
      rating: 4.8,
      address: 'Parklands Market',
      phone: '+254 700 345 678',
      hours: '6:00 AM - 8:00 PM',
      image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=400',
      specialOffers: ['Organic vegetables', 'Fresh daily deliveries'],
      color: 'from-orange-500 to-amber-500'
    },
    {
      id: 4,
      name: 'Cleanshelf Supermarket',
      category: 'supermarket',
      distance: '0.8 km',
      rating: 4.2,
      address: 'Kilimani, Nairobi',
      phone: '+254 700 456 789',
      hours: '7:30 AM - 9:30 PM',
      image: 'https://images.pexels.com/photos/811105/pexels-photo-811105.jpeg?auto=compress&cs=tinysrgb&w=400',
      specialOffers: ['Student discounts', 'Loyalty program benefits'],
      color: 'from-purple-500 to-violet-500'
    },
    {
      id: 5,
      name: 'Quick Mart Express',
      category: 'convenience',
      distance: '0.2 km',
      rating: 4.0,
      address: 'Westlands Road',
      phone: '+254 700 567 890',
      hours: '24/7',
      image: 'https://images.pexels.com/photos/2292919/pexels-photo-2292919.jpeg?auto=compress&cs=tinysrgb&w=400',
      specialOffers: ['24/7 convenience', 'Quick delivery service'],
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 6,
      name: 'Zucchini Greengrocer',
      category: 'specialty',
      distance: '1.5 km',
      rating: 4.6,
      address: 'Karen Shopping Centre',
      phone: '+254 700 678 901',
      hours: '8:00 AM - 7:00 PM',
      image: 'https://images.pexels.com/photos/1458694/pexels-photo-1458694.jpeg?auto=compress&cs=tinysrgb&w=400',
      specialOffers: ['Organic produce', 'Farm-to-table freshness'],
      color: 'from-teal-500 to-cyan-500'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Stores', icon: Store },
    { id: 'supermarket', name: 'Supermarkets', icon: Store },
    { id: 'hypermarket', name: 'Hypermarkets', icon: Store },
    { id: 'local', name: 'Local Markets', icon: Store },
    { id: 'convenience', name: 'Convenience', icon: Store },
    { id: 'specialty', name: 'Specialty', icon: Store }
  ];

  const filteredStores = stores.filter(store => {
    const matchesSearch = store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         store.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || store.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedStores = [...filteredStores].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'distance':
        return parseFloat(a.distance) - parseFloat(b.distance);
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

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
              Nearby Stores
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the best stores near you with deals, ratings, and real-time information
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search stores or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
            >
              <option value="distance">Sort by Distance</option>
              <option value="rating">Sort by Rating</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-2xl p-6 text-center">
            <Store className="w-8 h-8 text-pink-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-pink-600">{sortedStores.length}</div>
            <div className="text-sm text-gray-600">Stores Found</div>
          </div>
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-6 text-center">
            <MapPin className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">2.5km</div>
            <div className="text-sm text-gray-600">Search Radius</div>
          </div>
          <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-2xl p-6 text-center">
            <Star className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">4.4</div>
            <div className="text-sm text-gray-600">Avg Rating</div>
          </div>
          <div className="bg-gradient-to-r from-purple-100 to-violet-100 rounded-2xl p-6 text-center">
            <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">18</div>
            <div className="text-sm text-gray-600">Open Now</div>
          </div>
        </motion.div>

        {/* Stores Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedStores.map((store, index) => (
            <motion.div
              key={store.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Store Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={store.image}
                  alt={store.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className={`absolute top-4 left-4 px-3 py-1 bg-gradient-to-r ${store.color} text-white text-sm font-semibold rounded-full`}>
                  {store.distance}
                </div>
                <div className="absolute top-4 right-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold">{store.rating}</span>
                </div>
              </div>

              {/* Store Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-800">{store.name}</h3>
                  <span className={`px-2 py-1 bg-gradient-to-r ${store.color} text-white text-xs font-semibold rounded-full capitalize`}>
                    {store.category}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{store.address}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{store.hours}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{store.phone}</span>
                  </div>
                </div>

                {/* Special Offers */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Special Offers:</h4>
                  <div className="space-y-1">
                    {store.specialOffers.map((offer, offerIndex) => (
                      <div key={offerIndex} className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                        {offer}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button className={`flex-1 py-2 px-4 bg-gradient-to-r ${store.color} text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300`}>
                    <Navigation className="w-4 h-4 inline mr-2" />
                    Directions
                  </button>
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
                    <Phone className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Map View Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            <MapPin className="w-5 h-5 mr-2" />
            View on Map
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default NearbyStores;