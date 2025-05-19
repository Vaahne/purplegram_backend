import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    notification_id:{
        type: String,
        required: true
    },
    userId:{
        // type:mongoose.Schema.Types.ObjectId,  for _id in users
        type: String,
        ref: "Users",
        required: true
    },
    notification_type:{
        type: String,
        required: true,
        enum:[`comment`,`like`,`friendReq`]
    },
    read:{
        type: Boolean,
        default : false
    },
    timestamp:{
        type: Date,
        default : Date.now
    }
});

export default mongoose.model(`Notifications`,notificationSchema);