import Users from "../models/Users.mjs";
import fs from 'fs';
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';


async function changePassword(req,res){
    const errors = validationResult(req);
    
    if(!errors.isEmpty())
        return res.status(400).json({errors: errors.array()});

    try{
        const token = req.header('x-auth-token');

        if(!token)
            return res.status().json({errors:[{msg:'Invalid Token!!!'}]});

        let decoded = jwt.verify(token,process.env.jwtSecret);
        const userId = decoded.user.id;

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
       user.save();

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

    let imageDataBase64  = (req.file) ? fs.readFileSync(req.file.path).toString("base64") : `defaultPhoto`; 
    req.body.photo = imageDataBase64;

    const {name,email,password,dob,gender,photo} = req.body;

    try {
        const token = req.header('x-auth-token');
        if(!token)
            return res.status(400).json({errors: [{msg: 'Invalid Token!!!'}]});

        const decoded = jwt.verify(token,process.env.jwtSecret);
        const userId = decoded.user.id;

        let user = await Users.findById(userId);

        if(!user)
            return res.status(404).json({errors:[{msg: 'User doesnot exist'}]});

        user = new Users({
            name,
            email,
            password,
            dob,
            gender,
            photo
        });

       user.save();

        if(updatedUser)
            return res.status(201).json({message: `Updated User details`});

        return res.status(404).json({message: `Something went wrong with user Detils`});
    }catch(err){
        console.error(err.message);
        res.status(500).json({errors:[{msg: 'Server Error'}]});
    }    
}

async function addUser(req,res){
    const errors = validationResult(req);
    if(!errors.isEmpty())
        return res.status(400).json({errors: errors.array()});

     let imageDataBase64  = (req.file) ? fs.readFileSync(req.file.path).toString("base64") : `defaultPhoto`; 
    req.body.photo = imageDataBase64;

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

        console.log("Before salt");

        const  salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);

        await user.save();
        console.log("After saving to db");
        const payload = {
            user : {
                id: user._id
            }
        }
        console.log('after payload');
        jwt.sign(payload,
                process.env.jwtSecret,
                {
                    expiresIn: 360000
                },
                (err,token)=>{
                    if(err) throw err
                    return res.json({token});
                });
        console.log('jwt signed');
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({errors:[{msg: 'Server error'}]});
    }
}

async function deleteUser(req,res) {
    const userId= req.params.userId;
    const deletedUser = await Users.findOneAndDelete({userId});
    // TODO : all the friend connections should also be deleted
    //  All the notifications,comments,posts,likes if any should also be deleted
    if(deletedUser)
        return res.status(200).json({message:`User deleted successfully`});
    return res.status(404).json({message:`User can't be deleted now`});
}

async function getAllUsers(req,res){
    const data = await Users.find();
    return res.status(200).json(data);
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
    const userName = req.params.username;
    const user = await Users.find({
                name : {$regex : userName,$options: 'i'}
            }).select('-password');
}

export default {updateUser,addUser,deleteUser,login,getAllUsers,searchByUsername,changePassword};