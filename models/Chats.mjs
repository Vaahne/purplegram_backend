import mongoose from "mongoose"
import Users from "./Users.mjs"

const chatsSchema = new mongoose.Schema({
    sender_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: Users,
        required: true
    },
    receiver_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: Users,
        required: true
    },
    message:[{
        type : String,
        required: true
    }],
    timestamp:{
        type: Date,
        default: Date.now()
    }
});

chatsSchema.index({timestamp:-1});
export default mongoose.model("Chats",chatsSchema);