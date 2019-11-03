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
            type: String,
            required: true,
        },
        createdAt:{
            type: Date,
            required: true,
            // default: Date.now()
        },
        updatedAt:{
            type: Date,
            required: true, 
        },        
        isRunning:{
            type: Boolean,
            required: true,
        }        
        // timestamps: {createdAt: 'created_at'},        
    }
);

//Pre save se mi nepodarilo rozchodit
// TimerSchema.pre('save', function(next){
//     //Before saving set updatedAt to date.now
//     let timer = this;
  
//     timer.updatedAt = Date.now();
//     next();
// });

export const Timer = mongoose.model('Timer', TimerSchema);