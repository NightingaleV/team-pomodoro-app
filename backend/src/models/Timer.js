import mongoose from 'mongoose';

const TimerSchema = new mongoose.Schema({
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
  remTime: {
    type: Number,
    required: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
  isRunning: {
    type: Boolean,
    required: true,
  },
});

TimerSchema.pre('save', function(next) {
  let timer = this;
  timer.updatedAt = Date.now();
  next();
});

export const Timer = mongoose.model('Timer', TimerSchema);
