// External imports
import express from 'express';

//Internal imports
import {groups} from "../models/GroupMocks";

const router = express.Router();

// @route   GET api/group/detail
// @desc    Detail of pomodoro group
// @access  Public
router.get(
    '/detail',
    async (req, res) => {       
        const groupName = req.query.groupName;        

        const filterGroup = groups.filter(item => item.name === groupName);
       
        if(filterGroup[0]){
            res.json({filterGroup});
        }                
    },
);

export {router as groupRouter};