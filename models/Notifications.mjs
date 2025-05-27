import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
   
    userId:{
        type:mongoose.Schema.Types.ObjectId, //  for _id in users
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