//Internal imports
import {Group} from '../models/Group';

// LOGIC
//------------------------------------------------------------------------------
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
}