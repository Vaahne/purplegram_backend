import express from 'express';
import User from '../models/Users.mjs';
import Notification from '../models/Notifications.mjs';
import Post from '../models/Posts.mjs';
import Comment from '../models/Comments.mjs';
import FriendReq from '../models/FriendRequest.mjs';
import data from '../utilities/data.mjs';

const router = express.Router();

router.post('/',async (req,res)=>{
    await Promise.all( [User.deleteMany({}),
                        Post.deleteMany({}),
                        Comment.deleteMany({}),
                        Notification.deleteMany({}),
                        FriendReq.deleteMany({})]);

    await Promise.all([ User.insertMany(data.Users),
                        Post.insertMany(data.Posts),
                        Notification.insertMany(data.Notifications),
                        FriendReq.insertMany(data.FriendRequests),
                        Comment.insertMany(data.Comments)]);
    res.status(201).json({message: `Successfuly data seeded`});
})


export default router;