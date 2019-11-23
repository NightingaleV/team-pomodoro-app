// External imports
import express from 'express';

//Internal imports
import { groups } from '../models/GroupMocks';
import {
  selectGroupById,
  createGroup,
  addMember,
  selectUserGroups,
  selectAllGroups,
  validateNewGroup,
  validateNewMember,
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

// @route   GET api/group/new
// @desc    create new pomodoro group
// @access  Private
// router.post('/new', createGroup);
// router.post('/new', validateGroup(), auth, createGroup);
router.post('/new', auth, validateNewGroup(), createGroup);

// @route   GET api/group/addMember
// @desc    add member to pomodoro group
// @access  Private
router.post('/addmember', auth, validateNewMember(), addMember);

// @route   GET api/group/detail
// @desc    Detail of pomodoro group
// @access  Private
router.get('/detail', async (req, res) => {
  const groupName = req.query.groupName;

  const filterGroup = groups.filter(item => item.name === groupName);

  if (filterGroup[0]) {
    res.json({ filterGroup });
  }
});

// @route   GET api/group/
// @desc    get pomodoro group by name
// @access  Private
router.get('/:groupId', auth, selectGroupById);

export { router as groupRouter };
