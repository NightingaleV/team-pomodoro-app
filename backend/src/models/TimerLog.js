import mongoose from 'mongoose';

const TimerLogSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  length: {
    type: Number,
    required: true,
  },
  indexInCycle: {
    type: Number,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

TimerLogSchema.pre('save', function(next) {
  let timer = this;
  timer.updatedAt = Date.now();
  next();
});

TimerLogSchema.pre('findOneAndUpdate', function(next) {
  const updatedTimer = this.getUpdate();
  try {
    updatedTimer.updatedAt = Date.now();
    next();
  } catch (error) {
    return next(error);
  }
});

export const TimerLog = mongoose.model('TimerLog', TimerLogSchema);
