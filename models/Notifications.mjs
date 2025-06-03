import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
   
    userId:{
        type:mongoose.Schema.Types.ObjectId, //  for _id in users
        ref: "Users",
        required: true
    },
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId, //  for _id in users
        ref: "Users",
        required: true
    },
    notification_type:{
        type: String,
        required: true,
        enum:[`comment`,`like`,`friendReq`,'post']
    },
    read:{
        type: Boolean,
        default : false
    },
     post_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Posts",
    },
    comment_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments"
    },
    timestamp:{
        type: Date,
        default : Date.now
    }
});

export default mongoose.model(`Notifications`,notificationSchema);