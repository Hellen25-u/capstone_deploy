import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  UserPlus, 
  Crown, 
  Mail, 
  Phone, 
  Calendar,
  Edit3,
  MoreVertical,
  Shield,
  Star,
  Activity,
  Award,
  Gift
} from 'lucide-react';
import toast from 'react-hot-toast';

const Household = () => {
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');

  const household = {
    id: 1,
    name: "Hellen's Family",
    createdAt: "2024-01-01",
    totalMembers: 4,
    totalLists: 12,
    totalSavings: 45000
  };

  const members = [
    {
      id: 1,
      name: 'Hellen Adhiambo',
      email: 'hellen.adhiambo@example.com',
      phone: '+254745690779',
      role: 'admin',
      joinedAt: '2024-01-01',
      avatar: 'HA',
      isActive: true,
      contributions: 15,
      savings: 18000,
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 2,
      name: 'James Ochieng',
      email: 'james@example.com',
      phone: '+254 700 234 567',
      role: 'member',
      joinedAt: '2024-01-05',
      avatar: 'JO',
      isActive: true,
      contributions: 12,
      savings: 12000,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 3,
      name: 'Grace Muthoni',
      email: 'grace@example.com',
      phone: '+254 700 345 678',
      role: 'member',
      joinedAt: '2024-01-10',
      avatar: 'GM',
      isActive: false,
      contributions: 8,
      savings: 9000,
      color: 'from-purple-500 to-violet-500'
    },
    {
      id: 4,
      name: 'John Karanja',
      email: 'john@example.com',
      phone: '+254 700 456 789',
      role: 'member',
      joinedAt: '2024-01-15',
      avatar: 'JK',
      isActive: true,
      contributions: 10,
      savings: 6000,
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const activities = [
    {
      id: 1,
      member: 'Hellen Adhiambo',
      action: 'added "Weekly Groceries" to shopping list',
      timestamp: '2 hours ago',
      type: 'list'
    },
    {
      id: 2,
      member: 'James Ochieng',
      action: 'completed shopping at Naivas Supermarket',
      timestamp: '4 hours ago',
      type: 'shopping'
    },
    {
      id: 3,
      member: 'Grace Muthoni',
      action: 'added new expense: Electricity Bill - ₦3,200',
      timestamp: '1 day ago',
      type: 'expense'
    },
    {
      id: 4,
      member: 'John Karanja',
      action: 'joined the household',
      timestamp: '3 days ago',
      type: 'member'
    }
  ];

  const inviteMember = () => {
    if (inviteEmail.trim()) {
      toast.success(`Invitation sent to ${inviteEmail}!`);
      setInviteEmail('');
      setShowInviteForm(false);
    }
  };

  const getRoleColor = (role) => {
    return role === 'admin' ? 'from-yellow-400 to-orange-500' : 'from-gray-400 to-gray-500';
  };

  const getRoleIcon = (role) => {
    return role === 'admin' ? Crown : Shield;
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
              Household Management
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Manage your family members, track contributions, and coordinate household activities
          </p>
        </motion.div>

        {/* Household Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100 rounded-3xl p-8 mb-8 shadow-lg"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{household.name}</h2>
              <div className="flex items-center space-x-4 text-gray-600">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Created {household.createdAt}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{household.totalMembers} members</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-pink-600">{household.totalLists}</div>
                <div className="text-sm text-gray-600">Active Lists</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">₦{household.totalSavings.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Savings</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">85%</div>
                <div className="text-sm text-gray-600">Efficiency</div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Members Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Add Member Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-between items-center"
            >
              <h3 className="text-2xl font-bold text-gray-800">Family Members</h3>
              
              {!showInviteForm ? (
                <button
                  onClick={() => setShowInviteForm(true)}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <UserPlus className="w-5 h-5" />
                  <span>Invite Member</span>
                </button>
              ) : (
                <div className="flex items-center space-x-2">
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="Enter email address..."
                    className="px-4 py-2 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
                    onKeyPress={(e) => e.key === 'Enter' && inviteMember()}
                  />
                  <button
                    onClick={inviteMember}
                    className="px-4 py-2 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors"
                  >
                    Send
                  </button>
                  <button
                    onClick={() => setShowInviteForm(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </motion.div>

            {/* Members List */}
            <div className="space-y-4">
              {members.map((member, index) => {
                const RoleIcon = getRoleIcon(member.role);
                
                return (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-16 h-16 bg-gradient-to-r ${member.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                          <span className="text-xl font-bold text-white">{member.avatar}</span>
                        </div>
                        
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="text-xl font-bold text-gray-800">{member.name}</h4>
                            <div className={`flex items-center space-x-1 px-2 py-1 bg-gradient-to-r ${getRoleColor(member.role)} text-white text-xs font-semibold rounded-full`}>
                              <RoleIcon className="w-3 h-3" />
                              <span className="capitalize">{member.role}</span>
                            </div>
                            <div className={`w-3 h-3 rounded-full ${member.isActive ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                          </div>
                          
                          <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                              <Mail className="w-4 h-4" />
                              <span>{member.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone className="w-4 h-4" />
                              <span>{member.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4" />
                              <span>Joined {member.joinedAt}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-800">{member.contributions}</div>
                          <div className="text-xs text-gray-500">Lists</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-600">₦{member.savings.toLocaleString()}</div>
                          <div className="text-xs text-gray-500">Saved</div>
                        </div>
                        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Contributor */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center space-x-2 mb-4">
                <Star className="w-6 h-6 text-yellow-600" />
                <h3 className="text-xl font-bold text-yellow-800">Top Contributor</h3>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                 <span className="text-xl font-bold text-white">HA</span>
                </div>
               <div className="text-lg font-bold text-gray-800">Hellen Adhiambo</div>
                <div className="text-sm text-gray-600 mb-3">15 contributions this month</div>
                <div className="flex items-center justify-center space-x-1">
                  <Award className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm font-semibold text-yellow-700">Most Active</span>
                </div>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center space-x-2 mb-4">
                <Activity className="w-6 h-6 text-purple-600" />
                <h3 className="text-xl font-bold text-gray-800">Recent Activity</h3>
              </div>
              
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm">
                        <span className="font-semibold text-gray-800">{activity.member}</span>
                        <span className="text-gray-600"> {activity.action}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">{activity.timestamp}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Household Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center space-x-2 mb-4">
                <Gift className="w-6 h-6 text-green-600" />
                <h3 className="text-xl font-bold text-green-800">This Month's Achievements</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-green-700">Shopping Lists Completed</span>
                  <span className="font-bold text-green-800">8/12</span>
                </div>
                <div className="w-full bg-green-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full h-2" style={{ width: '67%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-green-700">Budget Goal</span>
                  <span className="font-bold text-green-800">85%</span>
                </div>
                <div className="w-full bg-green-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full h-2" style={{ width: '85%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-green-700">Savings Target</span>
                  <span className="font-bold text-green-800">KSH 45K/KSH 50K</span>
                </div>
                <div className="w-full bg-green-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-full h-2" style={{ width: '90%' }}></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Household;