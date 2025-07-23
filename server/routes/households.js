const express = require('express');
const router = express.Router();
const Household = require('../models/Household');
const User = require('../models/User');
const auth = require('../middleware/auth');

// Get user's households
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: 'households',
      populate: {
        path: 'members.user',
        select: 'name email avatar'
      }
    });

    res.json({
      success: true,
      households: user.households
    });
  } catch (error) {
    console.error('Get households error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get households'
    });
  }
});

// Create new household
router.post('/', auth, async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Household name is required'
      });
    }

    const household = new Household({
      name,
      description,
      owner: req.user.id,
      members: [{
        user: req.user.id,
        role: 'owner',
        permissions: {
          canEditLists: true,
          canDeleteLists: true,
          canInviteMembers: true,
          canManageExpenses: true,
          canViewReports: true
        }
      }]
    });

    await household.save();

    // Add household to user's households array
    await User.findByIdAndUpdate(req.user.id, {
      $push: { households: household._id }
    });

    await household.populate('members.user', 'name email avatar');

    res.status(201).json({
      success: true,
      message: 'Household created successfully',
      household
    });
  } catch (error) {
    console.error('Create household error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create household'
    });
  }
});

// Get household details
router.get('/:householdId', auth, async (req, res) => {
  try {
    const household = await Household.findById(req.params.householdId)
      .populate('owner', 'name email avatar')
      .populate('members.user', 'name email avatar');

    if (!household) {
      return res.status(404).json({
        success: false,
        message: 'Household not found'
      });
    }

    // Check if user is a member
    if (!household.isMember(req.user.id)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      household
    });
  } catch (error) {
    console.error('Get household error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get household'
    });
  }
});

// Update household
router.put('/:householdId', auth, async (req, res) => {
  try {
    const { name, description, settings } = req.body;
    const household = await Household.findById(req.params.householdId);

    if (!household) {
      return res.status(404).json({
        success: false,
        message: 'Household not found'
      });
    }

    // Check if user is owner or admin
    const userRole = household.getMemberRole(req.user.id);
    if (userRole !== 'owner' && userRole !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    if (name) household.name = name;
    if (description) household.description = description;
    if (settings) household.settings = { ...household.settings, ...settings };

    await household.save();
    await household.populate('members.user', 'name email avatar');

    res.json({
      success: true,
      message: 'Household updated successfully',
      household
    });
  } catch (error) {
    console.error('Update household error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update household'
    });
  }
});

// Join household by invite code
router.post('/join', auth, async (req, res) => {
  try {
    const { inviteCode } = req.body;

    if (!inviteCode) {
      return res.status(400).json({
        success: false,
        message: 'Invite code is required'
      });
    }

    const household = await Household.findOne({ inviteCode: inviteCode.toUpperCase() });

    if (!household) {
      return res.status(404).json({
        success: false,
        message: 'Invalid invite code'
      });
    }

    // Check if user is already a member
    if (household.isMember(req.user.id)) {
      return res.status(400).json({
        success: false,
        message: 'You are already a member of this household'
      });
    }

    // Add user to household
    await household.addMember(req.user.id);

    // Add household to user's households array
    await User.findByIdAndUpdate(req.user.id, {
      $push: { households: household._id }
    });

    await household.populate('members.user', 'name email avatar');

    res.json({
      success: true,
      message: 'Successfully joined household',
      household
    });
  } catch (error) {
    console.error('Join household error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to join household'
    });
  }
});

// Invite member to household
router.post('/:householdId/invite', auth, async (req, res) => {
  try {
    const { email } = req.body;
    const household = await Household.findById(req.params.householdId);

    if (!household) {
      return res.status(404).json({
        success: false,
        message: 'Household not found'
      });
    }

    // Check permissions
    const member = household.members.find(m => m.user.toString() === req.user.id.toString());
    if (!member || !member.permissions.canInviteMembers) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to invite members'
      });
    }

    // Find user by email
    const userToInvite = await User.findOne({ email });
    if (!userToInvite) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if user is already a member
    if (household.isMember(userToInvite._id)) {
      return res.status(400).json({
        success: false,
        message: 'User is already a member of this household'
      });
    }

    // In a real app, you would send an email invitation here
    // For now, we'll just return the invite code
    res.json({
      success: true,
      message: 'Invitation sent successfully',
      inviteCode: household.inviteCode,
      invitedUser: {
        name: userToInvite.name,
        email: userToInvite.email
      }
    });
  } catch (error) {
    console.error('Invite member error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to invite member'
    });
  }
});

// Remove member from household
router.delete('/:householdId/members/:userId', auth, async (req, res) => {
  try {
    const { householdId, userId } = req.params;
    const household = await Household.findById(householdId);

    if (!household) {
      return res.status(404).json({
        success: false,
        message: 'Household not found'
      });
    }

    // Check if requester is owner or admin
    const requesterRole = household.getMemberRole(req.user.id);
    if (requesterRole !== 'owner' && requesterRole !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Cannot remove the owner
    if (household.owner.toString() === userId) {
      return res.status(400).json({
        success: false,
        message: 'Cannot remove the household owner'
      });
    }

    await household.removeMember(userId);

    // Remove household from user's households array
    await User.findByIdAndUpdate(userId, {
      $pull: { households: householdId }
    });

    res.json({
      success: true,
      message: 'Member removed successfully'
    });
  } catch (error) {
    console.error('Remove member error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to remove member'
    });
  }
});

// Leave household
router.post('/:householdId/leave', auth, async (req, res) => {
  try {
    const household = await Household.findById(req.params.householdId);

    if (!household) {
      return res.status(404).json({
        success: false,
        message: 'Household not found'
      });
    }

    // Owner cannot leave their own household
    if (household.owner.toString() === req.user.id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'Household owner cannot leave. Transfer ownership or delete the household.'
      });
    }

    await household.removeMember(req.user.id);

    // Remove household from user's households array
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { households: req.params.householdId }
    });

    res.json({
      success: true,
      message: 'Successfully left household'
    });
  } catch (error) {
    console.error('Leave household error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to leave household'
    });
  }
});

// Delete household
router.delete('/:householdId', auth, async (req, res) => {
  try {
    const household = await Household.findById(req.params.householdId);

    if (!household) {
      return res.status(404).json({
        success: false,
        message: 'Household not found'
      });
    }

    // Only owner can delete household
    if (household.owner.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Only the household owner can delete the household'
      });
    }

    // Remove household from all members' households arrays
    const memberIds = household.members.map(m => m.user);
    await User.updateMany(
      { _id: { $in: memberIds } },
      { $pull: { households: req.params.householdId } }
    );

    await household.remove();

    res.json({
      success: true,
      message: 'Household deleted successfully'
    });
  } catch (error) {
    console.error('Delete household error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete household'
    });
  }
});

module.exports = router;