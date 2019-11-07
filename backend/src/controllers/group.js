//Internal imports
import {Group} from '../models/Group';

// LOGIC
//------------------------------------------------------------------------------
export async function selectGroupByName(req, res){
    try{    
        const groupName = req.query.groupName;               

        const groups = await Group.aggregate([
            {
              $match:{         
                'name': groupName
              }
            },
            {
              $lookup:
              {
                from: "users",
                localField: "userIDs",
                foreignField: "_id",
                as: "members"
              },              
            },         
            {
                $lookup:
                {
                    from: "timers",
                    localField: "members.timerIDs",
                    foreignField: "_id",
                    as: "timers"
                },
            },       
            {
              $project: {"userIDs":0, "members.password":0, "members.timerIDs":0, "members.groupIDs":0, "timers.userID":0}            }
          ]);

        const group = groups[0];
    
        // await res.json({groups: groups});
        await res.json({group: group});
      }catch (err) {
        return res.status(500).send('Server Error');
      }
};

export async function createGroup(req, res){
    const {name, userIDs} = req.body;
    try{
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
                if(err){
                    throw err;
                }
            },
        );
    }catch (err) {
     console.log(err);
     return res.status(500).send('Server Error, Try it later');
    }

    console.log(req.body);
};

export async function addMember(req, res){
    try{        
        const {groupName, memberID} = req.body;       
        await Group.updateOne({"name": groupName}, {$push: {"userIDs": memberID}});        
        await res.json({msg: "Member added to the group"});
    }catch(err){
        console.log(err);
        return res.status(500).send('Server Error, Try it later');
    }
};