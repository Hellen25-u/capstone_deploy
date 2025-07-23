import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  Users, 
  DollarSign, 
  MessageCircle, 
  Store,
  Smartphone,
  Shield,
  Zap,
  Star,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: ShoppingCart,
      title: 'Smart Shopping Lists',
      description: 'Create and share shopping lists with your household members in real-time',
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-100'
    },
    {
      icon: Users,
      title: 'Household Management',
      description: 'Coordinate with family members and track everyone\'s contributions',
      color: 'from-purple-500 to-violet-500',
      bgColor: 'bg-purple-100'
    },
    {
      icon: DollarSign,
      title: 'Expense Tracking',
      description: 'Monitor your spending and stick to your budget with detailed analytics',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-100'
    },
    {
      icon: Store,
      title: 'Store Locator',
      description: 'Find the best deals and nearest stores for your shopping needs',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-100'
    },
    {
      icon: MessageCircle,
      title: 'Family Chat',
      description: 'Stay connected with built-in messaging and coordination tools',
      color: 'from-orange-500 to-amber-500',
      bgColor: 'bg-orange-100'
    },
    {
      icon: Smartphone,
      title: 'Mobile First',
      description: 'Designed for mobile with offline support and push notifications',
      color: 'from-teal-500 to-cyan-500',
      bgColor: 'bg-teal-100'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Active Families', color: 'text-pink-600' },
    { number: 'KSH 50M+', label: 'Money Saved', color: 'text-purple-600' },
    { number: '500K+', label: 'Lists Created', color: 'text-blue-600' },
    { number: '98%', label: 'User Satisfaction', color: 'text-green-600' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full"
                >
                  <Star className="w-5 h-5 text-yellow-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">#1 Household App in Kenya</span>
                </motion.div>
                
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                    Smart Shopping
                  </span>
                  <br />
                  <span className="text-gray-800">for Modern</span>
                  <br />
                  <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
                    Families
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed">
                  Revolutionize how your household shops, budgets, and saves money. 
                  Join thousands of Kenyan families already saving time and money with ZetuList.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/auth"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-purple-600 border-2 border-purple-200 font-semibold rounded-xl shadow-lg hover:shadow-xl hover:bg-purple-50 transform hover:scale-105 transition-all duration-300"
                >
                  Learn More
                </Link>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full border-2 border-white flex items-center justify-center text-white font-semibold"
                    >
                      {i}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">Trusted by 10,000+ families</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-r from-pink-100 to-purple-100 rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <ShoppingCart className="w-8 h-8 text-pink-500 mb-3" />
                    <h3 className="font-semibold text-gray-800">Shopping Lists</h3>
                    <p className="text-sm text-gray-600 mt-2">3 active lists</p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <DollarSign className="w-8 h-8 text-green-500 mb-3" />
                    <h3 className="font-semibold text-gray-800">Budget</h3>
                    <p className="text-sm text-gray-600 mt-2">KSH 45K saved</p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <Users className="w-8 h-8 text-purple-500 mb-3" />
                    <h3 className="font-semibold text-gray-800">Family</h3>
                    <p className="text-sm text-gray-600 mt-2">4 members</p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <Store className="w-8 h-8 text-blue-500 mb-3" />
                    <h3 className="font-semibold text-gray-800">Stores</h3>
                    <p className="text-sm text-gray-600 mt-2">12 nearby</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`text-4xl font-bold ${stat.color} mb-2`}>
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Everything Your Family Needs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From smart shopping lists to expense tracking, ZetuList has all the tools 
              to make your household management effortless and fun.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`${feature.bgColor} rounded-2xl p-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300`}
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Transform Your Family Shopping?
            </h2>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Join thousands of families already saving time and money. Get started with ZetuList today!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/auth"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-purple-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              
              <Link
                to="/subscription"
                className="inline-flex items-center justify-center px-8 py-4 bg-yellow-400 text-gray-800 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <Star className="w-5 h-5 mr-2" />
                Get Premium
              </Link>
            </div>

            <div className="flex items-center justify-center space-x-4 text-purple-100">
              <CheckCircle className="w-5 h-5" />
              <span>Free 14-day trial</span>
              <CheckCircle className="w-5 h-5" />
              <span>No credit card required</span>
              <CheckCircle className="w-5 h-5" />
              <span>Cancel anytime</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;