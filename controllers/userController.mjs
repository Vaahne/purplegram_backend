import Users from "../models/Users.mjs";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

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

async function updateUser(req,res){
    const errors = validationResult(req);
    
    if(!errors.isEmpty())
        return res.status(400).json({errors: errors.array()});

    const {name,email,dob,gender,photo} = req.body;

    try {
        const userId = req.user.id;

        let user = await Users.findById(userId);

        if(!user)
            return res.status(404).json({errors:[{msg: 'User doesnot exist'}]});

        user = new Users({
            name,
            email,
            dob,
            gender,
            photo 
        });

       await user.save();

        if(updatedUser)
            return res.status(201).json({message: `Updated User details Successfully!!!`});

        return res.status(404).json({errors: [{msg: `Something went wrong with user Detils`}]});
    }catch(err){
        console.error(err.message);
        res.status(500).json({errors:[{msg: 'Server Error'}]});
    }    
}

async function addUser(req,res){
    
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
        })


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
                    expiresIn: 360000
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

async function getAllUsers(req,res){
    const data = await Users.find().select('-photo');
    return res.status(200).json(data);
}

async function getUser(req,res){
    try {
        const userId = req.params.userId || req.user.id;

        let user = await Users.findById(userId).select('-password');

        if(!user)
            return res.status(404).json({errors:[{msg: 'User doesnot exist'}]});

        return res.status(200).json(user);
    }catch(err){
        console.error(err.message);
        res.status(500).json({errors:[{msg: 'Server Error'}]});
    }    
}


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
                    expiresIn: 3600000
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
//  developer purpose only to sync the friends
async function syncMutualFriends(req, res) {
    try {
        const users = await Users.find({});

        for (let user of users) {
            for (let friendId of user.friends) {
                // Get the friend user
                const friend = await Users.findById(friendId);

                if (!friend) continue;

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


export default {updateUser,addUser,deleteUser,login,getAllUsers,searchByUsername,changePassword,syncMutualFriends,getUser};