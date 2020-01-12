//External imports
import mongoose from 'mongoose';
import { check, validationResult } from 'express-validator';
//Internal imports
import { Group } from '../models/Group';
import { User } from '../models/User';
import { Timer } from '../models/Timer';

// LOGIC
//------------------------------------------------------------------------------
export async function selectGroupById(req, res) {
  try {
    const userID = req.user.id;
    const groupID = req.params.groupId;

    // const group = await Group.findOne({ _id: groupID }).populate({
    //   path: 'userIDs',
    //   populate: {
    //     path: 'timerID',
    //     model: 'Timer',
    //   },
    // });
    // const group = await Group.findOne({ _id: groupID });
    var group = await Group.findOne({ _id: groupID });

    let isMember = false;
    group.userIDs.map(member => {
      if (member._id == userID) {
        isMember = true;
      }
    });
    if (isMember) {
      const userIsGuest = group.guestIDs.includes(userID);

      if (userIsGuest) {
        group = await Group.findOne({ _id: groupID }).populate({
          path: 'userIDs',
          select: 'email username',
        });

        await res.json({ group: group });
      } else {
        group = await Group.findOne({ _id: groupID }).populate({
          path: 'userIDs',
          select: '-password',
          populate: {
            path: 'timerID',
            model: 'Timer',
          },
        });

        // group = await Group.findOne({ _id: groupID }).populate({
        //   path: 'userIDs',
        //   match: { userIDs: { $nin: guestIDs } },
        //   populate: {
        //     path: 'timerID',
        //     model: 'Timer',
        //   },
        // });

        // group = await Group.findOne({ _id: groupID }).populate({
        //   path: 'userIDs',
        //   select: {'_id': guestIDs },
        //   populate: {
        //     path: 'timerID',
        //     model: 'Timer',
        //   },
        // });

        await res.json({ group: group });
      }
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
    return res.status(500).send('Server Error, Try it later');
  }
}

export async function addMember(req, res) {
  try {
    //Return validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { groupID, email } = req.body;
    const adminID = req.user.id;
    // const newMember = await User.findOne({ email: email }).select('-password');
    const newMember = await User.findOne({ email: email }).select(
      '-password -timerID',
    );

    if (newMember) {
      let group = await Group.findOne({ _id: groupID });

      const memberIsNew = !group.userIDs.includes(newMember._id);
      const userIsAdminOfGroup = group.adminIDs.includes(adminID);

      if (userIsAdminOfGroup) {
        if (memberIsNew) {
          group = await Group.findOneAndUpdate(
            { _id: groupID },
            { $push: { userIDs: newMember._id, guestIDs: newMember._id } },
          );
          await res.json({ group });
        } else {
          //member already in the group
          res.status(403).json({
            errors: [{ msg: 'User is already a member of the group' }],
          });
        }
      } else {
        //requesting user is not admin
        res.status(403).json({
          errors: [{ msg: "You don't have the permission to do that." }],
        });
      }
    } else {
      //No User Found
      return res
        .status(404)
        .json({ errors: [{ msg: 'No user was found using this email' }] });
    }
  } catch (err) {
    res.status(500).json({ errors: [{ msg: 'Server Error, Try it later' }] });
  }
}

export async function leaveGroup(req, res) {
  try {
    const { groupID } = req.body;
    const member = req.user.id;

    let group = await Group.findOneAndUpdate(
      { _id: groupID },
      {
        $pullAll: { userIDs: [member], adminIDs: [member], guestIDs: [member] },
      },
    );
    if (group) {
      await res.status(200).json({ status: 'success' });
    }
  } catch (err) {
    res.status(500).json({ errors: [{ msg: 'Server Error, Try it later' }] });
  }
}

export async function removeMember(req, res) {
  try {
    const { groupID, memberID } = req.body;
    const adminID = req.user.id;
    let group = await Group.findOne({ _id: groupID });
    const userIsMember = group.userIDs.includes(memberID);
    const userIsAdminOfGroup = group.adminIDs.includes(adminID);

    if (userIsAdminOfGroup) {
      if (userIsMember) {
        group = await Group.findOneAndUpdate(
          { _id: groupID },
          {
            $pullAll: {
              userIDs: [memberID],
              adminIDs: [memberID],
              guestIDs: [memberID],
            },
          },
        );

        if (group) {
          await res.status(200).json({ status: 'success' });
        }
      } else {
        //member already in the group
        res.status(403).json({
          errors: [{ msg: 'User is not a member of the group' }],
        });
      }
    } else {
      //requesting user is not admin
      res.status(403).json({
        errors: [{ msg: "You don't have the permission to do that." }],
      });
    }
  } catch (err) {
    res.status(500).json({ errors: [{ msg: 'Server Error, Try it later' }] });
  }
}

export async function acceptInvitation(req, res) {
  try {
    const { groupID } = req.body;
    const memberID = req.user.id;

    let group = await Group.findOne({ _id: groupID });
    if (group) {
      await res.status(200).json(group);
    }
  } catch (err) {
    res.status(500).json({ errors: [{ msg: 'Server Error, Try it later' }] });
  }
}

// VALIDATION
//------------------------------------------------------------------------------
export function validateNewGroup() {
  return [
    check('name', 'Group name is required.')
      .not()
      .isEmpty(),
  ];
}

export function validateNewMember() {
  return [
    check('email', 'User email is required.')
      .not()
      .isEmpty(),
  ];
}
