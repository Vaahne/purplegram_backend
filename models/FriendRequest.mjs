import mongoose, { mongo } from "mongoose";

const friendRequestSchema = new mongoose.Schema({
    sender_id:{
        type: mongoose.Schema.Types.ObjectId, //for _id in users
        ref: "Users",
        required: true
    },
    receiver_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    notification_type:{
        type: String,
        required: true,
        enum: [`Accepted`,`Rejected`,`Pending`]
    },
    message:{
        type: String,
    },
    read:{
        type: Boolean,
        default: false
    },
    timestamp:{
        type: Date,
        default: Date.now
    }
});

friendRequestSchema.index({timestamp:-1});

export default mongoose.model("FriendRequest",friendRequestSchema);