import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Smartphone, 
  CreditCard, 
  MapPin, 
  MessageSquare,
  Calendar,
  ShoppingBag,
  Zap,
  Settings,
  Check,
  Plus,
  ExternalLink,
  Star,
  Shield,
  Clock,
  Users
} from 'lucide-react';
import toast from 'react-hot-toast';

const Integrations = () => {
  const [connectedIntegrations, setConnectedIntegrations] = useState(['mpesa', 'google-calendar']);

  const integrations = [
    {
      id: 'mpesa',
      name: 'M-Pesa',
      description: 'Automatically track expenses from your M-Pesa transactions and categorize spending',
      icon: CreditCard,
      color: 'from-green-500 to-emerald-500',
      category: 'payments',
      features: [
        'Auto expense tracking',
        'SMS transaction parsing',
        'Budget alerts',
        'Spending categorization'
      ],
      isPopular: true,
      setupTime: '2 minutes'
    },
    {
      id: 'google-maps',
      name: 'Google Maps',
      description: 'Find nearby stores, get directions, and discover the best deals in your area',
      icon: MapPin,
      color: 'from-blue-500 to-cyan-500',
      category: 'location',
      features: [
        'Store locator',
        'Real-time directions',
        'Traffic updates',
        'Store hours & ratings'
      ],
      isPopular: true,
      setupTime: '1 minute'
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      description: 'Share shopping lists and get notifications directly in your family WhatsApp groups',
      icon: MessageSquare,
      color: 'from-green-400 to-green-600',
      category: 'communication',
      features: [
        'List sharing',
        'Real-time updates',
        'Family notifications',
        'Quick item additions'
      ],
      isPopular: false,
      setupTime: '3 minutes'
    },
    {
      id: 'google-calendar',
      name: 'Google Calendar',
      description: 'Schedule shopping trips and set reminders for recurring household tasks',
      icon: Calendar,
      color: 'from-purple-500 to-violet-500',
      category: 'productivity',
      features: [
        'Shopping reminders',
        'Recurring tasks',
        'Family calendar sync',
        'Budget review alerts'
      ],
      isPopular: false,
      setupTime: '2 minutes'
    },
    {
      id: 'jumia',
      name: 'Jumia',
      description: 'Compare prices and get deals from Kenya\'s largest online marketplace',
      icon: ShoppingBag,
      color: 'from-orange-500 to-amber-500',
      category: 'shopping',
      features: [
        'Price comparisons',
        'Deal alerts',
        'Product reviews',
        'Quick ordering'
      ],
      isPopular: true,
      setupTime: '2 minutes'
    },
    {
      id: 'naivas',
      name: 'Naivas Supermarket',
      description: 'Access exclusive deals, check stock availability, and pre-order items',
      icon: ShoppingBag,
      color: 'from-red-500 to-pink-500',
      category: 'shopping',
      features: [
        'Exclusive discounts',
        'Stock checking',
        'Pre-orders',
        'Loyalty points'
      ],
      isPopular: true,
      setupTime: '5 minutes'
    },
    {
      id: 'carrefour',
      name: 'Carrefour',
      description: 'Get weekly specials, check product availability, and earn rewards',
      icon: ShoppingBag,
      color: 'from-blue-600 to-blue-700',
      category: 'shopping',
      features: [
        'Weekly specials',
        'Product availability',
        'Reward points',
        'Digital receipts'
      ],
      isPopular: false,
      setupTime: '4 minutes'
    },
    {
      id: 'safaricom',
      name: 'Safaricom',
      description: 'Get data bundles for shopping apps and SMS notifications for deals',
      icon: Smartphone,
      color: 'from-green-600 to-green-700',
      category: 'telecom',
      features: [
        'Data bundle offers',
        'SMS deal alerts',
        'Airtime management',
        'Family plans'
      ],
      isPopular: false,
      setupTime: '3 minutes'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Integrations', icon: Zap },
    { id: 'payments', name: 'Payments', icon: CreditCard },
    { id: 'shopping', name: 'Shopping', icon: ShoppingBag },
    { id: 'location', name: 'Location', icon: MapPin },
    { id: 'communication', name: 'Communication', icon: MessageSquare },
    { id: 'productivity', name: 'Productivity', icon: Calendar },
    { id: 'telecom', name: 'Telecom', icon: Smartphone }
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredIntegrations = selectedCategory === 'all' 
    ? integrations 
    : integrations.filter(integration => integration.category === selectedCategory);

  const connectIntegration = (integrationId) => {
    if (connectedIntegrations.includes(integrationId)) {
      setConnectedIntegrations(connectedIntegrations.filter(id => id !== integrationId));
      toast.success('Integration disconnected successfully!');
    } else {
      setConnectedIntegrations([...connectedIntegrations, integrationId]);
      toast.success('Integration connected successfully!');
    }
  };

  const stats = [
    { label: 'Active Integrations', value: connectedIntegrations.length, icon: Zap, color: 'text-purple-600' },
    { label: 'Available Services', value: integrations.length, icon: Settings, color: 'text-blue-600' },
    { label: 'Money Saved', value: 'KSH 15,240', icon: CreditCard, color: 'text-green-600' },
    { label: 'Time Saved', value: '8.5 hrs', icon: Clock, color: 'text-orange-600' }
  ];

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
              Integrations
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect ZetuList with your favorite services to supercharge your household management and save even more time and money
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg">
                <Icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-8"
        >
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredIntegrations.map((integration, index) => {
            const Icon = integration.icon;
            const isConnected = connectedIntegrations.includes(integration.id);
            
            return (
              <motion.div
                key={integration.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative"
              >
                {integration.isPopular && (
                  <div className="absolute -top-3 -right-3">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                      <Star className="w-3 h-3" />
                      <span>Popular</span>
                    </div>
                  </div>
                )}

                {isConnected && (
                  <div className="absolute -top-3 -left-3">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg">
                      <Check className="w-4 h-4" />
                    </div>
                  </div>
                )}

                <div className="flex items-start justify-between mb-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${integration.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{integration.setupTime}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2">{integration.name}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{integration.description}</p>

                <div className="space-y-2 mb-6">
                  {integration.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => connectIntegration(integration.id)}
                    className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                      isConnected
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-lg transform hover:scale-105'
                    }`}
                  >
                    {isConnected ? (
                      <div className="flex items-center justify-center space-x-2">
                        <Check className="w-4 h-4" />
                        <span>Connected</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <Plus className="w-4 h-4" />
                        <span>Connect</span>
                      </div>
                    )}
                  </button>
                  
                  <button className="p-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Connect Your Services?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Integrations make ZetuList even more powerful by automating tasks and providing real-time insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: 'Save Time',
                description: 'Automate repetitive tasks and get things done faster',
                color: 'from-yellow-500 to-orange-500'
              },
              {
                icon: Shield,
                title: 'Stay Secure',
                description: 'All integrations use secure, encrypted connections',
                color: 'from-green-500 to-emerald-500'
              },
              {
                icon: Users,
                title: 'Better Coordination',
                description: 'Keep your whole family in sync across all platforms',
                color: 'from-blue-500 to-cyan-500'
              }
            ].map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="text-center"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-16 text-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-3xl p-12 text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Supercharge Your Household?</h2>
          <p className="text-xl mb-8 opacity-90">
            Connect your favorite services and experience the full power of ZetuList
          </p>
          <button className="bg-white text-purple-600 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            Explore More Integrations
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Integrations;