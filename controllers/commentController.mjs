import Comments from "../models/Comments.mjs";
import Notifications from "../models/Notifications.mjs";
import Posts from "../models/Posts.mjs";
import Users from "../models/Users.mjs";
import { validationResult } from "express-validator";

async function updateComment(req,res){
    try {
        const errors = validationResult(req);
            
        if(!errors.isEmpty())
            return res.status(400).json({errors: errors.array()});
        console.log('before comment id')
        const comment_id = req.params.commentId;
        let comment = await Comments.findById({_id:comment_id});
        
        if(!comment)    return res.status(404).json({errors:[{msg:'Comment Not found!!!'}]});
        
        comment.comment_text = req.body.comment;

        await comment.save();

        res.status(200).json({msg:'Successfully updated!!'});

    } catch (err) {
        console.error(err.message);
        res.status(500).json({errors:[{msg:'Server Error!!'}]});
    }
    
    let updatedComment = await Comments.findByIdAndUpdate(req.params.commentId, req.body);
    if(updatedComment)
        return res.status(201).json({message: `Updated Comment details`});
    return res.status(404).json({message: `Something went wrong with Comment Detils`});
}
async function addComment(req,res){   
    try {
        const errors = validationResult(req);
            
        if(!errors.isEmpty())
            return res.status(400).json({errors: errors.array()});
          
        const userId = req.user.id;
        let user = await Users.findById({_id:userId});
        if(!user) return res.status(404).json({errors:[{msg:'User not found'}]});

        const postId = req.params.postId;
        let post = await Posts.findById({_id:postId});
        if(!post) return res.status(404).json({errors:[{msg:'Post not found'}]});

        let comment = new Comments({
            post_id: postId,
            user_id: userId,
            comment_text: req.body.comment
        });
        await comment.save();

        // post.comments.push(comment._id);
        await Posts.findByIdAndUpdate(postId, { $push: { comments: comment._id } });
        // await post.save();

        const notification = new Notifications({
            userId: post.userId,
            fromUserId : userId,
            notification_type :'comment',
            post_id : post._id
        });

        await notification.save();

//         notification.save()
//   .then(doc => console.log('Saved notification:', doc))
//   .catch(err => console.error('Error saving notification:', err));

        res.status(201).json(comment);

    } catch (err) {
        console.error(err.message);
        res.status(500).json({errors:[{msg:'Server Error!!!'}]});
    }
}

async function deleteComment(req,res) {
    
    try {
        const errors = validationResult(req);
            
        if(!errors.isEmpty())
            return res.status(400).json({errors: errors.array()});
          
        const userId = req.user.id;
        let user = await Users.findById({_id:userId});
        if(!user) return res.status(404).json({errors:[{msg:'User not found'}]});

        const commentId = req.params.commentId;
        const comment = await Comments.findById({_id:commentId});

        if(!comment)
            return res.status(404).json({errors:[{msg:'Comment not found'}]});

        if(comment.user_id.toString() !== userId)
            return res.status(403).json({errors:[{msg:'Unauthorised action'}]});

        await comment.deleteOne();
        res.status(200).json({msg:'Successfully comment deleted'});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({errors:[{msg:'Server Error'}]});
    }
}

async function getComment(req,res) {
    try {
        const userId = req.user.id;
        const user = await Users.findById(userId);

        if(!user) return res.status(404).json({errors:[{msg:'User does not exist!!!'}]});

        const post_id = req.params.postId;

        const post = await Posts.findById(post_id).select('comments');

        if(!post) return res.status(404).json({errors:[{msg:'Post not found!!'}]});

        if(!post.comments || post.comments.length == 0)
            return res.status(200).json({comments:[]});

    //    const populatedPost = await post.populate({
    //                             path: 'comments',
    //                             select: 'comment_text user_id',
    //                             // populate: { path: 'user_id', select: 'name photo' }
    //                         });

     const populatedPost = await Posts.findById(post_id)
                            .populate({
                                path: 'comments',
                                select: 'comment_text user_id',
                                populate: { path: 'user_id', select: 'name photo' }
                            });
    
        // console.log('\n get comment after comment wihte post: \n ',populatedPost);
        
        // if(!commentsWithPost)    return res.status(404).json({errors:[{msg:'Post not found!!!'}]});
        
        res.status(200).json(populatedPost);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({errors:[{msg:'Server Error!!'}]});
    }
}

async function getAllCommentsByPost(req,res) {
    try {
        const errors = validationResult(req);
            
        if(!errors.isEmpty())
            return res.status(400).json({errors: errors.array()});
        
        const postId = req.params.post_id;
        let comments = await Comments.find({post_id: postId});
        if(!comments || comments.length == 0)
            return res.status(404).json({errors:[{msg:'No Comments Found'}]});

        return res.status(200).json(comments);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({errors:[{msg:'Server Error'}]});
    }
}
export default {updateComment,addComment,deleteComment,getComment,getAllCommentsByPost};