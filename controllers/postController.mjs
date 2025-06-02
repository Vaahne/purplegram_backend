import Posts from "../models/Posts.mjs";
import Users from "../models/Users.mjs";
import FriendRequest from '../models/FriendRequest.mjs';
import jwt from 'jsonwebtoken';
import Comments from "../models/Comments.mjs";

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
            updates.post_photo  = (req.file) ? fs.readFileSync(req.file.path).toString("base64") : `defaultPhoto`; 
            updates.post_text = '';
        }else if(req.body.postType == 'text') {
            updates.post_photo ='';
        }

        Object.assign(post,updates);
        await post.save();
        
        return res.status(200).json({message: `Post Successfully Updated!!!`});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({errors:[{msg:'Server Errror'}]});
    }
}
async function addPost(req,res){
    try {

       const userId = req.user.id;
        console.log(`\n ${userId} : userId\n`);
        let imageDataBase64 = '';
        if(req.body.postType == 'photo')
            imageDataBase64  = (req.file) ? fs.readFileSync(req.file.path).toString("base64") : `defaultPhoto`; 

        console.log(imageDataBase64);
        
        const {postType,post_text} = req.body;

        let post = new Posts({
            userId,
            postType,
            post_text,
            post_photo : imageDataBase64
        })
        
        await post.save();

        return res.status(201).json({message: `Post created Successfully `});
    
    } catch (err) {
        console.error(err.message);
        res.status(500).json({errors:[{msg:'Server Error'}]})
    }
}

async function deletePost(req,res) {
    const postId= req.params.postId;
    const userId = req.user.id;

    const post = await Posts.findById({_id:postId});
    
    if(!post)  return res.status(404).json({errors:[{msg:'Post doesnot exist'}]});

    if(post.userId.toString() != userId) return res.status(403).json({errors:[{msg:'Unauthorized Access!!!'}]});

    await Posts.findByIdAndDelete({_id:postId});

    await FriendRequest.deleteMany({post_id:postId});
    // await Comments.deleteMany(postId);

    return res.status(200).json({message:`Post deleted successfully`});
    // return res.status(404).json({message:`Post can't be deleted now`});
}
async function getPost(req,res) {
    const postId = req.params.postId;
    const post = await Posts.findOne({postId});
    if(post)
        res.status(200).json(post);
}

async function getFriendsPosts(req,res){
   
    try {
        const userId = req.user.id;

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