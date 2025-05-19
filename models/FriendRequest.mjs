import mongoose, { mongo } from "mongoose";

const friendRequestSchema = new mongoose.Schema({
    sender_id:{
        // type: mongoose.Schema.Types.ObjectId, for _id in users
        type: String,
        ref: "Users",
        required: true
    },
    receiver_id:{
        // type: mongoose.Schema.Types.ObjectId,  for _id in users
        type: String,
        ref: "Users",
        required: true
    },
    status:{
        type: String,
        required: true,
        enum: [`Accepted`,`Rejected`,`Pending`]
    },
    timestamp:{
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("FriendRequest",friendRequestSchema);