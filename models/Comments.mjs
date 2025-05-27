import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
   
    comment_text:{
        type: String
    },
    post_id:{  // comment on which post Id
        type: mongoose.Schema.Types.ObjectId, //for _id in posts
        ref: "Posts",
        required: true
    },
    timestamp:{
        type: Date,
        default: Date.now
    }
});

commentSchema.index({post_id: 1});

export default mongoose.model(`Comments`,commentSchema);