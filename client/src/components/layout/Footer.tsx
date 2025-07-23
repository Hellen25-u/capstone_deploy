import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-900 via-pink-900 to-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">ZetuList</span>
            </div>
            <p className="text-purple-200">
              Making household shopping and budget management effortless for Kenyan families.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-pink-600 transition-colors">
                <span className="text-sm font-bold">f</span>
              </div>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors">
                <span className="text-sm font-bold">t</span>
              </div>
              <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-pink-700 transition-colors">
                <span className="text-sm font-bold">i</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-100">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/about" className="block text-purple-200 hover:text-white transition-colors">About Us</Link>
              <Link to="/shopping-lists" className="block text-purple-200 hover:text-white transition-colors">Shopping Lists</Link>
              <Link to="/nearby-stores" className="block text-purple-200 hover:text-white transition-colors">Find Stores</Link>
              <Link to="/expenses" className="block text-purple-200 hover:text-white transition-colors">Track Expenses</Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-100">Support</h3>
            <div className="space-y-2">
              <Link to="/help" className="block text-purple-200 hover:text-white transition-colors">Help Center</Link>
              <Link to="/contact" className="block text-purple-200 hover:text-white transition-colors">Contact Us</Link>
              <Link to="/privacy" className="block text-purple-200 hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="block text-purple-200 hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-100">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-purple-300" />
                <span className="text-purple-200">hellen@zetulist.co.ke</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-purple-300" />
                <span className="text-purple-200">+254745690779</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-purple-300" />
                <span className="text-purple-200">Nairobi, Kenya</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-purple-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-purple-200">
            © 2024 ZetuList. Made with <Heart className="w-4 h-4 inline text-pink-400" /> in Kenya.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-purple-200 hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="text-purple-200 hover:text-white transition-colors">Terms</Link>
            <Link to="/cookies" className="text-purple-200 hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;