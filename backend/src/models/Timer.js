import mongoose, { Mongoose } from 'mongoose';

const TimerSchema = new mongoose.Schema(
    {
        type:{
            type: Number,
            required: true,
        },
        name:{
            type: String,
            required: true,
        },
        totTime:{
            type: Number,
            required: true,
        },
        remTime:{
            type: Number,
            required: true,
        },
        userID:{
            type: Number,
            required: true,            
        }
        //created at, updated at, isRunning
    }
);

export const Timer = mongoose.model('Timer', TimerSchema);