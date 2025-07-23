const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Household = require('../models/Household');

// Mock chat messages - in a real app, these would be stored in a database
let chatMessages = [
  {
    id: 1,
    householdId: null,
    senderId: null,
    senderName: 'Hellen Adhiambo',
    message: "Don't forget we need milk and bread for tomorrow's breakfast!",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    type: 'text'
  },
  {
    id: 2,
    householdId: null,
    senderId: null,
    senderName: 'James Ochieng',
    message: "Can you also get some cooking oil? We're running low.",
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    type: 'text'
  },
  {
    id: 3,
    householdId: null,
    senderId: 'bot',
    senderName: 'ZetuBot',
    message: "💡 Smart suggestion: Naivas has a 15% discount on dairy products today. Perfect timing for milk! Save KSH 20 on your purchase.",
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    type: 'bot'
  }
];

// Get chat messages for a household
router.get('/:householdId/messages', auth, async (req, res) => {
  try {
    const { householdId } = req.params;
    const { page = 1, limit = 50 } = req.query;

    // Verify user is member of household
    const household = await Household.findById(householdId);
    if (!household || !household.isMember(req.user.id)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Filter messages for this household (in a real app, this would be a database query)
    const householdMessages = chatMessages
      .filter(msg => msg.householdId === householdId || msg.householdId === null) // null for demo messages
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice((page - 1) * limit, page * limit);

    res.json({
      success: true,
      messages: householdMessages.reverse(), // Reverse to show oldest first
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: householdMessages.length
      }
    });
  } catch (error) {
    console.error('Get chat messages error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get chat messages'
    });
  }
});

// Send a message
router.post('/:householdId/messages', auth, async (req, res) => {
  try {
    const { householdId } = req.params;
    const { message, type = 'text' } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Message content is required'
      });
    }

    // Verify user is member of household
    const household = await Household.findById(householdId);
    if (!household || !household.isMember(req.user.id)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Create new message
    const newMessage = {
      id: chatMessages.length + 1,
      householdId: householdId,
      senderId: req.user.id,
      senderName: req.user.name,
      message: message.trim(),
      timestamp: new Date(),
      type: type
    };

    // Add to messages array (in a real app, save to database)
    chatMessages.push(newMessage);

    // Emit to Socket.IO room (handled in server.js)
    const io = req.app.get('io');
    if (io) {
      io.to(householdId).emit('new-message', newMessage);
    }

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: newMessage
    });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message'
    });
  }
});

// Delete a message
router.delete('/:householdId/messages/:messageId', auth, async (req, res) => {
  try {
    const { householdId, messageId } = req.params;

    // Verify user is member of household
    const household = await Household.findById(householdId);
    if (!household || !household.isMember(req.user.id)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Find message
    const messageIndex = chatMessages.findIndex(msg => 
      msg.id === parseInt(messageId) && msg.householdId === householdId
    );

    if (messageIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    const message = chatMessages[messageIndex];

    // Check if user can delete this message (only sender or household owner/admin)
    const userRole = household.getMemberRole(req.user.id);
    const canDelete = message.senderId === req.user.id || 
                     userRole === 'owner' || 
                     userRole === 'admin';

    if (!canDelete) {
      return res.status(403).json({
        success: false,
        message: 'You can only delete your own messages'
      });
    }

    // Remove message
    chatMessages.splice(messageIndex, 1);

    // Emit deletion to Socket.IO room
    const io = req.app.get('io');
    if (io) {
      io.to(householdId).emit('message-deleted', { messageId: parseInt(messageId) });
    }

    res.json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    console.error('Delete message error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete message'
    });
  }
});

// Get chat statistics
router.get('/:householdId/stats', auth, async (req, res) => {
  try {
    const { householdId } = req.params;

    // Verify user is member of household
    const household = await Household.findById(householdId);
    if (!household || !household.isMember(req.user.id)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Calculate stats (in a real app, this would be more sophisticated)
    const householdMessages = chatMessages.filter(msg => 
      msg.householdId === householdId || msg.householdId === null
    );

    const thisWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const weeklyMessages = householdMessages.filter(msg => 
      new Date(msg.timestamp) > thisWeek
    );

    const stats = {
      totalMessages: householdMessages.length,
      weeklyMessages: weeklyMessages.length,
      activeMembers: household.members.length,
      botMessages: householdMessages.filter(msg => msg.type === 'bot').length
    };

    res.json({
      success: true,
      stats
    });
  } catch (error) {
    console.error('Get chat stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get chat statistics'
    });
  }
});

// Mark messages as read
router.post('/:householdId/messages/read', auth, async (req, res) => {
  try {
    const { householdId } = req.params;
    const { messageIds } = req.body;

    // Verify user is member of household
    const household = await Household.findById(householdId);
    if (!household || !household.isMember(req.user.id)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // In a real app, you would update read status in database
    // For now, just return success
    res.json({
      success: true,
      message: 'Messages marked as read'
    });
  } catch (error) {
    console.error('Mark messages read error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to mark messages as read'
    });
  }
});

module.exports = router;