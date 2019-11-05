import mongoose from 'mongoose';

const GroupSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    userIDs:[{type: mongoose.Schema.Types.ObjectId}]
});

export const Group = mongoose.model("Group", GroupSchema);