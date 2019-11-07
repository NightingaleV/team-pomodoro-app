//External imports
import { check, validationResult } from 'express-validator';

//Internal imports
import { User } from '../models/User';

// LOGIC
//------------------------------------------------------------------------------
export async function createUser(req, res) {
  //Return validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // If validation is alright
  const { name, email, password } = req.body;
  try {
    let user;
    user = new User({
      name,
      email,
      password,
    });
    // save user to database
    user.save().then(
      user => {
        res.json({
          user: user.email,
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

export async function addTimer(req, res){
  try{        
    const {email, timerID} = req.body;       
    await User.updateOne({"email": email}, {$push: {"timerIDs": timerID}});        
    await res.json({msg: "Timer added to the user"});
  }catch(err){
      console.log(err);
      return res.status(500).send('Server Error, Try it later');
  }
}

export async function addGroup(req, res){
  try{        
    const {email, groupID} = req.body;       
    await User.updateOne({"email": email}, {$push: {"groupIDs": groupID}});        
    await res.json({msg: "Group added to the users groups"});
  }catch(err){
      console.log(err);
      return res.status(500).send('Server Error, Try it later');
  }
}

export async function selectUserWithGroups(req, res){
  try{    
    const email = req.query.email;               

    const userGroups = await User.aggregate([
        {
          $match:{         
            'email': email
          }
        },
        {
          $lookup:
          {
            from: "groups",
            localField: "groupIDs",
            foreignField: "_id",
            as: "userGroups"
          },              
        },         
        {
            $lookup:
            {
                from: "users",
                localField: "userGroups.userIDs",
                foreignField: "_id",
                as: "members"
            },
        },       
        {
          $project: {"groupIDs":0, "timerIDs":0, "password": 0, "userGroups.userIDs":0, "members.password":0, "members.timerIDs":0, "members.groupIDs":0}}
      ]);      

    await res.json({userGroups: userGroups});
  }catch (err) {
    return res.status(500).send('Server Error');
  }
};

// VALIDATION
//------------------------------------------------------------------------------
// User Form validation
export function validateUser() {
  // Internal imports
  return [
    check('email', 'Email is invalid')
      .isEmail()
      .custom(isUserAlreadyRegistered),
    check(
      'password',
      'Please enter a password with 6 or more characters;',
    ).isLength({ min: 6 }),
  ];
}

// Check if user email is already in database
export function isUserAlreadyRegistered(value, { req }) {
  return new Promise((resolve, reject) => {
    User.findOne({ email: req.body.email }, function(err, user) {
      if (err) {
        reject(new Error('Server Error'));
      }
      if (Boolean(user)) {
        reject(new Error('E-mail already in use'));
      }
      resolve(true);
    });
  });
}
