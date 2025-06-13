import Users from "../models/Users.mjs";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import FriendRequest from "../models/FriendRequest.mjs";
import Posts from "../models/Posts.mjs";

// @route: PUT /api/users/changepwd
// @desc:  change password
// @access: private 
async function changePassword(req,res){
    const errors = validationResult(req);
    
    if(!errors.isEmpty())
        return res.status(400).json({errors: errors.array()});

    try{
        const userId = req.user.id;
        const{oldPassword, newPassword } = req.body;

        let user = await Users.findById(userId);
        if(!user)
            return res.status(404).json({errors:[{msg:'User doesnt exist'}]});

        const isMatch = await bcrypt.compare(oldPassword,user.password);
        if(!isMatch)
            return res.status(400).json({errors:[{msg:'Incorrect old password'}]})

        // hashing the password before storing into database
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword,salt);

       user.password = hashedPassword;
       await user.save();

       return res.status(200).json({msg:'Password updated successfully'});

    }catch(err){
        console.error(err.message);
        res.status(500).json({errors:[{msg: err.message}]});
    }
}


// @route: PUT /api/users
// @desc:  update user details
// @access: private 
async function updateUser(req,res){

    const {name,email,dob,photo} = req.body;

    try {
        const userId = req.user.id;

        let user = await Users.findById(userId);

        if(!user)
            return res.status(404).json({errors:[{msg: 'User doesnot exist'}]});

        if(email !== user.email) {
            const checkEmail = await Users.findOne({email:email});
            if(checkEmail && checkEmail._id.toString() !== userId)
                return res.status(400).json({errors:[{msg:'Email already exists!!'}]});
            user.email = email;
        }
    
        await Users.findByIdAndUpdate(userId,
                            {
                                name,
                                email,
                                dob,
                                photo
                            },
                            {
                                new: true,
                                runValidators: true,
                            }
                        );

        // user.dob = dob;
        // user.photo = photo;
        // user.name = name;
    
        // await user.save();

      return res.status(200).json({message: `Updated User details Successfully!!!`});

    }catch(err){
        console.error(err.message);
        res.status(500).json({errors:[{msg: 'Server Error'}]});
    }    
}


// @route: POST /api/users/changepwd
// @desc:  adding or registering new user
// @access: public
async function addUser(req,res){
    console.log(req.body);
    const errors = validationResult(req);
    if(!errors.isEmpty())
        return res.status(400).json({errors: errors.array()});

    const {name,email,password,dob,gender,photo} = req.body;

    try {
        let user = await Users.findOne({email});

        if(user)
            return res.status(400).json({errors:[{msg: 'User already exists'}]});

        user = new Users({
            name,
            email,
            password,
            dob,
            gender,
            photo
        });

        const  salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);

        await user.save();

        const payload = {
            user : {
                id: user._id
            }
        }

        jwt.sign(payload,
                process.env.jwtSecret,
                {
                    expiresIn: 360
                },
                (err,token)=>{
                    if(err) throw err
                    return res.json({token});
                });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({errors:[{msg: 'Server error'}]});
    }
}


// @route: DELETE /api/users
// @desc:  delete user
async function deleteUser(req,res) {

    const errors = validationResult(req);
    if(!errors.isEmpty())
        return res.status(400).json({errors: errors.array()});

    const userId = req.user.id;

    // const userId= req.params.userId;
    const deletedUser = await Users.findOneAndDelete({_id: userId});
    // TODO : all the friend connections should also be deleted
    //  All the notifications,comments,posts,likes if any should also be deleted
    if(deletedUser)
        return res.status(200).json({message:`User deleted successfully`});
    return res.status(404).json({errors: [{msg:`User can't be deleted now`}]});
}

// @route: GET /api/users
// @desc:  get all users
async function getAllUsers(req,res){
    const data = await Users.find().select('-photo');
    return res.status(200).json(data);
}


// @route: PUT /api/users/singleuser
// @desc:  get user details
// @access: private 
async function getUser(req,res){
    try {
        const loggedUser = req.user.id;
        const userId = req.params.userId || req.user.id;

        let user = await Users.findById(userId).select('-password');

        if(!user)
            return res.status(404).json({errors:[{msg: 'User doesnot exist'}]});

        let posts = await Posts.find({userId}).sort({timestamp : -1});

        if(userId == loggedUser)
            return res.status(200).json({...user._doc,posts,isFriend:true});
        
        const loggedInUser = await Users.findById(loggedUser).select('-password');
        const isFriend = loggedInUser.friends.includes(userId);

        return res.status(200).json({...user._doc,isFriend,posts});
    }catch(err){
        console.error(err.message);
        res.status(500).json({errors:[{msg: 'Server Error'}]});
    }    
}

// @route: POST /api/users/auth
// @desc:  authenticate used
// @access: public 
async function login(req,res) {
    const errors = validationResult(req);

    if(!errors.isEmpty())
        return res.status(400).json({errors: errors.array()});
 
    const {email,password} = req.body;

    try {
        
        let user = await Users.findOne({email});

        if(!user)
            return res.status(404).json({error:[{msg : 'Invalid Credentials '}]});

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch)
            return res.status(404).json({errors:[{msg:'Invalid credentials '}]});

        const payload = {
            user: {
                id: user._id
            }
        };

        jwt.sign(payload,
                process.env.jwtSecret,
                {
                    expiresIn: 36000000
                },
                (err,token)=>{
                    if(err) throw err;
                    return res.status(201).json({token});
                }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).json({errors:[{ msg : 'Server Error'}]})
    }
}

// @route: GET /api/users/search
// @desc:  search by user name
// @access: private 
async function searchByUsername(req,res){
    try{
        const userId = req.user.id;

        const user = await Users.findOne({_id:userId});

        if(!user) return res.status(404).json({errors:[{msg:'User not found'}]});

        const userName = req.body.search;
        const users = await Users.find({
                name : {$regex : userName,$options: 'i'}
            }).select('name').limit(10);
        
        res.status(200).json(users);    
    } catch (err) {
        console.error(err.message);
        res.status(500).json({errors:[{msg:'Server Error'}]});
    }    
}

// @route: PUT /api/users/sync
// @desc:  developer purpose only to sync the friends
async function syncMutualFriends(req, res) {
    try {
        const users = await Users.find({});

        for (let user of users) {
            for (let friendId of user.friends) {
                // Get the friend user
                const friend = await Users.findById(friendId);

                if (!friend ) continue;

                // if(friend.friends)
                // If this user is not in the friend's friends list, add it
                if (!friend.friends.includes(user._id)) {
                    friend.friends.push(user._id);
                    await friend.save();
                }
            }
        }

        res.status(200).json({ msg: "Friendships synchronized successfully." });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ errors: [{ msg: "Server Error!!!" }] });
    }
}

// @route: GET /api/users/getfriends
// @desc:  used to get the friends of loggedin user
// @access: private 
async function getFriends(req,res){
    try {
        console.log("\n inside funciton \n");
        const userId = req.user.id;
        const user = await Users.findById(userId).populate({
                        path:'friends',
                        select:'name photo'}).select('-password');

        console.log("\n iafter user\n");
        
        if(!user) return res.status(404).json({errors:[{msg:'User not found'}]});

        const friends = user.friends;
        res.status(200).json(friends);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({errors:'Server Error'});
    }
}


export default {updateUser,addUser,deleteUser,login,getAllUsers,
                searchByUsername,changePassword,syncMutualFriends,
                getUser,getFriends};