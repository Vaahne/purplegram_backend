import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId, // this will be for _id in users colection
        // type: String,
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
    likes:[{ // array of userIds who liked the post
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }],
    comments:{ // array of comment Ids 
        type: [String]
    },
    timestamp:{
        type: Date,
        default: Date.now
    }
});
// used to count the likes and is virtual field
postSchema.virtual('likeCount').get(function (){
    return this.likes.length;
});
// this is used to include the like count with post when in json or object form
postSchema.set('toJSON',{virtuals:true});
postSchema.set('toObject',{virtuals:true});

export default mongoose.model('Posts',postSchema);