import mongoose from 'mongoose';

const GroupSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    userIDs:[{type: String}]
});

export const Group = mongoose.model("Group", GroupSchema);