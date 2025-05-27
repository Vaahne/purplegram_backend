import Posts from "../models/Posts.mjs";
import Users from "../models/Users.mjs";
import FriendRequest from '../models/FriendRequest.mjs';
import jwt from 'jsonwebtoken';

async function updatePost(req,res){
    let imageDataBase64;
    
    if(req.file)
        imageDataBase64  = fs.readFileSync(req.file.path).toString("base64"); 
    else
        imageDataBase64 = `defaultPhoto`;
    
    req.body.photo = imageDataBase64;
    let updatedPost = await Posts.findByIdAndUpdate(req.params.postId, req.body,{new:true, runValidators:true});
    if(updatedPost)
        return res.status(201).json({message: `Updated Post details`});
    return res.status(404).json({message: `Something went wrong with Post Detils`});
}
async function addPost(req,res){
    let imageDataBase64  = (req.file) ? fs.readFileSync(req.file.path).toString("base64") : `defaultPhoto`; 
    req.body.photo = imageDataBase64;
    
    let newPost = await Posts.create(req.body);
    if(newPost)
        return res.status(201).json({message: `Successfully registered`});
    return res.status(404).json({message: `Something went wrong . Please try later!!`});
}

async function deletePost(req,res) {
    const postId= req.params.postId;
    const deletedPost = await Posts.findOneAndDelete({postId});
    // TODO : all the friend connections should also be deleted
    //  All the notifications,comments,posts,likes if any should also be deleted
    if(deletePost)
        return res.status(200).json({message:`Post deleted successfully`});
    return res.status(404).json({message:`Post can't be deleted now`});
}
async function getPost(req,res) {
    const postId = req.params.postId;
    const post = await Posts.findOne({postId});
    if(post)
        res.status(200).json(post);
}

async function getFriendsPosts(req,res){
    try {
        const token = req.header('x-auth-token');

        if(!token)
            return res.status().json({errors:[{msg:'Invalid Token!!!'}]});

        const decoded = jwt.verify(token,process.env.jwtSecret);
        const userId = decoded.user.id;

        // gets the friends of given userId
        const user = await Users.findById(userId).select('friends');
        if(!user || user.friends.length == 0 ) return res.status(400).json({errors:[{msg:'No friends yet'}]});

        // gets all posts of user.friends array
        const posts = await Posts.find({userId:{$in: user.friends}});
        if(!posts || posts.length == 0) return res.status(200).json({errors:[{msg:'No posts from your friends'}]});

        res.status(200).json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({errors:[{msg:'Server errror!!'}]});
    }

}
async function getAllFriendsByUser(req,res){

}

export default {updatePost,addPost,deletePost,getPost,getFriendsPosts};