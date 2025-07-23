import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import ShoppingLists from './pages/ShoppingLists';
import NearbyStores from './pages/NearbyStores';
import Expenses from './pages/Expenses';
import Household from './pages/Household';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import Chat from './pages/Chat';
import Subscription from './pages/Subscription';
import Integrations from './pages/Integrations';
import Footer from './components/layout/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pt-20"
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/shopping-lists" element={<ShoppingLists />} />
          <Route path="/nearby-stores" element={<NearbyStores />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/household" element={<Household />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/integrations" element={<Integrations />} />
        </Routes>
      </motion.main>
      <Footer />
    </div>
  );
}

export default App;