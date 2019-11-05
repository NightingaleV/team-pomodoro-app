// External imports
import express from 'express';
import mongoose from 'mongoose';

//Internal imports
import { groups } from '../models/GroupMocks';
import {Group} from '../models/Group';
import {createGroup} from '../controllers/group';

const router = express.Router();
// @route   GET api/group/
// @desc    get pomodoro group by ID
// @access  Public
router.get('/', async (req, res) => {
  try{
    const id = req.query.groupID;

    // const group = await Group.findById(id);
    // await res.json({group: group});

    // const groups = await Group.find();
    
    const groups = await Group.aggregate([
      {
        $lookup:
        {
          from: "users",
          localField: "userIDs",
          foreignField: "_id",
          as: "members"
        }        
      },
      {
        $project: {"userIDs":0, "members.password":0}
      }
    ]);

    //TODO: select and aggregate  group by ID
    // const groups = await Group.findById(id).aggregate([
    //   const groups = await Group.aggregate([
    //   {
    //     $match:{
    //       // _id: {$eq: id}
    //       // _id: mongoose.Schema.Types.ObjectId("5dc1a44891b52b3938178b71")
    //       // name: "Skupina2"
    //       _id: {$toObjectId: "5dc1a44891b52b3938178b71"}
    //     }
    //   },
    //   {
    //     $lookup:
    //     {
    //       from: "users",
    //       localField: "userIDs",
    //       foreignField: "_id",
    //       as: "members"
    //     }        
    //   },
    //   {
    //     $project: {"userIDs":0, "members.password":0}
    //   }
    // ]);


    await res.json({groups: groups});
  }catch (err) {
    res.status(500).send('Server Error');
  }
});

router.post('/new', createGroup);

// @route   GET api/group/detail
// @desc    Detail of pomodoro group
// @access  Public
router.get('/detail', async (req, res) => {
  const groupName = req.query.groupName;

  const filterGroup = groups.filter(item => item.name === groupName);

  if (filterGroup[0]) {
    res.json({ filterGroup });
  }
});

export { router as groupRouter };
