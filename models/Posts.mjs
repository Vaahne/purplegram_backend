import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    postId:{
        type: String,
        required: true,
        unique: true
    },
    userId:{
        // type: mongoose.Schema.Types.ObjectId, this will be for _id in users colection
        type: String,
        ref: "Users",
        required: true
    },
    postType:{
        type: String,
        required: true,
        enum:['photo','text']
    },
    post_text:{
        type: String
    },
    post_photo:{
        type: String
    },
    likes:{ // array of userIds who liked the post
        type: [String]
    },
    comments:{ // array of comment Ids 
        type: [String]
    },
    timestamp:{
        type: Date,
        default: Date.now
    }
});

postSchema.index({postId : 1});

export default mongoose.model('Posts',postSchema);