import mongoose from 'mongoose';

const TimerSchema = new mongoose.Schema({
  isRunning: {
    type: Boolean,
  },
  remTime: {
    type: Number,
    required: true,
  },
  settings: {
    type: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    totTime: {
      type: Number,
      required: true,
    },
  },
  indexInCycle: {
    type: Number,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
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

TimerSchema.pre('save', function(next) {
  let timer = this;
  timer.updatedAt = Date.now();
  next();
});

TimerSchema.pre('findOneAndUpdate', function(next) {
  const updatedTimer = this.getUpdate();
  try {
    updatedTimer.updatedAt = Date.now();
    next();
  } catch (error) {
    return next(error);
  }
});

export const Timer = mongoose.model('Timer', TimerSchema);
