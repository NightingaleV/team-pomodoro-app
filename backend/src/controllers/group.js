//External imports
import mongoose from 'mongoose';
import { check, validationResult } from 'express-validator';
//Internal imports
import { Group } from '../models/Group';
import { User } from '../models/User';
import { Timer } from '../models/Timer';
import { async } from '../../../frontend/node_modules/rxjs/internal/scheduler/async';

// LOGIC
//------------------------------------------------------------------------------
// TO-DO Select by groupID instead of groupName?
export async function selectGroupById(req, res) {
  try {
    const userID = req.user.id;
    const groupID = req.params.groupId;

    const group = await Group.findOne({ _id: groupID }).populate({
      path: 'userIDs',
      populate: {
        path: 'timerID',
        model: 'Timer',
      },
    });
    let isMember = false;
    // await res.json({groups: groups});
    group.userIDs.map(member => {
      if (member._id == userID) {
        isMember = true;
      }
    });
    if (isMember) {
      await res.json({ group: group });
    } else {
      return res.status(403).send('You have no permission to see the group.');
    }
  } catch (err) {
    return res.status(500).send('Server Error');
  }
}

export async function selectAllGroups(req, res) {
  try {
    const groups = await Group.find();
    await res.json({ groups: groups });
  } catch (err) {
    return res.status(500).send('Server Error');
  }
}

export async function selectUserGroups(req, res) {
  try {
    const userID = req.user.id;
    const group = await Group.find({
      userIDs: mongoose.Types.ObjectId(userID),
    });
    await res.json(group);
  } catch (err) {
    console.log(err);
    return res.status(505).send('Server Error');
  }
}

export async function createGroup(req, res) {
  //Return validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // If No validation Error ->
  const userID = req.user.id;
  const { name } = req.body;
  const userIDs = [mongoose.Types.ObjectId(userID)];
  const adminIDs = [mongoose.Types.ObjectId(userID)];
  try {
    let group;
    group = new Group({
      name,
      userIDs,
      adminIDs,
    });

    //save group to database
    group.save().then(
      group => {
        res.json({
          group,
        });
      },
      err => {
        if (err) {
          throw err;
        }
      },
    );
  } catch (err) {
    console.log(err);
    return res.status(500).send('Server Error, Try it later');
  }

  console.log(req.body);
}

export async function addMember(req, res) {
  try {
    // const { groupID, memberID } = req.body;
    const { groupID, email } = req.body;
    const user = await User.findOne({ email: email });

    if (user) {
      // let helpGroup = await Group.findOne({ _id: groupID });
      let helpGroup = await Group.findOne({ _id: groupID }).populate({
        path: 'userIDs',
      });

      let isNew = true;

      console.log('Test');
      console.log(helpGroup.name);
      console.log(helpGroup.userIDs);
      console.log('UserID: ' + user._id);

      if (helpGroup) {
        helpGroup.userIDs.map(member => {
          console.log(member);
          if (member._id == user.id) {
            isNew = false;
          }
        });
      }

      const inc = helpGroup.userIDs.includes(user._id);
      console.log('inc: ' + inc);

      console.log(isNew);

      if (isNew) {
        let group = await Group.findOneAndUpdate(
          { _id: groupID },
          { $push: { userIDs: user._id } },
        );

        //need to figure out how to return the group with modified users
        await res.json({ group });
      } else {
        return res.status(403).send('User is already a member of the group');
      }
    } else {
      return res.status(404).send('No user was found using this email');
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send('Server Error, Try it later');
  }
}

// VALIDATION
//------------------------------------------------------------------------------
export function validateGroup() {
  return [
    check('name', 'Name is invalid')
      .not()
      .isEmpty(),
  ];
}

// VALIDATION
//------------------------------------------------------------------------------
// Check if group is already in database
export function isGroupAlreadyCreated(value, { req }) {
  return new Promise((resolve, reject) => {
    Group.findOne({ name: req.body.name }, function(err, user) {
      if (err) {
        reject(new Error('Server Error'));
      }
      if (Boolean(user)) {
        reject(new Error('This group already exists.'));
      }
      resolve(true);
    });
  });
}
