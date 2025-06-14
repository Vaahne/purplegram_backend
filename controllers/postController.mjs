import Posts from "../models/Posts.mjs";
import Users from "../models/Users.mjs";
import FriendRequest from '../models/FriendRequest.mjs';
import Comments from "../models/Comments.mjs";
import { validationResult } from "express-validator";
import Notifications from "../models/Notifications.mjs";

// @route: GET /api/posts
// @desc:   updating a post
// @access: private 
async function updatePost(req,res){
    try {
        const userId = req.user.id; // from the auth            
        const postId = req.params.postId; 

        let post = await Posts.findById({_id: postId});

        if(!post)
            return res.status(404).json({errors:[{msg: 'Post Not Found!!!'}]});
    
        if(post.userId.toString() != userId)
            return res.status(400).json({errors:[{msg:'You dont have previleges to change!!!'}]});

        const updates = { postType: req.body.postType,
                          post_text: req.body.post_text};

        if(req.body.postType == 'photo' ){
            updates.post_photo  = req.body.photo;
            updates.post_text = '';
        }else if(req.body.postType == 'text') {
            updates.post_photo ='';
        }

        Object.assign(post,updates);
        await post.save();
        
        return res.status(200).json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({errors:[{msg:'Server Errror'}]});
    }
}

// @route: POST /api/posts
// @desc:   adding a post and sending notifications to all the friends
// @access: private 
async function addPost(req,res){
    try {
        const errors = validationResult(req);
        console.log('  body ',req.body.postType) ;
        if(!errors.isEmpty())
            return res.status(400).json({errors: errors.array()});

        const userId = req.user.id;

        const user = await Users.findById(userId);
        if(!user) return res.status(404).json({errors:[{msg:'User not found!!!'}]});

        // let imageDataBase64 = '';
        // if(req.body.postType == 'photo')
        //     imageDataBase64  = (req.file) ? fs.readFileSync(req.file.path).toString("base64") : `defaultPhoto`; 

        const {postType,post_text,photo} = req.body;

        let post = new Posts({
            userId,
            postType,
            post_text,
            post_photo: photo 
        })

        await post.save();

        const user_friend_ids = user.friends;

        const notifications = user_friend_ids.map(friend_id =>({
                userId : friend_id,
                notification_type: 'post',
                post_id: post._id,
                fromUserId : userId
            })
        ); 

        if (notifications.length > 0)
            await Notifications.insertMany(notifications);

        return res.status(201).json({...post.toObject(),userId:{name:user.name,photo:user.photo}});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({errors:[{msg:'Server Error'}]})
    }
}

// @route: DELETE /api/posts
// @desc:   delete a post and all the notifications of that post
// @access: private 
async function deletePost(req,res) {
    try {
        const userId = req.user.id;

        const user = await Users.findById(userId);
        if(!user) return res.status(404).json({errors:[{msg:'User not found!'}]});

        const postId= req.params.postId;
        const post = await Posts.findById(postId);
        
        if(!post)  return res.status(404).json({errors:[{msg:'Post doesnot exist'}]});

        if(post.userId.toString() != userId) return res.status(403).json({errors:[{msg:'Unauthorized Access!!!'}]});

        await Posts.findByIdAndDelete({_id:postId});

        await Notifications.deleteMany({post_id:postId});
        await Comments.deleteMany({post_id:postId});

        return res.status(200).json({message:`Post deleted successfully`});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({errors:[{msg:'Server Error'}]});
    }
}

// @route: GET /api/posts/:post_id
// @desc:  get a post by post_id
// @access: public
async function getPost(req,res) {
    try {
        const postId = req.params.postId;
        const post = await Posts.findOne({postId});
        if(post)
            res.status(200).json(post);    
    } catch (err) {
        console.error(err.message);
        res.status(500).json({errors:[{msg:'Server Error!!'}]});
    }    
}

// @route: GET /api/posts/getposts
// @desc:  gets the posts of all friends of a user
// @access: private 
async function getFriendsPosts(req,res){
    try {
        const userId = req.user.id;

        // gets the friends of given userId
        const user = await Users.findById(userId).select('friends');
        if(!user || user.friends.length == 0 ) return res.status(200).json({msg:'No friends yet'});

        // gets all posts of user.friends array
        const posts = await Posts.find({userId:{$in: [...user.friends,userId] }})
                    .populate({
                        path:'userId',
                        select:'name photo'
                    }).sort({timestamp : -1});

        if(!posts || posts.length == 0) return res.status(200).json({errors:[{msg:'No posts from your friends'}]});

        res.status(200).json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({errors:[{msg:'Server errror!!'}]});
    }

}

// @route: PUT /api/posts/:post_id
// @desc:  adding userIds to likes to a post 
// @access: private 
async function addLikes(req,res){
    try {
        const userId = req.user.id;
        
        const user = await Users.findById({_id:userId});
        if(!user) return res.status(404).json({errors:[{msg:'User not found!!'}]});
        
        const postId = req.params.post_id;

        let post = await Posts.findById({_id:postId});
        if(!post) return res.status(404).json({errors:[{msg:'Post not found'}]});

        const index = post.likes.indexOf(userId);
        if(index == -1)
            post.likes.push(userId);
        else
            post.likes.splice(index,1);
        
        await post.save();

        res.status(200).json({msg:'User like updated succesful!!'});

    } catch (err) {
        console.error(err.message);
        res.status(500).json({errors:[{msg:'Server Error'}]});
    }
}

// @route: PUT /api/posts/addcomment/:post_id
// @desc:  adding a comment to the post
// @access: private 
async function addComment(req,res){
    try {
        const errors = validationResult(req);
        
        if(!errors.isEmpty())
            return res.status(400).json({errors: errors.array()});
        
        const userId = req.user.id;
        const user = await Users.findById(userId);
        if(!user) return res.status(404).json({errors:[{msg:'User not found!!'}]});

        const postId = req.params.post_id;
        let post = await Posts.findById(postId);
        if(!post) return res.status(404).json({errors:[{msg:'Post not found!!'}]});

        const newComment = new Comments({
            post_id: postId,
            user_id: userId,
            comment_text: req.body.comment
        });
        await newComment.save();

        console.log("after comment");

        post.comments.push(newComment._id);
        await post.save();
        res.status(200).json({msg:'Comment successful'});
        
    } catch (err) {
        console.error(err.message);
        res.status(500).json({errors:[{msg:'Server Error'}]});
    }
}

export default {updatePost,addPost,deletePost,getPost,getFriendsPosts,addLikes,addComment};