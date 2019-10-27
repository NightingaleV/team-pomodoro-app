import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Authentication with Mongoose
// https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
});

UserSchema.pre('save', function(next) {
  let user = this;
  let SALT_WORK_FACTOR = 10;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

export const User = mongoose.model('User', UserSchema);
