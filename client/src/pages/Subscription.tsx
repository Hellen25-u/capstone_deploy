import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  Check, 
  Crown, 
  Zap, 
  Shield, 
  Users, 
  TrendingUp,
  Gift,
  Sparkles,
  Calendar,
  CreditCard
} from 'lucide-react';
import toast from 'react-hot-toast';

const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      description: 'Perfect for getting started with basic household management',
      features: [
        'Up to 3 shopping lists',
        'Basic expense tracking',
        'Up to 3 family members',
        'Standard support',
        'Basic notifications'
      ],
      color: 'from-gray-400 to-gray-500',
      bgColor: 'from-gray-50 to-gray-100',
      popular: false
    },
    {
      id: 'premium',
      name: 'Premium',
      price: { monthly: 999, yearly: 9990 },
      description: 'Everything you need for comprehensive household management',
      features: [
        'Unlimited shopping lists',
        'Advanced expense analytics',
        'Unlimited family members',
        'Real-time collaboration',
        'Smart deal finder',
        'Budget alerts & insights',
        'Priority support',
        'Export & backup data',
        'Custom categories',
        'Store price comparisons'
      ],
      color: 'from-pink-500 to-purple-600',
      bgColor: 'from-pink-50 to-purple-50',
      popular: true
    },
    {
      id: 'family',
      name: 'Family Pro',
      price: { monthly: 1499, yearly: 15000 },
      description: 'Advanced features for large families and power users',
      features: [
        'Everything in Premium',
        'Advanced AI suggestions',
        'Bulk shopping discounts',
        'Multiple household management',
        'Advanced reporting & analytics',
        'Custom integrations',
        'Dedicated account manager',
        'Early access to new features',
        'White-label options',
        'API access'
      ],
      color: 'from-yellow-400 to-orange-500',
      bgColor: 'from-yellow-50 to-orange-50',
      popular: false
    }
  ];

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized for speed and efficiency',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is encrypted and protected',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Users,
      title: 'Family Friendly',
      description: 'Designed for households of all sizes',
      color: 'from-purple-500 to-violet-500'
    },
    {
      icon: TrendingUp,
      title: 'Smart Analytics',
      description: 'Insights to help you save more',
      color: 'from-pink-500 to-rose-500'
    }
  ];

  const testimonials = [
    {
      name: 'Hellen Adhiambo',
      role: 'Mom of 3',
      avatar: 'HA',
      comment: 'ZetuList Premium has saved our family over KSH 30,000 this year! The smart deals feature is incredible.',
      rating: 5,
      color: 'from-pink-500 to-rose-500'
    },
    {
      name: 'David Kimani',
      role: 'Family Budget Manager',
      avatar: 'DK',
      comment: 'The expense tracking and analytics have completely transformed how we manage our household budget.',
      rating: 5,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Grace Wanjiku',
      role: 'Working Mom',
      avatar: 'GW',
      comment: 'Real-time collaboration means my whole family stays in sync. No more forgotten items or duplicate purchases!',
      rating: 5,
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const handleSubscribe = (planId) => {
    if (planId === 'free') {
      toast.success('You\'re already on the free plan! Upgrade anytime to unlock premium features.');
    } else {
      toast.success(`Redirecting to payment for ${plans.find(p => p.id === planId)?.name} plan...`);
      // Here you would integrate with your payment processor
    }
  };

  const getSavings = (plan) => {
    if (plan.price.yearly === 0) return 0;
    const monthlyCost = plan.price.monthly * 12;
    const yearlyCost = plan.price.yearly;
    return ((monthlyCost - yearlyCost) / monthlyCost * 100).toFixed(0);
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
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Crown className="w-8 h-8 text-yellow-500" />
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                Choose Your Plan
              </span>
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unlock the full potential of household management with premium features designed to save you time and money
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-2 shadow-lg">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  billingCycle === 'monthly'
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 relative ${
                  billingCycle === 'yearly'
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Yearly
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  Save 15%
                </span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-gradient-to-b ${plan.bgColor} rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 ${
                plan.popular ? 'ring-4 ring-pink-200 transform scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  {plan.id === 'free' && <Gift className="w-8 h-8 text-white" />}
                  {plan.id === 'premium' && <Crown className="w-8 h-8 text-white" />}
                  {plan.id === 'family' && <Sparkles className="w-8 h-8 text-white" />}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                
                <div className="mb-4">
                  <div className="text-4xl font-bold text-gray-800">
                    KSH {plan.price[billingCycle].toLocaleString()}
                    {plan.price[billingCycle] > 0 && (
                      <span className="text-lg font-normal text-gray-500">
                        /{billingCycle === 'yearly' ? 'year' : 'month'}
                      </span>
                    )}
                  </div>
                  {billingCycle === 'yearly' && plan.price.yearly > 0 && (
                    <div className="text-sm text-green-600 font-semibold">
                      Save {getSavings(plan)}% with yearly billing
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleSubscribe(plan.id)}
                className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                    : 'bg-white text-gray-800 border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg'
                }`}
              >
                {plan.id === 'free' ? 'Current Plan' : `Get ${plan.name}`}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose ZetuList Premium?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the features that make ZetuList the #1 choice for smart families
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="text-center"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What Our Families Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of families who are already saving time and money with ZetuList
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${testimonial.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <span className="text-white font-bold">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-gray-700 italic">"{testimonial.comment}"</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: 'Can I cancel my subscription anytime?',
                answer: 'Yes! You can cancel your subscription at any time from your account settings. You\'ll continue to have access to premium features until the end of your billing period.'
              },
              {
                question: 'Is there a free trial for premium plans?',
                answer: 'Yes! We offer a 14-day free trial for all premium plans. No credit card required to start your trial.'
              },
              {
                question: 'What payment methods do you accept?',
                answer: 'We accept all major credit cards, M-Pesa, and bank transfers for Kenyan customers.'
              },
              {
                question: 'Can I change my plan later?',
                answer: 'Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately and we\'ll prorate any billing differences.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg text-left">
                <h3 className="text-lg font-bold text-gray-800 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Subscription;