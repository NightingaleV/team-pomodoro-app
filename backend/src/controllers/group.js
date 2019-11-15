import mongoose from 'mongoose';
//Internal imports
import { Group } from '../models/Group';
import { Timer } from '../models/Timer';

// LOGIC
//------------------------------------------------------------------------------
// TO-DO Select by groupID instead of groupName?
export async function selectGroupById(req, res) {
  try {
    // const groupName = req.query.groupName;
    const groupID = req.params.groupId;

    const group = await Group.findOne({ _id: groupID }).populate({
      path: 'userIDs',
      populate: {
        path: 'timerID',
        model: 'Timer',
      },
    });
    // await res.json({groups: groups});
    await res.json({ group: group });
  } catch (err) {
    return res.status(500).send('Server Error');
  }
}
// export async function selectGroupByName(req, res) {
//   try {
//     const groupName = req.query.groupName;
//     // const groupID = req.query.groupID;
//
//     const groups = await Group.aggregate([
//       {
//         $match: {
//           name: groupName,
//           //'_id': mongoose.Types.ObjectId(groupID)
//         },
//       },
//       {
//         $lookup: {
//           from: 'users',
//           localField: 'userIDs',
//           foreignField: '_id',
//           as: 'members',
//         },
//       },
//       {
//         $lookup: {
//           from: 'timers',
//           localField: 'members.timerIDs',
//           foreignField: '_id',
//           as: 'timers',
//         },
//       },
//       {
//         $group: {
//           _id: { name: '$name', members: '$members' },
//         },
//       },
//       {
//         $project: {
//           userIDs: 0,
//           'members.password': 0,
//           'members.timerIDs': 0,
//           'members.groupIDs': 0,
//           'timers.userID': 0,
//         },
//       },
//     ]);
//
//     const group = groups[0];
//
//     // await res.json({groups: groups});
//     await res.json({ group: group });
//   } catch (err) {
//     return res.status(500).send('Server Error');
//   }
// }

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
  const { name, userIDs } = req.body;
  try {
    let group;

    group = new Group({
      name,
      userIDs,
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
    const { groupName, memberID } = req.body;
    await Group.updateOne(
      { name: groupName },
      { $push: { userIDs: memberID } },
    );
    await res.json({ msg: 'Member added to the group' });
  } catch (err) {
    console.log(err);
    return res.status(500).send('Server Error, Try it later');
  }
}
