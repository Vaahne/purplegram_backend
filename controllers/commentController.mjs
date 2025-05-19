import Comments from "../models/Comments.mjs";

async function updateComment(req,res){
    let imageDataBase64;
    
    let updatedComment = await Comments.findByIdAndUpdate(req.params.commentId, req.body);
    if(updatedComment)
        return res.status(201).json({message: `Updated Comment details`});
    return res.status(404).json({message: `Something went wrong with Comment Detils`});
}
async function addComment(req,res){   
    let newComment = await Comments.insertOne(req.body);
    if(newComment)
        return res.status(201).json({message: `Successfully registered`});
    return res.status(404).json({message: `Something went wrong . Please try later!!`});
}

async function deleteComment(req,res) {
    const commentId= req.params.commentId;
    const deletedComment = await Comments.findOneAndDelete(commentId);
    // TODO : all the friend connections should also be deleted
    //  All the notifications,comments,posts,likes if any should also be deleted
    if(deleteComment)
        return res.status(200).json({message:`Comment deleted successfully`});
    return res.status(404).json({message:`Comment can't be deleted now`});
}
async function getComment(req,res) {
    const commentId = req.params.commentId;
    const comment = await Comments.findOne({commentId});
    if(comment)
        res.send(200).json(comment);
}

export default {updateComment,addComment,deleteComment,getComment};