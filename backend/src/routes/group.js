// External imports
import express from 'express';

//Internal imports
import {
  selectGroupById,
  createGroup,
  addMember,
  selectUserGroups,
  selectAllGroups,
  validateNewGroup,
  validateNewMember,
  leaveGroup,
  removeMember,
  acceptInvitation,
} from '../controllers/group';
import auth from '../middleware/auth';

const router = express.Router();

// @route   GET api/group/userGroups
// @desc    get all pomodoro groups
// @access  Private
router.get('/all', selectAllGroups);

// @route   GET api/group/mine
// @desc    get user pomodoro groups
// @access  Private
router.get('/mine', auth, selectUserGroups);

// @route   POST api/group/new
// @desc    create new pomodoro group
// @access  Private
router.post('/new', auth, validateNewGroup(), createGroup);

// @route   POST api/group/leave
// @desc    leave pomodoro group
// @access  Private
router.post('/leave', auth, leaveGroup);

// @route   POST api/group/remove
// @desc    remove member from pomodoro group
// @access  Private
router.post('/remove', auth, removeMember);

// @route   POST api/group/acceptInvitation
// @desc    accept invitation into pomodoro group
// @access  Private
router.post('/acceptInvitation', auth, acceptInvitation);

// @route   POST api/group/addMember
// @desc    add member to pomodoro group
// @access  Private
router.post('/addmember', auth, validateNewMember(), addMember);

// @route   GET api/groupId/
// @desc    get pomodoro group by its ID
// @access  Private
router.get('/:groupId', auth, selectGroupById);

export { router as groupRouter };
