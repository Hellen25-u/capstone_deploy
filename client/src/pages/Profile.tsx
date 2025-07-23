import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Edit3, 
  Save, 
  Camera, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Bell,
  Shield,
  Settings,
  Award,
  Target,
  TrendingUp,
  Gift
} from 'lucide-react';
import toast from 'react-hot-toast';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Hellen Adhiambo',
    email: 'hellen.adhiambo@example.com',
    phone: '+254745690779',
    location: 'Nairobi, Kenya',
    joinDate: '2024-01-01',
    avatar: 'HA',
    bio: 'Household manager and savings enthusiast. Love keeping our family organized and budget-conscious with ZetuList!'
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    weeklyReports: true,
    budgetAlerts: true,
    listReminders: true
  });

  const stats = [
    { label: 'Lists Created', value: 23, icon: Target, color: 'from-pink-500 to-rose-500' },
    { label: 'Money Saved', value: 'KSH 18,500', icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
    { label: 'Active Days', value: 45, icon: Calendar, color: 'from-blue-500 to-cyan-500' },
    { label: 'Family Members', value: 4, icon: User, color: 'from-purple-500 to-violet-500' }
  ];

  const achievements = [
    {
      id: 1,
      title: 'Budget Master',
      description: 'Stayed under budget for 3 consecutive months',
      icon: Award,
      earned: true,
      date: '2024-01-15',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      id: 2,
      title: 'List Ninja',
      description: 'Created 20+ shopping lists',
      icon: Target,
      earned: true,
      date: '2024-01-10',
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 3,
      title: 'Savings Champion',
      description: 'Saved over KSH 50,000 in total',
      icon: TrendingUp,
      earned: false,
      progress: 37,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 4,
      title: 'Family Coordinator',
      description: 'Successfully coordinated 50+ household tasks',
      icon: User,
      earned: false,
      progress: 68,
      color: 'from-blue-500 to-cyan-500'
    }
  ];

  const saveProfile = () => {
    toast.success('Profile updated successfully!');
    setIsEditing(false);
  };

  const updatePreference = (key, value) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
    toast.success('Preferences updated!');
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              My Profile
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Manage your personal information, preferences, and track your achievements
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={saveProfile}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-start space-x-6">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-3xl font-bold text-white">HA</span>
                  </div>
                  {isEditing && (
                    <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors">
                      <Camera className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Profile Details */}
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profile.name}
                          onChange={(e) => setProfile({...profile, name: e.target.value})}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
                        />
                      ) : (
                        <div className="flex items-center space-x-2 text-gray-800">
                          <User className="w-4 h-4" />
                          <span>{profile.name}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile({...profile, email: e.target.value})}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
                        />
                      ) : (
                        <div className="flex items-center space-x-2 text-gray-800">
                          <Mail className="w-4 h-4" />
                          <span>{profile.email}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={profile.phone}
                          onChange={(e) => setProfile({...profile, phone: e.target.value})}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
                        />
                      ) : (
                        <div className="flex items-center space-x-2 text-gray-800">
                          <Phone className="w-4 h-4" />
                          <span>{profile.phone}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={profile.location}
                          onChange={(e) => setProfile({...profile, location: e.target.value})}
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
                        />
                      ) : (
                        <div className="flex items-center space-x-2 text-gray-800">
                          <MapPin className="w-4 h-4" />
                          <span>{profile.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                    {isEditing ? (
                      <textarea
                        value={profile.bio}
                        onChange={(e) => setProfile({...profile, bio: e.target.value})}
                        rows={3}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
                      />
                    ) : (
                      <p className="text-gray-600">{profile.bio}</p>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {profile.joinDate}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Preferences */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-center space-x-2 mb-6">
                <Settings className="w-6 h-6 text-purple-600" />
                <h2 className="text-2xl font-bold text-gray-800">Notification Preferences</h2>
              </div>

              <div className="space-y-4">
                {Object.entries(preferences).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <div className="font-semibold text-gray-800 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </div>
                      <div className="text-sm text-gray-600">
                        {key === 'emailNotifications' && 'Receive updates via email'}
                        {key === 'pushNotifications' && 'Get push notifications on your device'}
                        {key === 'weeklyReports' && 'Weekly summary of your household activities'}
                        {key === 'budgetAlerts' && 'Alerts when approaching budget limits'}
                        {key === 'listReminders' && 'Reminders for incomplete shopping lists'}
                      </div>
                    </div>
                    <button
                      onClick={() => updatePreference(key, !value)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        value ? 'bg-gradient-to-r from-pink-500 to-purple-600' : 'bg-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          value ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center space-x-2 mb-6">
                <TrendingUp className="w-6 h-6 text-purple-600" />
                <h3 className="text-xl font-bold text-gray-800">Your Stats</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="text-center"
                    >
                      <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-lg font-bold text-gray-800">{stat.value}</div>
                      <div className="text-xs text-gray-600">{stat.label}</div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center space-x-2 mb-6">
                <Gift className="w-6 h-6 text-yellow-600" />
                <h3 className="text-xl font-bold text-gray-800">Achievements</h3>
              </div>

              <div className="space-y-4">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                        achievement.earned
                          ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200'
                          : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-10 h-10 bg-gradient-to-r ${achievement.color} rounded-lg flex items-center justify-center shadow-lg ${
                          !achievement.earned ? 'opacity-50' : ''
                        }`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-bold text-gray-800">{achievement.title}</h4>
                            {achievement.earned && (
                              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                          
                          {achievement.earned ? (
                            <div className="text-xs text-green-600 font-semibold">
                              Earned {achievement.date}
                            </div>
                          ) : (
                            <div className="space-y-1">
                              <div className="flex justify-between text-xs text-gray-500">
                                <span>Progress</span>
                                <span>{achievement.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`bg-gradient-to-r ${achievement.color} rounded-full h-2 transition-all duration-500`}
                                  style={{ width: `${achievement.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;