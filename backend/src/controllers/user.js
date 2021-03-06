//External imports
import { check, validationResult } from 'express-validator';
import gravatar from 'gravatar';
//Internal imports
import { User } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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

  const avatar = gravatar.url(email, {
    s: '200',
    r: 'pg',
    d: 'mp',
  });
  try {
    let user;
    user = new User({
      name,
      email,
      username: email,
      avatar,
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
    return res.status(500).send('Server Error, Try it later');
  }
}

export async function signInUser(req, res) {
  // Return validation
  const errors = validationResult(req);
  process.stdout.write(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    // User with that email not found
    if (!user) {
      return res.status(400).json({
        errors: [
          {
            msg: 'Meh, we were unable to find you using these credentials.',
          },
        ],
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        errors: [
          {
            msg: 'Meh, we were unable to find you using these credentials.',
          },
        ],
      });
    }

    const token = jwt.sign(
      { user: { id: user.id } },
      process.env.JWTPrivateKey,
    );
    return res.status(200).json({
      token,
      user,
    });
  } catch (err) {
    return res.status(500).send('Server Error, Try it later');
  }
}

export async function changeSettings(req, res) {
  try {
    const { username } = req.body;
    let user = await User.findOne({ username: username });

    if (user && user._id != req.user._id) {
      return res.status(200).json({
        error: 'There is already a person with that name.',
      });
    } else {
      user = await User.findOneAndUpdate(
        { _id: req.user.id },
        { username: username },
        { new: true },
      ).select('-password');
      await res.status(200).json({
        user,
      });
    }
  } catch (err) {
    return res.status(500).send('Server Error, Try it later');
  }
}

export async function selectUserByName(req, res) {
  try {
    const userEmail = req.params.email;

    const user = await User.findOne({ email: userEmail });
    if (user) {
      await res.json({ user: user });
    } else {
      return res.status(403).send('No user was found using this email');
    }
  } catch (err) {
    return res.status(500).send('Server Error, Try it later');
  }
}

export async function selectUserById(req, res) {
  try {
    const userID = req.params.id;
    // const user = await User.findOne({ _id: userID});
    const user = await User.findOne({ _id: userID }).populate({
      path: 'timerID',
      model: 'Timer',
    });

    if (user) {
      await res.json({ user: user });
    }
  } catch (err) {
    return res.status(500).send('Server Error');
  }
}

export async function addTimer(req, res) {
  try {
    const { email, timerID } = req.body;
    await User.updateOne({ email: email }, { $push: { timerIDs: timerID } });
    await res.json({ msg: 'Timer added to the user' });
  } catch (err) {
    return res.status(500).send('Server Error, Try it later');
  }
}

export async function addGroup(req, res) {
  try {
    const { email, groupID } = req.body;
    await User.updateOne({ email: email }, { $push: { groupIDs: groupID } });
    await res.json({ msg: 'Group added to the users groups' });
  } catch (err) {
    return res.status(500).send('Server Error, Try it later');
  }
}

export async function selectUserWithGroups(req, res) {
  try {
    const email = req.query.email;

    const userGroups = await User.aggregate([
      {
        $match: {
          email: email,
        },
      },
      {
        $lookup: {
          from: 'groups',
          localField: 'groupIDs',
          foreignField: '_id',
          as: 'userGroups',
        },
      },
      {
        $project: {
          groupIDs: 0,
          timerIDs: 0,
          password: 0,
          'userGroups.userIDs': 0,
        },
      },
    ]);

    await res.json({ userGroups: userGroups });
  } catch (err) {
    return res.status(500).send('Server Error');
  }
}

// VALIDATION
//------------------------------------------------------------------------------
// User Form validation
export function validateRegistration() {
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
export function validateLogin() {
  // Internal imports
  return [
    check('email', 'Email is invalid').isEmail(),
    check('password', 'Please enter a password').exists(),
  ];
}
