import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Target, Award, MapPin, Calendar } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Family First',
      description: 'We believe strong families build strong communities. Everything we do is designed to bring families closer together.',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Built by Kenyans, for Kenyans. We understand the unique needs of African households and shopping culture.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Target,
      title: 'Innovation',
      description: 'We constantly innovate to make household management simpler, smarter, and more enjoyable for everyone.',
      color: 'from-purple-500 to-violet-500'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in every feature, ensuring ZetuList exceeds your expectations every day.',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const timeline = [
    { year: '2023', event: 'ZetuList Founded', description: 'Started with a vision to revolutionize household shopping in Kenya' },
    { year: '2023', event: 'First 1K Users', description: 'Reached our first milestone with 1,000 active families' },
    { year: '2024', event: 'Mobile App Launch', description: 'Launched our mobile-first platform with offline support' },
    { year: '2024', event: '10K+ Families', description: 'Now serving over 10,000 families across Kenya' }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              About ZetuList
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to make household shopping and budget management effortless 
            for every Kenyan family. Born from the need to simplify the complexities of 
            modern family life.
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-800">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  ZetuList was born from a simple observation: managing household shopping 
                  and budgets was unnecessarily complicated for busy families. Our founders, 
                  a group of Kenyan tech enthusiasts and parents, experienced firsthand the 
                  challenges of coordinating shopping lists, tracking expenses, and keeping 
                  family members on the same page.
                </p>
                <p>
                  What started as a weekend project to solve our own family's shopping chaos 
                  quickly evolved into something much bigger. We realized that millions of 
                  families across Kenya were facing the same challenges, and technology could 
                  be the solution.
                </p>
                <p>
                  Today, ZetuList serves over 10,000 families across Kenya, helping them save 
                  time, money, and stress while bringing families closer together through 
                  better coordination and communication.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white rounded-2xl p-4 text-center shadow-lg">
                    <div className="text-2xl font-bold text-pink-600">10K+</div>
                    <div className="text-sm text-gray-600">Families</div>
                  </div>
                  <div className="bg-white rounded-2xl p-4 text-center shadow-lg">
                    <div className="text-2xl font-bold text-purple-600">₦50M+</div>
                    <div className="text-sm text-gray-600">Saved</div>
                  </div>
                  <div className="bg-white rounded-2xl p-4 text-center shadow-lg">
                    <div className="text-2xl font-bold text-blue-600">500K+</div>
                    <div className="text-sm text-gray-600">Lists</div>
                  </div>
                  <div className="bg-white rounded-2xl p-4 text-center shadow-lg">
                    <div className="text-2xl font-bold text-green-600">47</div>
                    <div className="text-sm text-gray-600">Counties</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 mb-4">
                  <MapPin className="w-5 h-5 text-purple-500" />
                  <span className="text-gray-700 font-medium">Proudly Made in Kenya</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Values Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at ZetuList
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Timeline Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Key milestones in our mission to revolutionize household management
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Calendar className="w-5 h-5 text-purple-500" />
                        <span className="text-lg font-bold text-purple-600">{item.year}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{item.event}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full border-4 border-white shadow-lg z-10"></div>
                  
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet the Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate individuals behind ZetuList's success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Hellen Adhiambo', role: 'CEO & Co-founder', bg: 'from-pink-400 to-rose-400' },
              { name: 'James Ochieng', role: 'CTO & Co-founder', bg: 'from-purple-400 to-violet-400' },
              { name: 'Grace Muthoni', role: 'Head of Product', bg: 'from-blue-400 to-cyan-400' }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`w-32 h-32 bg-gradient-to-r ${member.bg} rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg`}>
                  <span className="text-2xl font-bold text-white">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default About;