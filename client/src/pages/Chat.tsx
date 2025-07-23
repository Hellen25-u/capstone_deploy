import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, 
  Smile, 
  Paperclip, 
  Search, 
  Phone, 
  Video,
  MoreVertical,
  Users,
  MessageCircle,
  Clock,
  CheckCheck,
  Bot
} from 'lucide-react';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Hellen Adhiambo',
      avatar: 'HA',
      message: "Don't forget we need milk and bread for tomorrow's breakfast!",
      timestamp: '10:30 AM',
      isOwn: false,
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 2,
      sender: 'You',
      avatar: 'ME',
      message: "Got it! I'll pick them up on my way home. Anything else?",
      timestamp: '10:32 AM',
      isOwn: true,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 3,
      sender: 'James Ochieng',
      avatar: 'JO',
      message: "Can you also get some cooking oil? We're running low.",
      timestamp: '10:35 AM',
      isOwn: false,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 4,
      sender: 'ZetuBot',
      avatar: 'ZB',
      message: "💡 Smart suggestion: Naivas has a 15% discount on dairy products today. Perfect timing for milk! Save KSH 20 on your purchase.",
      timestamp: '10:36 AM',
      isOwn: false,
      isBot: true,
      color: 'from-purple-500 to-violet-500'
    },
    {
      id: 5,
      sender: 'Grace Muthoni',
      avatar: 'GM',
      message: "Thanks ZetuBot! 🙌 That's why I love this app!",
      timestamp: '10:40 AM',
      isOwn: false,
      color: 'from-orange-500 to-amber-500'
    },
    {
      id: 6,
      sender: 'You',
      avatar: 'ME',
      message: "Perfect! I'll head to Naivas then. Adding all items to our shopping list now. Thanks for the KSH savings tip!",
      timestamp: '10:42 AM',
      isOwn: true,
      color: 'from-blue-500 to-cyan-500'
    }
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'You',
        avatar: 'ME',
        message: message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true,
        color: 'from-blue-500 to-cyan-500'
      };
      
      setMessages([...messages, newMessage]);
      setMessage('');
      
      // Simulate bot response for demo
      if (message.toLowerCase().includes('store') || message.toLowerCase().includes('shop')) {
        setTimeout(() => {
          const botResponse = {
            id: messages.length + 2,
            sender: 'ZetuBot',
            avatar: 'ZB',
            message: "🛍️ I found 5 stores nearby with great deals today! You could save up to KSH 500. Would you like me to show you the best options?",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isOwn: false,
            isBot: true,
            color: 'from-purple-500 to-violet-500'
          };
          setMessages(prev => [...prev, botResponse]);
        }, 1000);
      }
    }
  };

  const familyMembers = [
    { name: 'Hellen Adhiambo', avatar: 'HA', status: 'online', color: 'from-pink-500 to-rose-500' },
    { name: 'James Ochieng', avatar: 'JO', status: 'online', color: 'from-green-500 to-emerald-500' },
    { name: 'Grace Muthoni', avatar: 'GM', status: 'away', color: 'from-orange-500 to-amber-500' },
    { name: 'John Karanja', avatar: 'JK', status: 'offline', color: 'from-purple-500 to-violet-500' }
  ];

  const quickActions = [
    { label: 'Share List', icon: '📝', action: 'share-list' },
    { label: 'Find Deals', icon: '💰', action: 'find-deals' },
    { label: 'Add Expense', icon: '💳', action: 'add-expense' },
    { label: 'Store Locator', icon: '📍', action: 'store-locator' }
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Family Chat
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay connected with your household members and get smart shopping assistance
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Family Members */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="flex items-center space-x-2 mb-4">
                <Users className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-bold text-gray-800">Family Members</h3>
              </div>
              
              <div className="space-y-3">
                {familyMembers.map((member, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 hover:bg-white/50 rounded-xl transition-colors cursor-pointer">
                    <div className="relative">
                      <div className={`w-10 h-10 bg-gradient-to-r ${member.color} rounded-xl flex items-center justify-center shadow-lg`}>
                        <span className="text-sm font-bold text-white">{member.avatar}</span>
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                        member.status === 'online' ? 'bg-green-400' : 
                        member.status === 'away' ? 'bg-yellow-400' : 'bg-gray-400'
                      }`}></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-gray-800 truncate">{member.name}</div>
                      <div className="text-xs text-gray-500 capitalize">{member.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
              
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    className="flex flex-col items-center p-3 bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl hover:from-pink-200 hover:to-purple-200 transition-all duration-300 transform hover:scale-105"
                  >
                    <span className="text-2xl mb-1">{action.icon}</span>
                    <span className="text-xs font-medium text-gray-700">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Stats */}
            <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-green-800 mb-4">This Week</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-green-700">Messages</span>
                  <span className="font-bold text-green-800">127</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Lists Shared</span>
                  <span className="font-bold text-green-800">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-700">Deals Found</span>
                  <span className="font-bold text-green-800">15</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Chat Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden"
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Family Chat</h2>
                    <p className="text-purple-100">4 members • 3 online</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                    <Search className="w-5 h-5" />
                  </button>
                  <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                    <Video className="w-5 h-5" />
                  </button>
                  <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-end space-x-2 max-w-md ${msg.isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <div className={`w-8 h-8 bg-gradient-to-r ${msg.color} rounded-lg flex items-center justify-center shadow-lg flex-shrink-0`}>
                      {msg.isBot ? (
                        <Bot className="w-4 h-4 text-white" />
                      ) : (
                        <span className="text-xs font-bold text-white">{msg.avatar}</span>
                      )}
                    </div>
                    
                    <div className={`relative ${msg.isOwn ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' : msg.isBot ? 'bg-gradient-to-r from-purple-100 to-violet-100 text-purple-800' : 'bg-gray-100 text-gray-800'} rounded-2xl px-4 py-3 shadow-lg`}>
                      {!msg.isOwn && !msg.isBot && (
                        <div className="text-xs font-semibold mb-1 opacity-70">{msg.sender}</div>
                      )}
                      <div className={`${msg.isBot ? 'text-purple-800' : msg.isOwn ? 'text-white' : 'text-gray-800'}`}>
                        {msg.message}
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className={`text-xs opacity-70 ${msg.isBot ? 'text-purple-600' : msg.isOwn ? 'text-white' : 'text-gray-500'}`}>
                          {msg.timestamp}
                        </span>
                        {msg.isOwn && (
                          <CheckCheck className="w-4 h-4 text-blue-200" />
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="border-t border-gray-200 p-6">
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Paperclip className="w-5 h-5" />
                </button>
                
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-300"
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  />
                </div>
                
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Smile className="w-5 h-5" />
                </button>
                
                <button
                  onClick={sendMessage}
                  className="p-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Chat;